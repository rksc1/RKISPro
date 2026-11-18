# RKISPro End-to-End Operational Manual & System Architecture Blueprint
**The Definitive Standard Operating Procedure (SOP) & Technical Specification**  
*Document Version: 2.4.0-PROD | Confidential & Proprietary | Operating Protocol 2026*

---

## Executive Summary & Core Value Proposition

RKISPro is a **Managed Industrial Manufacturing & Contractor Marketplace** designed to bridge the structural trust deficit in high-precision engineering, CNC fabrication, heavy plant maintenance, and turnkey fabrication across India’s industrial corridors.

Unlike legacy open B2B directories (e.g., IndiaMART, Justdial, TradeIndia) which operate as unfiltered "lead resale" engines—forcing procurement managers to sift through unverified brokers and unvetted job shops—**RKISPro takes end-to-end contractual and operational ownership of the physical supply chain**.

```
+----------------------------------------------------------------------------------------------------+
|                                    RKISPRO MANAGED PLATFORM ARCHITECTURE                           |
+----------------------------------------------------------------------------------------------------+
|  [ Industrial Buyer ]          [ Managed Operations & QA Engine ]        [ Tier-1 Vetted Shops ]   |
|   - RFQ Upload (STEP/CAD/PDF)  ->  - 3D DFM & Feasibility Scoring   ->   - Machine Bed Matching    |
|   - Milestone Escrow Deposit   ->  - 4-Gate Quality Assurance       ->   - Live Milestone Execution|
|   - Single Contract / GST Invc <-  - In-Situ CMM Metrology Reports  <-   - Guaranteed Escrow Payout|
+----------------------------------------------------------------------------------------------------+
```

### What We Promise & What We Deliver

| Dimension | Legacy Open B2B Directory | Traditional Direct Procurement | RKISPro Managed Marketplace |
| :--- | :--- | :--- | :--- |
| **Vendor Vetting** | Self-reported directory listings; no physical verification. | Manual factory visits by internal procurement team. | **Mandatory 40-Point In-Person Physical Shop Audit** covering machine run-out, spindle power, calibration, & NABL traceability. |
| **Pricing & Quotations** | Unstandardized bids, hidden freight, volatile surcharges. | Extended multi-week email negotiations. | **Standardized Line-Item BOM Quotes** with itemized raw material, machining hours, heat-treatment, surface plating, and logistics. |
| **Quality Liability** | Zero platform liability. Platform takes no responsibility. | Buyer bears risk; expensive legal recourse for rejects. | **Contractual 100% Quality Guarantee** backed by 4-Gate metrology; uninspected parts never leave the shop floor. |
| **Financial Security** | Direct advance wire transfers (high counterparty risk). | 30-90 day credit lines; high payment default risk for MSMEs. | **RBI-Compliant Dual-Party Milestone Escrow**; funds secured upfront, released strictly upon verified inspection certificates. |
| **Emergency Response** | No support. | Dependent on internal maintenance crews. | **< 4-Hour Rapid On-Site Breakdown Dispatch** with qualified millwrights, welders, and precision mechanics. |

---

## 1. User & Buyer Lifecycle: Registration to RFQ Award

### 1.1 Enterprise User Onboarding & Identity Verification
1. **User Sign-Up & Multi-Tenant RBAC**:
   - Access via web portal (`/customer/register`) or corporate Single Sign-On (SSO / SAML 2.0 / Google OAuth).
   - Identity verification captures:
     - Company Legal Entity Name & CIN (Corporate Identification Number).
     - GSTIN (Goods and Services Tax Identification Number) validated in real time via the GSTN Public API.
     - PAN (Permanent Account Number) cross-check.
     - Authorized Procurement Officer designation with Work Email Domain verification (disallowing generic `@gmail.com` accounts for credit accounts).
2. **Access Tiering & Permissions**:
   - `Procurement Buyer`: Creates RFQs, views quotes, triggers escrow funding.
   - `Engineering Approver`: Evaluates DFM analysis, signs off on design revisions, approves dimensional waivers.
   - `Finance Controller`: Manages GST credit notes, releases escrow tranches, accesses CBIC-compliant tax invoices.

### 1.2 Structured RFQ Creation & Multi-Format Ingestion
To eliminate ambiguous technical specifications, RKISPro enforces an engineering-grade RFQ submission workflow:
1. **Digital CAD & Drawing Ingestion**:
   - 3D CAD Models: `.STEP`, `.STP`, `.IGES`, `.SLDPRT`, `.IPT`.
   - 2D Manufacturing Prints: Vector `.PDF`, `.DXF`, `.DWG` containing Geometric Dimensioning and Tolerancing (GD&T) per ASME Y14.5 or ISO 1101.
2. **Technical Parameters Specification**:
   - **Material Grade**: Specific alloy designation (e.g., SS316L, AISI 4140, Al 6061-T6, Inconel 718, EN24T).
   - **Quantity & Batching**: Prototype (1–10 pcs), Low-Volume Pilot (10–100 pcs), Full Production Run (> 500 pcs/month).
   - **Dimensional Criticality**: General tolerance class (ISO 2768-m, ISO 2768-f, or custom micro-tolerances down to $\pm 5\,\mu\text{m}$).
   - **Surface & Heat Treatment**: Case hardening (HRC 58–62), Hard Anodizing (Type III, $50\,\mu\text{m}$), Blackodizing, Electropolishing, or Thermal Spray Coating.
   - **Testing Protocol**: Radiographic Testing (RT Level II), Ultrasonic Testing (UT), Die Penetrant (DPT), Hydrostatic Pressure Testing.

### 1.3 Automated DFM (Design for Manufacturability) & Triage Engine
Before any machine shop views the RFQ, the file undergoes automated and platform-engineer triage:
- **Geometry Feature Extraction**:
  - Detection of deep pockets exceeding standard end-mill aspect ratios ($L/D > 8$).
  - Identification of razor-sharp internal corners requiring wire EDM or corner relief undercuts.
  - Wall thickness validation against alloy deformation thresholds (e.g., $< 1.2\,\text{mm}$ in Al 6061).
- **Engineering Feasibility Review**:
  - An internal RKISPro Metrology & Manufacturing Engineer verifies thread pitch tolerances, datum reference frames, and raw material mill availability within 4 business hours.
  - If modifications are necessary, an annotated DFM Redline Report is shared with the buyer for one-click revision approval.

---

## 2. Vendor Partner & Machine Shop Network Architecture

### 2.1 Rigorous 40-Point Machine Shop Vetting & Onboarding
Less than 18% of applying facilities pass the RKISPro Quality Audit. The onboarding process includes:
1. **Physical Facility Inspection**:
   - Certified Quality Engineers conduct an in-person shop-floor audit.
   - Verification of machine runout, spindle vibration, backlash on 3-axis / 4-axis / 5-axis CNCs, and bed flatness.
   - Inspection of metrology equipment calibration certificates (traceable to NABL / National Physical Laboratory).
   - Inspection of climate-controlled metrology labs ($20^\circ\text{C} \pm 2^\circ\text{C}$) for sub-10 micron inspection.
2. **Legal & Compliance Due Diligence**:
   - Verification of active GSTIN, MSME Udyam Registration, Factory License, and Pollution Control Board (PCB) consent certificates.
   - Financial solvency assessment and electrical sanctioned load check (ensuring uninterrupted captive generator backup for critical runs).
3. **Machine Profiling & Digital Twin Cataloging**:
   - Every vetted shop is indexed by:
     - Machine Bed Dimensions ($X, Y, Z$ travel in mm).
     - Maximum spindle RPM and torque rating.
     - Tool magazine capacity (ATC) and live tooling availability.
     - Special capabilities: Turn-Mill, Wire EDM, 5-Axis Simultaneous, Submerged Arc Welding (SAW), CMM probe models.

### 2.2 Smart RFQ Allocation & Blind Quoting Algorithm
1. **Targeted Opportunity Routing**:
   - RFQs are **not** broadcast publicly to the open internet.
   - The platform routing engine filters the top 3 to 5 shops matching the exact alloy, bed size, tolerance class, and live machine capacity.
2. **Standardized Quoting Breakdown**:
   - Vendors must quote using RKISPro’s structured cost matrix:
     - Raw Material Cost (per kg based on active metal index).
     - Machine Cycle Time & Hourly Spindle Rate.
     - Tooling & Fixture Amortization.
     - Secondary Operations (Heat treatment, grinding, plating).
     - In-House Metrology & Packaging.
3. **Algorithmic Anomaly Detection**:
   - Quotes that deviate by more than $\pm 25\%$ from RKISPro’s internal cost estimation model trigger a mandatory review to prevent unrealistic low-balling or price gouging.

---

## 3. Quoting Comparison, Commercial Award & Escrow Ingestion

### 3.1 Transparent Apple-to-Apple Buyer Dashboard
The buyer receives 3 curated, fully comparable quotes with clear risk scores:
- **Option A (Speed Optimized)**: Fastest lead time, priority spindle allocation.
- **Option B (Cost Optimized)**: Maximum economies of scale for bulk production.
- **Option C (Proximity / Regional)**: Local delivery within 50 km for immediate in-plant support.

### 3.2 Binding Commercial Work Order & Contract Generation
- Upon buyer selection, the platform auto-generates a tripartite Master Services Agreement (MSA) and Purchase Order (PO).
- Strict non-disclosure agreements (NDAs) and intellectual property protection covenants are executed digitally.
- Mutual non-circumvention clauses enforce platform exclusivity for 24 months.

### 3.3 Milestone Escrow Deposit (RBI Nodal Account Compliance)
To protect both parties, direct advance payments to vendors are strictly prohibited:
```
+----------------------------------------------------------------------------------------------------+
|                                    MILESTONE ESCROW TRANSACTION FLOW                               |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [ Customer / Buyer ]                                                                              |
|         │                                                                                          |
|         │ 1. 100% Milestone Funds Transferred (NEFT / RTGS / Corporate Escrow API)                  |
|         ▼                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────┐                              |
|  │          RKISPro RBI-Regulated Nodal Escrow Account               │                              |
|  │          (Zero Counterparty Risk - Held in Trust)                │                              |
|  └──────────────────┬───────────────────────┬───────────────────────┘                              |
|                     │                       │                                                      |
|   Tranche 1 (30%)   │     Tranche 2 (40%)   │     Tranche 3 (30%)                                  |
|   Raw Material MTC  │     Machining & CMM   │     Final Dispatch &                                 |
|   Verified Gate 1   │     Verified Gate 2   │     Client Gate Inwarding                            |
|         │           │                       │                                                      |
|         ▼           ▼                       ▼                                                      |
|  ┌──────────────────────────────────────────────────────────────────┐                              |
|  │              Vendor / Precision Machine Shop Payout              │                              |
|  └──────────────────────────────────────────────────────────────────┘                              |
+----------------------------------------------------------------------------------------------------+
```
1. **Buyer Deposit**: The buyer funds the agreed contract value into the secure RKISPro Escrow Account.
2. **Escrow Lock**: Funds are locked and visible to the vendor, guaranteeing full liquidity upon successful delivery.
3. **Working Capital Protection**: Vendors never have to chase receivables or face 90-day overdue commercial debts.

---

## 4. End-to-End Manufacturing Execution & 4-Gate Quality Assurance

RKISPro’s core differentiator is its **4-Gate Metrology Protocol**. No part moves to the next manufacturing stage without a digitally signed inspection report uploaded to the platform.

### Gate 1: Raw Material Verification & Optical Emission Spectrometry (OES)
- **Objective**: Ensure that spurious, scrap-melt, or counterfeit raw materials never enter the CNC machine.
- **Procedure**:
  - The vendor submits the original NABL-accredited Mill Test Certificate (MTC) with corresponding heat and heat-treatment lot numbers.
  - RKISPro Quality Field Engineers or accredited partner labs perform Positive Material Identification (PMI) / X-Ray Fluorescence (XRF) spectrometry to verify chemical composition (Cr, Ni, Mo, C, P, S).
- **Milestone Trigger**: Upon Gate 1 sign-off, **Tranche 1 (30% Material Advance)** is disbursed to the vendor to cover raw stock procurement.

### Gate 2: First Article Inspection (FAI) & CMM Metrology
- **Objective**: Validate machine tool pathing, fixture rigidity, and dimensional repeatability before commencing full-batch production.
- **Procedure**:
  - The first 3 completed units are placed on a 3-axis CNC Coordinate Measuring Machine (CMM) or probed with high-precision digital height gauges ($0.001\,\text{mm}$ resolution).
  - Inspection of critical GD&T features: True Position ($\varnothing \pm 0.015\,\text{mm}$), Cylindricity, Perpendicularity, and Concentricity.
  - Surface roughness measured with contact profilometers ($R_a \le 0.8\,\mu\text{m}$ for ground sealing faces).
- **Milestone Trigger**: Upon platform engineer approval of the FAI report, the shop floor receives authorization for serial production run.

### Gate 3: In-Process NDT & Structural Integrity Testing
- **Objective**: Verify metallurgical soundness in welded, fabricated, or pressure-retaining components.
- **Procedure**:
  - **Dye Penetrant Inspection (DPI / PT)** for surface-breaking cracks on weld seams per ASME Section IX.
  - **Magnetic Particle Testing (MPT)** for ferromagnetic structural welds.
  - **Ultrasonic Testing (UT)** for subsurface laminations or inclusions in thick plates (> $25\,\text{mm}$).
  - **Hydrostatic / Pneumatic Pressure Testing**: Pressurized to $1.5\times$ design pressure for 30 minutes with calibrated digital chart recording.
- **Milestone Trigger**: **Tranche 2 (40% Machining & Processing Disbursement)** is released from escrow.

### Gate 4: Surface Treatment, Packaging & Digital Dispatch Gate Pass
- **Objective**: Prevent transit corrosion, ensure coating thickness compliance, and verify final packaging standards.
- **Procedure**:
  - Dry Film Thickness (DFT) testing of epoxy/polyurethane coatings using magnetic eddy-current gauges.
  - Degreasing, VCI (Vapor Corrosion Inhibitor) oil spray, protective nylon mesh sleeving on threaded journals, and desiccated wooden crate packaging.
  - Final visual inspection, batch QR-coding, and platform issuance of the **Cryptographic Digital Dispatch Gate Pass**.
- **Logistics Integration**: Integrated transport booking via designated logistics partners; GPS tracking and e-Way Bill auto-generation.

---

## 5. Delivery, Inward Inspection & Final Financial Settlement

```
+----------------------------------------------------------------------------------------------------+
|                                    DELIVERY & SETTLEMENT LIFECYCLE                                 |
+----------------------------------------------------------------------------------------------------+
|  Vendor Dispatches  ──>  Real-Time Transit Tracking  ──>  Client Site Inward  ──>  Release Tranche 3
|  with Gate Pass          (GPS & LR Number)                (48-Hour Inspection)     (30% Final)
|        │                                                        │                       │
|        ▼                                                        ▼                       ▼
|  e-Way Bill + MTC                                      Sign Physical POD /         CBIC E-Invoice
|  uploaded to portal                                    Digital Acceptance          Vendor Payout
+----------------------------------------------------------------------------------------------------+
```

### 5.1 In-Transit Visibility & e-Way Bill Documentation
- Every shipment is paired with:
  - Form GST EWB-01 (e-Way Bill) linked directly to the commercial invoice.
  - Transporter Lorry Receipt (LR) tracking number.
  - Pre-dispatch photographic evidence of crating and load strapping.

### 5.2 Buyer Inwarding & 48-Hour Acceptance Window
- Upon delivery at the buyer’s plant or warehouse:
  - Buyer signs the physical Proof of Delivery (POD).
  - Buyer has a contractual **48-hour acceptance window** to perform receiving inspection against the pre-cleared CMM Metrology Report.
  - If no dimensional discrepancy is flagged within 48 hours, the system executes an automated acceptance handshake.

### 5.3 Final Escrow Settlement & Taxation Compliance
1. **Final Escrow Release**:
   - The platform releases **Tranche 3 (Final 30%)** directly to the vendor’s verified bank account via automated RTGS/IMPS.
2. **Platform Commission Deduction**:
   - RKISPro deducts its agreed platform service margin ($5\%\text{--}12\%$ depending on project tier and metrology intensity) as net facilitation revenue.
3. **Statutory Tax Invoicing (CBIC Compliance)**:
   - Automated generation of GST E-Invoices with valid IRN (Invoice Reference Number) and QR codes.
   - Classification under appropriate HSN/SAC codes:
     - **SAC 9988**: Job work and manufacturing processing services.
     - **HSN 84 / 73**: Fabricated equipment and structural steel assemblies.
   - TDS deduction certificates (Section 194C / 194Q) automatically reconciled and made available on the buyer and vendor tax dashboards.

---

## 6. Industrial Services & 4-Hour Emergency Breakdown Dispatch

Beyond precision parts manufacturing, RKISPro operates an on-demand **Industrial Emergency Breakdown & Plant Maintenance Service**:

### 6.1 Emergency Breakdown Protocols (< 4-Hour Response)
1. **Critical Alert Ingestion**:
   - Plant managers initiate an Emergency Breakdown Request via 24/7 hotline or one-click app button (`/services/emergency-breakdown`).
   - Incident categorization: Turbine / Boiler trip, Hydraulic cylinder failure, Conveyor gearbox seizure, High-pressure pipe burst.
2. **Rapid Mobilization Dispatch**:
   - Platform algorithms pinpoint the nearest vetted mobile rapid-response maintenance crew within a 50 km radius.
   - Crew dispatched equipped with portable welding inverters, thermal imaging cameras, alignment lasers, and emergency hydraulic pullers.
   - **Guaranteed on-site arrival within 4 hours** across major industrial clusters (Chakan, Sanand, Peenya, Manesar, Sriperumbudur, Jamshedpur).
3. **On-Site Execution & Root Cause Analysis (RCA)**:
   - Immediate triage, structural stabilization, and bypass execution to resume plant production lines.
   - Generation of a post-incident metallurgical Root Cause Analysis report with recommended preventive redesign.

---

## 7. Dispute Resolution, Warranty & Risk Safeguards

To maintain zero friction and ensure institutional buyer trust, RKISPro enforces strict dispute resolution protocols:

### 7.1 Non-Conformance & Rework Workflow (NCR)
1. In the event of a dimensional or hardness deviation identified during buyer receiving inspection:
   - An instant **Stop-Payment Hold** is placed on the remaining escrow tranche.
   - A platform Lead Metrology Auditor arrives on-site within 24 hours to conduct an independent verification of the gauge calibration and part dimensions.
2. **Remediation Pathways**:
   - **Case A (Salvageable Rework)**: The part is routed to a specialized grinding or wire EDM shop for precision correction at the vendor's sole expense.
   - **Case B (Scrap & Replacement)**: The vendor must re-manufacture the rejected batch at zero cost under an expedited 48-hour turn-around cycle.
   - **Case C (Full Escrow Refund)**: If the vendor fails to meet technical tolerances, the buyer’s escrow funds are refunded in full within 3 business days.

### 7.2 Warranty & Liability Indemnity
- All structural and precision parts delivered through RKISPro carry a standard **12-Month Mechanical Workmanship Warranty**.
- Comprehensive Commercial General Liability (CGL) coverage protects buyers against catastrophic failure caused by material defects or welding non-conformance.

---

## 8. Summary Table: Complete Step-by-Step Operating Workflow

| Step # | Process Stage | Responsible Stakeholder | Key Artifact / Deliverable | SLA / Timeline |
| :---: | :--- | :--- | :--- | :--- |
| **01** | **User Registration & KYC** | Buyer / Enterprise User | GSTIN & PAN API Verification; RBAC Profile | Instant (< 5 mins) |
| **02** | **RFQ & CAD Ingestion** | Buyer Procurement | STEP / PDF with GD&T & Material Specs | Buyer Defined |
| **03** | **DFM Feasibility & Redline** | RKISPro Engineering | DFM Review & Tolerancing Audit Report | 2 – 4 Hours |
| **04** | **Targeted Vendor Routing** | Platform Matching Engine | Dispatched to 3–5 Pre-Vetted Machine Shops | Instant |
| **05** | **Line-Item Quote Submission** | Vetted Machine Shops | Standardized BOM Cost Breakdown | 12 – 24 Hours |
| **06** | **Quote Award & Work Order** | Buyer Procurement | Tripartite PO & Non-Circumvention Contract | Buyer Decision |
| **07** | **Milestone Escrow Funding** | Buyer Finance | 100% Contract Value Locked in Escrow | Immediate on PO |
| **08** | **Gate 1: Raw Material QA** | RKISPro Inspector / Vendor | NABL MTC & OES Spectrometry Sign-off | Day 1–2 (Procurement)|
| **09** | **Tranche 1 Disbursement** | Escrow Controller | 30% Advance Released to Vendor | 2 Hours Post Gate 1 |
| **10** | **Gate 2: FAI & CMM Inspection** | Precision Machine Shop | 3-Axis CMM Dimensional Inspection Report | Mid-Cycle Run |
| **11** | **Gate 3: NDT & Hydro Testing**| Quality Specialist | DPI / UT / Hydro Chart Records | Completion of Fab |
| **12** | **Tranche 2 Disbursement** | Escrow Controller | 40% Machining Released to Vendor | 2 Hours Post Gate 3 |
| **13** | **Gate 4: Surface & Crate QA** | RKISPro Quality Engineer | DFT Coating Report, VCI Pack & Gate Pass | Final Packing Day |
| **14** | **GPS Transport Dispatch** | Logistics Carrier | e-Way Bill & Lorry Receipt (LR) Tracking | Same Day Dispatch |
| **15** | **Buyer Receiving Inward** | Client Plant Receiving | Physical Proof of Delivery (POD) | Transit Dependent |
| **16** | **48-Hour Acceptance Window** | Buyer Quality Inspector | Dimensional Sign-off or Auto-Handshake | 48 Hours Post POD |
| **17** | **Final Escrow Settlement** | Escrow & Tax Engine | Tranche 3 (30%) Released to Vendor | Immediate on Accept|
| **18** | **Tax Invoicing & TDS Filing** | Automated Billing System | CBIC GST E-Invoice (SAC 9988) + TDS 194C | Monthly Cycle |

---

*This operational blueprint governs all transactional, technical, and financial interactions conducted under the RKISPro Managed Marketplace ecosystem.*
