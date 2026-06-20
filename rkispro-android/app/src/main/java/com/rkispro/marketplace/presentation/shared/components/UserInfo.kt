package com.rkispro.marketplace.presentation.shared.components

import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.platform.LocalContext
import com.rkispro.marketplace.core.datastore.UserPreferences
import com.rkispro.marketplace.core.datastore.PrefsKeys
import kotlinx.coroutines.flow.map

@Composable
fun rememberUserRole(): String {
    val context = LocalContext.current
    var role by remember { mutableStateOf("") }
    LaunchedEffect(Unit) {
        context.dataStore.data.map { it[PrefsKeys.USER_ROLE] ?: "" }.collect { role = it }
    }
    return role
}

@Composable
fun rememberUserName(): String {
    val context = LocalContext.current
    var name by remember { mutableStateOf("") }
    LaunchedEffect(Unit) {
        context.dataStore.data.map { it[PrefsKeys.USER_NAME] ?: "" }.collect { name = it }
    }
    return name
}

@Composable
fun rememberUserEmail(): String {
    val context = LocalContext.current
    var email by remember { mutableStateOf("") }
    LaunchedEffect(Unit) {
        context.dataStore.data.map { it[PrefsKeys.USER_EMAIL] ?: "" }.collect { email = it }
    }
    return email
}
