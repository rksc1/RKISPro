package com.rkispro.marketplace.presentation.admin.rfq

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.rkispro.marketplace.presentation.shared.components.EmptyState

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RfqManagementScreen(onBack: () -> Unit) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("RFQ Management") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { padding ->
        EmptyState(message = "RFQ management will load from Supabase", modifier = Modifier.padding(padding))
    }
}
