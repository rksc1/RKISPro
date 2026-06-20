package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class Admin(
    val id: String,
    val name: String,
    val email: String,
    val role: String = "admin",
    @SerializedName("created_at") val createdAt: String? = null
)
