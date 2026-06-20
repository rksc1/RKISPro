package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class Project(
    val id: String,
    @SerializedName("request_id") val requestId: String,
    @SerializedName("customer_id") val customerId: String,
    @SerializedName("vendor_id") val vendorId: String,
    @SerializedName("quote_id") val quoteId: String,
    val status: String = "awarded",
    @SerializedName("start_date") val startDate: String? = null,
    @SerializedName("expected_delivery_date") val expectedDeliveryDate: String? = null,
    @SerializedName("actual_delivery_date") val actualDeliveryDate: String? = null,
    @SerializedName("project_value") val projectValue: Double,
    @SerializedName("commission_percentage") val commissionPercentage: Double = 3.0,
    @SerializedName("commission_amount") val commissionAmount: Double,
    @SerializedName("admin_notes") val adminNotes: String? = null,
    @SerializedName("created_at") val createdAt: String? = null,
    @SerializedName("updated_at") val updatedAt: String? = null,
    @SerializedName("marketplace_request") val marketplaceRequest: MarketplaceRequest? = null,
    @SerializedName("vendor") val vendor: Vendor? = null,
    @SerializedName("customer") val customer: Customer? = null,
    @SerializedName("milestones") val milestones: List<ProjectMilestone>? = null
)
