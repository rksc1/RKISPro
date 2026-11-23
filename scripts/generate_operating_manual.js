const fs = require('fs');
const path = require('path');
const { PDFEngine } = require('./pdf_engine');

// Instantiate PDF generator with exact Helvetica metrics
const pdf = new PDFEngine({
  headerTitle: 'RKISPRO MANAGED MANUFACTURING & FABRICATION MARKETPLACE',
  headerSubtitle: 'DUAL-TRACK OPERATIONAL STANDARD OPERATING PROCEDURE (SOP)',
  footerText: 'CONFIDENTIAL & PROPRIETARY  |  LEAN STARTUP DUAL-TRACK ARCHITECTURE 2026'
});

// ============================================================================
// PAGE 1: TITLE & COVER PAGE (Clean, Balanced & Non-Overlapping)
// ============================================================================
{
  const p = pdf.addPage({ skipHeaderFooter: true });
  // Deep Navy background
  pdf.rect(p, 0, 0, 595.28, 841.89, { fill: true, fillColor: '#0F172A' });

  // Top and bottom accent bars
  pdf.rect(p, 0, 0, 595.28, 10, { fill: true, fillColor: '#0D9488' });
  pdf.rect(p, 0, 831.89, 595.28, 10, { fill: true, fillColor: '#0D9488' });

  // Top Category Pill
  pdf.badge(p, 'OFFICIAL OPERATIONAL MANUAL & DUAL-TRACK SYSTEM BLUEPRINT', 50, 75, {
    bgColor: '#134E4A',
    textColor: '#2DD4BF',
    fontSize: 9,
    paddingX: 12,
    paddingY: 5
  });

  // Main Document Title
  pdf.text(p, 'RKISPRO', 50, 130, { font: 'F2', size: 36, color: '#FFFFFF' });
  pdf.text(p, 'MANAGED FABRICATION & MANUFACTURING MARKETPLACE', 50, 162, { font: 'F2', size: 16, color: '#2DD4BF' });
  pdf.text(p, 'The Dual-Track Operating Manual & Execution Blueprint', 50, 196, { font: 'F2', size: 20, color: '#F8FAFC' });
  pdf.text(p, 'From Local MSME Fabrication to Enterprise Precision Machining: The Capital-Light Architecture', 50, 222, { font: 'F3', size: 10.5, color: '#94A3B8' });

  // Divider Line
  pdf.line(p, 50, 245, 545.28, 245, { color: '#334155', lineWidth: 1.5 });

  // Mission Callout Card
  pdf.rect(p, 50, 265, 495.28, 110, { fill: true, stroke: true, fillColor: '#1E293B', strokeColor: '#0D9488', lineWidth: 1 });
  pdf.text(p, 'THE STRATEGIC REALITY & CAPITAL-LIGHT VALUE PROPOSITION', 70, 287, { font: 'F2', size: 9.5, color: '#2DD4BF' });
  pdf.text(p, 'RKISPro replaces unvetted B2B directories and disorganized local brokers with a managed, two-speed execution engine.', 70, 307, { font: 'F1', size: 9, color: '#E2E8F0' });
  pdf.text(p, 'Track A (Launch Phase) captures high-velocity local metal fabrication (gates, railings, sheds, racks, and bespoke items) via', 70, 323, { font: 'F1', size: 9, color: '#E2E8F0' });
  pdf.text(p, 'WhatsApp & sketches with 3-Gate QA and instant milestone security. Track B (Scale Phase) powers high-margin industrial runs,', 70, 339, { font: 'F1', size: 9, color: '#E2E8F0' });
  pdf.text(p, 'CNC machining, and plant overhauls with 4-Gate metrology and RBI nodal escrow. Profitable from Day 1 with zero balance-sheet risk.', 70, 355, { font: 'F1', size: 9, color: '#E2E8F0' });

  // 4 Pillar Pillars Box
  const colWidth = 118;
  const pillars = [
    { title: 'Dual-Tier Vetting', sub: 'Local welding workshops & audited CNC machine shops', col: '#38BDF8' },
    { title: 'Accessible Intake', sub: 'Hand sketches, WhatsApp & 3D CAD parametric DFM', col: '#2DD4BF' },
    { title: 'Milestone Escrow', sub: 'UPI/QR 40/40/20 & corporate RBI nodal account tranches', col: '#FBBF24' },
    { title: 'Pragmatic Quality', sub: '3-Gate Fabrication QA & 4-Gate CMM/NDT Metrology', col: '#F87171' }
  ];

  pillars.forEach((item, idx) => {
    const x = 50 + idx * (colWidth + 7.7);
    pdf.rect(p, x, 395, colWidth, 75, { fill: true, stroke: true, fillColor: '#1E293B', strokeColor: '#334155' });
    pdf.rect(p, x, 395, colWidth, 4, { fill: true, fillColor: item.col });
    pdf.text(p, item.title, x + 8, 418, { font: 'F2', size: 9, color: '#FFFFFF' });
    pdf.text(p, item.sub, x + 8, 436, { font: 'F1', size: 7.5, color: '#94A3B8', maxWidth: colWidth - 16 });
  });

  // Metadata Panel
  pdf.rect(p, 50, 495, 495.28, 255, { fill: true, stroke: true, fillColor: '#090D16', strokeColor: '#1E293B' });
  pdf.text(p, 'SYSTEM SPECIFICATIONS & DOCUMENT CONTROL', 70, 520, { font: 'F2', size: 10, color: '#38BDF8' });
  pdf.line(p, 70, 532, 525.28, 532, { color: '#1E293B', lineWidth: 0.75 });

  const metaRows = [
    { label: 'Document Reference:', val: 'RKISPRO-SOP-DUALTRACK-2026-V3.0', rightLabel: 'Classification:', rightVal: 'CONFIDENTIAL / OPERATIONAL' },
    { label: 'Operating Architecture:', val: 'Dual-Track Hybrid Model (Local Fab + Industrial Machining)', rightLabel: 'Target Ecosystem:', rightVal: 'B2C, MSME & Industrial B2B' },
    { label: 'Regulatory Framework:', val: 'MSME Udyam / CBIC GST SAC 9988 & HSN 7308 / RBI Nodal Escrow', rightLabel: '', rightVal: '' },
    { label: 'Quality Framework:', val: '3-Gate Local Fabrication QA + 4-Gate Industrial NABL/CMM Metrology', rightLabel: '', rightVal: '' },
    { label: 'Intake Capability:', val: 'Paper Sketches, Mobile Photos, WhatsApp Audio, 2D DWG, 3D STEP', rightLabel: '', rightVal: '' },
    { label: 'Operational Corridors:', val: 'Phase 1 Hub: Bilaspur & Chhattisgarh | Phase 2 Expansion: National Industrial Corridors', rightLabel: '', rightVal: '' }
  ];

  metaRows.forEach((row, idx) => {
    const yPos = 550 + idx * 32;
    pdf.text(p, row.label, 70, yPos, { font: 'F2', size: 8, color: '#94A3B8' });
    pdf.text(p, row.val, 175, yPos, { font: 'F1', size: 8, color: '#F8FAFC' });
    if (row.rightLabel) {
      pdf.text(p, row.rightLabel, 360, yPos, { font: 'F2', size: 8, color: '#94A3B8' });
      pdf.text(p, row.rightVal, 435, yPos, { font: 'F1', size: 8, color: '#2DD4BF' });
    }
  });

  // Footer Tagline
  pdf.line(p, 50, 765, 545.28, 765, { color: '#1E293B', lineWidth: 1 });
  pdf.text(p, 'RKISPRO INDUSTRIAL TECHNOLOGIES PRIVATE LIMITED', 50, 785, { font: 'F2', size: 9, color: '#E2E8F0' });
  pdf.text(p, 'Bilaspur  |  Raipur  |  Pune  |  Bengaluru  --  https://rkispro.com', 50, 800, { font: 'F1', size: 8, color: '#64748B' });
  pdf.badge(p, 'STAGE 1: BOOTSTRAPPED VALIDATION', 400, 780, { bgColor: '#1E293B', textColor: '#2DD4BF', fontSize: 7.5 });
}

// ============================================================================
// PAGE 2: TABLE OF CONTENTS & CORE COMPARISON MATRIX
// ============================================================================
{
  const p = pdf.addPage();
  pdf.text(p, 'DOCUMENT OUTLINE & STRATEGIC COMPARISON', 50, 68, { font: 'F2', size: 14, color: '#0F172A' });
  pdf.text(p, 'The 8 Operational Chapters and Structural Advantage over Traditional Sourcing', 50, 82, { font: 'F3', size: 9, color: '#64748B' });

  // 2-Column Table of Contents
  const chapters = [
    { num: '01', title: 'The Dual-Track Operating Strategy', page: 'Pg 3', desc: 'Phase 1 Local Fab Engine vs. Phase 2 Industrial Scale' },
    { num: '02', title: 'Multi-Channel Intake & Bespoke Items', page: 'Pg 4', desc: 'WhatsApp, Mobile Photos, Sketches & 3D CAD Triage' },
    { num: '03', title: 'Dual-Tier Workshop & Vendor Vetting', page: 'Pg 5', desc: 'Local Fabrication Yards & Audited Precision CNC Shops' },
    { num: '04', title: 'Smart Routing & Standardized BOM Quoting', page: 'Pg 6', desc: 'Itemized BOM, 2-4h Turnaround & Zero Middleman Cut' },
    { num: '05', title: 'Two-Tier Escrow & Working Capital', page: 'Pg 7', desc: 'UPI 40/40/20 Milestone Escrow & RBI Nodal B2B Tranches' },
    { num: '06', title: 'Quality Assurance: Local 3-Gate QA', page: 'Pg 8', desc: 'Material Gauge, Weld Integrity & Installation Sign-Off' },
    { num: '07', title: 'Quality Assurance: Industrial 4-Gate QA', page: 'Pg 9', desc: 'NABL MTC, 3-Axis CMM, NDT Testing & Gate Pass' },
    { num: '08', title: 'Logistics, Breakdown, NCR & 18-Step Matrix', page: 'Pg 10-12', desc: '< 4h Dispatch, On-Site Fitting, Warranty & Master SOP' }
  ];

  chapters.forEach((ch, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 50 + col * 255;
    const y = 105 + row * 46;

    pdf.rect(p, x, y, 245, 40, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.rect(p, x, y, 28, 40, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, ch.num, x + 14, y + 25, { font: 'F2', size: 10, color: '#2DD4BF', align: 'center' });
    pdf.text(p, ch.title, x + 35, y + 16, { font: 'F2', size: 7.5, color: '#0F172A', maxWidth: 160 });
    pdf.text(p, ch.desc, x + 35, y + 29, { font: 'F1', size: 7, color: '#64748B', maxWidth: 160 });
    pdf.badge(p, ch.page, x + 205, y + 14, { bgColor: '#E2E8F0', textColor: '#0D9488', fontSize: 7, paddingX: 5, paddingY: 3 });
  });

  // Section Heading: Comparison Matrix
  pdf.line(p, 50, 310, 545.28, 310, { color: '#CBD5E1', lineWidth: 1 });
  pdf.text(p, 'THREE-WAY COMPARISON: DIRECTORY VS. UNORGANIZED FABRICATOR VS. RKISPRO', 50, 330, { font: 'F2', size: 10, color: '#0F172A' });
  pdf.text(p, 'How RKISPro solves the fatal flaws of both open lead directories and chaotic local metalwork', 50, 344, { font: 'F3', size: 8.5, color: '#64748B' });

  // Comparison Table Header
  const tableY = 360;
  pdf.rect(p, 50, tableY, 495.28, 22, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, 'OPERATING CRITERIA', 58, tableY + 15, { font: 'F2', size: 7.5, color: '#FFFFFF' });
  pdf.text(p, 'OPEN DIRECTORY (IndiaMART)', 165, tableY + 15, { font: 'F2', size: 7.5, color: '#CBD5E1' });
  pdf.text(p, 'CHAOTIC LOCAL FABRICATOR', 295, tableY + 15, { font: 'F2', size: 7.5, color: '#CBD5E1' });
  pdf.text(p, 'RKISPRO DUAL-TRACK MANAGED', 420, tableY + 15, { font: 'F2', size: 7.5, color: '#2DD4BF' });

  const matrixRows = [
    {
      label: '1. Vendor Vetting',
      directory: 'Unverified self-listing; ad buyers ranked high.',
      local: 'Unvetted roadside shop; no machinery audit.',
      rkispro: 'Dual-tier physical audit: local fab bays & CNC shops.'
    },
    {
      label: '2. Customer Intake',
      directory: 'Lead spam; phone numbers sold to 20 brokers.',
      local: 'Verbal rough guesses; frequent miscommunications.',
      rkispro: 'Multi-channel: WhatsApp, paper sketch, photo or CAD.'
    },
    {
      label: '3. Quote Transparency',
      directory: 'No quotes; unvetted salesmen call non-stop.',
      local: 'Lumpsum oral quotes; prices jump halfway through.',
      rkispro: 'Standardized BOM: Material index + weld/machine hrs.'
    },
    {
      label: '4. Bespoke Custom Items',
      directory: 'Generic catalog search; custom requests fail.',
      local: 'Refuses or botches complex custom metalwork.',
      rkispro: 'Instant custom cut-list & BOM generated in 2-4 hrs.'
    },
    {
      label: '5. Payment Security',
      directory: 'Zero platform escrow; direct wire risk.',
      local: 'Demands 50% cash advance; work stops if delayed.',
      rkispro: 'Milestone Escrow: UPI 40/40/20 & B2B nodal accounts.'
    },
    {
      label: '6. Quality Control',
      directory: 'Zero liability; buyer absorbs 100% of scrap.',
      local: 'Crude welding, unmeasured bends, scrap iron used.',
      rkispro: '3-Gate Local QA (Vernier/Weld) + 4-Gate CMM/NDT.'
    },
    {
      label: '7. Delivery & Fitting',
      directory: 'No logistics or installation support.',
      local: 'Endless delays; customer chases workers daily.',
      rkispro: 'Guaranteed delivery dates + verified on-site installation.'
    },
    {
      label: '8. Breakdown Support',
      directory: 'None.',
      local: 'No emergency breakdown capacity or tooling.',
      rkispro: '< 4-Hour rapid on-site mobile welding & repair crew.'
    }
  ];

  matrixRows.forEach((row, idx) => {
    const rowY = tableY + 22 + idx * 48;
    const bgCol = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
    pdf.rect(p, 50, rowY, 495.28, 48, { fill: true, stroke: true, fillColor: bgCol, strokeColor: '#E2E8F0', lineWidth: 0.5 });
    pdf.text(p, row.label, 58, rowY + 18, { font: 'F2', size: 7.5, color: '#0F172A', maxWidth: 100 });
    pdf.text(p, row.directory, 165, rowY + 14, { font: 'F1', size: 7, color: '#64748B', maxWidth: 120 });
    pdf.text(p, row.local, 295, rowY + 14, { font: 'F1', size: 7, color: '#64748B', maxWidth: 115 });
    pdf.text(p, row.rkispro, 420, rowY + 14, { font: 'F2', size: 7, color: '#0D9488', maxWidth: 120 });
  });

  // Footer Tagline
  pdf.rect(p, 50, 770, 495.28, 38, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
  pdf.text(p, 'THE STRATEGIC MOAT: MANAGING EXECUTION, NOT SELLING LEADS', 65, 785, { font: 'F2', size: 8, color: '#2DD4BF' });
  pdf.text(p, 'RKISPro acts as the single accountable coordinator, ensuring fair pricing for buyers and guaranteed timely payouts for fabricators.', 65, 797, { font: 'F1', size: 7.5, color: '#E2E8F0' });
}

// ============================================================================
// PAGE 3: THE DUAL-TRACK STRATEGY & BUYER ONBOARDING
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'CHAPTER 1: STRATEGIC OPERATING ARCHITECTURE', 50, 60, { bgColor: '#E0F2FE', textColor: '#0369A1' });
  pdf.text(p, 'THE DUAL-TRACK OPERATING STRATEGY & BUYER ONBOARDING', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Ground Reality: Launching with Local Metalwork while Architecting for Industrial Scale', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 1.1 Dual-Track Strategic Blueprint
  pdf.rect(p, 50, 118, 495.28, 185, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 118, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '1.1 THE TWO-SPEED OPERATING MODEL: TRACK A VS. TRACK B', 60, 133, { font: 'F2', size: 8.5, color: '#0F172A' });

  // Two columns for Track A and Track B
  const tracks = [
    {
      track: 'TRACK A: LOCAL FABRICATION & REPAIR (Phase 1 Engine)',
      badge: 'High Velocity / Cash-Positive Day 1',
      col: '#0D9488',
      desc: 'Focused on Bilaspur, Raipur, and Chhattisgarh industrial belt.',
      points: [
        'Target Market: Homeowners, shopkeepers, local builders, MSMEs, plant maintenance.',
        'Core Jobs: MS/SS gates, balcony railings, roof sheds, storage racks, custom metal frames.',
        'Intake Workflow: WhatsApp photos, hand-drawn paper sketches, site tape measurements.',
        'Quality Standard: 3-Gate Fabrication Protocol (Vernier gauge, weld visual/DPT, primer DFT).',
        'Turnaround & Economics: 3 to 7 days delivery; Rs. 15,000 to Rs. 2,00,000 ticket size.'
      ]
    },
    {
      track: 'TRACK B: INDUSTRIAL PRECISION MACHINING (Phase 2 Scale)',
      badge: 'High Ticket / Enterprise Gross Margin',
      col: '#2563EB',
      desc: 'Expanding across regional engineering corridors (Pune, Peenya, Sanand).',
      points: [
        'Target Market: Heavy industrial plants, OEMs, power/cement plants (Tata, Jindal, BHEL vendors).',
        'Core Jobs: CNC turned shafts, gears, flanges, laser cut sheet batches, pressure vessels, skids.',
        'Intake Workflow: 3D CAD (.STEP/.IGES), 2D prints with GD&T, DFM engineering analysis.',
        'Quality Standard: 4-Gate Metrology Protocol (NABL MTC, 3-Axis CMM, UT/Hydro testing, DFT).',
        'Turnaround & Economics: 10 to 30 days delivery; Rs. 2,00,000 to Rs. 50,00,000+ ticket size.'
      ]
    }
  ];

  tracks.forEach((tr, idx) => {
    const x = 60 + idx * 240;
    pdf.rect(p, x, 148, 230, 145, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#CBD5E1' });
    pdf.rect(p, x, 148, 230, 4, { fill: true, fillColor: tr.col });
    pdf.text(p, tr.track, x + 8, 164, { font: 'F2', size: 7.5, color: '#0F172A', maxWidth: 215 });
    pdf.text(p, tr.desc, x + 8, 177, { font: 'F3', size: 6.8, color: '#64748B', maxWidth: 215 });

    tr.points.forEach((pt, ptIdx) => {
      pdf.bullet(p, x + 8, 193 + ptIdx * 20 + 3, tr.col, 2.5);
      pdf.text(p, pt, x + 15, 193 + ptIdx * 20, { font: 'F1', size: 6.8, color: '#334155', maxWidth: 205 });
    });
  });

  // 1.2 User Onboarding Architecture
  pdf.rect(p, 50, 315, 495.28, 215, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 315, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '1.2 MULTI-TIER BUYER ONBOARDING: FROM RETAIL CONSUMERS TO ENTERPRISE BUYERS', 60, 330, { font: 'F2', size: 8.5, color: '#0F172A' });

  const buyerTiers = [
    {
      title: 'Tier 1: Consumer & Local Retail Buyer (Frictionless Onboarding)',
      text: 'Instant phone OTP / WhatsApp signup. No bureaucratic registration required for home or shop metalwork. Captures job delivery site pin code, contact name, and requirement summary in under 60 seconds.'
    },
    {
      title: 'Tier 2: MSME & Commercial Contractor Onboarding',
      text: 'Lightweight GSTIN check (optional for unregistered entities, mandatory for input tax credit). Captures billing address, site engineer contact, and enables multiple job sites under a unified dashboard.'
    },
    {
      title: 'Tier 3: Enterprise & Industrial Procurement Onboarding',
      text: 'Corporate GSTN API handshake verifying legal entity status, PAN, and active registered GSTIN. Configures 3-tier Role-Based Access Control (RBAC): Procurement Officer, Engineering Approver, and Finance Controller.'
    }
  ];

  buyerTiers.forEach((bt, idx) => {
    const yPos = 345 + idx * 56;
    pdf.rect(p, 60, yPos, 475.28, 48, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.rect(p, 60, yPos, 4, 48, { fill: true, fillColor: '#0D9488' });
    pdf.text(p, bt.title, 72, yPos + 15, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, bt.text, 72, yPos + 28, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });

  // 1.3 Strategic Phased Roadmap Card
  pdf.rect(p, 50, 540, 495.28, 235, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
  pdf.text(p, 'STRATEGIC PHASING ROADMAP: ZERO TO NATIONAL SCALE', 65, 560, { font: 'F2', size: 9, color: '#2DD4BF' });

  const roadmapSteps = [
    { phase: 'PHASE 1 (Months 1-6): BILASPUR & CG CORRIDOR', text: 'Onboard 30 local fabrication workshops. Focus on gates, railings, roof sheds, storage racks, and plant repairs. Build local trust, prove milestone escrow, achieve operational profitability with negative working capital.' },
    { phase: 'PHASE 2 (Months 7-12): RAIPUR, BHILAI & CENTRAL INDIA', text: 'Expand to industrial machine shops, rolling mill spares, heavy earthmoving repair, and sheet metal enclosures. Launch 4-Gate metrology protocols and partner with NABL testing laboratories.' },
    { phase: 'PHASE 3 (Year 2+): NATIONAL INDUSTRIAL EXPANSION', text: 'Deploy across Pune-Chakan, Bengaluru-Peenya, and Gujarat-Sanand. License platform to tier-1 aerospace and automotive component makers with automated 3D DFM triage and corporate credit lines.' }
  ];

  roadmapSteps.forEach((st, idx) => {
    const yPos = 580 + idx * 60;
    pdf.rect(p, 65, yPos, 465.28, 50, { fill: true, stroke: true, fillColor: '#1E293B', strokeColor: '#334155' });
    pdf.text(p, st.phase, 78, yPos + 16, { font: 'F2', size: 8, color: '#38BDF8' });
    pdf.text(p, st.text, 78, yPos + 30, { font: 'F1', size: 7.5, color: '#CBD5E1', maxWidth: 440 });
  });
}

// ============================================================================
// PAGE 4: MULTI-CHANNEL INTAKE & BESPOKE ITEM ESTIMATION
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'CHAPTER 2: SOURCING & INGESTION ARCHITECTURE', 50, 60, { bgColor: '#EDE9FE', textColor: '#6D28D9' });
  pdf.text(p, 'MULTI-CHANNEL JOB INTAKE & BESPOKE METALWORK SOP', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'How RKISPro Ingests Paper Sketches, WhatsApp Photos, and Custom Ideas into Engineered BOMs', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 2.1 Multi-Channel Intake Grid
  pdf.rect(p, 50, 118, 495.28, 205, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 118, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '2.1 THREE-TIER INGESTION ARCHITECTURE (NO CAD REQUIRED TO GET STARTED)', 60, 133, { font: 'F2', size: 8.5, color: '#0F172A' });

  const intakeChannels = [
    {
      title: 'CHANNEL 1: ACCESSIBLE (SKETCH / PHOTO / WHATSAPP)',
      points: [
        'Mobile Photos: Snapping an existing broken part, a neighbor gate, or an internet design photo.',
        'Hand-Drawn Paper Sketches: Rough dimensions (height, width, pipe thickness) written on paper.',
        'WhatsApp Audio / Chat: Customers describe requirements; team transcribes into technical RFQ.',
        'SLA: Verified local workshop quote generated within 2 to 4 business hours.'
      ]
    },
    {
      title: 'CHANNEL 2: BESPOKE / CUSTOM NON-CATALOG ITEMS',
      points: [
        'Custom Item Generator: Spiral stairs, gym racks, animal shelters, canopies, machine brackets.',
        'Rapid Clarification: RKISPro triage desk contacts customer to verify load requirements and steel grade.',
        'Parametric Cut-List: Translates custom shape into structural steel cut-lengths and welding hours.',
        'SLA: Free verified custom quotation within 2 to 4 business hours.'
      ]
    },
    {
      title: 'CHANNEL 3: TECHNICAL & INDUSTRIAL (CAD / GD&T)',
      points: [
        '3D CAD Models: .STEP, .STP, .IGES, .SLDPRT for CNC lathe, VMC, and laser cutting toolpaths.',
        '2D Vector Prints: PDF / DXF with ASME Y14.5 / ISO 1101 tolerances down to +/- 0.01 mm.',
        'Automated 3D DFM: Algorithmic checks for wall thickness, deep pockets, and undercut angles.',
        'SLA: Comprehensive DFM report and line-item BOM quote within 12 to 24 hours.'
      ]
    }
  ];

  intakeChannels.forEach((ch, idx) => {
    const x = 60 + idx * 160;
    pdf.rect(p, x, 148, 150, 165, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#CBD5E1' });
    pdf.text(p, ch.title, x + 8, 164, { font: 'F2', size: 7, color: '#0D9488', maxWidth: 135 });

    ch.points.forEach((pt, ptIdx) => {
      pdf.bullet(p, x + 8, 185 + ptIdx * 34 + 3, '#0D9488', 2);
      pdf.text(p, pt, x + 14, 185 + ptIdx * 34, { font: 'F1', size: 6.8, color: '#334155', maxWidth: 125 });
    });
  });

  // 2.2 Bespoke Item Triage SOP Box
  pdf.rect(p, 50, 335, 495.28, 250, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 335, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '2.2 THE BESPOKE METALWORK TRIAGE SOP: FROM VAGUE IDEA TO ACCURATE BILL OF MATERIALS', 60, 350, { font: 'F2', size: 8.5, color: '#0F172A' });

  const triageSteps = [
    {
      step: 'STEP 1: Immediate Triage Review (< 30 Minutes)',
      desc: 'When a customer submits a bespoke item (e.g., "Heavy Duty Spiral Staircase" or "Tractor Trolley Tailgate"), the platform operations engineer inspects the upload and determines structural load-bearing risks.'
    },
    {
      step: 'STEP 2: Rapid Clarification Call / WhatsApp (< 1 Hour)',
      desc: 'The engineer confirms 3 essentials: (1) Total span/dimensions, (2) Environment (indoor vs. outdoor rain exposure), and (3) Budget tier (Mild Steel with primer vs. Stainless Steel 304 mirror finish).'
    },
    {
      step: 'STEP 3: Standardized Cut-List & BOM Synthesis (< 2 Hours)',
      desc: 'The engineer generates a structured manufacturing cut-list: Pipe lengths (e.g. 50x50x2mm square tube), plate cutting area, hinge/hardware requirements, welding consumables, and primer surface area.'
    },
    {
      step: 'STEP 4: Dual-Track Vendor Matching (< 4 Hours)',
      desc: 'The cut-list is dispatched directly to 3 audited local fabrication workshops with appropriate bending, cutting, and welding capacity. The customer receives 2 to 3 competitive quotes on their phone.'
    }
  ];

  triageSteps.forEach((st, idx) => {
    const yPos = 368 + idx * 52;
    pdf.rect(p, 60, yPos, 475.28, 44, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, st.step, 72, yPos + 14, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, st.desc, 72, yPos + 26, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });

  // 2.3 Automated DFM Analysis for Track B
  pdf.rect(p, 50, 595, 495.28, 185, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
  pdf.text(p, '2.3 AUTOMATED 3D DFM GEOMETRY CHECK FOR INDUSTRIAL ORDERS (TRACK B)', 65, 615, { font: 'F2', size: 8.5, color: '#0F172A' });

  const dfmChecks = [
    { label: 'Tool Access & Undercuts:', text: 'Checks whether internal features require 3-axis, 4-axis rotary, or 5-axis simultaneous machines.' },
    { label: 'Wall Thickness Deflection:', text: 'Detects thin walls (< 1.2 mm in aluminum, < 1.0 mm in steel) that warp under tool cutter pressure.' },
    { label: 'Standard Tool Radii:', text: 'Flags square internal corners that cannot be machined with standard end-mills and require wire EDM.' },
    { label: 'Tolerancing Rationalization:', text: 'Recommends relaxed tolerances on non-critical faces, reducing machining cycle time and cost by 15-30%.' }
  ];

  dfmChecks.forEach((chk, idx) => {
    const yPos = 635 + idx * 34;
    pdf.bullet(p, 65, yPos + 3, '#0D9488', 3);
    pdf.text(p, chk.label, 75, yPos, { font: 'F2', size: 7.8, color: '#0D9488' });
    pdf.text(p, chk.text, 185, yPos, { font: 'F1', size: 7.5, color: '#334155', maxWidth: 345 });
  });
}

// ============================================================================
// PAGE 5: DUAL-TIER WORKSHOP VETTING & NETWORK ARCHITECTURE
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'CHAPTER 3: SUPPLY CHAIN QUALITY ASSURANCE', 50, 60, { bgColor: '#FEF3C7', textColor: '#B45309' });
  pdf.text(p, 'DUAL-TIER WORKSHOP VETTING & PARTNER NETWORK AUDIT', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'How RKISPro Inspects Local Fabrication Yards & Precision Machine Shops to Guarantee Delivery', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // Summary Banner
  pdf.rect(p, 50, 118, 495.28, 65, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
  pdf.text(p, 'RIGOROUS PHYSICAL AUDIT: ONBOARDING ONLY THE TOP 20% OF LOCAL & INDUSTRIAL SHOPS', 65, 138, { font: 'F2', size: 9.5, color: '#2DD4BF' });
  pdf.text(p, 'We do not sell directory ads. Every workshop in the RKISPro network is physically visited by an operations engineer,', 65, 155, { font: 'F1', size: 8, color: '#E2E8F0' });
  pdf.text(p, 'inspecting machinery health, welding equipment, electrical power backup, past project albums, and business legitimacy.', 65, 168, { font: 'F1', size: 8, color: '#E2E8F0' });

  // Tier 1 vs Tier 2 Audit Columns
  const auditTiers = [
    {
      title: 'TIER 1: LOCAL FABRICATION WORKSHOP AUDIT (20 Points)',
      sub: 'For MS/SS Gates, Railings, Sheds, Racks & Repairs',
      col: '#0D9488',
      checks: [
        'Cutting & Shearing: Functional cold saw, profile cutter, gas cutting torch, and sheet shearing machine.',
        'Welding Bays & Machinery: Inverter ARC, MIG (CO2), and TIG welding sets with stable amperage.',
        'Squaring & Fabrication Beds: Heavy leveled steel fabrication tables for true 90-degree alignment.',
        'Finishing & Coating: Angle grinders with flap discs, buffing wheels, and spray primer painting booth.',
        'Electrical Power Load: Minimum 10-15 kW sanctioned commercial power load or captive diesel generator.',
        'Track Record & Reliability: Inspection of 5 recent completed physical installations in the local area.'
      ]
    },
    {
      title: 'TIER 2: PRECISION CNC & MACHINE SHOP AUDIT (40 Points)',
      sub: 'For Industrial Batch Production, Turned Parts & Tooling',
      col: '#2563EB',
      checks: [
        'Spindle Run-Out Verification: Dial test indicator (DTI) measurement (< 0.003 mm at taper).',
        'Axis Backlash & Guides: Laser interferometer or linear scale repeatability checks on X/Y/Z ballscrews.',
        'Climate-Controlled Quality Suite: Dedicated room maintaining 20 deg C +/- 2 deg C for CMM metrology.',
        'NABL Calibration Certificates: Valid calibration stickers on verniers, micrometers, and height gauges.',
        'Power Infrastructure: Sanctioned HT/LT power with captive diesel generator to prevent cutter tool marks.',
        'Statutory Filings: Verified active GSTIN, MSME Udyam, Factories Act license, and pollution consents.'
      ]
    }
  ];

  auditTiers.forEach((tier, idx) => {
    const x = 50 + idx * 255;
    pdf.rect(p, x, 195, 245, 375, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1', lineWidth: 0.75 });
    pdf.rect(p, x, 195, 245, 34, { fill: true, fillColor: '#F8FAFC' });
    pdf.line(p, x, 229, x + 245, 229, { color: '#E2E8F0', lineWidth: 0.75 });
    pdf.rect(p, x, 195, 245, 4, { fill: true, fillColor: tier.col });

    pdf.text(p, tier.title, x + 10, 212, { font: 'F2', size: 7.2, color: '#0F172A', maxWidth: 225 });
    pdf.text(p, tier.sub, x + 10, 224, { font: 'F3', size: 6.8, color: '#64748B', maxWidth: 225 });

    tier.checks.forEach((chk, chkIdx) => {
      const yPos = 240 + chkIdx * 54;
      pdf.rect(p, x + 8, yPos, 229, 48, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.text(p, `[PASS CHECK ${chkIdx + 1}]`, x + 14, yPos + 13, { font: 'F2', size: 6.8, color: tier.col });
      pdf.text(p, chk, x + 14, yPos + 25, { font: 'F1', size: 6.8, color: '#334155', maxWidth: 215 });
    });
  });

  // Workshop Digital Twin Profiling
  pdf.rect(p, 50, 580, 495.28, 205, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
  pdf.text(p, 'WORKSHOP DIGITAL PROFILING & CAPACITY ALLOCATION SYSTEM', 65, 600, { font: 'F2', size: 8.5, color: '#0F172A' });

  const profileSpecs = [
    { title: 'Material Handling & Crane Tonnage', text: 'Cataloging overhead EOT crane capacity (1 Ton to 25 Ton) and forklift availability for heavy skids and structures.' },
    { title: 'Bed Travel & Shearing Limits', text: 'Logging exact axis travel (X/Y/Z) for machine shops and maximum plate thickness/length for guillotine shearing and press brakes.' },
    { title: 'Special Processes Indexing', text: 'Tagging specialized capabilities: Submerged Arc Welding (SAW), 4-Axis VMC, Wire EDM, Laser Cutting, and Hot-Dip Galvanizing access.' },
    { title: 'Real-Time Capacity Monitoring', text: 'Workshops update weekly open shop hours. Jobs are routed strictly to shops with active, uncommitted machine and welding bay capacity.' }
  ];

  profileSpecs.forEach((spec, i) => {
    const yPos = 618 + i * 38;
    pdf.bullet(p, 65, yPos + 3, '#0D9488', 3);
    pdf.text(p, `${spec.title}:`, 75, yPos, { font: 'F2', size: 7.8, color: '#0D9488' });
    pdf.text(p, spec.text, 75, yPos + 12, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 455 });
  });
}

// ============================================================================
// PAGE 6: SMART ROUTING, STANDARDIZED BOM & CONTRACT AWARD
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'CHAPTER 4: COMMERCIAL PRICING & CONTRACT ENGINE', 50, 60, { bgColor: '#EDE9FE', textColor: '#6D28D9' });
  pdf.text(p, 'SMART JOB ROUTING, STANDARDIZED BOM COSTING & PO AWARD', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Eliminating Middleman Inflation, Price Gouging, and Post-Award Renegotiations', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 4.1 Blind Targeted Routing Box
  pdf.rect(p, 50, 118, 495.28, 105, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 118, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '4.1 ALGORITHMIC CAPACITY MATCHING & ZERO SPAM CALLS', 60, 133, { font: 'F2', size: 8.5, color: '#0F172A' });

  const p41Points = [
    'Strict 3-to-5 Shop Routing: Requests are never broadcast to open databases. Only 3 to 5 verified local workshops or machine shops with matching tools, open capacity, and geographic proximity receive the requirement.',
    'Sanitized Drawing Privacy: Customer contact details are kept strictly anonymous during the quoting phase, eliminating aggressive cold calls and annoying broker spam.',
    'Outlier & Underquoting Filter: Bids deviating by more than 20% from RKISPro standard BOM material indices are flagged for engineering audit to stop deceptive low-balling and mid-project work abandonment.'
  ];

  p41Points.forEach((pt, i) => {
    const yPos = 150 + i * 24;
    pdf.bullet(p, 65, yPos + 3, '#0D9488', 3);
    pdf.text(p, pt, 74, yPos, { font: 'F1', size: 7.2, color: '#334155', maxWidth: 460 });
  });

  // 4.2 Standardized Line-Item BOM Cost Model Table
  pdf.rect(p, 50, 235, 495.28, 275, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 235, 495.28, 22, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, '4.2 STANDARDIZED LINE-ITEM BOM COST MODEL (WHAT BUYERS & WORKSHOPS SEE)', 60, 250, { font: 'F2', size: 8.5, color: '#2DD4BF' });
  pdf.text(p, 'EST. COST SHARE', 530, 250, { font: 'F2', size: 7.5, color: '#FFFFFF', align: 'right' });

  const bomRows = [
    { comp: '1. Certified Primary Steel', desc: 'Raw material weight (kg) x active steel index (Tata, SAIL, Jindal benchmark) + standard 5-8% scrap cut allowance.', share: '40% - 55%' },
    { comp: '2. Fabrication / Machining Hours', desc: 'Welding, cutting, grinding labor (local fab: Rs. 150-250/hr) OR CNC spindle time (3-Axis: Rs. 650-900/hr, 5-Axis: Rs. 1,800-2,600/hr).', share: '25% - 35%' },
    { comp: '3. Consumables & Fasteners', desc: 'MIG wire, E7018 electrodes, cutting gases, abrasive wheels, hinges, latches, anchor bolts, and rubber gaskets.', share: '5% - 8%' },
    { comp: '4. Surface Protection & Primer', desc: 'Degreasing, red-oxide / zinc-phosphate epoxy primer (local fab) OR hard anodizing, powder coating, galvanizing (industrial).', share: '6% - 10%' },
    { comp: '5. Quality Assurance & Metrology', desc: '3-Gate Fabrication checks (digital vernier, dye-penetrant weld check) OR 4-Gate CMM inspection & NABL testing.', share: '2% - 4%' },
    { comp: '6. Delivery & On-Site Fitting', desc: 'Local mini-truck freight and on-site leveling, bolting/welding handover OR long-haul crating and GPS transport.', share: '4% - 8%' }
  ];

  bomRows.forEach((row, i) => {
    const rowY = 265 + i * 38;
    const bgCol = i % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
    pdf.rect(p, 50, rowY, 495.28, 38, { fill: true, stroke: true, fillColor: bgCol, strokeColor: '#E2E8F0', lineWidth: 0.5 });
    pdf.text(p, row.comp, 60, rowY + 16, { font: 'F2', size: 7.8, color: '#0F172A' });
    pdf.text(p, row.desc, 185, rowY + 14, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 275 });
    pdf.text(p, row.share, 530, rowY + 16, { font: 'F2', size: 7.8, color: '#0D9488', align: 'right' });
  });

  // 4.3 Contractual Work Order & Non-Circumvention
  pdf.rect(p, 50, 520, 495.28, 255, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 520, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '4.3 DIGITAL PURCHASE ORDER & TRIPARTITE LEGAL ARCHITECTURE', 60, 535, { font: 'F2', size: 8.5, color: '#0F172A' });

  const legalClauses = [
    { title: 'Single Contractual Seller of Record', text: 'RKISPro acts as the accountable managing contractor to the customer. The customer deals with one trusted platform rather than untraceable laborers or conflicting sub-tier machine shops.' },
    { title: 'Fair Fabricator Pricing & No Raw Stock Markup', text: 'RKISPro does not exploit workshops. Fabricators receive fair standard rates for their cutting, welding, and machine hours with zero raw material commission markdowns.' },
    { title: 'Strict 24-Month Mutual Non-Circumvention', text: 'Workshops and enterprise buyers sign binding digital terms prohibiting direct uncoordinated bypass. Circumvention carries liquid damages to protect network integrity.' },
    { title: 'Enforceable On-Time Delivery Commitments', text: 'Work orders mandate agreed delivery deadlines. Unexcused delays incur a 0.5% per day penalty, capped at 10%, guaranteeing accountability for retail and industrial buyers.' }
  ];

  legalClauses.forEach((cl, i) => {
    const yPos = 552 + i * 54;
    pdf.rect(p, 60, yPos, 475.28, 46, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, cl.title, 72, yPos + 15, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, cl.text, 72, yPos + 28, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 450 });
  });
}

// ============================================================================
// PAGE 7: TWO-TIER MILESTONE ESCROW & CASHFLOW ARCHITECTURE
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'CHAPTER 5: FINANCIAL ESCROW & CAPITAL SECURITY', 50, 60, { bgColor: '#DCFCE7', textColor: '#15803D' });
  pdf.text(p, 'TWO-TIER MILESTONE ESCROW & WORKING CAPITAL SECURITY', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Zero Cashflow Default for Fabricators, 100% Fund Safety for Buyers, and Zero Working Capital Strain', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // Banner
  pdf.rect(p, 50, 118, 495.28, 70, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
  pdf.text(p, 'ENDING THE CASH CRISIS: SECURING ADVANCES FOR WORKSHOPS WHILE PROTECTING BUYERS', 65, 138, { font: 'F2', size: 9, color: '#2DD4BF' });
  pdf.text(p, 'In traditional metal fabrication, buyers fear handing over cash advances to workshops that disappear, while fabricators', 65, 155, { font: 'F1', size: 8, color: '#E2E8F0' });
  pdf.text(p, 'risk financial ruin when clients refuse to pay the final 50% balance after delivery. RKISPro milestone escrow solves both.', 65, 168, { font: 'F1', size: 8, color: '#E2E8F0' });

  // Tier 1 vs Tier 2 Escrow Columns
  const escrowTiers = [
    {
      title: 'TIER 1: RETAIL & MSME MILESTONE ESCROW (UPI / QR / NETBANKING)',
      sub: 'For Local Metalwork & Fabrication Orders (Rs. 15,000 to Rs. 2,00,000)',
      col: '#0D9488',
      tranches: [
        {
          pct: 'TRANCHE 1: 40%',
          name: 'Raw Material Procurement Advance',
          trigger: 'Deposited by buyer via UPI / QR / Netbanking into escrow. Instantly released to workshop upon uploading steel purchase invoice and raw material photos.',
          purpose: 'Enables fabricator to purchase steel pipes, sheets, and welding rods immediately with zero out-of-pocket capital drain.'
        },
        {
          pct: 'TRANCHE 2: 40%',
          name: 'Fabrication & Welding Gate Milestone',
          trigger: 'Released to workshop upon completion of main cutting, welding, frame assembly, and anti-rust primer coat, verified via WhatsApp photo/video evidence.',
          purpose: 'Compensates workshop for labor, welding gases, consumables, and cutting hours midway through the project.'
        },
        {
          pct: 'TRANCHE 3: 20%',
          name: 'Final Delivery & Installation Handover',
          trigger: 'Released to workshop immediately upon physical delivery, on-site fitting/bolting, and customer OTP / signature sign-off.',
          purpose: 'Final profit release to fabricator minus platform commission (5-8%). Buyer inspects before final release.'
        }
      ]
    },
    {
      title: 'TIER 2: ENTERPRISE B2B NODAL ESCROW (RBI COMPLIANT)',
      sub: 'For Precision Machining, Tooling & Heavy Industrial Runs (Rs. 2,00,000+)',
      col: '#2563EB',
      tranches: [
        {
          pct: 'TRANCHE 1: 30%',
          name: 'MTC & Raw Stock Allocation Advance',
          trigger: 'Released upon Gate 1 sign-off: Primary producer Mill Test Certificate (Tata/Jindal/SAIL) verified and XRF/PMI chemical composition checked.',
          purpose: 'Secures high-grade alloy billets, seamless tubes, or forgings without tapping machine shop credit limits.'
        },
        {
          pct: 'TRANCHE 2: 40%',
          name: 'Machining & CMM Inspection Milestone',
          trigger: 'Released upon Gate 2 (First Article CMM report) and Gate 3 (Weld NDT / Hydrostatic pressure chart approval).',
          purpose: 'Funds CNC spindle hours, high-wear tooling inserts, vacuum heat treatment, and surface plating costs.'
        },
        {
          pct: 'TRANCHE 3: 30%',
          name: 'Plant Receiving & 48h Inwarding Sign-Off',
          trigger: 'Released upon delivery, gate pass inwarding, and buyer 48-hour confirmatory quality inspection handshake.',
          purpose: 'Final vendor payout minus platform facilitation margin (8-12%). Automated CBIC GST E-Invoice issued.'
        }
      ]
    }
  ];

  escrowTiers.forEach((tier, idx) => {
    const x = 50 + idx * 255;
    pdf.rect(p, x, 200, 245, 370, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1', lineWidth: 0.75 });
    pdf.rect(p, x, 200, 245, 32, { fill: true, fillColor: '#F8FAFC' });
    pdf.line(p, x, 232, x + 245, 232, { color: '#E2E8F0', lineWidth: 0.75 });
    pdf.rect(p, x, 200, 245, 4, { fill: true, fillColor: tier.col });

    pdf.text(p, tier.title, x + 10, 214, { font: 'F2', size: 6.8, color: '#0F172A', maxWidth: 225 });
    pdf.text(p, tier.sub, x + 10, 226, { font: 'F3', size: 6.5, color: '#64748B', maxWidth: 225 });

    tier.tranches.forEach((tr, trIdx) => {
      const yPos = 240 + trIdx * 105;
      pdf.rect(p, x + 8, yPos, 229, 98, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.text(p, `${tr.pct} - ${tr.name}`, x + 14, yPos + 15, { font: 'F2', size: 7.2, color: tier.col, maxWidth: 215 });
      pdf.text(p, tr.trigger, x + 14, yPos + 28, { font: 'F2', size: 6.8, color: '#166534', maxWidth: 215 });
      pdf.text(p, tr.purpose, x + 14, yPos + 60, { font: 'F1', size: 6.8, color: '#475569', maxWidth: 215 });
    });
  });

  // Banking Security & MSME Invoice Discounting
  pdf.rect(p, 50, 580, 495.28, 205, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
  pdf.text(p, 'FINANCIAL SAFETY, INSTANT UPI SETTLEMENT & TAX COMPLIANCE', 65, 600, { font: 'F2', size: 8.5, color: '#0F172A' });

  const finFeatures = [
    { title: 'Segregated Trust Custody', text: 'Customer funds are held in RBI-regulated nodal trust accounts. Balances are completely insulated from RKISPro operating funds and protected against company insolvency.' },
    { title: 'Instant UPI / IMPS Workshop Payouts', text: 'Local fabricators receive instant bank credit via UPI / IMPS the moment milestones are cleared. Zero 30-day waiting periods.' },
    { title: 'Dispute Lock & Stop-Payment Protection', text: 'If work deviates from approved specifications, customer freezes escrow with 1 click. Lead auditor inspects on-site within 24 hours.' },
    { title: 'CBIC GST SAC 9988 & E-Invoicing', text: 'Automated tax invoices generated under SAC 9988 (Job Work / Manufacturing Services) and HSN 7308, enabling 100% GST Input Tax Credit (ITC).' }
  ];

  finFeatures.forEach((ff, i) => {
    const yPos = 618 + i * 38;
    pdf.bullet(p, 65, yPos + 3, '#0D9488', 3);
    pdf.text(p, `${ff.title}:`, 75, yPos, { font: 'F2', size: 7.8, color: '#0D9488' });
    pdf.text(p, ff.text, 75, yPos + 12, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 455 });
  });
}

// ============================================================================
// PAGE 8: QUALITY ASSURANCE - LOCAL FABRICATION 3-GATE PROTOCOL
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'CHAPTER 6: QUALITY CONTROL (TRACK A)', 50, 60, { bgColor: '#FEE2E2', textColor: '#B91C1C' });
  pdf.text(p, 'LOCAL FABRICATION QUALITY ASSURANCE: 3-GATE PROTOCOL', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Pragmatic Quality Gates for Everyday Metalwork: Material Gauge, Weld Strength & Installation Sign-Off', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // Overview Banner
  pdf.rect(p, 50, 118, 495.28, 60, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
  pdf.text(p, 'PRAGMATIC QUALITY FOR EVERYDAY METALWORK: NO OVER-ENGINEERING, NO COMPROMISE', 65, 138, { font: 'F2', size: 9, color: '#2DD4BF' });
  pdf.text(p, 'A homeowner or shopkeeper does not need a CMM coordinate report; they need genuine steel thickness, strong crack-free welds,', 65, 153, { font: 'F1', size: 7.8, color: '#E2E8F0' });
  pdf.text(p, 'rust-proof primer, and true square leveling. The 3-Gate protocol enforces this simply and transparently.', 65, 165, { font: 'F1', size: 7.8, color: '#E2E8F0' });

  // 3 Gates Stack
  const localGates = [
    {
      gate: 'GATE F1: RAW MATERIAL GAUGE & BRAND VERIFICATION',
      badge: 'TRANCHE 1 TRIGGER',
      badgeBg: '#134E4A',
      badgeCol: '#2DD4BF',
      checks: [
        'Steel Brand & Producer Verification: Ensuring primary producer pipes and sheets (Tata Tiscon, Jindal, Apollo, SAIL) instead of cheap rerolled scrap iron.',
        'Wall Thickness Vernier Gauge Check: Digital vernier caliper inspection ensuring pipe wall matches quote (e.g. 2.0 mm specified is not under-supplied as 1.4 mm).',
        'Visual Defect Audit: Checking raw stock for surface pitting, excessive pre-existing rust, or transit dents before cutting begins.',
        'Digital Upload: Workshop uploads clear photo of material bundle and thickness measurement to the platform ledger.'
      ]
    },
    {
      gate: 'GATE F2: WELD PENETRATION, SQUARING & DIMENSIONAL INTEGRITY',
      badge: 'TRANCHE 2 TRIGGER',
      badgeBg: '#1E293B',
      badgeCol: '#FBBF24',
      checks: [
        'Diagonal & Squareness Check: Measuring corner-to-corner diagonals on gates and frames to ensure true 90-degree alignment without diagonal distortion.',
        'Weld Integrity & Slag Removal: Checking for continuous root penetration, absence of undercut or surface blowholes, and full chipping/grinding of welding slag.',
        'Hinges, Locks & Moving Parts: Verifying smooth pivot action of heavy-duty bearing hinges, sliding rollers, latches, and locking drop-pins.',
        'Mobile Proof: Workshop uploads 30-second video demonstrating square dimensions and smooth roller/hinge movement.'
      ]
    },
    {
      gate: 'GATE F3: ANTI-RUST PRIMER COAT & ON-SITE INSTALLATION HANDOVER',
      badge: 'TRANCHE 3 TRIGGER',
      badgeBg: '#1E293B',
      badgeCol: '#F87171',
      checks: [
        'Surface Degreasing & Primer Application: Complete application of high-grade zinc-chromate or red-oxide primer over all weld joints and raw metal faces.',
        'Paint Finish & Touch-Up: Synthetic enamel or polyurethane paint coat inspection; touch-up painting at site after anchoring/welding to wall.',
        'On-Site Leveling & Plumb Line: Verification of vertical plumb and horizontal level during site installation into masonry or steel columns.',
        'Customer Physical Handover & Sign-Off: Buyer inspects installation, tests movement, and signs digital acceptance or shares OTP to release final 20%.'
      ]
    }
  ];

  localGates.forEach((gt, idx) => {
    const yPos = 188 + idx * 195;
    pdf.rect(p, 50, yPos, 495.28, 185, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 50, yPos, 495.28, 26, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, gt.gate, 60, yPos + 17, { font: 'F2', size: 8, color: '#FFFFFF' });
    pdf.badge(p, gt.badge, 535, yPos + 12, { bgColor: gt.badgeBg, textColor: gt.badgeCol, fontSize: 6.8, align: 'right' });

    gt.checks.forEach((chk, chkIdx) => {
      const cY = yPos + 36 + chkIdx * 36;
      pdf.rect(p, 60, cY, 475.28, 32, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.text(p, `Check ${chkIdx + 1}:`, 70, cY + 14, { font: 'F2', size: 7.2, color: '#0D9488' });
      pdf.text(p, chk, 125, cY + 14, { font: 'F1', size: 7.2, color: '#334155', maxWidth: 400 });
    });
  });
}

// ============================================================================
// PAGE 9: QUALITY ASSURANCE - INDUSTRIAL PRECISION 4-GATE PROTOCOL
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'CHAPTER 7: QUALITY CONTROL (TRACK B)', 50, 60, { bgColor: '#FEE2E2', textColor: '#B91C1C' });
  pdf.text(p, 'INDUSTRIAL METROLOGY QUALITY ASSURANCE: 4-GATE PROTOCOL', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'High-Precision Engineering Standards: NABL MTC, 3-Axis CMM, Weld NDT & Digital Gate Pass', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 4 Industrial Gates Grid
  const indGates = [
    {
      gate: 'GATE I1: RAW MATERIAL MTC & OES SPECTROSCOPY',
      stage: 'PRE-MACHINING / ALLOY VALIDATION',
      col: '#0D9488',
      desc: 'Ensures counterfeit scrap alloys never enter CNC spindles.',
      points: [
        'Primary Producer NABL MTC: Mill Test Certificate from Tata, SAIL, Jindal, or Hindalco carrying heat lot numbers.',
        'Positive Material Identification (PMI): Optical Emission Spectrometry (OES) or XRF verifying Cr, Ni, Mo, and C %.',
        'Ultrasonic Testing (UT): ASTM A388 testing on heavy forged blocks (> 25mm) to detect sub-surface laminations.',
        'Gate Trigger: Approval greenlights spindle tooling and disburses Tranche 1 (30%) raw material advance.'
      ]
    },
    {
      gate: 'GATE I2: FIRST ARTICLE INSPECTION (FAI) & CMM METROLOGY',
      stage: 'SERIAL RUN GREENLIGHT',
      col: '#2563EB',
      desc: 'Eliminates mass batch tooling scrap caused by program errors.',
      points: [
        'AS9102 First Article Protocol: The first 3 completed units undergo full dimensional and GD&T validation.',
        '3-Axis Coordinate Measuring Machine (CMM): Zeiss / Mitutoyo automated touch probing in 20 deg C quality suite.',
        'Geometric Tolerancing: Algorithmic true position (Dia +/- 0.012 mm), concentricity, and thread pitch diameter check.',
        'Surface Profilometry: Contact profilometer audit ensuring Ra <= 0.4 um on ground hydraulic seal faces.'
      ]
    },
    {
      gate: 'GATE I3: IN-PROCESS NDT & PRESSURE TESTING',
      stage: 'STRUCTURAL FABRICATION / WELD QA',
      col: '#F59E0B',
      desc: 'Validates structural soundness on welded pressure components.',
      points: [
        'WPS / PQR Compliance: Welds executed strictly by certified welders qualified per ASME Section IX.',
        'Non-Destructive Testing: Dye Penetrant (DPI / PT) for surface cracks; Magnetic Particle (MPT) for weld seams.',
        'Hydrostatic Proof Testing: Pressurized to 1.5x design pressure for 30 minutes with digital pressure chart recorder.',
        'Gate Trigger: NDT inspection report approval disburses Tranche 2 (40%) machining milestone.'
      ]
    },
    {
      gate: 'GATE I4: SURFACE COATING DFT & DISPATCH GATE PASS',
      stage: 'PACKAGING & OUTWARD CLEARANCE',
      col: '#EF4444',
      desc: 'Guarantees zero highway transit corrosion and mechanical damage.',
      points: [
        'Dry Film Thickness (DFT): Calibrated magnetic eddy-current gauge check of epoxy/PU coats per ASTM D3359.',
        'VCI Oil Preservation: Ultrasonic degreasing followed by high-grade Vapor Corrosion Inhibitor oil and vacuum bagging.',
        'Heavy Industrial Crating: ISPM-15 heat-treated, fumigated wooden cases with high-density foam and silica desiccant.',
        'Cryptographic Gate Pass: Platform-issued immutable QR pass linking all 4 test certificates prior to dispatch.'
      ]
    }
  ];

  indGates.forEach((gt, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 50 + col * 255;
    const y = 118 + row * 325;

    pdf.rect(p, x, y, 245, 315, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1', lineWidth: 0.75 });
    pdf.rect(p, x, y, 245, 30, { fill: true, fillColor: '#0F172A' });
    pdf.line(p, x, y + 30, x + 245, y + 30, { color: '#E2E8F0', lineWidth: 0.75 });
    pdf.rect(p, x, y, 245, 4, { fill: true, fillColor: gt.col });

    pdf.text(p, gt.gate, x + 8, y + 15, { font: 'F2', size: 7, color: '#FFFFFF', maxWidth: 228 });
    pdf.text(p, gt.stage, x + 8, y + 25, { font: 'F3', size: 6.5, color: '#2DD4BF', maxWidth: 228 });

    pdf.rect(p, x + 8, y + 36, 229, 30, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, gt.desc, x + 14, y + 52, { font: 'F1', size: 6.8, color: '#475569', maxWidth: 215 });

    gt.points.forEach((pt, ptIdx) => {
      const pY = y + 74 + ptIdx * 58;
      pdf.rect(p, x + 8, pY, 229, 52, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
      pdf.bullet(p, x + 14, pY + 12, gt.col, 2.5);
      pdf.text(p, pt, x + 22, pY + 12, { font: 'F1', size: 6.8, color: '#334155', maxWidth: 210 });
    });
  });

  // Footer Tagline
  pdf.rect(p, 50, 770, 495.28, 38, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
  pdf.text(p, 'UNINSPECTED COMPONENTS NEVER LEAVE THE WORKSHOP BAY', 65, 785, { font: 'F2', size: 8, color: '#2DD4BF' });
  pdf.text(p, 'Every industrial work order is assigned an RKISPro manufacturing engineer who signs off on all 4 quality gates prior to dispatch.', 65, 797, { font: 'F1', size: 7.5, color: '#E2E8F0' });
}

// ============================================================================
// PAGE 10: DISPATCH, LOCAL FITTING & 48-HOUR ACCEPTANCE PROTOCOL
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'CHAPTER 8: LOGISTICS & HANDOVER (PART 1)', 50, 60, { bgColor: '#F1F5F9', textColor: '#334155' });
  pdf.text(p, 'DISPATCH, ON-SITE INSTALLATION & 48-HOUR ACCEPTANCE', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Local Mini-Truck Freight, Site Erection Handover, e-Way Bills, and Automated Settlement Handshake', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 10.1 Dual-Track Logistics
  pdf.rect(p, 50, 118, 495.28, 185, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 118, 495.28, 22, { fill: true, fillColor: '#F8FAFC' });
  pdf.text(p, '10.1 DUAL-TRACK LOGISTICS: LOCAL MINI-TRUCKS VS. INTERCITY HIGHWAY FREIGHT', 60, 133, { font: 'F2', size: 8.5, color: '#0F172A' });

  const logTracks = [
    {
      title: 'TRACK A: LOCAL FABRICATION DELIVERY & ON-SITE INSTALLATION',
      points: [
        'Dedicated Local Freight: Pickups, Tata Ace, and mini-trucks for short-distance local delivery (within 50 km).',
        'On-Site Fitting & Bolting: Fabricator deployment team anchors gate pillars, bolts shed trusses, and aligns railings.',
        'Site Touch-Up: Fresh primer and paint applied over on-site anchor weld burns before customer inspection.',
        'Immediate Sign-Off: Customer reviews alignment, tests gate swing, and signs physical handover receipt.'
      ]
    },
    {
      title: 'TRACK B: INDUSTRIAL FREIGHT, E-WAY BILLS & GPS TELEMATICS',
      points: [
        'Automated e-Way Bill API (Form GST EWB-01): Compliant documentation generated for consignments > Rs. 50,000.',
        'Satellite GPS Fleet Tracking: Live truck telemetry and Lorry Receipt (LR) tracking accessible via buyer dashboard.',
        'Goods-in-Transit Marine Insurance: Every shipment covered against highway collision, overturning, or water damage.',
        'Gate Inwarding: Consignee receives shipment, signs physical POD, and initiates 48-hour QA audit window.'
      ]
    }
  ];

  logTracks.forEach((lt, idx) => {
    const x = 60 + idx * 240;
    pdf.rect(p, x, 148, 230, 145, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#CBD5E1' });
    pdf.text(p, lt.title, x + 8, 164, { font: 'F2', size: 7.2, color: '#0D9488', maxWidth: 215 });

    lt.points.forEach((pt, ptIdx) => {
      pdf.bullet(p, x + 8, 185 + ptIdx * 25 + 3, '#0D9488', 2);
      pdf.text(p, pt, x + 15, 185 + ptIdx * 25, { font: 'F1', size: 6.8, color: '#334155', maxWidth: 205 });
    });
  });

  // 10.2 The 48-Hour Inward Acceptance Window
  pdf.rect(p, 50, 315, 495.28, 215, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 315, 495.28, 22, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, '10.2 CLIENT INWARDING & THE CONTRACTUAL 48-HOUR ACCEPTANCE PROTOCOL', 60, 330, { font: 'F2', size: 8.5, color: '#2DD4BF' });

  const acceptFlow = [
    { step: '1. Delivery Inwarding & Physical POD', text: 'Shipment arrives at client site. Receiving officer verifies physical crate seals and signs the Consignment Note / POD.' },
    { step: '2. QR Code Digital Dossier Access', text: 'Receiving engineer scans crate QR code on their phone to access the complete Pre-Dispatch Metrology Dossier.' },
    { step: '3. 48-Hour Quality Verification Window', text: 'Client has an ironclad 48-hour SLA window to verify dimensions and fitment. If an issue is found, client logs an NCR with 1 click.' },
    { step: '4. Automated Acceptance Handshake', text: 'If buyer signs off digitally or if 48 hours lapse without a formal NCR dispute, system triggers automated settlement handshake.' }
  ];

  acceptFlow.forEach((af, i) => {
    const yPos = 345 + i * 42;
    pdf.rect(p, 60, yPos, 475.28, 36, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, af.step, 72, yPos + 13, { font: 'F2', size: 8, color: '#0D9488' });
    pdf.text(p, af.text, 72, yPos + 25, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 450 });
  });

  // 10.3 Final Escrow Settlement & GST Tax Invoicing
  pdf.rect(p, 50, 540, 495.28, 235, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
  pdf.text(p, '10.3 FINANCIAL ESCROW SETTLEMENT & STATUTORY TAX RECONCILIATION', 65, 560, { font: 'F2', size: 8.5, color: '#0F172A' });

  const finSteps = [
    { title: 'Immediate Final Payout to Workshop', text: 'Escrow nodal bank triggers automated NEFT/RTGS release of final balance directly to workshop verified account within 2 hours of sign-off.' },
    { title: 'Platform Facilitation Margin Deduction', text: 'RKISPro automatically retains its agreed facilitation commission (5-8% on local fab, 8-12% on industrial runs) as net software and QA revenue.' },
    { title: 'Statutory CBIC GST E-Invoice Issuance', text: 'Platform generates legally compliant GST E-Invoices carrying verified Invoice Reference Numbers (IRN) under SAC Code 9988 or HSN 7308.' },
    { title: 'TDS Withholding & MSME Section 43B(h) Proof', text: 'Automated tax deduction certificates (Section 194C / 194Q) generated. 100% compliant with MSME 45-day payment statutory deadlines.' }
  ];

  finSteps.forEach((fs, i) => {
    const yPos = 580 + i * 46;
    pdf.bullet(p, 65, yPos + 3, '#0D9488', 3);
    pdf.text(p, `${fs.title}:`, 75, yPos, { font: 'F2', size: 7.8, color: '#0D9488' });
    pdf.text(p, fs.text, 75, yPos + 12, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 455 });
  });
}

// ============================================================================
// PAGE 11: EMERGENCY BREAKDOWN, DISPUTE RESOLUTION & LEAN ECONOMICS
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'CHAPTER 8: LOGISTICS & HANDOVER (PART 2)', 50, 60, { bgColor: '#FEF3C7', textColor: '#92400E' });
  pdf.text(p, 'RAPID BREAKDOWN RESPONSE, DISPUTE SOP & LEAN STARTUP ECONOMICS', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, '< 4-Hour On-Site Breakdown Crew, Non-Conformance (NCR) SOP, and Bootstrapped Capital Efficiency', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 11.1 Rapid Breakdown Response (< 4h)
  pdf.rect(p, 50, 118, 495.28, 185, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
  pdf.rect(p, 50, 118, 495.28, 22, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, '11.1 ON-DEMAND RAPID INDUSTRIAL & WORKSHOP BREAKDOWN DISPATCH (< 4 HOURS)', 60, 133, { font: 'F2', size: 8.5, color: '#F87171' });

  const emerSteps = [
    { title: 'STEP 1: Priority Alert Ingestion (< 15 Mins)', text: 'Plant manager or workshop logs emergency breakdown (e.g. broken crane arm, conveyor seizure, hydraulic cylinder burst, rolling mill drive shear).' },
    { title: 'STEP 2: Rapid Crew Mobilization (< 45 Mins)', text: 'Nearest vetted mobile maintenance crew deployed within 50 km radius, equipped with portable welding inverters, thermal cameras, and hydraulic pullers.' },
    { title: 'STEP 3: Guaranteed On-Site Arrival (< 4 Hours)', text: 'Experienced welders and precision mechanics arrive at plant gate within 4 hours across industrial hubs (Sirgitti, Urla, Bhilai, Chakan, Peenya).' },
    { title: 'STEP 4: In-Situ Triage & Fast-Track Spares (< 12 Hours)', text: 'Crew stabilizes the line. Broken parts measured on-site and routed to nearest partner CNC shop for emergency overnight replacement turnaround.' }
  ];

  emerSteps.forEach((es, i) => {
    const yPos = 148 + i * 36;
    pdf.rect(p, 60, yPos, 475.28, 32, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, es.title, 72, yPos + 12, { font: 'F2', size: 7.5, color: '#0F172A' });
    pdf.text(p, es.text, 72, yPos + 22, { font: 'F1', size: 7, color: '#475569', maxWidth: 450 });
  });

  // 11.2 Dispute Resolution & Non-Conformance (NCR) SOP
  pdf.rect(p, 50, 315, 495.28, 220, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
  pdf.rect(p, 50, 315, 495.28, 22, { fill: true, fillColor: '#F8FAFC' });
  pdf.text(p, '11.2 NON-CONFORMANCE REPORTS (NCR), ARBITRATION & 12-MONTH WARRANTY', 60, 330, { font: 'F2', size: 8.5, color: '#0F172A' });

  const ncrSteps = [
    { title: 'Automated Escrow Hold', text: 'When buyer flags a deviation within 48 hours, remaining escrow tranches are frozen immediately.' },
    { title: '24-Hour Lead Auditor Visit', text: 'RKISPro operations auditor inspects part at customer site within 24 hours to verify deviation objectively.' },
    { title: 'Three Resolution Pathways', text: 'Pathway A (Rework within 48h at workshop cost) | Pathway B (Immediate remanufacture at zero buyer cost) | Pathway C (100% Escrow refund within 3 business days if workshop fails to rectify).' },
    { title: '12-Month Mechanical Warranty', text: 'All structural and precision jobs carry an ironclad 12-Month Warranty against weld seam cracking, premature sagging, or material defects.' }
  ];

  ncrSteps.forEach((st, i) => {
    const yPos = 345 + i * 44;
    pdf.rect(p, 60, yPos, 475.28, 38, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, st.title, 72, yPos + 13, { font: 'F2', size: 7.8, color: '#0D9488' });
    pdf.text(p, st.text, 72, yPos + 25, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 450 });
  });

  // 11.3 Lean Startup Operating Economics
  pdf.rect(p, 50, 545, 495.28, 230, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
  pdf.text(p, '11.3 BOOTSTRAPPED CAPITAL-LIGHT ECONOMICS: PROFITABLE ON DAY 1', 65, 565, { font: 'F2', size: 9, color: '#2DD4BF' });

  const leanPoints = [
    { title: 'Zero Inventory Risk & Zero Plant Capex', text: 'RKISPro never buys metal stock upfront or purchases multimillion-dollar CNC machines. We aggregate uncommitted capacity across hundreds of existing workshops.' },
    { title: 'Negative Working Capital Operating Cycle', text: 'Buyer deposits milestone funds into escrow upfront before fabricators begin cutting. Zero debtor collection delays or overdue receivables.' },
    { title: 'High-Margin Expansion Fuel', text: 'Track A local fabrication provides rapid cashflow and high order volume in Bilaspur & Chhattisgarh. This funds platform engineering and expansion into high-margin Track B precision machining.' },
    { title: 'Hyper-Efficient Customer Acquisition (CAC)', text: 'Local WhatsApp referrals, contractor word-of-mouth, and factory cluster partnerships keep customer acquisition cost under Rs. 400 per order, delivering a 15x LTV/CAC ratio.' }
  ];

  leanPoints.forEach((lp, idx) => {
    const yPos = 585 + idx * 44;
    pdf.bullet(p, 65, yPos + 3, '#2DD4BF', 3);
    pdf.text(p, lp.title, 75, yPos, { font: 'F2', size: 7.8, color: '#38BDF8' });
    pdf.text(p, lp.text, 75, yPos + 12, { font: 'F1', size: 7.2, color: '#CBD5E1', maxWidth: 455 });
  });
}

// ============================================================================
// PAGE 12: MASTER DUAL-TRACK 18-STEP EXECUTION MATRIX
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'COMPLETE OPERATIONAL BLUEPRINT', 50, 60, { bgColor: '#0F172A', textColor: '#2DD4BF' });
  pdf.text(p, 'MASTER DUAL-TRACK 18-STEP END-TO-END EXECUTION MATRIX', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Complete Chronological Process: Contrasting Track A (Local Metalwork) and Track B (Industrial Machining)', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 18-Step Master Table
  const tableY = 118;
  pdf.rect(p, 50, tableY, 495.28, 20, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, '#', 55, tableY + 13, { font: 'F2', size: 7.5, color: '#2DD4BF' });
  pdf.text(p, 'PROCESS STAGE', 72, tableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
  pdf.text(p, 'TRACK A: LOCAL FABRICATION', 170, tableY + 13, { font: 'F2', size: 7.5, color: '#38BDF8' });
  pdf.text(p, 'TRACK B: INDUSTRIAL MACHINING', 335, tableY + 13, { font: 'F2', size: 7.5, color: '#CBD5E1' });
  pdf.text(p, 'SLA / TIME', 495, tableY + 13, { font: 'F2', size: 7.5, color: '#2DD4BF' });

  const steps = [
    ['01', 'Customer Registration', 'Instant Phone / WhatsApp OTP', 'GSTN API Handshake & RBAC', '< 3 Mins'],
    ['02', 'Requirement Ingestion', 'Photo, Paper Sketch, WhatsApp', '3D CAD (.STEP) & GD&T Prints', 'Immediate'],
    ['03', 'Technical Triage', 'Parametric Cut-List & Steel Grade', 'Automated 3D DFM Triage Report', '1 - 3 Hours'],
    ['04', 'Smart Shop Allocation', '3-5 Audited Local Welding Yards', '3-5 Vetted CNC Machine Shops', 'Instant'],
    ['05', 'Standardized Quoting', 'Itemized Steel + Weld Hours BOM', 'Machine Cycle + Tooling BOM', '2 - 12 Hours'],
    ['06', 'Commercial PO Award', 'Digital PO with Fixed Specs', 'Tripartite PO & Non-Circumvention', 'Buyer Choice'],
    ['07', 'Milestone Escrow Lock', 'UPI / QR / Bank Escrow Lock', 'RBI Nodal Account Escrow Lock', 'Immediate'],
    ['08', 'Gate 1: Material QA', 'Vernier Pipe Gauge & Brand Check', 'NABL MTC & OES Spectrometry', 'Day 1'],
    ['09', 'Tranche 1 Disbursement', '40% Material Advance Released', '30% Raw Stock Advance Released', '2 Hours'],
    ['10', 'Mid-Cycle Inspection', 'Gate F2: Squaring & Weld Integrity', 'Gate I2: First Article CMM Probing', 'Mid-Cycle'],
    ['11', 'Structural & NDT Test', 'Bearing Hinge & Smooth Move Test', 'Gate I3: Weld NDT & Hydro Proof', 'Post-Fab'],
    ['12', 'Tranche 2 Disbursement', '40% Fab Milestone Released', '40% Machining Milestone Released', '2 Hours'],
    ['13', 'Surface & Packing QA', 'Gate F3: Anti-Rust Primer Coat', 'Gate I4: Surface DFT & VCI Crate', 'Finish Day'],
    ['14', 'Dispatch Clearance', 'Local Mini-Truck Loading Check', 'Digital Cryptographic Gate Pass', 'Same Day'],
    ['15', 'Transport & Delivery', 'Local Transport + Site Deployment', 'GPS Highway Transit & e-Way Bill', '1 - 3 Days'],
    ['16', 'On-Site Fitting / Inward', 'Erection, Bolting & Leveling Handover', 'Client Plant Gate Receiving & POD', 'Same Day'],
    ['17', 'Acceptance Window', 'Customer On-Site OTP Sign-Off', 'Contractual 48-Hour QA Window', 'Immediate/48h'],
    ['18', 'Final Payout & Invoicing', 'Final 20% Released + GST/SAC 9988', 'Final 30% Released + E-Invoice', 'Immediate']
  ];

  steps.forEach((st, i) => {
    const rowY = tableY + 20 + i * 32;
    const bgCol = i % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
    pdf.rect(p, 50, rowY, 495.28, 32, { fill: true, stroke: true, fillColor: bgCol, strokeColor: '#E2E8F0', lineWidth: 0.5 });

    pdf.text(p, st[0], 55, rowY + 18, { font: 'F2', size: 7.5, color: '#0F172A' });
    pdf.text(p, st[1], 72, rowY + 18, { font: 'F2', size: 7.5, color: '#0F172A', maxWidth: 95 });
    pdf.text(p, st[2], 170, rowY + 18, { font: 'F1', size: 7, color: '#0D9488', maxWidth: 160 });
    pdf.text(p, st[3], 335, rowY + 18, { font: 'F1', size: 7, color: '#334155', maxWidth: 155 });
    pdf.text(p, st[4], 495, rowY + 18, { font: 'F2', size: 7.2, color: '#0F172A' });
  });

  // Final Sign-Off Seal
  const footerCardY = tableY + 20 + 18 * 32 + 10;
  pdf.rect(p, 50, footerCardY, 495.28, 70, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#0D9488', lineWidth: 1 });
  pdf.text(p, 'CERTIFICATION OF OPERATIONAL STANDARDS & COMPLIANCE', 65, footerCardY + 22, { font: 'F2', size: 9, color: '#2DD4BF' });
  pdf.text(p, 'This document constitutes the official binding standard operating procedure for all metal fabrication orders, machine shop transactions,', 65, footerCardY + 38, { font: 'F1', size: 7.5, color: '#E2E8F0' });
  pdf.text(p, 'quality gate inspections, and milestone escrow disbursements executed under the RKISPro Managed Marketplace ecosystem.', 65, footerCardY + 50, { font: 'F1', size: 7.5, color: '#E2E8F0' });
}

// Compile & Output PDF
const pdfBuffer = pdf.build();

const outputPathRoot = path.join('e:', 'RKISPro Marketplace', 'RKISPro_Complete_Operating_Manual.pdf');
const outputPathPublic = path.join('e:', 'RKISPro Marketplace', 'public', 'RKISPro_Complete_Operating_Manual.pdf');
const outputPathArtifact = path.join('C:', 'Users', 'rksc5', '.gemini', 'antigravity', 'brain', '437e1109-ff91-4847-9987-ee6829402543', 'RKISPro_Complete_Operating_Manual.pdf');

fs.writeFileSync(outputPathRoot, pdfBuffer);
console.log(`Saved root PDF: ${outputPathRoot} (${pdfBuffer.length} bytes)`);

fs.writeFileSync(outputPathPublic, pdfBuffer);
console.log(`Saved public PDF: ${outputPathPublic} (${pdfBuffer.length} bytes)`);

try {
  fs.writeFileSync(outputPathArtifact, pdfBuffer);
  console.log(`Saved artifact PDF: ${outputPathArtifact} (${pdfBuffer.length} bytes)`);
} catch (e) {
  console.error('Artifact save error:', e.message);
}

console.log('PDF Generation Complete: 12 Full Pages Generated Successfully.');
