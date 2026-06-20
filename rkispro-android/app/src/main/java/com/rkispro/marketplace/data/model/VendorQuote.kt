package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class VendorQuote(
    val id: String,
    @SerializedName("vendor_id") val vendorId: String,
    @SerializedName("request_id") val requestId: String,
    val amount: Double,
    val timeline: String,
    val notes: String,
    @SerializedName("attachment_url") val attachmentUrl: String? = null,
    val status: String = "pending",
    @SerializedName("admin_notes") val adminNotes: String? = null,
    @SerializedName("is_recommended") val isRecommended: Boolean = false,
    @SerializedName("created_at") val createdAt: String? = null,
    @SerializedName("updated_at") val updatedAt: String? = null
)
