# RKISPro Mobile App — API Contract & Integration Specification
**Version:** 1.0.0 | **Backend:** Next.js REST API + Supabase PostgreSQL + Realtime Channels  

---

## 1. Authentication & Session Management

### 1.1 Phone & WhatsApp OTP
- **`POST /api/auth/mobile/send-otp`**
  - **Payload:**
    ```json
    {
      "phone": "+919876543210",
      "channel": "whatsapp", // "whatsapp" | "sms"
      "purpose": "login" // "login" | "register"
    }
    ```
  - **Response (200):**
    ```json
    {
      "success": true,
      "otpSessionId": "sess_otp_9a8b7c6d",
      "expiresInSeconds": 300
    }
    ```

- **`POST /api/auth/mobile/verify-otp`**
  - **Payload:**
    ```json
    {
      "otpSessionId": "sess_otp_9a8b7c6d",
      "otpCode": "582910",
      "fcmToken": "fcm_token_device_abc123"
    }
    ```
  - **Response (200):**
    ```json
    {
      "success": true,
      "accessToken": "jwt_token_here",
      "refreshToken": "refresh_token_here",
      "user": {
        "id": "usr_10293",
        "name": "Suresh Fabrications",
        "phone": "+919876543210",
        "activeRole": "vendor", // "customer" | "vendor" | "admin"
        "availableRoles": ["customer", "vendor"]
      }
    }
    ```

- **`POST /api/auth/mobile/switch-role`**
  - **Payload:** `{ "targetRole": "customer" }`
  - **Response (200):** `{ "success": true, "activeRole": "customer" }`

---

## 2. Push Notification & Device Token

- **`POST /api/notifications/register-device`**
  - **Payload:**
    ```json
    {
      "fcmToken": "eX_910...",
      "platform": "android", // "ios" | "android"
      "deviceModel": "OnePlus 11 5G",
      "appVersion": "1.0.0"
    }
    ```

---

## 3. Customer RFQ & Job Creation (Mobile-Optimized)

- **`POST /api/customer/rfqs/create`** (Multipart / Form-Data)
  - **Fields:**
    - `title`: string (e.g., *"Custom SS 304 Stair Railing - 45 Rft"*)
    - `category`: string (e.g., `"railing"`)
    - `material`: string (e.g., `"SS 304"`)
    - `dimensions`: JSON string (e.g., `{"length": 45, "unit": "rft"}`)
    - `targetPincode`: string (e.g., `"411026"`)
    - `budgetEstimate`: number (optional)
    - `voiceNote`: File (audio/m4a or audio/aac)
    - `sketches`: File[] (images/jpg/png)
    - `cadFile`: File (.step, .stl, .pdf)
  - **Response (201):**
    ```json
    {
      "rfqId": "rfq_8291",
      "status": "broadcasted",
      "matchingVendorsNotified": 18,
      "voiceNoteUrl": "https://res.cloudinary.com/.../voice_8291.m4a",
      "sketchUrls": ["https://res.cloudinary.com/.../sketch1.webp"]
    }
    ```

---

## 4. Vendor Quotation & Milestone Endpoints

- **`GET /api/vendor/rfqs/radar?lat=18.62&lng=73.81&radiusKm=25`**
  - **Response (200):**
    ```json
    {
      "rfqs": [
        {
          "id": "rfq_8291",
          "title": "Main Sliding Gate (12x7 ft) - Mild Steel",
          "distanceKm": 4.8,
          "category": "gate",
          "material": "Mild Steel (IS 2062)",
          "postedAt": "2026-11-23T14:10:00Z",
          "expiresAt": "2026-11-24T18:00:00Z",
          "sketchThumbnails": ["https://.../thumb1.webp"],
          "hasVoiceBrief": true
        }
      ]
    }
    ```

- **`POST /api/vendor/quotes/submit`**
  - **Payload:**
    ```json
    {
      "rfqId": "rfq_8291",
      "baseAmount": 42000,
      "transportAmount": 2500,
      "gstAmount": 8010,
      "totalAmount": 52510,
      "estimatedDays": 6,
      "materialSpec": "Tata Structura MS Hollow Tubes 50x50x2mm",
      "milestoneStages": [
        { "stage": 1, "name": "Raw Material Inward & Inspection", "percentage": 30 },
        { "stage": 2, "name": "Fitting & Full Welding", "percentage": 30 },
        { "stage": 3, "name": "Zinc Primer & Surface Prep", "percentage": 20 },
        { "stage": 4, "name": "Dispatch & Site Delivery", "percentage": 20 }
      ]
    }
    ```

---

## 5. Milestone Live Camera Tracker & Offline Sync

- **`POST /api/vendor/projects/{projectId}/milestone/{milestoneId}/verify`**
  - **Headers:** `Authorization: Bearer <token>`
  - **Payload (Multipart):**
    - `stageNumber`: 1
    - `photos`: File[] (Watermarked client-side WebP images)
    - `videoClip`: File (optional H.265 10-second inspection video)
    - `mtcDocument`: File (MTC scan / photo)
    - `gpsLatitude`: 18.6291
    - `gpsLongitude`: 73.8122
    - `timestampLocal`: "2026-11-23T15:30:12+05:30"
    - `vendorNotes`: "Plates arrived from Jindal Steel distributor. MTC heat number verified."
  - **Response (200):**
    ```json
    {
      "success": true,
      "milestoneStatus": "submitted_for_approval",
      "notifiedBuyer": true
    }
    ```

- **`POST /api/customer/projects/{projectId}/milestone/{milestoneId}/approve`**
  - Releases the held milestone funds from Escrow to the fabricator's wallet.

---

## 6. Digital Delivery Challan & Fingertip E-Sign

- **`POST /api/projects/{projectId}/delivery/e-sign`**
  - **Payload:**
    ```json
    {
      "receiverName": "Vikram Singh (Site Supervisor)",
      "receiverPhone": "+919811223344",
      "signatureDataUrl": "data:image/png;base64,iVBORw0KGgo...",
      "gpsLat": 18.5204,
      "gpsLng": 73.8567,
      "deliveryRemarks": "All 4 gate panels received in good condition with primary primer."
    }
    ```
  - **Response (200):**
    ```json
    {
      "success": true,
      "deliveryChallanPdfUrl": "https://.../challan_8291.pdf",
      "finalMilestoneUnlocked": true
    }
    ```

---

## 7. Realtime WebSockets & Push Events

The app connects to **Supabase Realtime Channels**:
- `project:chat:{projectId}`: Instant messaging, voice note delivery, and drawing markup events.
- `vendor:leads:{clusterId}`: Broadcasts new nearby RFQs with sound chime.
- `customer:milestones:{projectId}`: Realtime stage progression alerts with camera photo cards.
