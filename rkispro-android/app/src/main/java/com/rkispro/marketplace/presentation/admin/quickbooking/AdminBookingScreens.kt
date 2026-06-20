package com.rkispro.marketplace.presentation.admin.quickbooking

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
import com.rkispro.marketplace.core.datastore.UserPreferences
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.data.model.QuickBooking
import com.rkispro.marketplace.data.repository.QuickBookingRepository
import com.rkispro.marketplace.presentation.shared.components.EmptyState
import com.rkispro.marketplace.presentation.shared.components.LoadingScreen
import com.rkispro.marketplace.presentation.shared.components.StatusBadge

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AdminBookingListScreen(onBack: () -> Unit) {
    val context = LocalContext.current
    var bookings by remember { mutableStateOf<List<QuickBooking>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        try {
            bookings = QuickBookingRepository(SupabaseClientProvider(), AuthManager(SupabaseClientProvider(), UserPreferences(context.applicationContext as android.app.Application))).getAllBookings()
        } catch (_: Exception) {}
        isLoading = false
    }

    Scaffold(
        topBar = { TopAppBar(title = { Text("All Bookings") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { padding ->
        if (isLoading) LoadingScreen(modifier = Modifier.padding(padding))
        else if (bookings.isEmpty()) EmptyState(message = "No bookings", modifier = Modifier.padding(padding))
        else {
            androidx.compose.foundation.lazy.LazyColumn(modifier = Modifier.fillMaxSize().padding(padding), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                items(bookings.size) { idx ->
                    val b = bookings[idx]
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                Text(b.title, style = MaterialTheme.typography.titleMedium, modifier = Modifier.weight(1f))
                                StatusBadge(status = b.status)
                            }
                            Text(b.serviceType, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }
        }
    }
}
