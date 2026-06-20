package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class AppNotification(
    val id: String,
    @SerializedName("user_role") val userRole: String,
    @SerializedName("user_id") val userId: String,
    val title: String,
    val message: String,
    val type: String = "info",
    val link: String? = null,
    @SerializedName("is_read") val isRead: Boolean = false,
    @SerializedName("created_at") val createdAt: String? = null
)
