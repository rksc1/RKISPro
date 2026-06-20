package com.rkispro.marketplace.core.datastore

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "rkispro_prefs")

object PrefsKeys {
    val ACCESS_TOKEN = stringPreferencesKey("access_token")
    val REFRESH_TOKEN = stringPreferencesKey("refresh_token")
    val USER_ID = stringPreferencesKey("user_id")
    val USER_ROLE = stringPreferencesKey("user_role")
    val USER_NAME = stringPreferencesKey("user_name")
    val USER_EMAIL = stringPreferencesKey("user_email")
    val USER_ID_TABLE = stringPreferencesKey("user_id_table")
}

@Singleton
class UserPreferences @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val dataStore = context.dataStore

    val accessToken: Flow<String?> = dataStore.data.map { it[PrefsKeys.ACCESS_TOKEN] }
    val refreshToken: Flow<String?> = dataStore.data.map { it[PrefsKeys.REFRESH_TOKEN] }
    val userId: Flow<String?> = dataStore.data.map { it[PrefsKeys.USER_ID] }
    val userRole: Flow<String?> = dataStore.data.map { it[PrefsKeys.USER_ROLE] }
    val userName: Flow<String?> = dataStore.data.map { it[PrefsKeys.USER_NAME] }
    val userEmail: Flow<String?> = dataStore.data.map { it[PrefsKeys.USER_EMAIL] }
    val userIdTable: Flow<String?> = dataStore.data.map { it[PrefsKeys.USER_ID_TABLE] }

    val isLoggedIn: Flow<Boolean> = dataStore.data.map { prefs ->
        !prefs[PrefsKeys.ACCESS_TOKEN].isNullOrBlank() && !prefs[PrefsKeys.USER_ROLE].isNullOrBlank()
    }

    suspend fun saveAuthTokens(accessToken: String, refreshToken: String) {
        dataStore.edit { prefs ->
            prefs[PrefsKeys.ACCESS_TOKEN] = accessToken
            prefs[PrefsKeys.REFRESH_TOKEN] = refreshToken
        }
    }

    suspend fun saveUserInfo(
        userId: String,
        role: String,
        name: String,
        email: String,
        idTable: String
    ) {
        dataStore.edit { prefs ->
            prefs[PrefsKeys.USER_ID] = userId
            prefs[PrefsKeys.USER_ROLE] = role
            prefs[PrefsKeys.USER_NAME] = name
            prefs[PrefsKeys.USER_EMAIL] = email
            prefs[PrefsKeys.USER_ID_TABLE] = idTable
        }
    }

    suspend fun clearAll() {
        dataStore.edit { it.clear() }
    }
}
