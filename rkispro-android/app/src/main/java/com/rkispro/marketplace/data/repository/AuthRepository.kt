package com.rkispro.marketplace.data.repository

import com.rkispro.marketplace.core.auth.AuthManager
import com.rkispro.marketplace.core.auth.AuthResult

class AuthRepository(
    private val authManager: AuthManager
) {
    suspend fun signIn(email: String, password: String): AuthResult =
        authManager.signIn(email, password)

    suspend fun signUpCustomer(
        email: String,
        password: String,
        name: String,
        phone: String,
        companyName: String,
        city: String,
        state: String,
        location: String
    ): AuthResult = authManager.signUpCustomer(
        email, password, name, phone, companyName, city, state, location
    )

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
    ): AuthResult = authManager.signUpVendor(
        email, password, phone, companyName, ownerName, location,
        services, machinery, capacity, workerCount, experienceYears,
        vendorType, city, state
    )

    suspend fun signOut() = authManager.signOut()

    suspend fun forgotPassword(email: String): AuthResult = authManager.forgotPassword(email)

    suspend fun isLoggedIn(): Boolean = authManager.isLoggedIn()

    suspend fun getCurrentUserRole(): String = authManager.getCurrentUserRole()

    suspend fun getCurrentUserId(): String = authManager.getCurrentUserId()

    suspend fun getCurrentUserTableId(): String = authManager.getCurrentUserTableId()
}
