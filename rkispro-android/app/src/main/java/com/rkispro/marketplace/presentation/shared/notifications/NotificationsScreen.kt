package com.rkispro.marketplace.presentation.shared.notifications

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.rkispro.marketplace.core.datastore.PrefsKeys
import com.rkispro.marketplace.core.datastore.dataStore
import com.rkispro.marketplace.data.model.AppNotification
import com.rkispro.marketplace.data.repository.NotificationRepository
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.core.auth.AuthManager
import com.rkispro.marketplace.presentation.shared.components.EmptyState
import com.rkispro.marketplace.presentation.shared.components.LoadingScreen
import com.rkispro.marketplace.presentation.shared.components.StatusBadge
import com.rkispro.marketplace.core.util.DateFormatter
import com.rkispro.marketplace.ui.theme.BrandAccent
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NotificationsScreen(onBack: () -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var notifications by remember { mutableStateOf<List<AppNotification>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var userId by remember { mutableStateOf("") }
    var userRole by remember { mutableStateOf("") }

    val repo = remember {
        NotificationRepository(SupabaseClientProvider(), AuthManager(SupabaseClientProvider(),
            com.rkispro.marketplace.core.datastore.UserPreferences(context.applicationContext as android.app.Application)))
    }

    LaunchedEffect(Unit) {
        context.dataStore.data.map { prefs ->
            userId = prefs[PrefsKeys.USER_ID] ?: ""
            userRole = prefs[PrefsKeys.USER_ROLE] ?: ""
        }.collect {}
    }

    LaunchedEffect(userId, userRole) {
        if (userId.isNotBlank() && userRole.isNotBlank()) {
            notifications = repo.getNotifications(userId, userRole)
            isLoading = false
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Notifications") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    if (notifications.any { !it.isRead }) {
                        TextButton(onClick = {
                            scope.launch {
                                repo.markAllAsRead(userId, userRole)
                                notifications = notifications.map { it.copy(isRead = true) }
                            }
                        }) {
                            Text("Mark All Read", color = BrandAccent)
                        }
                    }
                }
            )
        }
    ) { paddingValues ->
        if (isLoading) {
            LoadingScreen(modifier = Modifier.padding(paddingValues))
        } else if (notifications.isEmpty()) {
            EmptyState(
                message = "No notifications yet",
                icon = Icons.Default.NotificationsOff,
                modifier = Modifier.padding(paddingValues)
            )
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(notifications) { notification ->
                    NotificationItem(
                        notification = notification,
                        onRead = {
                            scope.launch {
                                repo.markAsRead(notification.id)
                                notifications = notifications.map {
                                    if (it.id == notification.id) it.copy(isRead = true) else it
                                }
                            }
                        }
                    )
                }
            }
        }
    }
}

@Composable
private fun NotificationItem(
    notification: AppNotification,
    onRead: () -> Unit
) {
    Card(
        onClick = { if (!notification.isRead) onRead() },
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = if (notification.isRead)
                MaterialTheme.colorScheme.surface
            else
                MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = notification.title,
                    style = MaterialTheme.typography.titleSmall,
                    modifier = Modifier.weight(1f)
                )
                if (!notification.isRead) {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .padding(0.dp)
                    ) {
                        Surface(
                            modifier = Modifier.fillMaxSize(),
                            color = BrandAccent,
                            shape = MaterialTheme.shapes.small
                        ) {}
                    }
                }
            }
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = notification.message,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = DateFormatter.toFull(notification.createdAt),
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}
