package com.rkispro.marketplace.presentation.customer.rfq

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
import com.rkispro.marketplace.core.datastore.dataStore
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.core.util.Constants
import com.rkispro.marketplace.data.model.MarketplaceRequest
import com.rkispro.marketplace.data.repository.RfqRepository
import com.rkispro.marketplace.presentation.shared.components.EmptyState
import com.rkispro.marketplace.presentation.shared.components.LoadingScreen
import com.rkispro.marketplace.presentation.shared.components.StatusBadge
import com.rkispro.marketplace.core.util.DateFormatter
import com.rkispro.marketplace.ui.theme.BrandAccent
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreateRfqScreen(
    onBack: () -> Unit,
    onSuccess: () -> Unit
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var title by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    var serviceType by remember { mutableStateOf("") }
    var materialType by remember { mutableStateOf("") }
    var location by remember { mutableStateOf("") }
    var deadline by remember { mutableStateOf("") }
    var budgetRange by remember { mutableStateOf("") }
    var techReqs by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<String?>(null) }
    var expandedService by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Create RFQ") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            OutlinedTextField(
                value = title,
                onValueChange = { title = it },
                label = { Text("Project Title *") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(
                value = description,
                onValueChange = { description = it },
                label = { Text("Description *") },
                modifier = Modifier.fillMaxWidth(),
                minLines = 3
            )
            Spacer(modifier = Modifier.height(12.dp))
            ExposedDropdownMenuBox(
                expanded = expandedService,
                onExpandedChange = { expandedService = it }
            ) {
                OutlinedTextField(
                    value = serviceType,
                    onValueChange = {},
                    label = { Text("Service Type *") },
                    readOnly = true,
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expandedService) },
                    modifier = Modifier.fillMaxWidth().menuAnchor()
                )
                ExposedDropdownMenu(
                    expanded = expandedService,
                    onDismissRequest = { expandedService = false }
                ) {
                    Constants.SERVICE_TYPES.take(10).forEach { type ->
                        DropdownMenuItem(
                            text = { Text(type) },
                            onClick = { serviceType = type; expandedService = false }
                        )
                    }
                }
            }
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(
                value = materialType,
                onValueChange = { materialType = it },
                label = { Text("Material Type *") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(
                value = location,
                onValueChange = { location = it },
                label = { Text("Location *") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(
                value = deadline,
                onValueChange = { deadline = it },
                label = { Text("Deadline (YYYY-MM-DD) *") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(
                value = budgetRange,
                onValueChange = { budgetRange = it },
                label = { Text("Budget Range") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(
                value = techReqs,
                onValueChange = { techReqs = it },
                label = { Text("Technical Requirements") },
                modifier = Modifier.fillMaxWidth(),
                minLines = 2
            )

            Spacer(modifier = Modifier.height(24.dp))

            error?.let {
                Text(it, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall)
                Spacer(modifier = Modifier.height(8.dp))
            }

            Button(
                onClick = {
                    if (title.isBlank() || description.isBlank() || serviceType.isBlank() ||
                        materialType.isBlank() || location.isBlank() || deadline.isBlank()) {
                        error = "Please fill all required fields"
                        return@Button
                    }
                    isLoading = true
                    scope.launch {
                        try {
                            val prefs = context.dataStore.data.first()
                            val customerId = prefs[PrefsKeys.USER_ID_TABLE] ?: ""
                            val repo = RfqRepository(
                                SupabaseClientProvider(),
                                AuthManager(SupabaseClientProvider(), com.rkispro.marketplace.core.datastore.UserPreferences(context.applicationContext as android.app.Application))
                            )
                            val rfq = repo.createRfq(mapOf(
                                "customer_id" to customerId,
                                "project_title" to title,
                                "description" to description,
                                "service_type" to serviceType,
                                "material_type" to materialType,
                                "location" to location,
                                "deadline" to deadline,
                                "budget_range" to budgetRange,
                                "technical_requirements" to techReqs,
                                "status" to "Pending"
                            ))
                            isLoading = false
                            if (rfq != null) onSuccess()
                            else error = "Failed to create RFQ"
                        } catch (e: Exception) {
                            isLoading = false
                            error = e.message ?: "Failed to create RFQ"
                        }
                    }
                },
                modifier = Modifier.fillMaxWidth().height(52.dp),
                enabled = !isLoading,
                colors = ButtonDefaults.buttonColors(containerColor = BrandAccent)
            ) {
                if (isLoading) CircularProgressIndicator(modifier = Modifier.size(24.dp), strokeWidth = 2.dp)
                else Text("Create RFQ", style = MaterialTheme.typography.titleMedium)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RfqListScreen(
    onBack: () -> Unit,
    onRfqClick: (String) -> Unit
) {
    val context = LocalContext.current
    var rfqs by remember { mutableStateOf<List<MarketplaceRequest>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        try {
            val prefs = context.dataStore.data.first()
            val customerId = prefs[PrefsKeys.USER_ID_TABLE] ?: ""
            val repo = RfqRepository(
                SupabaseClientProvider(),
                AuthManager(SupabaseClientProvider(), com.rkispro.marketplace.core.datastore.UserPreferences(context.applicationContext as android.app.Application))
            )
            rfqs = repo.getCustomerRfqs(customerId)
        } catch (_: Exception) {}
        isLoading = false
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("My RFQs") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { paddingValues ->
        if (isLoading) {
            LoadingScreen(modifier = Modifier.padding(paddingValues))
        } else if (rfqs.isEmpty()) {
            EmptyState(message = "No RFQs yet", modifier = Modifier.padding(paddingValues))
        } else {
            androidx.compose.foundation.lazy.LazyColumn(
                modifier = Modifier.fillMaxSize().padding(paddingValues),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(rfqs.size) { index ->
                    val rfq = rfqs[index]
                    Card(
                        onClick = { onRfqClick(rfq.id) },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(rfq.projectTitle, style = MaterialTheme.typography.titleMedium, modifier = Modifier.weight(1f))
                                StatusBadge(status = rfq.status)
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(rfq.serviceType, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            Text(DateFormatter.toDisplay(rfq.createdAt), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RfqDetailScreen(onBack: () -> Unit) {
    val rfqId = androidx.navigation.NavController().currentBackStackEntry?.arguments?.getString("rfqId") ?: ""
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("RFQ Details") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { paddingValues ->
        Box(modifier = Modifier.fillMaxSize().padding(paddingValues), contentAlignment = Alignment.Center) {
            Text("RFQ Details for ID: $rfqId")
        }
    }
}
