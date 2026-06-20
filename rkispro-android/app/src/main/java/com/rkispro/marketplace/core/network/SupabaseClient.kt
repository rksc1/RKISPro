package com.rkispro.marketplace.core.network

import com.rkispro.marketplace.core.util.Constants
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.gotrue.Auth
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.realtime.Realtime
import io.github.jan.supabase.functions.Functions
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SupabaseClientProvider @Inject constructor() {

    val client: SupabaseClient by lazy {
        createSupabaseClient(
            supabaseUrl = Constants.SUPABASE_URL,
            supabaseKey = Constants.SUPABASE_ANON_KEY
        ) {
            install(Auth) {
                // Use default JWT settings
            }
            install(Postgrest)
            install(Realtime)
            install(Functions)
        }
    }

    val auth get() = client.auth
    val postgrest get() = client.from("profiles") // placeholder, use specific tables
    val realtime get() = client.realtime
}
