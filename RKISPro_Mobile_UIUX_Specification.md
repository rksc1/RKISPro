# RKISPro Mobile App — UI/UX Design System & Screen Specifications
**Brand Colors:** Navy `#0B3968` | Teal `#118781` | Dark Surface `#06101E` | Accent Gold `#F59E0B`  
**Typography:** Plus Jakarta Sans (Headings/Branding) | Inter (Data/Readout/Inputs)  

---

## 1. Visual Design Tokens & Palette

| Token Name | Hex Code | Usage on Mobile |
| :--- | :--- | :--- |
| **Brand Navy (Primary)** | `#0B3968` | Headers, active tabs, buttons, card borders, primary brand accents |
| **Industrial Teal (Action)** | `#118781` | Primary CTA buttons, verified badges, active milestone stages, camera HUD |
| **Teal Vibrant (Highlight)** | `#14B8A6` | Micro-interactions, audio voice-note equalizer, live pulse rings |
| **Surface Dark (Canvas)** | `#06101E` | App background in dark mode, modal overlays, camera shutter background |
| **Card Slate** | `#0E1E2F` | Elevated cards, RFQ tiles, vendor profile panels |
| **Escrow Gold** | `#F59E0B` | Escrow locked status, milestone advance alert, pending buyer approval |
| **Success Emerald** | `#10B981` | Milestone released, payment cleared, QA inspection passed |
| **Danger Crimson** | `#EF4444` | Dimension rejected, quote expired, cancellation |

---

## 2. Core Screen Wireframes & UX Walkthroughs

### Screen 1: Dual-Mode Industrial Home
- **Top Bar:** 
  - Left: RKISPro Logo Mark (`512x512` geometric icon).
  - Center: Industrial Cluster Chip (e.g., `📍 Bhosari MIDC, Pune ▾`).
  - Right: Dual-Mode Switcher Pill:
    `[ 👷 Buying  |  🏭 Fabricating ]` (1-tap animated toggle with haptic feedback).
- **Hero Card (Buyer Mode):**
  - Instant RFQ Prompt: *"Need Metal Fabrication Today?"*
  - 3 Action Buttons: `[ 📷 Snap Sketch ]`, `[ 🎙️ Voice Brief ]`, `[ 📐 Cost Estimator ]`.
- **Live Metal Ticker:** Real-time benchmark market rates:
  `MS Plate: ₹54/kg (+0.8%) • SS 304: ₹198/kg • Al 6061: ₹245/kg`.

---

### Screen 2: Camera & Voice RFQ Studio
- **Top Half:** Camera Viewfinder with grid lines and level indicator (helps site managers take flat overhead photos of notebook sketches).
- **Middle Section:** Quick-select metal category chips:
  `[ Main Gate ] [ Balcony Railing ] [ Roof Shed ] [ Machine Frame ] [ Tank / Hopper ]`.
- **Bottom Controls:**
  - Hold-to-Record Mic Button: Records up to 90 seconds of audio with live animated soundwave equalizer.
  - Option to attach PDF / CAD from device.
  - Sticky Bottom CTA: `Post RFQ to Audited Workshops (Free) →`.

---

### Screen 3: Vendor Job Radar (Fabricator Mode)
- **Top Metric Bar:** `Jobs Today: 14 | Submitted: 3 | Orders Active: 2`.
- **Radar Feed:** Card-based job cards sorted by distance:
  ```
  ┌──────────────────────────────────────────────────────────┐
  │ ⚡ NEW RFQ • 3.2 km away (Chakan Industrial Phase 2)     │
  │ Machine Enclosure & Base Frame (Mild Steel)              │
  │ Est. Weight: 850 kg • Process: Laser Cut + MIG Weld      │
  │ [📷 2 Sketches Attached]  [🎙️ 35s Voice Note]           │
  │ Closes in: 04h : 22m                                     │
  │                                                          │
  │ [ 1-Tap Quote Builder ]         [ Ask Question in Chat ] │
  └──────────────────────────────────────────────────────────┘
  ```

---

### Screen 4: Live Milestone Camera Studio (Shop Floor)
- Custom Camera Interface with Watermark HUD:
  - Top Left: `Job #WO-4912 • Milestone 2: Fitting & Welding`
  - Bottom Banner (Hardcoded into pixels):
    `📅 23-Nov-2026 15:42 IST | 📍 18.629°N, 73.812°E (MIDC Pune) | ✅ RKISPro Verified`
- Fabricator can take up to 6 high-resolution photos and a 10s video of the weld seams or plate thickness.
- If offline, a yellow badge displays: `Saved to Floor Queue. Will auto-sync when connected.`

---

### Screen 5: Escrow Milestone Wallet
- **Total Project Escrow Card:**
  - Progress Meter: `[ 30% Released ] ─────── [ 40% In Escrow ] ────── [ 30% Pending ]`
- **Breakdown of Stages:**
  - Stage 1: Raw Material Inward (30%) $\rightarrow$ `✅ Released on 18 Nov`
  - Stage 2: Welding & Assembly (30%) $\rightarrow$ `⏳ Pending Buyer Verification (Photos Uploaded)`
  - Stage 3: Powder Coating (20%) $\rightarrow$ `🔒 Locked in Escrow`
  - Stage 4: Site Delivery & E-Sign (20%) $\rightarrow$ `🔒 Locked in Escrow`

---

### Screen 6: Digital Delivery Challan (Site Receiver E-Sign)
- Displayed when goods arrive at customer premises:
  - Vehicle Number, Driver Contact, Itemized Quantity List.
- Digital Signature Canvas: Touch-enabled canvas for finger signature with clear and confirm buttons.
- On sign: Generates a tamper-proof PDF Challan sent simultaneously to both parties via WhatsApp and email.
