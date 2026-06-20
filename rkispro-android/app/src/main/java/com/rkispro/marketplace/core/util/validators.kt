package com.rkispro.marketplace.core.util

object Validators {
    fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }

    fun isValidPhone(phone: String): Boolean {
        return phone.length in 10..15 && phone.all { it.isDigit() || it == '+' || it == '-' || it == ' ' }
    }

    fun isValidPassword(password: String): Boolean {
        return password.length >= 6
    }

    fun passwordsMatch(password: String, confirm: String): Boolean {
        return password == confirm
    }

    fun isNotEmpty(vararg fields: String): Boolean {
        return fields.all { it.isNotBlank() }
    }
}
