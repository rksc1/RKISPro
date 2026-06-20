package com.rkispro.marketplace.data.model

import com.google.gson.annotations.SerializedName

data class ProjectMilestone(
    val id: String,
    @SerializedName("project_id") val projectId: String,
    val title: String,
    val description: String? = null,
    val status: String = "pending",
    @SerializedName("due_date") val dueDate: String? = null,
    @SerializedName("completed_at") val completedAt: String? = null,
    @SerializedName("created_by_role") val createdByRole: String,
    @SerializedName("created_by_id") val createdById: String,
    @SerializedName("created_at") val createdAt: String? = null,
    @SerializedName("updated_at") val updatedAt: String? = null
)
