package com.rkispro.marketplace.presentation.shared.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.rkispro.marketplace.ui.theme.*

@Composable
fun StatusBadge(status: String, modifier: Modifier = Modifier) {
    val (backgroundColor, textColor) = when (status.lowercase()) {
        "pending" -> StatusPending.copy(alpha = 0.15f) to StatusPending
        "approved", "active", "awarded" -> StatusApproved.copy(alpha = 0.15f) to StatusApproved
        "rejected", "cancelled" -> StatusRejected.copy(alpha = 0.15f) to StatusRejected
        "in_progress", "distributed", "assigned" -> StatusInProgress.copy(alpha = 0.15f) to StatusInProgress
        "completed" -> StatusCompleted.copy(alpha = 0.15f) to StatusCompleted
        else -> Color.Gray.copy(alpha = 0.15f) to Color.Gray
    }

    Box(
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(backgroundColor)
            .padding(horizontal = 10.dp, vertical = 4.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = status.replace("_", " ").replaceFirstChar { it.uppercase() },
            style = MaterialTheme.typography.labelSmall,
            color = textColor
        )
    }
}

@Composable
fun UrgencyBadge(urgency: String, modifier: Modifier = Modifier) {
    val (backgroundColor, textColor) = when (urgency.lowercase()) {
        "normal" -> StatusApproved.copy(alpha = 0.15f) to StatusApproved
        "urgent" -> StatusPending.copy(alpha = 0.15f) to StatusPending
        "emergency" -> StatusRejected.copy(alpha = 0.15f) to StatusRejected
        else -> Color.Gray.copy(alpha = 0.15f) to Color.Gray
    }

    Box(
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(backgroundColor)
            .padding(horizontal = 10.dp, vertical = 4.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = urgency.replaceFirstChar { it.uppercase() },
            style = MaterialTheme.typography.labelSmall,
            color = textColor
        )
    }
}
