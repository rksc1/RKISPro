package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class Profile(
    val id: String,
    val email: String? = null,
    val role: String,
    @SerializedName("full_name") val fullName: String,
    @SerializedName("company_name") val companyName: String? = null,
    val phone: String? = null,
    val city: String? = null,
    val state: String? = null,
    @SerializedName("avatar_url") val avatarUrl: String? = null,
    @SerializedName("is_verified") val isVerified: Boolean = false,
    @SerializedName("is_approved") val isApproved: Boolean = false,
    val status: String = "active",
    @SerializedName("created_at") val createdAt: String? = null,
    @SerializedName("updated_at") val updatedAt: String? = null
)
