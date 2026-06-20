package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class QuickBooking(
    val id: String,
    @SerializedName("customer_id") val customerId: String,
    @SerializedName("service_type") val serviceType: String,
    val title: String,
    val description: String? = null,
    val location: String,
    @SerializedName("preferred_date") val preferredDate: String? = null,
    @SerializedName("preferred_time") val preferredTime: String? = null,
    val urgency: String = "normal",
    val budget: Double? = null,
    val images: List<String> = emptyList(),
    @SerializedName("contact_name") val contactName: String? = null,
    @SerializedName("contact_phone") val contactPhone: String? = null,
    @SerializedName("site_access_notes") val siteAccessNotes: String? = null,
    @SerializedName("machine_or_equipment") val machineOrEquipment: String? = null,
    @SerializedName("issue_started_at") val issueStartedAt: String? = null,
    @SerializedName("safety_requirements") val safetyRequirements: String? = null,
    val status: String = "pending",
    @SerializedName("assigned_vendor_id") val assignedVendorId: String? = null,
    @SerializedName("assigned_worker_name") val assignedWorkerName: String? = null,
    @SerializedName("assigned_worker_phone") val assignedWorkerPhone: String? = null,
    @SerializedName("admin_notes") val adminNotes: String? = null,
    @SerializedName("vendor_notes") val vendorNotes: String? = null,
    @SerializedName("created_at") val createdAt: String? = null,
    @SerializedName("updated_at") val updatedAt: String? = null
)
