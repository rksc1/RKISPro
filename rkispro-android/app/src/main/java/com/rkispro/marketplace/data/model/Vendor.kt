package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class Vendor(
    val id: String,
    @SerializedName("company_name") val companyName: String? = null,
    @SerializedName("owner_name") val ownerName: String? = null,
    val phone: String,
    val email: String,
    @SerializedName("gst_number") val gstNumber: String? = null,
    val location: String,
    val services: List<String> = emptyList(),
    val machinery: List<String> = emptyList(),
    val capacity: String = "",
    @SerializedName("worker_count") val workerCount: Int = 0,
    @SerializedName("experience_years") val experienceYears: Int = 0,
    @SerializedName("logo_url") val logoUrl: String? = null,
    @SerializedName("factory_images") val factoryImages: List<String> = emptyList(),
    val status: String = "Pending",
    @SerializedName("vendor_type") val vendorType: String? = null,
    @SerializedName("full_name") val fullName: String? = null,
    @SerializedName("skill_categories") val skillCategories: List<String> = emptyList(),
    @SerializedName("service_radius_km") val serviceRadiusKm: Double? = null,
    @SerializedName("available_for_quick_booking") val availableForQuickBooking: Boolean = true,
    @SerializedName("id_proof_url") val idProofUrl: String? = null,
    @SerializedName("profile_photo_url") val profilePhotoUrl: String? = null,
    @SerializedName("workshop_address") val workshopAddress: String? = null,
    @SerializedName("workshop_images") val workshopImages: List<String> = emptyList(),
    @SerializedName("available_for_large_work") val availableForLargeWork: Boolean = true,
    val city: String? = null,
    val state: String? = null,
    @SerializedName("verification_status") val verificationStatus: String = "pending",
    val rating: Double = 0.0,
    @SerializedName("completed_projects_count") val completedProjectsCount: Int = 0,
    @SerializedName("trust_score") val trustScore: Double = 0.0,
    @SerializedName("profile_id") val profileId: String? = null,
    @SerializedName("created_at") val createdAt: String? = null
)
