package com.rkispro.marketplace.data.repository

import com.rkispro.marketplace.core.auth.AuthManager
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.core.util.Constants
import com.rkispro.marketplace.data.model.MarketplaceRequest
import com.rkispro.marketplace.data.model.VendorNotification
import com.rkispro.marketplace.data.model.VendorQuote
import io.github.jan.supabase.postgrest.from
import io.github.jan.supabase.postgrest.query.Order
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement

class RfqRepository(
    private val supabaseProvider: SupabaseClientProvider,
    private val authManager: AuthManager
) {
    private val client get() = supabaseProvider.client

    suspend fun getCustomerRfqs(customerTableId: String): List<MarketplaceRequest> {
        return try {
            client.from(Constants.RFQ_TABLE)
                .select {
                    filter { eq("customer_id", customerTableId) }
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<MarketplaceRequest>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getRfqById(rfqId: String): MarketplaceRequest? {
        return try {
            client.from(Constants.RFQ_TABLE)
                .select {
                    filter { eq("id", rfqId) }
                }
                .decodeList<MarketplaceRequest>()
                .firstOrNull()
        } catch (e: Exception) {
            null
        }
    }

    suspend fun createRfq(rfq: Map<String, Any>): MarketplaceRequest? {
        return try {
            client.from(Constants.RFQ_TABLE)
                .insert(rfq) {
                    select()
                }
                .decodeList<MarketplaceRequest>()
                .firstOrNull()
        } catch (e: Exception) {
            null
        }
    }

    suspend fun getVendorRfqs(vendorTableId: String): List<VendorNotification> {
        return try {
            client.from(Constants.VENDOR_NOTIFICATIONS_TABLE)
                .select {
                    filter { eq("vendor_id", vendorTableId) }
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<VendorNotification>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getVendorRfqDetail(notificationId: String): VendorNotification? {
        return try {
            client.from(Constants.VENDOR_NOTIFICATIONS_TABLE)
                .select {
                    filter { eq("id", notificationId) }
                }
                .decodeList<VendorNotification>()
                .firstOrNull()
        } catch (e: Exception) {
            null
        }
    }

    suspend fun submitQuote(quote: Map<String, Any>): VendorQuote? {
        return try {
            client.from(Constants.VENDOR_QUOTES_TABLE)
                .insert(quote) {
                    select()
                }
                .decodeList<VendorQuote>()
                .firstOrNull()
        } catch (e: Exception) {
            null
        }
    }

    suspend fun getVendorQuotes(vendorTableId: String): List<VendorQuote> {
        return try {
            client.from(Constants.VENDOR_QUOTES_TABLE)
                .select {
                    filter { eq("vendor_id", vendorTableId) }
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<VendorQuote>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getAllRfqs(): List<MarketplaceRequest> {
        return try {
            client.from(Constants.RFQ_TABLE)
                .select {
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<MarketplaceRequest>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun updateRfqStatus(rfqId: String, status: String): Boolean {
        return try {
            client.from(Constants.RFQ_TABLE)
                .update(
                    mapOf("status" to status)
                ) {
                    filter { eq("id", rfqId) }
                }
            true
        } catch (e: Exception) {
            false
        }
    }
}
