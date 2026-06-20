package com.rkispro.marketplace.data.repository

import com.rkispro.marketplace.core.auth.AuthManager
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.core.util.Constants
import com.rkispro.marketplace.data.model.Project
import com.rkispro.marketplace.data.model.ProjectMilestone
import io.github.jan.supabase.postgrest.from
import io.github.jan.supabase.postgrest.query.Order

class ProjectRepository(
    private val supabaseProvider: SupabaseClientProvider,
    private val authManager: AuthManager
) {
    private val client get() = supabaseProvider.client

    suspend fun getCustomerProjects(customerTableId: String): List<Project> {
        return try {
            client.from(Constants.PROJECTS_TABLE)
                .select {
                    filter { eq("customer_id", customerTableId) }
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<Project>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getVendorProjects(vendorTableId: String): List<Project> {
        return try {
            client.from(Constants.PROJECTS_TABLE)
                .select {
                    filter { eq("vendor_id", vendorTableId) }
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<Project>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getAllProjects(): List<Project> {
        return try {
            client.from(Constants.PROJECTS_TABLE)
                .select {
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<Project>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getProjectById(projectId: String): Project? {
        return try {
            client.from(Constants.PROJECTS_TABLE)
                .select {
                    filter { eq("id", projectId) }
                }
                .decodeList<Project>()
                .firstOrNull()
        } catch (e: Exception) {
            null
        }
    }

    suspend fun getProjectMilestones(projectId: String): List<ProjectMilestone> {
        return try {
            client.from(Constants.MILESTONES_TABLE)
                .select {
                    filter { eq("project_id", projectId) }
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<ProjectMilestone>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun updateProjectStatus(projectId: String, status: String): Boolean {
        return try {
            client.from(Constants.PROJECTS_TABLE)
                .update(mapOf("status" to status)) {
                    filter { eq("id", projectId) }
                }
            true
        } catch (e: Exception) {
            false
        }
    }

    suspend fun updateMilestoneStatus(milestoneId: String, status: String): Boolean {
        return try {
            client.from(Constants.MILESTONES_TABLE)
                .update(mapOf("status" to status)) {
                    filter { eq("id", milestoneId) }
                }
            true
        } catch (e: Exception) {
            false
        }
    }
}
