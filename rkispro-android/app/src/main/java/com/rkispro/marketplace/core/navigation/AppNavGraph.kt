package com.rkispro.marketplace.core.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.collectAsState
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.rkispro.marketplace.presentation.auth.forgot.ForgotPasswordScreen
import com.rkispro.marketplace.presentation.auth.login.LoginScreen
import com.rkispro.marketplace.presentation.auth.login.LoginViewModel
import com.rkispro.marketplace.presentation.auth.register.RegisterCustomerScreen
import com.rkispro.marketplace.presentation.auth.register.RegisterVendorScreen
import com.rkispro.marketplace.presentation.auth.register.RoleSelectionScreen
import com.rkispro.marketplace.presentation.customer.dashboard.CustomerDashboardScreen
import com.rkispro.marketplace.presentation.customer.rfq.CreateRfqScreen
import com.rkispro.marketplace.presentation.customer.rfq.RfqDetailScreen
import com.rkispro.marketplace.presentation.customer.rfq.RfqListScreen
import com.rkispro.marketplace.presentation.customer.quickbooking.QuickBookingDetailScreen
import com.rkispro.marketplace.presentation.customer.quickbooking.QuickBookingListScreen
import com.rkispro.marketplace.presentation.customer.quickbooking.CreateQuickBookingScreen
import com.rkispro.marketplace.presentation.customer.projects.ProjectDetailScreen
import com.rkispro.marketplace.presentation.customer.projects.ProjectListScreen
import com.rkispro.marketplace.presentation.vendor.dashboard.VendorDashboardScreen
import com.rkispro.marketplace.presentation.vendor.rfq.VendorRfqDetailScreen
import com.rkispro.marketplace.presentation.vendor.rfq.VendorRfqListScreen
import com.rkispro.marketplace.presentation.vendor.rfq.SubmitQuoteScreen
import com.rkispro.marketplace.presentation.vendor.projects.VendorProjectListScreen
import com.rkispro.marketplace.presentation.vendor.quickbooking.VendorBookingListScreen
import com.rkispro.marketplace.presentation.admin.dashboard.AdminDashboardScreen
import com.rkispro.marketplace.presentation.admin.vendors.VendorListScreen
import com.rkispro.marketplace.presentation.admin.rfq.RfqManagementScreen
import com.rkispro.marketplace.presentation.admin.quotes.QuoteReviewScreen
import com.rkispro.marketplace.presentation.admin.projects.AdminProjectListScreen
import com.rkispro.marketplace.presentation.admin.quickbooking.AdminBookingListScreen
import com.rkispro.marketplace.presentation.shared.notifications.NotificationsScreen
import com.rkispro.marketplace.presentation.shared.profile.ProfileScreen

@Composable
fun AppNavGraph(
    navController: NavHostController = rememberNavController()
) {
    val loginViewModel: LoginViewModel = hiltViewModel()
    val isLoggedIn by loginViewModel.isLoggedIn.collectAsState()
    val userRole by loginViewModel.userRole.collectAsState()

    LaunchedEffect(isLoggedIn, userRole) {
        if (isLoggedIn && userRole != null) {
            val dashboardRoute = when (userRole) {
                "customer" -> Screen.CustomerDashboard.route
                "vendor" -> Screen.VendorDashboard.route
                "admin" -> Screen.AdminDashboard.route
                else -> Screen.Login.route
            }
            navController.navigate(dashboardRoute) {
                popUpTo(Screen.Login.route) { inclusive = true }
            }
        }
    }

    NavHost(
        navController = navController,
        startDestination = Screen.Login.route
    ) {
        // Auth
        composable(Screen.Login.route) {
            LoginScreen(
                onNavigateToRegister = { navController.navigate(Screen.RoleSelection.route) },
                onNavigateToForgotPassword = { navController.navigate(Screen.ForgotPassword.route) },
                onLoginSuccess = { role ->
                    val route = when (role) {
                        "customer" -> Screen.CustomerDashboard.route
                        "vendor" -> Screen.VendorDashboard.route
                        "admin" -> Screen.AdminDashboard.route
                        else -> Screen.Login.route
                    }
                    navController.navigate(route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                }
            )
        }

        composable(Screen.RoleSelection.route) {
            RoleSelectionScreen(
                onCustomerSelected = { navController.navigate(Screen.RegisterCustomer.route) },
                onVendorSelected = { navController.navigate(Screen.RegisterVendor.route) },
                onBack = { navController.popBackStack() }
            )
        }

        composable(Screen.RegisterCustomer.route) {
            RegisterCustomerScreen(
                onRegistrationSuccess = {
                    navController.navigate(Screen.Login.route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                },
                onBack = { navController.popBackStack() }
            )
        }

        composable(Screen.RegisterVendor.route) {
            RegisterVendorScreen(
                onRegistrationSuccess = {
                    navController.navigate(Screen.Login.route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                },
                onBack = { navController.popBackStack() }
            )
        }

        composable(Screen.ForgotPassword.route) {
            ForgotPasswordScreen(
                onBack = { navController.popBackStack() }
            )
        }

        // Customer
        composable(Screen.CustomerDashboard.route) {
            CustomerDashboardScreen(
                onCreateRfq = { navController.navigate(Screen.CustomerCreateRfq.route) },
                onViewRfqs = { navController.navigate(Screen.CustomerRfqList.route) },
                onQuickBooking = { navController.navigate(Screen.CustomerQuickBooking.route) },
                onViewProjects = { navController.navigate(Screen.CustomerProjects.route) },
                onNotifications = { navController.navigate(Screen.Notifications.route) },
                onProfile = { navController.navigate(Screen.Profile.route) }
            )
        }

        composable(Screen.CustomerCreateRfq.route) {
            CreateRfqScreen(
                onBack = { navController.popBackStack() },
                onSuccess = { navController.popBackStack() }
            )
        }

        composable(Screen.CustomerRfqList.route) {
            RfqListScreen(
                onBack = { navController.popBackStack() },
                onRfqClick = { rfqId -> navController.navigate(Screen.CustomerRfqDetail.createRoute(rfqId)) }
            )
        }

        composable(
            Screen.CustomerRfqDetail.route,
            arguments = listOf(navArgument("rfqId") { type = NavType.StringType })
        ) {
            RfqDetailScreen(
                onBack = { navController.popBackStack() }
            )
        }

        composable(Screen.CustomerQuickBooking.route) {
            CreateQuickBookingScreen(
                onBack = { navController.popBackStack() },
                onSuccess = { navController.popBackStack() }
            )
        }

        composable(Screen.CustomerBookingList.route) {
            QuickBookingListScreen(
                onBack = { navController.popBackStack() },
                onBookingClick = { bookingId ->
                    navController.navigate(Screen.CustomerBookingDetail.createRoute(bookingId))
                }
            )
        }

        composable(
            Screen.CustomerBookingDetail.route,
            arguments = listOf(navArgument("bookingId") { type = NavType.StringType })
        ) {
            QuickBookingDetailScreen(
                onBack = { navController.popBackStack() }
            )
        }

        composable(Screen.CustomerProjects.route) {
            ProjectListScreen(
                onBack = { navController.popBackStack() },
                onProjectClick = { projectId ->
                    navController.navigate(Screen.CustomerProjectDetail.createRoute(projectId))
                }
            )
        }

        composable(
            Screen.CustomerProjectDetail.route,
            arguments = listOf(navArgument("projectId") { type = NavType.StringType })
        ) {
            ProjectDetailScreen(
                onBack = { navController.popBackStack() }
            )
        }

        // Vendor
        composable(Screen.VendorDashboard.route) {
            VendorDashboardScreen(
                onViewRfqs = { navController.navigate(Screen.VendorRfqList.route) },
                onViewProjects = { navController.navigate(Screen.VendorProjects.route) },
                onViewBookings = { navController.navigate(Screen.VendorBookings.route) },
                onNotifications = { navController.navigate(Screen.Notifications.route) },
                onProfile = { navController.navigate(Screen.Profile.route) }
            )
        }

        composable(Screen.VendorRfqList.route) {
            VendorRfqListScreen(
                onBack = { navController.popBackStack() },
                onRfqClick = { notificationId ->
                    navController.navigate(Screen.VendorRfqDetail.createRoute(notificationId))
                }
            )
        }

        composable(
            Screen.VendorRfqDetail.route,
            arguments = listOf(navArgument("notificationId") { type = NavType.StringType })
        ) {
            VendorRfqDetailScreen(
                onBack = { navController.popBackStack() },
                onQuote = { notificationId ->
                    navController.navigate(Screen.VendorSubmitQuote.createRoute(notificationId))
                }
            )
        }

        composable(
            Screen.VendorSubmitQuote.route,
            arguments = listOf(navArgument("notificationId") { type = NavType.StringType })
        ) {
            SubmitQuoteScreen(
                onBack = { navController.popBackStack() },
                onSuccess = { navController.popBackStack() }
            )
        }

        composable(Screen.VendorProjects.route) {
            VendorProjectListScreen(
                onBack = { navController.popBackStack() },
                onProjectClick = { projectId ->
                    navController.navigate(Screen.VendorProjectDetail.createRoute(projectId))
                }
            )
        }

        composable(Screen.VendorBookings.route) {
            VendorBookingListScreen(
                onBack = { navController.popBackStack() },
                onBookingClick = { bookingId ->
                    navController.navigate(Screen.VendorBookingDetail.createRoute(bookingId))
                }
            )
        }

        // Admin
        composable(Screen.AdminDashboard.route) {
            AdminDashboardScreen(
                onVendors = { navController.navigate(Screen.AdminVendors.route) },
                onRfqs = { navController.navigate(Screen.AdminRfqs.route) },
                onQuotes = { navController.navigate(Screen.AdminQuotes.route) },
                onProjects = { navController.navigate(Screen.AdminProjects.route) },
                onBookings = { navController.navigate(Screen.AdminBookings.route) },
                onNotifications = { navController.navigate(Screen.Notifications.route) },
                onProfile = { navController.navigate(Screen.Profile.route) }
            )
        }

        composable(Screen.AdminVendors.route) {
            VendorListScreen(
                onBack = { navController.popBackStack() },
                onVendorClick = { vendorId ->
                    navController.navigate(Screen.AdminVendorDetail.createRoute(vendorId))
                }
            )
        }

        composable(Screen.AdminRfqs.route) {
            RfqManagementScreen(
                onBack = { navController.popBackStack() }
            )
        }

        composable(Screen.AdminQuotes.route) {
            QuoteReviewScreen(
                onBack = { navController.popBackStack() }
            )
        }

        composable(Screen.AdminProjects.route) {
            AdminProjectListScreen(
                onBack = { navController.popBackStack() },
                onProjectClick = { projectId ->
                    navController.navigate(Screen.AdminProjectDetail.createRoute(projectId))
                }
            )
        }

        composable(Screen.AdminBookings.route) {
            AdminBookingListScreen(
                onBack = { navController.popBackStack() }
            )
        }

        // Shared
        composable(Screen.Notifications.route) {
            NotificationsScreen(
                onBack = { navController.popBackStack() }
            )
        }

        composable(Screen.Profile.route) {
            ProfileScreen(
                onBack = { navController.popBackStack() },
                onLogout = {
                    navController.navigate(Screen.Login.route) {
                        popUpTo(0) { inclusive = true }
                    }
                }
            )
        }
    }
}
