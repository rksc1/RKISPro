package com.rkispro.marketplace.presentation.vendor.projects

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.rkispro.marketplace.core.auth.AuthManager
import com.rkispro.marketplace.core.datastore.PrefsKeys
import com.rkispro.marketplace.core.datastore.UserPreferences
import com.rkispro.marketplace.core.datastore.dataStore
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.data.model.Project
import com.rkispro.marketplace.data.repository.ProjectRepository
import com.rkispro.marketplace.presentation.shared.components.EmptyState
import com.rkispro.marketplace.presentation.shared.components.LoadingScreen
import com.rkispro.marketplace.presentation.shared.components.StatusBadge
import com.rkispro.marketplace.core.util.DateFormatter
import kotlinx.coroutines.flow.first

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun VendorProjectListScreen(onBack: () -> Unit, onProjectClick: (String) -> Unit) {
    val context = LocalContext.current
    var projects by remember { mutableStateOf<List<Project>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        try {
            val prefs = context.dataStore.data.first()
            val vendorId = prefs[PrefsKeys.USER_ID_TABLE] ?: ""
            projects = ProjectRepository(SupabaseClientProvider(), AuthManager(SupabaseClientProvider(), UserPreferences(context.applicationContext as android.app.Application))).getVendorProjects(vendorId)
        } catch (_: Exception) {}
        isLoading = false
    }

    Scaffold(
        topBar = { TopAppBar(title = { Text("My Projects") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { padding ->
        if (isLoading) LoadingScreen(modifier = Modifier.padding(padding))
        else if (projects.isEmpty()) EmptyState(message = "No projects yet", modifier = Modifier.padding(padding))
        else {
            androidx.compose.foundation.lazy.LazyColumn(modifier = Modifier.fillMaxSize().padding(padding), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                items(projects.size) { idx ->
                    val p = projects[idx]
                    Card(onClick = { onProjectClick(p.id) }, modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                Text("Project", style = MaterialTheme.typography.titleMedium, modifier = Modifier.weight(1f))
                                StatusBadge(status = p.status)
                            }
                            Text("Rs. ${p.projectValue}", style = MaterialTheme.typography.bodyMedium)
                        }
                    }
                }
            }
        }
    }
}
