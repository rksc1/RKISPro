package com.rkispro.marketplace.presentation.vendor.rfq

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
import com.rkispro.marketplace.data.model.VendorNotification
import com.rkispro.marketplace.data.repository.RfqRepository
import com.rkispro.marketplace.presentation.shared.components.EmptyState
import com.rkispro.marketplace.presentation.shared.components.LoadingScreen
import com.rkispro.marketplace.presentation.shared.components.StatusBadge
import com.rkispro.marketplace.ui.theme.BrandAccent
import kotlinx.coroutines.flow.first

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun VendorRfqListScreen(onBack: () -> Unit, onRfqClick: (String) -> Unit) {
    val context = LocalContext.current
    var rfqs by remember { mutableStateOf<List<VendorNotification>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        try {
            val prefs = context.dataStore.data.first()
            val vendorId = prefs[PrefsKeys.USER_ID_TABLE] ?: ""
            rfqs = RfqRepository(SupabaseClientProvider(), AuthManager(SupabaseClientProvider(), UserPreferences(context.applicationContext as android.app.Application))).getVendorRfqs(vendorId)
        } catch (_: Exception) {}
        isLoading = false
    }

    Scaffold(
        topBar = { TopAppBar(title = { Text("Available RFQs") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { padding ->
        if (isLoading) LoadingScreen(modifier = Modifier.padding(padding))
        else if (rfqs.isEmpty()) EmptyState(message = "No RFQs assigned", modifier = Modifier.padding(padding))
        else {
            androidx.compose.foundation.lazy.LazyColumn(modifier = Modifier.fillMaxSize().padding(padding), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                items(rfqs.size) { index ->
                    val rfq = rfqs[index]
                    Card(onClick = { onRfqClick(rfq.id) }, modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                Text(rfq.marketplaceRequest?.projectTitle ?: "RFQ", style = MaterialTheme.typography.titleMedium, modifier = Modifier.weight(1f))
                                StatusBadge(status = rfq.status)
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(rfq.marketplaceRequest?.serviceType ?: "", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun VendorRfqDetailScreen(onBack: () -> Unit, onQuote: (String) -> Unit) {
    val notificationId = "placeholder"
    Scaffold(
        topBar = { TopAppBar(title = { Text("RFQ Details") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { padding ->
        Column(modifier = Modifier.fillMaxSize().padding(padding).padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Text("RFQ Details", style = MaterialTheme.typography.headlineSmall)
            Spacer(modifier = Modifier.height(24.dp))
            Button(onClick = { onQuote(notificationId) }, colors = ButtonDefaults.buttonColors(containerColor = BrandAccent)) {
                Text("Submit Quote")
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SubmitQuoteScreen(onBack: () -> Unit, onSuccess: () -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var amount by remember { mutableStateOf("") }
    var timeline by remember { mutableStateOf("") }
    var notes by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<String?>(null) }

    Scaffold(
        topBar = { TopAppBar(title = { Text("Submit Quote") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { padding ->
        Column(modifier = Modifier.fillMaxSize().padding(padding).padding(16.dp)) {
            OutlinedTextField(value = amount, onValueChange = { amount = it.filter { c -> c.isDigit() || c == '.' } }, label = { Text("Quote Amount (Rs.) *") }, modifier = Modifier.fillMaxWidth(), singleLine = true)
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(value = timeline, onValueChange = { timeline = it }, label = { Text("Timeline *") }, modifier = Modifier.fillMaxWidth(), singleLine = true, placeholder = { Text("e.g., 2 weeks") })
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(value = notes, onValueChange = { notes = it }, label = { Text("Notes *") }, modifier = Modifier.fillMaxWidth(), minLines = 3)
            Spacer(modifier = Modifier.height(24.dp))
            error?.let { Text(it, color = MaterialTheme.colorScheme.error); Spacer(modifier = Modifier.height(8.dp)) }
            Button(
                onClick = {
                    if (amount.isBlank() || timeline.isBlank() || notes.isBlank()) { error = "Fill all fields"; return@Button }
                    isLoading = true
                    scope.launch { isLoading = false; onSuccess() }
                },
                modifier = Modifier.fillMaxWidth().height(52.dp),
                enabled = !isLoading,
                colors = ButtonDefaults.buttonColors(containerColor = BrandAccent)
            ) { Text("Submit Quote", style = MaterialTheme.typography.titleMedium) }
        }
    }
}
