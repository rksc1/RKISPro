package com.rkispro.marketplace.core.auth

import com.rkispro.marketplace.core.datastore.UserPreferences
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.core.util.Constants
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.gotrue.providers.builtin.Email
import io.github.jan.supabase.postgrest.from
import kotlinx.coroutines.flow.first
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import javax.inject.Inject
import javax.inject.Singleton

data class AuthResult(
    val success: Boolean,
    val error: String? = null,
    val role: String? = null,
    val needsConfirmation: Boolean = false
)

@Singleton
class AuthManager @Inject constructor(
    private val supabaseProvider: SupabaseClientProvider,
    private val userPreferences: UserPreferences
) {
    private val client get() = supabaseProvider.client

    suspend fun signIn(email: String, password: String): AuthResult {
        return try {
            val result = client.auth.signInWith(Email) {
                this.email = email
                this.password = password
            }

            val session = client.auth.currentSessionOrNull()
            if (session == null) {
                return AuthResult(success = false, error = "No session created")
            }

            val userId = session.user?.id ?: return AuthResult(success = false, error = "No user ID")

            // Save tokens
            userPreferences.saveAuthTokens(
                accessToken = session.accessToken,
                refreshToken = session.refreshToken ?: ""
            )

            // Fetch profile to get role
            val profile = client.from(Constants.PROFILES_TABLE)
                .select {
                    filter { eq("id", userId) }
                }
                .decodeList<Map<String, kotlinx.serialization.json.JsonElement>>()
                .firstOrNull()

            if (profile == null) {
                return AuthResult(success = false, error = "Profile not found")
            }

            val role = profile["role"]?.jsonPrimitive?.content
                ?: return AuthResult(success = false, error = "Role not found")
            val fullName = profile["full_name"]?.jsonPrimitive?.content ?: ""

            // Fetch role-specific table
            val tableName = when (role) {
                "customer" -> Constants.CUSTOMER_TABLE
                "vendor" -> Constants.VENDOR_TABLE
                "admin" -> Constants.ADMIN_TABLE
                else -> return AuthResult(success = false, error = "Invalid role: $role")
            }

            val roleRecord = client.from(tableName)
                .select {
                    filter { eq("email", email) }
                }
                .decodeList<Map<String, kotlinx.serialization.json.JsonElement>>()
                .firstOrNull()

            val roleRecordId = roleRecord?.get("id")?.jsonPrimitive?.content ?: ""

            // Save user info
            userPreferences.saveUserInfo(
                userId = userId,
                role = role,
                name = fullName,
                email = email,
                idTable = roleRecordId
            )

            AuthResult(success = true, role = role)
        } catch (e: Exception) {
            val message = e.message ?: "Unknown error"
            when {
                message.contains("Email not confirmed", ignoreCase = true) ->
                    AuthResult(success = false, error = "Please confirm your email first", needsConfirmation = true)
                message.contains("Invalid login credentials", ignoreCase = true) ->
                    AuthResult(success = false, error = "Invalid email or password")
                else ->
                    AuthResult(success = false, error = message)
            }
        }
    }

    suspend fun signUpCustomer(
        email: String,
        password: String,
        name: String,
        phone: String,
        companyName: String,
        city: String,
        state: String,
        location: String
    ): AuthResult {
        return try {
            val result = client.auth.signInWith(Email) {
                this.email = email
                this.password = password
            }

            val userId = client.auth.currentSessionOrNull()?.user?.id
                ?: return AuthResult(success = false, error = "Failed to create account")

            // Insert into customers table
            client.from(Constants.CUSTOMER_TABLE).insert(
                mapOf(
                    "id" to userId,
                    "name" to name,
                    "phone" to phone,
                    "email" to email,
                    "company_name" to companyName,
                    "location" to location,
                    "city" to city,
                    "state" to state,
                    "password" to "" // Password managed by Supabase Auth
                )
            )

            AuthResult(success = true)
        } catch (e: Exception) {
            AuthResult(success = false, error = e.message ?: "Registration failed")
        }
    }

    suspend fun signUpVendor(
        email: String,
        password: String,
        phone: String,
        companyName: String?,
        ownerName: String?,
        location: String,
        services: List<String>,
        machinery: List<String>,
        capacity: String,
        workerCount: Int,
        experienceYears: Int,
        vendorType: String,
        city: String?,
        state: String?
    ): AuthResult {
        return try {
            val result = client.auth.signInWith(Email) {
                this.email = email
                this.password = password
            }

            val userId = client.auth.currentSessionOrNull()?.user?.id
                ?: return AuthResult(success = false, error = "Failed to create account")

            client.from(Constants.VENDOR_TABLE).insert(
                mapOf(
                    "id" to userId,
                    "phone" to phone,
                    "email" to email,
                    "company_name" to companyName,
                    "owner_name" to ownerName,
                    "full_name" to (ownerName ?: companyName),
                    "location" to location,
                    "services" to services,
                    "machinery" to machinery,
                    "capacity" to capacity,
                    "worker_count" to workerCount,
                    "experience_years" to experienceYears,
                    "vendor_type" to vendorType,
                    "city" to city,
                    "state" to state,
                    "password" to ""
                )
            )

            AuthResult(success = true)
        } catch (e: Exception) {
            AuthResult(success = false, error = e.message ?: "Registration failed")
        }
    }

    suspend fun signOut() {
        try {
            client.auth.signOut()
        } catch (_: Exception) {}
        userPreferences.clearAll()
    }

    suspend fun forgotPassword(email: String): AuthResult {
        return try {
            client.auth.resetPasswordForEmail(email)
            AuthResult(success = true)
        } catch (e: Exception) {
            AuthResult(success = false, error = e.message ?: "Failed to send reset email")
        }
    }

    suspend fun getCurrentUserId(): String {
        return userPreferences.userId.first() ?: ""
    }

    suspend fun getCurrentUserRole(): String {
        return userPreferences.userRole.first() ?: ""
    }

    suspend fun getCurrentUserTableId(): String {
        return userPreferences.userIdTable.first() ?: ""
    }

    suspend fun isLoggedIn(): Boolean {
        return userPreferences.isLoggedIn.first()
    }
}
