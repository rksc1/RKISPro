package com.rkispro.marketplace.presentation.admin.quotes

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
fun QuoteReviewScreen(onBack: () -> Unit) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Quote Review") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back") } }) }
    ) { padding ->
        EmptyState(message = "Quote review will load from Supabase", modifier = Modifier.padding(padding))
    }
}
