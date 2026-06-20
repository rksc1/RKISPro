package com.rkispro.marketplace.presentation.admin.vendors

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.rkispro.marketplace.presentation.shared.components.EmptyState
import com.rkispro.marketplace.presentation.shared.components.LoadingScreen
import com.rkispro.marketplace.presentation.shared.components.StatusBadge

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun VendorListScreen(onBack: () -> Unit, onVendorClick: (String) -> Unit) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Vendor Management") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { padding ->
        EmptyState(message = "Vendor list will load from Supabase", modifier = Modifier.padding(padding))
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun VendorDetailScreen(onBack: () -> Unit) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Vendor Details") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { padding ->
        Box(modifier = Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) { Text("Vendor Details") }
    }
}
