package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class ActivityLog(
    val id: String,
    @SerializedName("actor_role") val actorRole: String,
    @SerializedName("actor_id") val actorId: String,
    @SerializedName("entity_type") val entityType: String,
    @SerializedName("entity_id") val entityId: String,
    val action: String,
    val description: String? = null,
    val metadata: Map<String, Any>? = null,
    @SerializedName("created_at") val createdAt: String? = null
)
