package com.rkispro.marketplace.core.util

object Constants {
    const val SUPABASE_URL = BuildConfig.SUPABASE_URL
    const val SUPABASE_ANON_KEY = BuildConfig.SUPABASE_ANON_KEY

    const val CUSTOMER_TABLE = "customers"
    const val VENDOR_TABLE = "vendors"
    const val ADMIN_TABLE = "admins"
    const val PROFILES_TABLE = "profiles"
    const val RFQ_TABLE = "marketplace_requests"
    const val VENDOR_NOTIFICATIONS_TABLE = "vendor_notifications"
    const val VENDOR_QUOTES_TABLE = "vendor_quotes"
    const val PROJECTS_TABLE = "projects"
    const val MILESTONES_TABLE = "project_milestones"
    const val NOTIFICATIONS_TABLE = "notifications"
    const val QUICK_BOOKINGS_TABLE = "quick_bookings"
    const val ACTIVITY_LOGS_TABLE = "activity_logs"

    const val SERVICE_TYPES = arrayOf(
        "Welding", "Mechanic", "Repair", "Installer", "Maintenance",
        "CNC Machine Service", "Lathe Machine Service", "Electrical",
        "Plumbing", "HVAC", "Compressor Service", "Pump & Motor Service",
        "Generator Service", "Breakdown Support", "Inspection",
        "Helper Manpower", "Carpentry", "Painting", "Fabrication",
        "Iron Work", "Steel Structure", "Pipe Fitting",
        "Industrial Cleaning", "Safety Equipment", "Calibration",
        "Laser Cutting", "Plasma Cutting"
    )

    const val URGENCY_LEVELS = arrayOf("normal", "urgent", "emergency")
}
