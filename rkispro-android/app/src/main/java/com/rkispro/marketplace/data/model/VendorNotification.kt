package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class VendorNotification(
    val id: String,
    @SerializedName("vendor_id") val vendorId: String,
    @SerializedName("request_id") val requestId: String,
    val status: String = "Sent",
    @SerializedName("quote_amount") val quoteAmount: Double? = null,
    @SerializedName("quote_notes") val quoteNotes: String? = null,
    @SerializedName("quote_file_urls") val quoteFileUrls: List<String> = emptyList(),
    @SerializedName("created_at") val createdAt: String? = null,
    @SerializedName("marketplace_request") val marketplaceRequest: MarketplaceRequest? = null
)
