package com.rkispro.marketplace

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class RkisProApp : Application() {

    override fun onCreate() {
        super.onCreate()
        createNotificationChannels()
    }

    private fun createNotificationChannels() {
        val notificationManager = getSystemService(NotificationManager::class.java)

        val channel = NotificationChannel(
            CHANNEL_ID,
            "RKISPro Notifications",
            NotificationManager.IMPORTANCE_HIGH
        ).apply {
            description = "Notifications for RFQs, projects, and bookings"
            enableVibration(true)
        }

        notificationManager.createNotificationChannel(channel)
    }

    companion object {
        const val CHANNEL_ID = "rkispro_notifications"
    }
}
