package com.rkispro.marketplace.presentation.customer.projects

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
import com.rkispro.marketplace.ui.theme.BrandAccent
import kotlinx.coroutines.flow.first

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProjectListScreen(onBack: () -> Unit, onProjectClick: (String) -> Unit) {
    val context = LocalContext.current
    var projects by remember { mutableStateOf<List<Project>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        try {
            val prefs = context.dataStore.data.first()
            val customerId = prefs[PrefsKeys.USER_ID_TABLE] ?: ""
            projects = ProjectRepository(SupabaseClientProvider(), AuthManager(SupabaseClientProvider(), UserPreferences(context.applicationContext as android.app.Application))).getCustomerProjects(customerId)
        } catch (_: Exception) {}
        isLoading = false
    }

    Scaffold(
        topBar = { TopAppBar(title = { Text("My Projects") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { paddingValues ->
        if (isLoading) LoadingScreen(modifier = Modifier.padding(paddingValues))
        else if (projects.isEmpty()) EmptyState(message = "No projects yet", modifier = Modifier.padding(paddingValues))
        else {
            androidx.compose.foundation.lazy.LazyColumn(modifier = Modifier.fillMaxSize().padding(paddingValues), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                items(projects.size) { index ->
                    val project = projects[index]
                    Card(onClick = { onProjectClick(project.id) }, modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                Text("Project", style = MaterialTheme.typography.titleMedium, modifier = Modifier.weight(1f))
                                StatusBadge(status = project.status)
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text("Value: Rs. ${project.projectValue}", style = MaterialTheme.typography.bodyMedium, color = BrandAccent)
                            Text("Expected: ${DateFormatter.toDisplay(project.expectedDeliveryDate)}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProjectDetailScreen(onBack: () -> Unit) {
    Scaffold(topBar = { TopAppBar(title = { Text("Project Details") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }) { padding ->
        Box(modifier = Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) { Text("Project Details") }
    }
}
