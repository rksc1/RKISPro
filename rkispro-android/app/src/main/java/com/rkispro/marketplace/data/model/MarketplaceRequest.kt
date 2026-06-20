package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class MarketplaceRequest(
    val id: String,
    @SerializedName("customer_id") val customerId: String,
    @SerializedName("project_title") val projectTitle: String,
    val description: String,
    @SerializedName("service_type") val serviceType: String,
    @SerializedName("material_type") val materialType: String,
    val location: String,
    val deadline: String,
    @SerializedName("drawing_urls") val drawingUrls: List<String> = emptyList(),
    @SerializedName("technical_requirements") val technicalRequirements: String? = null,
    val quantity: String? = null,
    @SerializedName("quality_expectations") val qualityExpectations: String? = null,
    @SerializedName("budget_range") val budgetRange: String? = null,
    @SerializedName("inspection_requirement") val inspectionRequirement: String? = null,
    @SerializedName("gst_requirement") val gstRequirement: Boolean = false,
    val status: String = "Pending",
    @SerializedName("created_at") val createdAt: String? = null
)
