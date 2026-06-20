package com.rkispro.marketplace.data.repository

import com.rkispro.marketplace.core.auth.AuthManager
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.core.util.Constants
import com.rkispro.marketplace.data.model.QuickBooking
import io.github.jan.supabase.postgrest.from
import io.github.jan.supabase.postgrest.query.Order

class QuickBookingRepository(
    private val supabaseProvider: SupabaseClientProvider,
    private val authManager: AuthManager
) {
    private val client get() = supabaseProvider.client

    suspend fun getCustomerBookings(customerTableId: String): List<QuickBooking> {
        return try {
            client.from(Constants.QUICK_BOOKINGS_TABLE)
                .select {
                    filter { eq("customer_id", customerTableId) }
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<QuickBooking>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getVendorBookings(vendorTableId: String): List<QuickBooking> {
        return try {
            client.from(Constants.QUICK_BOOKINGS_TABLE)
                .select {
                    filter { eq("assigned_vendor_id", vendorTableId) }
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<QuickBooking>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getAllBookings(): List<QuickBooking> {
        return try {
            client.from(Constants.QUICK_BOOKINGS_TABLE)
                .select {
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<QuickBooking>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun createBooking(booking: Map<String, Any>): QuickBooking? {
        return try {
            client.from(Constants.QUICK_BOOKINGS_TABLE)
                .insert(booking) {
                    select()
                }
                .decodeList<QuickBooking>()
                .firstOrNull()
        } catch (e: Exception) {
            null
        }
    }

    suspend fun getBookingById(bookingId: String): QuickBooking? {
        return try {
            client.from(Constants.QUICK_BOOKINGS_TABLE)
                .select {
                    filter { eq("id", bookingId) }
                }
                .decodeList<QuickBooking>()
                .firstOrNull()
        } catch (e: Exception) {
            null
        }
    }

    suspend fun updateBookingStatus(bookingId: String, status: String): Boolean {
        return try {
            client.from(Constants.QUICK_BOOKINGS_TABLE)
                .update(mapOf("status" to status)) {
                    filter { eq("id", bookingId) }
                }
            true
        } catch (e: Exception) {
            false
        }
    }

    suspend fun updateBooking(bookingId: String, updates: Map<String, Any>): Boolean {
        return try {
            client.from(Constants.QUICK_BOOKINGS_TABLE)
                .update(updates) {
                    filter { eq("id", bookingId) }
                }
            true
        } catch (e: Exception) {
            false
        }
    }
}
