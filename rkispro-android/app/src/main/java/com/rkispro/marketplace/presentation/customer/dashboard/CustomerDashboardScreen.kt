package com.rkispro.marketplace.presentation.customer.dashboard

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import com.rkispro.marketplace.presentation.shared.components.StatCard
import com.rkispro.marketplace.presentation.shared.components.rememberUserName
import com.rkispro.marketplace.ui.theme.BrandAccent
import com.rkispro.marketplace.ui.theme.BrandPrimary

data class DashboardAction(
    val title: String,
    val icon: ImageVector,
    val onClick: () -> Unit
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CustomerDashboardScreen(
    onCreateRfq: () -> Unit,
    onViewRfqs: () -> Unit,
    onQuickBooking: () -> Unit,
    onViewProjects: () -> Unit,
    onNotifications: () -> Unit,
    onProfile: () -> Unit
) {
    val userName = rememberUserName()

    val actions = listOf(
        DashboardAction("Create RFQ", Icons.Default.AddCircle, onCreateRfq),
        DashboardAction("My RFQs", Icons.Default.List, onViewRfqs),
        DashboardAction("Quick Booking", Icons.Default.Bolt, onQuickBooking),
        DashboardAction("My Projects", Icons.Default.Folder, onViewProjects)
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "Welcome, $userName",
                            style = MaterialTheme.typography.titleLarge
                        )
                        Text(
                            text = "Customer Portal",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                actions = {
                    IconButton(onClick = onNotifications) {
                        Icon(Icons.Default.Notifications, contentDescription = "Notifications")
                    }
                    IconButton(onClick = onProfile) {
                        Icon(Icons.Default.Person, contentDescription = "Profile")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        }
    ) { paddingValues ->
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item(span = { GridCells.Fixed(2) }) {
                StatCard(
                    title = "Quick Actions",
                    value = "",
                    icon = Icons.Default.Speed
                )
            }

            items(actions) { action ->
                Card(
                    onClick = action.onClick,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(120.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.surface
                    ),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(16.dp),
                        verticalArrangement = Arrangement.Center
                    ) {
                        Icon(
                            imageVector = action.icon,
                            contentDescription = null,
                            tint = BrandAccent,
                            modifier = Modifier.size(32.dp)
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = action.title,
                            style = MaterialTheme.typography.titleMedium,
                            color = BrandPrimary
                        )
                    }
                }
            }
        }
    }
}
