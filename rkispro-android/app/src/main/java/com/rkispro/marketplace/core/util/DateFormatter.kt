package com.rkispro.marketplace.core.util

import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone

object DateFormatter {
    private val displayFormat = SimpleDateFormat("dd MMM yyyy", Locale.ENGLISH)
    private val fullFormat = SimpleDateFormat("dd MMM yyyy, hh:mm a", Locale.ENGLISH)
    private val apiFormat = SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH)
    private val isoFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.ENGLISH).apply {
        timeZone = TimeZone.getTimeZone("UTC")
    }

    fun toDisplay(dateString: String?): String {
        if (dateString.isNullOrBlank()) return "N/A"
        return try {
            val date = isoFormat.parse(dateString)
                ?: apiFormat.parse(dateString)
            date?.let { displayFormat.format(it) } ?: dateString
        } catch (e: Exception) {
            dateString
        }
    }

    fun toFull(dateString: String?): String {
        if (dateString.isNullOrBlank()) return "N/A"
        return try {
            val date = isoFormat.parse(dateString)
                ?: apiFormat.parse(dateString)
            date?.let { fullFormat.format(it) } ?: dateString
        } catch (e: Exception) {
            dateString
        }
    }

    fun toApi(dateString: String): String {
        return try {
            val date = displayFormat.parse(dateString)
            date?.let { apiFormat.format(it) } ?: dateString
        } catch (e: Exception) {
            dateString
        }
    }
}
