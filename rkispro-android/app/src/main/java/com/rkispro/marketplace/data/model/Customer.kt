package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class Customer(
    val id: String,
    val name: String,
    val phone: String,
    val email: String,
    @SerializedName("company_name") val companyName: String,
    val location: String,
    @SerializedName("profile_id") val profileId: String? = null,
    @SerializedName("company_type") val companyType: String? = null,
    @SerializedName("billing_address") val billingAddress: String? = null,
    val city: String? = null,
    val state: String? = null,
    @SerializedName("created_at") val createdAt: String? = null
)
