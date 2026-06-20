package com.rkispro.marketplace.presentation.customer.quickbooking

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.rkispro.marketplace.core.util.Constants
import com.rkispro.marketplace.data.model.QuickBooking
import com.rkispro.marketplace.data.repository.QuickBookingRepository
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.core.auth.AuthManager
import com.rkispro.marketplace.core.datastore.PrefsKeys
import com.rkispro.marketplace.core.datastore.UserPreferences
import com.rkispro.marketplace.core.datastore.dataStore
import com.rkispro.marketplace.presentation.shared.components.EmptyState
import com.rkispro.marketplace.presentation.shared.components.LoadingScreen
import com.rkispro.marketplace.presentation.shared.components.StatusBadge
import com.rkispro.marketplace.presentation.shared.components.UrgencyBadge
import com.rkispro.marketplace.ui.theme.BrandAccent
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreateQuickBookingScreen(onBack: () -> Unit, onSuccess: () -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var serviceType by remember { mutableStateOf("") }
    var title by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    var location by remember { mutableStateOf("") }
    var urgency by remember { mutableStateOf("normal") }
    var preferredDate by remember { mutableStateOf("") }
    var contactName by remember { mutableStateOf("") }
    var contactPhone by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<String?>(null) }
    var expandedService by remember { mutableStateOf(false) }
    var expandedUrgency by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Quick Booking") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier.fillMaxSize().padding(paddingValues).padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            ExposedDropdownMenuBox(expanded = expandedService, onExpandedChange = { expandedService = it }) {
                OutlinedTextField(
                    value = serviceType, onValueChange = {},
                    label = { Text("Service Type *") }, readOnly = true,
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expandedService) },
                    modifier = Modifier.fillMaxWidth().menuAnchor()
                )
                ExposedDropdownMenu(expanded = expandedService, onDismissRequest = { expandedService = false }) {
                    Constants.SERVICE_TYPES.forEach { type ->
                        DropdownMenuItem(text = { Text(type) }, onClick = { serviceType = type; expandedService = false })
                    }
                }
            }
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("Title *") }, modifier = Modifier.fillMaxWidth(), singleLine = true)
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(value = description, onValueChange = { description = it }, label = { Text("Description") }, modifier = Modifier.fillMaxWidth(), minLines = 2)
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(value = location, onValueChange = { location = it }, label = { Text("Location *") }, modifier = Modifier.fillMaxWidth(), singleLine = true)
            Spacer(modifier = Modifier.height(12.dp))
            ExposedDropdownMenuBox(expanded = expandedUrgency, onExpandedChange = { expandedUrgency = it }) {
                OutlinedTextField(
                    value = urgency.replaceFirstChar { it.uppercase() }, onValueChange = {},
                    label = { Text("Urgency *") }, readOnly = true,
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expandedUrgency) },
                    modifier = Modifier.fillMaxWidth().menuAnchor()
                )
                ExposedDropdownMenu(expanded = expandedUrgency, onDismissRequest = { expandedUrgency = false }) {
                    Constants.URGENCY_LEVELS.forEach { u ->
                        DropdownMenuItem(text = { Text(u.replaceFirstChar { it.uppercase() }) }, onClick = { urgency = u; expandedUrgency = false })
                    }
                }
            }
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(value = preferredDate, onValueChange = { preferredDate = it }, label = { Text("Preferred Date (YYYY-MM-DD)") }, modifier = Modifier.fillMaxWidth(), singleLine = true)
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(value = contactName, onValueChange = { contactName = it }, label = { Text("Contact Name") }, modifier = Modifier.fillMaxWidth(), singleLine = true)
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(value = contactPhone, onValueChange = { contactPhone = it }, label = { Text("Contact Phone") }, modifier = Modifier.fillMaxWidth(), singleLine = true)
            Spacer(modifier = Modifier.height(24.dp))
            error?.let { Text(it, color = MaterialTheme.colorScheme.error); Spacer(modifier = Modifier.height(8.dp)) }
            Button(
                onClick = {
                    if (serviceType.isBlank() || title.isBlank() || location.isBlank()) { error = "Fill required fields"; return@Button }
                    isLoading = true; error = null
                    scope.launch {
                        try {
                            val prefs = context.dataStore.data.first()
                            val customerId = prefs[PrefsKeys.USER_ID_TABLE] ?: ""
                            val repo = QuickBookingRepository(SupabaseClientProvider(), AuthManager(SupabaseClientProvider(), UserPreferences(context.applicationContext as android.app.Application)))
                            repo.createBooking(mapOf(
                                "customer_id" to customerId, "service_type" to serviceType, "title" to title,
                                "description" to description, "location" to location, "urgency" to urgency,
                                "preferred_date" to preferredDate, "contact_name" to contactName,
                                "contact_phone" to contactPhone, "status" to "pending"
                            ))
                            isLoading = false; onSuccess()
                        } catch (e: Exception) { isLoading = false; error = e.message }
                    }
                },
                modifier = Modifier.fillMaxWidth().height(52.dp),
                enabled = !isLoading,
                colors = ButtonDefaults.buttonColors(containerColor = BrandAccent)
            ) { Text("Submit Booking", style = MaterialTheme.typography.titleMedium) }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun QuickBookingListScreen(onBack: () -> Unit, onBookingClick: (String) -> Unit) {
    val context = LocalContext.current
    var bookings by remember { mutableStateOf<List<QuickBooking>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        try {
            val prefs = context.dataStore.data.first()
            val customerId = prefs[PrefsKeys.USER_ID_TABLE] ?: ""
            bookings = QuickBookingRepository(SupabaseClientProvider(), AuthManager(SupabaseClientProvider(), UserPreferences(context.applicationContext as android.app.Application))).getCustomerBookings(customerId)
        } catch (_: Exception) {}
        isLoading = false
    }

    Scaffold(
        topBar = { TopAppBar(title = { Text("My Bookings") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { paddingValues ->
        if (isLoading) LoadingScreen(modifier = Modifier.padding(paddingValues))
        else if (bookings.isEmpty()) EmptyState(message = "No bookings yet", modifier = Modifier.padding(paddingValues))
        else {
            androidx.compose.foundation.lazy.LazyColumn(modifier = Modifier.fillMaxSize().padding(paddingValues), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                items(bookings.size) { index ->
                    val booking = bookings[index]
                    Card(onClick = { onBookingClick(booking.id) }, modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                Text(booking.title, style = MaterialTheme.typography.titleMedium, modifier = Modifier.weight(1f))
                                StatusBadge(status = booking.status)
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(booking.serviceType, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            UrgencyBadge(urgency = booking.urgency)
                        }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun QuickBookingDetailScreen(onBack: () -> Unit) {
    Scaffold(topBar = { TopAppBar(title = { Text("Booking Details") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }) { padding ->
        Box(modifier = Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) { Text("Booking Details") }
    }
}
