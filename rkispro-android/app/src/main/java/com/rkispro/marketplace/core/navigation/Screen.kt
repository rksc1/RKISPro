package com.rkispro.marketplace.core.navigation

sealed class Screen(val route: String) {
    // Auth
    data object Splash : Screen("splash")
    data object Login : Screen("login")
    data object Register : Screen("register")
    data object RoleSelection : Screen("role_selection")
    data object RegisterCustomer : Screen("register_customer")
    data object RegisterVendor : Screen("register_vendor")
    data object ForgotPassword : Screen("forgot_password")

    // Customer
    data object CustomerDashboard : Screen("customer_dashboard")
    data object CustomerCreateRfq : Screen("customer_create_rfq")
    data object CustomerRfqList : Screen("customer_rfq_list")
    data object CustomerRfqDetail : Screen("customer_rfq_detail/{rfqId}") {
        fun createRoute(rfqId: String) = "customer_rfq_detail/$rfqId"
    }
    data object CustomerQuickBooking : Screen("customer_quick_booking")
    data object CustomerBookingList : Screen("customer_booking_list")
    data object CustomerBookingDetail : Screen("customer_booking_detail/{bookingId}") {
        fun createRoute(bookingId: String) = "customer_booking_detail/$bookingId"
    }
    data object CustomerProjects : Screen("customer_projects")
    data object CustomerProjectDetail : Screen("customer_project_detail/{projectId}") {
        fun createRoute(projectId: String) = "customer_project_detail/$projectId"
    }

    // Vendor
    data object VendorDashboard : Screen("vendor_dashboard")
    data object VendorRfqList : Screen("vendor_rfq_list")
    data object VendorRfqDetail : Screen("vendor_rfq_detail/{notificationId}") {
        fun createRoute(notificationId: String) = "vendor_rfq_detail/$notificationId"
    }
    data object VendorSubmitQuote : Screen("vendor_submit_quote/{notificationId}") {
        fun createRoute(notificationId: String) = "vendor_submit_quote/$notificationId"
    }
    data object VendorProjects : Screen("vendor_projects")
    data object VendorProjectDetail : Screen("vendor_project_detail/{projectId}") {
        fun createRoute(projectId: String) = "vendor_project_detail/$projectId"
    }
    data object VendorBookings : Screen("vendor_bookings")
    data object VendorBookingDetail : Screen("vendor_booking_detail/{bookingId}") {
        fun createRoute(bookingId: String) = "vendor_booking_detail/$bookingId"
    }

    // Admin
    data object AdminDashboard : Screen("admin_dashboard")
    data object AdminVendors : Screen("admin_vendors")
    data object AdminVendorDetail : Screen("admin_vendor_detail/{vendorId}") {
        fun createRoute(vendorId: String) = "admin_vendor_detail/$vendorId"
    }
    data object AdminRfqs : Screen("admin_rfqs")
    data object AdminQuotes : Screen("admin_quotes")
    data object AdminProjects : Screen("admin_projects")
    data object AdminProjectDetail : Screen("admin_project_detail/{projectId}") {
        fun createRoute(projectId: String) = "admin_project_detail/$projectId"
    }
    data object AdminBookings : Screen("admin_bookings")

    // Shared
    data object Notifications : Screen("notifications")
    data object Profile : Screen("profile")
}
