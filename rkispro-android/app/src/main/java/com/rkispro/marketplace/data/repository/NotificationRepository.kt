package com.rkispro.marketplace.data.repository

import com.rkispro.marketplace.core.auth.AuthManager
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.core.util.Constants
import com.rkispro.marketplace.data.model.AppNotification
import io.github.jan.supabase.postgrest.from
import io.github.jan.supabase.postgrest.query.Order

class NotificationRepository(
    private val supabaseProvider: SupabaseClientProvider,
    private val authManager: AuthManager
) {
    private val client get() = supabaseProvider.client

    suspend fun getNotifications(userId: String, userRole: String): List<AppNotification> {
        return try {
            client.from(Constants.NOTIFICATIONS_TABLE)
                .select {
                    filter {
                        eq("user_id", userId)
                        eq("user_role", userRole)
                    }
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<AppNotification>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun markAsRead(notificationId: String): Boolean {
        return try {
            client.from(Constants.NOTIFICATIONS_TABLE)
                .update(mapOf("is_read" to true)) {
                    filter { eq("id", notificationId) }
                }
            true
        } catch (e: Exception) {
            false
        }
    }

    suspend fun markAllAsRead(userId: String, userRole: String): Boolean {
        return try {
            client.from(Constants.NOTIFICATIONS_TABLE)
                .update(mapOf("is_read" to true)) {
                    filter {
                        eq("user_id", userId)
                        eq("user_role", userRole)
                        eq("is_read", false)
                    }
                }
            true
        } catch (e: Exception) {
            false
        }
    }

    suspend fun getUnreadCount(userId: String, userRole: String): Int {
        return try {
            val notifications = getNotifications(userId, userRole)
            notifications.count { !it.isRead }
        } catch (e: Exception) {
            0
        }
    }
}
