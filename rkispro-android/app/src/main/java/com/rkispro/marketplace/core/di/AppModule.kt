package com.rkispro.marketplace.core.di

import android.content.Context
import com.rkispro.marketplace.core.auth.AuthManager
import com.rkispro.marketplace.core.datastore.UserPreferences
import com.rkispro.marketplace.core.network.SupabaseClientProvider
import com.rkispro.marketplace.data.repository.AuthRepository
import com.rkispro.marketplace.data.repository.NotificationRepository
import com.rkispro.marketplace.data.repository.QuickBookingRepository
import com.rkispro.marketplace.data.repository.RfqRepository
import com.rkispro.marketplace.data.repository.ProjectRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideSupabaseClientProvider(): SupabaseClientProvider {
        return SupabaseClientProvider()
    }

    @Provides
    @Singleton
    fun provideUserPreferences(
        @ApplicationContext context: Context
    ): UserPreferences {
        return UserPreferences(context)
    }

    @Provides
    @Singleton
    fun provideAuthManager(
        supabaseProvider: SupabaseClientProvider,
        userPreferences: UserPreferences
    ): AuthManager {
        return AuthManager(supabaseProvider, userPreferences)
    }

    @Provides
    @Singleton
    fun provideAuthRepository(authManager: AuthManager): AuthRepository {
        return AuthRepository(authManager)
    }

    @Provides
    @Singleton
    fun provideRfqRepository(
        supabaseProvider: SupabaseClientProvider,
        authManager: AuthManager
    ): RfqRepository {
        return RfqRepository(supabaseProvider, authManager)
    }

    @Provides
    @Singleton
    fun provideProjectRepository(
        supabaseProvider: SupabaseClientProvider,
        authManager: AuthManager
    ): ProjectRepository {
        return ProjectRepository(supabaseProvider, authManager)
    }

    @Provides
    @Singleton
    fun provideNotificationRepository(
        supabaseProvider: SupabaseClientProvider,
        authManager: AuthManager
    ): NotificationRepository {
        return NotificationRepository(supabaseProvider, authManager)
    }

    @Provides
    @Singleton
    fun provideQuickBookingRepository(
        supabaseProvider: SupabaseClientProvider,
        authManager: AuthManager
    ): QuickBookingRepository {
        return QuickBookingRepository(supabaseProvider, authManager)
    }
}
