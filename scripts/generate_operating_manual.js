const fs = require('fs');
const path = require('path');
const { PDFEngine } = require('./pdf_engine');

// Instantiate PDF generator with exact Helvetica metrics
const pdf = new PDFEngine({
  headerTitle: 'RKISPRO MANAGED INDUSTRIAL MARKETPLACE',
  headerSubtitle: 'STANDARD OPERATING PROCEDURE & SYSTEM BLUEPRINT',
  footerText: 'CONFIDENTIAL & PROPRIETARY  |  ISO 9001:2015 & NABL AUDIT COMPLIANT'
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
  pdf.badge(p, 'OFFICIAL OPERATIONAL STANDARD OPERATING PROCEDURE (SOP)', 50, 75, {
    bgColor: '#134E4A',
    textColor: '#2DD4BF',
    fontSize: 9,
    paddingX: 12,
    paddingY: 5
  });

  // Main Document Title
  pdf.text(p, 'RKISPRO', 50, 130, { font: 'F2', size: 36, color: '#FFFFFF' });
  pdf.text(p, 'MANAGED INDUSTRIAL MARKETPLACE', 50, 162, { font: 'F2', size: 18, color: '#2DD4BF' });
  pdf.text(p, 'Comprehensive End-to-End Operational Manual', 50, 198, { font: 'F2', size: 21, color: '#F8FAFC' });
  pdf.text(p, 'The Definitive Architecture: From User Login to Final Vendor Escrow Settlement', 50, 225, { font: 'F3', size: 11, color: '#94A3B8' });

  // Divider Line
  pdf.line(p, 50, 248, 545.28, 248, { color: '#334155', lineWidth: 1.5 });

  // Mission Callout Card
  pdf.rect(p, 50, 268, 495.28, 105, { fill: true, stroke: true, fillColor: '#1E293B', strokeColor: '#0D9488', lineWidth: 1 });
  pdf.text(p, 'THE OPERATIONAL COMMITMENT & VALUE PROPOSITION', 70, 290, { font: 'F2', size: 9.5, color: '#2DD4BF' });
  pdf.text(p, 'RKISPro replaces unvetted B2B lead directories with a 100% contractually guaranteed, managed manufacturing', 70, 312, { font: 'F1', size: 9.5, color: '#E2E8F0' });
  pdf.text(p, 'ecosystem. We combine automated 3D DFM triage, a 40-point physical shop-floor audit, a 4-Gate metrology', 70, 328, { font: 'F1', size: 9.5, color: '#E2E8F0' });
  pdf.text(p, 'protocol, and RBI-regulated milestone escrow accounts to ensure precision execution, zero financial default', 70, 344, { font: 'F1', size: 9.5, color: '#E2E8F0' });
  pdf.text(p, 'risk, and guaranteed component quality.', 70, 360, { font: 'F1', size: 9.5, color: '#E2E8F0' });

  // 4 Pillar Pillars Box
  const colWidth = 118;
  const pillars = [
    { title: '40-Point Vetting', sub: 'Physical machine bed and NABL calibration audit', col: '#38BDF8' },
    { title: '4-Gate Metrology', sub: '3-Axis CMM, OES MTC & weld NDT testing', col: '#2DD4BF' },
    { title: 'Milestone Escrow', sub: 'RBI-compliant nodal fund protection', col: '#FBBF24' },
    { title: '< 4h Breakdown', sub: 'Rapid on-site plant emergency response', col: '#F87171' }
  ];

  pillars.forEach((item, idx) => {
    const x = 50 + idx * (colWidth + 7.7);
    pdf.rect(p, x, 395, colWidth, 75, { fill: true, stroke: true, fillColor: '#1E293B', strokeColor: '#334155' });
    pdf.rect(p, x, 395, colWidth, 4, { fill: true, fillColor: item.col });
    pdf.text(p, item.title, x + 8, 418, { font: 'F2', size: 9, color: '#FFFFFF' });
    pdf.text(p, item.sub, x + 8, 436, { font: 'F1', size: 7.5, color: '#94A3B8', maxWidth: colWidth - 16 });
  });

  // Metadata Panel - RESTRUCTURED TO AVOID ANY TEXT OVERLAPPING
  pdf.rect(p, 50, 495, 495.28, 255, { fill: true, stroke: true, fillColor: '#090D16', strokeColor: '#1E293B' });
  pdf.text(p, 'SYSTEM SPECIFICATIONS & DOCUMENT CONTROL', 70, 520, { font: 'F2', size: 10, color: '#38BDF8' });
  pdf.line(p, 70, 532, 525.28, 532, { color: '#1E293B', lineWidth: 0.75 });

  const metaRows = [
    { label: 'Document Reference:', val: 'RKISPRO-SOP-E2E-2026-V2.4', rightLabel: 'Classification:', rightVal: 'CONFIDENTIAL / ENTERPRISE' },
    { label: 'Platform Release:', val: 'v2.4.0 Production Architecture', rightLabel: 'Target Ecosystem:', rightVal: 'Machining, Heavy Fab & Plants' },
    { label: 'Regulatory Framework:', val: 'RBI Nodal Escrow / CBIC GST SAC 9988 / TDS 194C & 194Q', rightLabel: '', rightVal: '' },
    { label: 'Quality Standards:', val: 'ISO 9001:2015, ASME Sec IX (Welding), ASTM E1444 (NDT)', rightLabel: '', rightVal: '' },
    { label: 'Metrology Mandate:', val: 'Zeiss / Mitutoyo 3-Axis CMM (ISO 10360) + NABL Spectrometry', rightLabel: '', rightVal: '' },
    { label: 'Operational Scope:', val: 'Pre-Seed Pilot Validation Corridor: Pune-Chakan Manufacturing Belt', rightLabel: '', rightVal: '' }
  ];

  metaRows.forEach((row, i) => {
    const yPos = 552 + i * 31;
    pdf.text(p, row.label, 70, yPos, { font: 'F2', size: 8, color: '#94A3B8' });
    if (row.rightLabel) {
      pdf.text(p, row.val, 195, yPos, { font: 'F4', size: 8, color: '#F8FAFC' });
      pdf.text(p, row.rightLabel, 340, yPos, { font: 'F2', size: 8, color: '#94A3B8' });
      pdf.text(p, row.rightVal, 425, yPos, { font: 'F4', size: 8, color: '#2DD4BF' });
    } else {
      pdf.text(p, row.val, 195, yPos, { font: 'F4', size: 8, color: '#F8FAFC', maxWidth: 330 });
    }
  });

  // Footer Disclaimer (Sanitized for clean PDF Type 1 encoding)
  pdf.text(p, '(c) 2026 RKISPro Engineering Technologies Pvt. Ltd. All rights reserved. Strictly confidential.', 50, 785, { font: 'F1', size: 8, color: '#64748B' });
  pdf.text(p, 'Authorized for institutional buyers, vetted machine shop partners, and regulatory compliance auditors.', 50, 800, { font: 'F3', size: 7.5, color: '#475569' });
}

// ============================================================================
// PAGE 2: TABLE OF CONTENTS & CORE COMPARISON MATRIX (Fixed Card Overlaps)
// ============================================================================
{
  const p = pdf.addPage();
  pdf.text(p, 'DOCUMENT OUTLINE & EXECUTIVE ARCHITECTURE', 50, 68, { font: 'F2', size: 14, color: '#0F172A' });
  pdf.text(p, 'Overview of the 8 Operational Chapters and Core Industry Comparison', 50, 82, { font: 'F3', size: 9, color: '#64748B' });

  // 2-Column Table of Contents with FIXED page badge coordinates
  const chapters = [
    { num: '01', title: 'Executive Summary & Operating Model', page: 'Pg 3', desc: 'Managed Marketplace vs. Directory' },
    { num: '02', title: 'Buyer Onboarding & Structured RFQ Ingestion', page: 'Pg 4', desc: 'GSTIN KYC, 3D CAD, STEP & DFM Triage' },
    { num: '03', title: 'Vendor Vetting & 40-Point Machine Shop Audit', page: 'Pg 5', desc: 'Machine Bed Profiling & Quality Vetting' },
    { num: '04', title: 'Smart Routing, Quoting & Tripartite PO Award', page: 'Pg 6', desc: 'Itemized BOM, NDA & Non-Circumvention' },
    { num: '05', title: 'Milestone Escrow Banking & Financial Security', page: 'Pg 7', desc: 'RBI Nodal Accounts & 30/40/30 Tranches' },
    { num: '06', title: '4-Gate Quality Assurance & Metrology Protocol', page: 'Pg 8-9', desc: 'OES MTC, 3-Axis CMM, NDT & DFT' },
    { num: '07', title: 'Logistics, Receiving & Escrow Settlement', page: 'Pg 10', desc: 'e-Way Bill, 48h Inspection & GST E-Invoice' },
    { num: '08', title: 'Emergency Breakdown & Dispute Engine', page: 'Pg 11-12', desc: '< 4h Dispatch, NCR, Warranty & Workflow' }
  ];

  chapters.forEach((ch, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 50 + col * 255;
    const y = 105 + row * 46;

    pdf.rect(p, x, y, 245, 40, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.rect(p, x, y, 28, 40, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, ch.num, x + 14, y + 25, { font: 'F2', size: 10, color: '#2DD4BF', align: 'center' });
    
    // Title with strict maxWidth so it never touches the page number pill
    pdf.text(p, ch.title, x + 35, y + 16, { font: 'F2', size: 7.5, color: '#0F172A', maxWidth: 160 });
    pdf.text(p, ch.desc, x + 35, y + 29, { font: 'F1', size: 7, color: '#64748B', maxWidth: 160 });
    
    // Discrete page pill on right
    pdf.badge(p, ch.page, x + 205, y + 14, { bgColor: '#E2E8F0', textColor: '#0D9488', fontSize: 7, paddingX: 5, paddingY: 3 });
  });

  // Section Heading: Comparison Matrix
  pdf.line(p, 50, 310, 545.28, 310, { color: '#CBD5E1', lineWidth: 1 });
  pdf.text(p, 'STRUCTURAL COMPARISON: UNMANAGED DIRECTORY VS. RKISPRO MANAGED ECOSYSTEM', 50, 330, { font: 'F2', size: 10.5, color: '#0F172A' });
  pdf.text(p, "Why India's enterprise industrial buyers cannot rely on open lead directories for precision parts", 50, 344, { font: 'F3', size: 8.5, color: '#64748B' });

  // Comparison Table Header
  const tableY = 360;
  pdf.rect(p, 50, tableY, 495.28, 22, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, 'OPERATING CRITERIA', 60, tableY + 15, { font: 'F2', size: 8, color: '#FFFFFF' });
  pdf.text(p, 'OPEN DIRECTORY (e.g., IndiaMART)', 175, tableY + 15, { font: 'F2', size: 8, color: '#CBD5E1' });
  pdf.text(p, 'RKISPRO MANAGED MARKETPLACE', 350, tableY + 15, { font: 'F2', size: 8, color: '#2DD4BF' });

  const matrixRows = [
    {
      label: 'Vendor Verification',
      directory: 'Self-registered listing; zero physical inspection.',
      rkispro: 'Mandatory 40-point in-person audit; machine run-out verified.'
    },
    {
      label: 'Pricing Transparency',
      directory: 'Unstructured lump-sum bids; hidden post-order surcharges.',
      rkispro: 'Itemized BOM quotes (Material, Spindle Hrs, Tooling, Secondary).'
    },
    {
      label: 'Engineering Triage',
      directory: 'Unchecked drawings broadcasted to random brokers.',
      rkispro: 'Algorithmic 3D DFM & in-house metrologist tolerance review.'
    },
    {
      label: 'Quality Liability',
      directory: 'Zero platform liability; buyer absorbs full scrap losses.',
      rkispro: 'Contractual 100% guarantee; 4-Gate NABL & CMM sign-off.'
    },
    {
      label: 'Payment Security',
      directory: 'Direct vendor advance wire transfers; high default risk.',
      rkispro: 'RBI-regulated dual-party milestone escrow with tranche locks.'
    },
    {
      label: 'Dispute Resolution',
      directory: 'None. Parties left to expensive civil litigation.',
      rkispro: '24-hour metrology re-audit; mandatory rework or full escrow refund.'
    },
    {
      label: 'Plant Breakdown SLA',
      directory: 'No on-site capability or emergency services.',
      rkispro: 'Guaranteed < 4-hour on-site rapid response mobilization.'
    }
  ];

  matrixRows.forEach((row, i) => {
    const rowY = tableY + 22 + i * 50;
    const bgCol = i % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
    pdf.rect(p, 50, rowY, 495.28, 50, { fill: true, stroke: true, fillColor: bgCol, strokeColor: '#E2E8F0', lineWidth: 0.5 });
    
    // Criteria
    pdf.text(p, row.label, 60, rowY + 20, { font: 'F2', size: 8, color: '#0F172A' });
    // Directory
    pdf.text(p, row.directory, 175, rowY + 18, { font: 'F1', size: 7.5, color: '#64748B', maxWidth: 160 });
    // RKISPro
    pdf.text(p, row.rkispro, 350, rowY + 18, { font: 'F2', size: 7.5, color: '#0D9488', maxWidth: 185 });
  });

  // Callout Footnote
  pdf.rect(p, 50, 745, 495.28, 40, { fill: true, stroke: true, fillColor: '#F0FDFA', strokeColor: '#0D9488', lineWidth: 0.75 });
  pdf.text(p, 'OPERATIONAL TAKEAWAY:', 65, 760, { font: 'F2', size: 8, color: '#0F766E' });
  pdf.text(p, 'RKISPro acts as the Contractual Seller of Record and Principal Metrology Auditor. The buyer enters into', 65, 772, { font: 'F1', size: 7.5, color: '#134E4A' });
  pdf.text(p, 'a single master contract with RKISPro, eliminating supplier fragmentation and counterparty default risk.', 65, 782, { font: 'F1', size: 7.5, color: '#134E4A' });
}

// ============================================================================
// PAGE 3: BUYER ONBOARDING & STRUCTURED RFQ INGESTION
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'PHASE 1: CLIENT SOURCING ARCHITECTURE', 50, 60, { bgColor: '#E0F2FE', textColor: '#0369A1' });
  pdf.text(p, 'BUYER REGISTRATION, KYC & STRUCTURED RFQ ENGINE', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'From Enterprise User Verification to Multi-Format CAD/GD&T Ingestion & DFM Triage', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 1.1 Enterprise User Onboarding Box
  pdf.rect(p, 50, 118, 495.28, 140, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 118, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '1.1 ENTERPRISE BUYER ONBOARDING & REAL-TIME KYC VALIDATION', 60, 133, { font: 'F2', size: 8.5, color: '#0F172A' });

  const kycSteps = [
    { title: 'Corporate Identity Verification', text: 'Real-time GSTN API handshake validating GSTIN, Legal Entity Name, PAN, and active registered tax status. Disallows unverified fly-by-night entities.' },
    { title: 'Multi-Tenant RBAC Hierarchy', text: 'Enterprise accounts configure 3-tier authorization: (1) Procurement Buyer (RFQ creation), (2) Lead Engineer (DFM & tolerance waiver approval), (3) Finance Officer (Escrow funding & GST invoice clearance).' },
    { title: 'Credit & Payment Profiling', text: 'Instant credit score indexing and verification of corporate banking credentials for automated escrow disbursement and bank reconciliation.' }
  ];

  kycSteps.forEach((st, i) => {
    const yPos = 152 + i * 36;
    pdf.rect(p, 60, yPos, 14, 14, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, String(i + 1), 67, yPos + 10, { font: 'F2', size: 8, color: '#2DD4BF', align: 'center' });
    pdf.text(p, st.title, 82, yPos + 8, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, st.text, 82, yPos + 20, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });

  // 1.2 Structured RFQ Ingestion Engine
  pdf.rect(p, 50, 270, 495.28, 230, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 270, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '1.2 MULTI-FORMAT CAD INGESTION & PARAMETRIC RFQ SPECIFICATION', 60, 285, { font: 'F2', size: 8.5, color: '#0F172A' });

  // 3 Columns of Specifications
  const rfqCols = [
    {
      title: 'Digital File Formats',
      points: [
        '3D CAD Models: .STEP, .STP, .IGES, .SLDPRT, .IPT for machine toolpath calculation.',
        '2D Engineering Prints: Vector PDF / DXF with ASME Y14.5 / ISO 1101 GD&T datum symbols.',
        'Critical Feature Callouts: True Position, Concentricity, Runout, and Flatness tolerances.'
      ]
    },
    {
      title: 'Material & Metallurgy',
      points: [
        'Certified Alloy Grade: SS316L, AISI 4140, Al 6061-T6, Inconel 718, Brass CW614N.',
        'Traceability Requirement: Mandatory NABL Mill Test Certificate (MTC) with heat lot numbers.',
        'Raw Stock Condition: Forged, Hot-Rolled Bar, Cold-Drawn, Seamless Tube, or Cast.'
      ]
    },
    {
      title: 'Secondary & Metrology Specs',
      points: [
        'Heat Treatment: Case hardening (HRC 58-62), Quench & Temper, Nitriding, Annealing.',
        'Surface Plating: Hard Anodizing Type III (50um), Electroless Nickel (ENP), Black Oxide.',
        'Testing Protocols: Radiographic (RT II), Ultrasonic (UT), Magnetic Particle (MPT), CMM.'
      ]
    }
  ];

  rfqCols.forEach((col, idx) => {
    const colX = 60 + idx * 160;
    pdf.text(p, col.title, colX, 310, { font: 'F2', size: 8, color: '#0D9488' });
    col.points.forEach((pt, ptIdx) => {
      pdf.bullet(p, colX, 325 + ptIdx * 54 + 4, '#0D9488', 2.5);
      pdf.text(p, pt, colX + 8, 325 + ptIdx * 54, { font: 'F1', size: 7, color: '#334155', maxWidth: 142 });
    });
  });

  // 1.3 Automated DFM & Engineering Triage
  pdf.rect(p, 50, 515, 495.28, 260, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 515, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '1.3 AUTOMATED 3D DFM ANALYSIS & IN-HOUSE METROLOGY REDLINE TRIAGE', 60, 530, { font: 'F2', size: 8.5, color: '#0F172A' });

  const dfmSteps = [
    { title: 'STEP 1: Geometry Parsing', desc: 'Automated algorithms scan for deep pockets (L/D > 8), micro-radii (< 0.5mm), and thin walls (< 1.2mm) that cause chatter or tool deflection.' },
    { title: 'STEP 2: Machine Feasibility', desc: 'Verifies whether part requires 3-axis, 4-axis rotary, or 5-axis simultaneous machining based on undercut geometry and tool access angles.' },
    { title: 'STEP 3: Metrologist Review', desc: 'Internal RKISPro Metrology Engineers audit datum reference frames, thread classes, and gauge access clearances within 4 hours.' },
    { title: 'STEP 4: Redline Engineering Report', desc: 'Generates an interactive DFM Report with cost-saving tolerance recommendations, shared with buyer for one-click digital approval.' }
  ];

  dfmSteps.forEach((st, idx) => {
    const yPos = 550 + idx * 56;
    pdf.rect(p, 60, yPos, 475.28, 48, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.rect(p, 60, yPos, 4, 48, { fill: true, fillColor: '#0D9488' });
    pdf.text(p, st.title, 75, yPos + 16, { font: 'F2', size: 8.5, color: '#0F172A' });
    pdf.text(p, st.desc, 75, yPos + 30, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });
}

// ============================================================================
// PAGE 4: VENDOR VETTING & 40-POINT MACHINE SHOP AUDIT
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'PHASE 2: SUPPLY CHAIN QUALITY ASSURANCE', 50, 60, { bgColor: '#FEF3C7', textColor: '#B45309' });
  pdf.text(p, 'VENDOR ONBOARDING & 40-POINT MACHINE SHOP AUDIT', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'How RKISPro Inspects, Tests, and Digitally Profiles Precision Machine Shops (Top 18% Pass Rate)', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 40-Point Audit Summary Card
  pdf.rect(p, 50, 118, 495.28, 65, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
  pdf.text(p, 'RIGOROUS PHYSICAL VERIFICATION: ELIMINATING THE "BROKER" LAYER', 65, 138, { font: 'F2', size: 9.5, color: '#2DD4BF' });
  pdf.text(p, 'Unlike lead portals where anyone with a smartphone can post as a manufacturer, RKISPro mandates a full', 65, 155, { font: 'F1', size: 8, color: '#E2E8F0' });
  pdf.text(p, 'physical audit conducted by certified Lead Quality Auditors. No machine shop receives an RFQ without direct inspection.', 65, 168, { font: 'F1', size: 8, color: '#E2E8F0' });

  // 4 Audit Pillars Grid
  const auditGrid = [
    {
      title: 'Pillar 1: Machine Health & Spindle Dynamics (10 Pts)',
      points: [
        'Spindle Run-Out Verification: Dial test indicator (DTI) measurement (< 0.003 mm at taper).',
        'Axis Backlash & Ball Screw Wear: Laser interferometer or linear scale repeatability checks.',
        'Bed Rigidity & Flatness: Precision spirit level / autocollimator audit of guide ways.',
        'Spindle Power & Continuous Torque: Checking high-load cut stability without thermal drift.'
      ]
    },
    {
      title: 'Pillar 2: Metrology & Calibration Traceability (10 Pts)',
      points: [
        'Climate-Controlled Quality Room: Continuous 20 deg C +/- 2 deg C temperature logging.',
        'NABL Calibration Certificates: Valid calibration stickers on verniers, micrometers, and gauges.',
        'CMM Capability: In-house or contracted access to certified 3-axis Coordinate Measuring Machines.',
        'Gauge R&R: Measurement system analysis (repeatability and reproducibility) on calipers.'
      ]
    },
    {
      title: 'Pillar 3: Process Control & Standard Operating Procedures (10 Pts)',
      points: [
        'Material Segregation Protocols: Dedicated quarantine bins for incoming raw stock vs. scrap.',
        'Traceability Tagging: Job traveler cards tracking operator, machine, shift, and heat lot.',
        'Tool Presetter & Tool Life Management: Automated offsets to prevent dimensional creep.',
        'First Article Inspection (FAI) Rigor: Formal documented sign-off before commencing batch runs.'
      ]
    },
    {
      title: 'Pillar 4: Statutory Compliance & Captive Infrastructure (10 Pts)',
      points: [
        'Power Infrastructure: Sanctioned HT/LT load with captive diesel generator (preventing cut stops).',
        'Statutory Filings: Verified GSTIN, active MSME Udyam, Factories Act License, PCB consent.',
        'Workplace Safety & EHS: PPE adherence, fire suppression systems, and clean shop floor 5S.',
        'Financial Solvency: Working capital review ensuring ability to procure raw stock without defaults.'
      ]
    }
  ];

  auditGrid.forEach((box, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 50 + col * 255;
    const y = 195 + row * 265;

    pdf.rect(p, x, y, 245, 250, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1', lineWidth: 0.75 });
    pdf.rect(p, x, y, 245, 26, { fill: true, fillColor: '#F8FAFC' });
    pdf.line(p, x, y + 26, x + 245, y + 26, { color: '#E2E8F0', lineWidth: 0.75 });
    pdf.text(p, box.title, x + 10, y + 17, { font: 'F2', size: 7.5, color: '#0F172A' });

    box.points.forEach((pt, ptIdx) => {
      pdf.text(p, `[PASS] ${pt}`, x + 10, y + 42 + ptIdx * 52, { font: 'F1', size: 7, color: '#334155', maxWidth: 225 });
    });
  });

  // Footer Tagline
  pdf.rect(p, 50, 740, 495.28, 45, { fill: true, stroke: true, fillColor: '#FEF3C7', strokeColor: '#F59E0B', lineWidth: 0.75 });
  pdf.text(p, 'THE DIGITAL TWIN SHOP PROFILING SYSTEM', 65, 756, { font: 'F2', size: 8, color: '#92400E' });
  pdf.text(p, 'Every approved vendor is digitized into RKISPro capacity matrix: bed dimensions (X/Y/Z travel), spindle RPM,', 65, 768, { font: 'F1', size: 7.5, color: '#78350F' });
  pdf.text(p, 'live tooling slots, and active spindle utilization. This ensures RFQs are routed ONLY to shops with real open capacity.', 65, 778, { font: 'F1', size: 7.5, color: '#78350F' });
}

// ============================================================================
// PAGE 5: SMART ROUTING, BOM QUOTING & TRIPARTITE PO (Fixed Table & Text Overlap)
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'PHASE 3: COMMERCIAL ENGINE & WORK ORDER', 50, 60, { bgColor: '#EDE9FE', textColor: '#6D28D9' });
  pdf.text(p, 'SMART ROUTING, STANDARDIZED BOM QUOTING & PO CONTRACT', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Algorithmic Capacity Allocation, Itemized BOM Transparency, and Legal Protection Architecture', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 4.1 Blind Quoting & Algorithmic Allocation
  pdf.rect(p, 50, 118, 495.28, 115, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 118, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '4.1 TARGETED SMART MATCHING & ANONYMIZED BLIND QUOTING', 60, 133, { font: 'F2', size: 8.5, color: '#0F172A' });

  const p41Points = [
    'No Open Broadcasting: RFQs are never exposed to public internet scrapers. The platform algorithm identifies the top 3 to 5 matching facilities based on alloy specialization, machine bed dimensions, and verified open hours.',
    'Anonymized Intellectual Property Protection: Engineering prints are watermarked and sanitized of customer names.',
    'Outlier Anomaly Filter: Submissions deviating by more than 25% from platform cost models are held for manual review. This prevents deceptive low-ball bids that later trigger delivery failure or post-award renegotiations.'
  ];

  p41Points.forEach((pt, i) => {
    const yPos = 152 + i * 26;
    pdf.bullet(p, 65, yPos + 3, '#0D9488', 3);
    pdf.text(p, pt, 74, yPos, { font: 'F1', size: 7.5, color: '#334155', maxWidth: 460 });
  });

  // 4.2 Standardized Line-Item BOM Breakdown Table - FIXED COLUMN OVERLAPS
  pdf.rect(p, 50, 245, 495.28, 260, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 245, 495.28, 22, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, '4.2 STANDARDIZED LINE-ITEM BOM COST MODEL (WHAT THE BUYER SEES)', 60, 260, { font: 'F2', size: 8.5, color: '#2DD4BF' });
  pdf.text(p, 'EST. SHARE', 530, 260, { font: 'F2', size: 8, color: '#FFFFFF', align: 'right' });

  const costRows = [
    { comp: '1. Certified Raw Material', desc: 'Net finished weight + turning/milling swarf allowance. Indexed to active NABL metal index (MCX/LME).', share: '35% - 45%' },
    { comp: '2. CNC Spindle Machining', desc: 'Cycle time (minutes) x hourly machine rate (3-Axis: Rs. 650-900/hr, 5-Axis: Rs. 1,800-2,600/hr).', share: '25% - 35%' },
    { comp: '3. Tooling & Fixturing', desc: 'Special carbide end-mills, threading inserts, boring bars, and dedicated machining fixtures.', share: '5% - 10%' },
    { comp: '4. Secondary Treatments', desc: 'Vacuum heat treatment (HRC 58-62), Type III hard anodizing (50um), or electroless nickel plating.', share: '8% - 12%' },
    { comp: '5. Metrology & NABL CMM', desc: '3-Axis CMM coordinate measurement, surface profilometry, and optical emission spectrometer PMI.', share: '3% - 5%' },
    { comp: '6. VCI Packaging & Freight', desc: 'Vapor corrosion inhibitor oil, vacuum bagging, custom wooden crating, transit insurance, and GPS carrier.', share: '4% - 7%' }
  ];

  costRows.forEach((row, i) => {
    const rowY = 275 + i * 36;
    const bgCol = i % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
    pdf.rect(p, 50, rowY, 495.28, 36, { fill: true, stroke: true, fillColor: bgCol, strokeColor: '#E2E8F0', lineWidth: 0.5 });
    pdf.text(p, row.comp, 60, rowY + 16, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, row.desc, 185, rowY + 14, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 275 });
    pdf.text(p, row.share, 530, rowY + 16, { font: 'F2', size: 8, color: '#0D9488', align: 'right' });
  });

  // 4.3 Contractual PO & Non-Circumvention
  pdf.rect(p, 50, 520, 495.28, 255, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 520, 495.28, 22, { fill: true, fillColor: '#F1F5F9' });
  pdf.text(p, '4.3 DIGITAL PURCHASE ORDER & TRIPARTITE LEGAL ARCHITECTURE', 60, 535, { font: 'F2', size: 8.5, color: '#0F172A' });

  const legalClauses = [
    { title: 'Contractual Seller of Record', text: 'RKISPro acts as the primary contractual counterparty to the buyer. This ensures that the buyer does not face legal exposure or uncoordinated claims from sub-tier manufacturing shops.' },
    { title: 'Strict 24-Month Non-Circumvention', text: 'Both buyers and machine shops execute binding digital covenants prohibiting direct transactional off-platform bypass. Any circumvention triggers liquidated damages equal to 30% of lifetime contract value.' },
    { title: 'Absolute IP & CAD Indemnity', text: 'Proprietary CAD geometry, tooling blueprints, and production volumes are legally shielded. Machine shops are bound by cryptographic non-disclosure terms; drawings are expunged upon project closure.' },
    { title: 'Enforceable Liquidated Damages for Late Delivery', text: 'Contracts specify a penalty of 0.5% per day for unexcused delays beyond the agreed dispatch date, capped at 10% of total contract value, automatically deducted from vendor payout.' }
  ];

  legalClauses.forEach((cl, i) => {
    const yPos = 552 + i * 54;
    pdf.rect(p, 60, yPos, 475.28, 46, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, cl.title, 72, yPos + 15, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, cl.text, 72, yPos + 28, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });
}

// ============================================================================
// PAGE 6: MILESTONE ESCROW BANKING & FINANCIAL SECURITY (Fixed Bullet Characters)
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'PHASE 4: CAPITAL & ESCROW ARCHITECTURE', 50, 60, { bgColor: '#DCFCE7', textColor: '#15803D' });
  pdf.text(p, 'MILESTONE ESCROW BANKING & REGULATORY COMPLIANCE', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'RBI Nodal Account Governance, Tranche Disbursement Triggers, and Working Capital Protection', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // Escrow Overview Card
  pdf.rect(p, 50, 118, 495.28, 70, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
  pdf.text(p, 'ELIMINATING THE TWIN PLAGUES: VENDOR ADVANCE FRAUD & BUYER 90-DAY PAYMENT DEFAULTS', 65, 138, { font: 'F2', size: 9, color: '#2DD4BF' });
  pdf.text(p, 'In traditional manufacturing, buyers risk losing 30-50% advances to unfulfilled orders, while vendors suffer devastating', 65, 155, { font: 'F1', size: 8, color: '#E2E8F0' });
  pdf.text(p, "90-day overdue receivables. RKISPro's RBI-regulated Escrow Account eliminates both counterparty risks simultaneously.", 65, 168, { font: 'F1', size: 8, color: '#E2E8F0' });

  // 3 Tranche Diagram Boxes
  const tranches = [
    {
      num: 'TRANCHE 1: 30%',
      title: 'Raw Material Procurement Advance',
      trigger: 'Trigger: Gate 1 Verification (NABL Mill Test Certificate + OES Spectrometry Sign-off).',
      purpose: 'Enables machine shop to purchase certified prime raw stock (SS, Alloy, Tool Steel) immediately without depleting their own working capital lines.'
    },
    {
      num: 'TRANCHE 2: 40%',
      title: 'Machining & Structural Completion',
      trigger: 'Trigger: Gate 2 (FAI CMM Report) & Gate 3 (Weld NDT / Hydro Pressure Test Sign-off).',
      purpose: 'Compensates the vendor for machine spindle hours, high-wear carbide tooling, and secondary heat-treatment / surface plating expenses.'
    },
    {
      num: 'TRANCHE 3: 30%',
      title: 'Final Inward Acceptance & Payout',
      trigger: 'Trigger: Gate 4 (Gate Pass, Dispatch Tracking) + Buyer 48h Plant Receiving Inspection.',
      purpose: 'Final vendor payout minus platform commission. Released immediately upon customer sign-off or after 48h automated acceptance handshake.'
    }
  ];

  tranches.forEach((tr, idx) => {
    const yPos = 205 + idx * 105;
    pdf.rect(p, 50, yPos, 495.28, 95, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 50, yPos, 495.28, 22, { fill: true, fillColor: '#F8FAFC' });
    pdf.line(p, 50, yPos + 22, 545.28, yPos + 22, { color: '#E2E8F0', lineWidth: 0.75 });

    pdf.text(p, tr.num, 65, yPos + 15, { font: 'F2', size: 8.5, color: '#0D9488' });
    pdf.text(p, tr.title, 170, yPos + 15, { font: 'F2', size: 8.5, color: '#0F172A' });

    pdf.text(p, tr.trigger, 65, yPos + 38, { font: 'F2', size: 8, color: '#166534' });
    pdf.text(p, tr.purpose, 65, yPos + 55, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 460 });
  });

  // Banking Security & Regulatory Framework
  pdf.rect(p, 50, 535, 495.28, 245, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
  pdf.text(p, 'REGULATORY COMPLIANCE & ESCROW SECURITY ARCHITECTURE', 65, 555, { font: 'F2', size: 9, color: '#0F172A' });

  const bankSpecs = [
    { title: 'RBI Nodal Account Governance', text: "Escrow balances are maintained in segregated nodal trust accounts under Reserve Bank of India (RBI) guidelines. Funds never touch RKISPro's operational balance sheet, insulating buyers and vendors from corporate insolvency." },
    { title: 'Two-Factor Cryptographic Release', text: 'Escrow disbursements cannot be triggered manually or arbitrarily. Release requires dual cryptographic signatures: (1) RKISPro Certified Metrology Engineer inspection approval, and (2) System webhook verification.' },
    { title: 'Full Dispute Lock & Stop-Payment Mechanism', text: 'If a buyer or metrology inspector identifies an unapproved dimensional deviation, a 1-click Stop-Payment Hold freezes the remaining tranches in escrow until an independent metrology re-audit is conducted within 24 hours.' },
    { title: 'Working Capital MSME Invoice Financing Integration', text: 'Because work orders are backed by 100% funded escrow, vetted machine shops can leverage RKISPro POs to access instantaneous low-cost invoice discounting through partner NBFCs at prime rates.' }
  ];

  bankSpecs.forEach((spec, i) => {
    const yPos = 575 + i * 48;
    pdf.bullet(p, 65, yPos + 3, '#0D9488', 3);
    pdf.text(p, `${spec.title}:`, 75, yPos, { font: 'F2', size: 8, color: '#0D9488' });
    pdf.text(p, spec.text, 75, yPos + 12, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 455 });
  });
}

// ============================================================================
// PAGE 7: 4-GATE QUALITY ASSURANCE (GATES 1 & 2) (Fixed Overflowing Headers)
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'PHASE 5: METROLOGY & QUALITY CONTROL (PART 1)', 50, 60, { bgColor: '#FEE2E2', textColor: '#B91C1C' });
  pdf.text(p, '4-GATE QUALITY ASSURANCE: RAW MATERIAL & CMM METROLOGY', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Gate 1 (Raw Material Verification & Spectroscopy) and Gate 2 (First Article CMM Inspection)', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // Gate 1 Deep Dive - FIXED HEADER OVERFLOW
  pdf.rect(p, 50, 118, 495.28, 305, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
  pdf.rect(p, 50, 118, 495.28, 28, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, 'GATE 1: RAW MATERIAL INTEGRITY, NABL MTC & SPECTROMETRIC AUDIT', 60, 136, { font: 'F2', size: 8.5, color: '#FFFFFF' });
  pdf.badge(p, 'TRANCHE 1 PREREQUISITE', 535, 131, { bgColor: '#1E293B', textColor: '#2DD4BF', fontSize: 7, align: 'right' });

  const g1Points = [
    {
      title: 'Eliminating Scrap-Melt & Counterfeit Alloys',
      desc: 'The single largest cause of premature industrial component failure is spurious raw stock. Vendors are prohibited from cutting metal until raw material is verified against platform standards.'
    },
    {
      title: 'NABL-Accredited Mill Test Certificate (MTC) Verification',
      desc: 'Vendor must upload the original primary producer MTC (e.g., Jindal, Tata Steel, Hindalco, SAIL) carrying unique heat numbers, chemical melt breakdown, and mechanical yield/tensile test data.'
    },
    {
      title: 'Positive Material Identification (PMI) Spectrometry',
      desc: 'RKISPro field engineers or certified testing labs perform Optical Emission Spectrometry (OES) or handheld X-Ray Fluorescence (XRF) to cross-verify exact percentages of Chromium, Nickel, Molybdenum, Carbon, and Sulfur.'
    },
    {
      title: 'Raw Stock Ultrasonic Testing (UT)',
      desc: 'For heavy forged blocks or thick plates (> 25mm) subject to extreme cyclic stress, ultrasonic testing is conducted per ASTM A388 to detect internal pipe shrinkage, micro-voids, or sub-surface laminations.'
    },
    {
      title: 'Digital Quarantine Sign-Off',
      desc: 'Once chemical and mechanical properties match customer specifications, the raw material is tagged with an RKISPro QR barcode, clearing the job for spindle allocation and triggering Tranche 1 release.'
    }
  ];

  g1Points.forEach((pt, i) => {
    const yPos = 155 + i * 54;
    pdf.rect(p, 60, yPos, 475.28, 46, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, `${i + 1}. ${pt.title}`, 72, yPos + 15, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, pt.desc, 72, yPos + 28, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });

  // Gate 2 Deep Dive - FIXED HEADER OVERFLOW
  pdf.rect(p, 50, 440, 495.28, 335, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
  pdf.rect(p, 50, 440, 495.28, 28, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, 'GATE 2: FIRST ARTICLE INSPECTION (FAI) & 3-AXIS CMM METROLOGY', 60, 458, { font: 'F2', size: 8.5, color: '#FFFFFF' });
  pdf.badge(p, 'BATCH RUN GREENLIGHT', 535, 453, { bgColor: '#1E293B', textColor: '#FBBF24', fontSize: 7, align: 'right' });

  const g2Points = [
    {
      title: 'Zero Tolerance for Full-Batch Tooling Scrap',
      desc: 'To prevent mass-production errors caused by CNC program typos or tool wear, the first 3 completed components undergo an exhaustive First Article Inspection (FAI) per AS9102 aerospace standards.'
    },
    {
      title: '3-Axis Coordinate Measuring Machine (CMM) Probing',
      desc: 'Components are mounted in climate-controlled metrology suites (20 deg C +/- 2 deg C) on calibrated Zeiss / Mitutoyo CMMs. Automated touch probes record 3D point clouds across all GD&T datum planes.'
    },
    {
      title: 'Geometric Tolerancing & Dimensional Verification',
      desc: 'Direct algorithmic comparison against master 3D STEP file: True Position (Dia +/- 0.012 mm), Concentricity, Cylindricity, Perpendicularity, and Thread Pitch diameters using calibrated go/no-go plug gauges.'
    },
    {
      title: 'Surface Finish Profilometry Measurement',
      desc: 'Contact profilometers measure Ra and Rz values across ground, milled, or honed surfaces (e.g., Ra <= 0.4 um for hydraulic seal journals, Ra <= 1.6 um for bearing mating faces).'
    },
    {
      title: 'Serial Production Greenlight',
      desc: 'Only after the First Article CMM Report is digitally approved by RKISPro Lead Metrology Engineers is the machine shop permitted to commence the full serial production run.'
    }
  ];

  g2Points.forEach((pt, i) => {
    const yPos = 478 + i * 58;
    pdf.rect(p, 60, yPos, 475.28, 50, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, `${i + 1}. ${pt.title}`, 72, yPos + 15, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, pt.desc, 72, yPos + 28, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });
}

// ============================================================================
// PAGE 8: 4-GATE QUALITY ASSURANCE (GATES 3 & 4) (Fixed Overflowing Headers)
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'PHASE 5: METROLOGY & QUALITY CONTROL (PART 2)', 50, 60, { bgColor: '#FEE2E2', textColor: '#B91C1C' });
  pdf.text(p, '4-GATE QUALITY ASSURANCE: NDT & SURFACE DISPATCH PASS', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Gate 3 (Weld NDT, Pressure & Structural Integrity) and Gate 4 (Surface Coating & Gate Pass)', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // Gate 3 Deep Dive - FIXED HEADER OVERFLOW
  pdf.rect(p, 50, 118, 495.28, 305, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
  pdf.rect(p, 50, 118, 495.28, 28, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, 'GATE 3: IN-PROCESS NDT, WELD INTEGRITY & PRESSURE TESTING', 60, 136, { font: 'F2', size: 8.5, color: '#FFFFFF' });
  pdf.badge(p, 'TRANCHE 2 PREREQUISITE', 535, 131, { bgColor: '#1E293B', textColor: '#2DD4BF', fontSize: 7, align: 'right' });

  const g3Points = [
    {
      title: 'Structural Weld Integrity & Welder Qualification (ASME IX)',
      desc: 'All welding operations are performed by certified welders holding valid Welding Procedure Specifications (WPS) and Procedure Qualification Records (PQR) in compliance with ASME Boiler and Pressure Vessel Code Section IX.'
    },
    {
      title: 'Non-Destructive Testing (NDT Level II Certified)',
      desc: 'Dye Penetrant Inspection (DPI / PT) to detect surface cracks; Magnetic Particle Testing (MPT) with electromagnet yoke inspection for subsurface cracks in ferromagnetic welds.'
    },
    {
      title: 'Volumetric Radiographic & Ultrasonic Examination',
      desc: 'Critical load-bearing joints and pressure vessel seams undergo Radiographic Testing (RT Class II) or Phased Array Ultrasonic Testing (PAUT) to detect slag inclusions, incomplete fusion, or root porosity.'
    },
    {
      title: 'Hydrostatic & Pneumatic Proof Testing',
      desc: 'Pressure-retaining vessels, heat exchangers, and hydraulic manifolds are subjected to hydrostatic pressure testing at 1.5x design working pressure for a minimum 30-minute hold duration with digital pressure logging.'
    },
    {
      title: 'Tranche 2 Escrow Release Trigger',
      desc: 'Upon successful NDT inspection sign-off and hydro chart verification, the system clears Gate 3 and disburses Tranche 2 (40% machining and fabrication milestone) to the machine shop.'
    }
  ];

  g3Points.forEach((pt, i) => {
    const yPos = 155 + i * 54;
    pdf.rect(p, 60, yPos, 475.28, 46, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, `${i + 1}. ${pt.title}`, 72, yPos + 15, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, pt.desc, 72, yPos + 28, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });

  // Gate 4 Deep Dive - FIXED HEADER OVERFLOW
  pdf.rect(p, 50, 440, 495.28, 335, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
  pdf.rect(p, 50, 440, 495.28, 28, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, 'GATE 4: SURFACE COATING DFT, VCI PACKAGING & DISPATCH PASS', 60, 458, { font: 'F2', size: 8.5, color: '#FFFFFF' });
  pdf.badge(p, 'MANDATORY DISPATCH PASS', 535, 453, { bgColor: '#1E293B', textColor: '#F87171', fontSize: 7, align: 'right' });

  const g4Points = [
    {
      title: 'Dry Film Thickness (DFT) & Coating Adhesion Audit',
      desc: 'Surface treatments (epoxy primers, polyurethane topcoats, hard chrome, or thermal spray coatings) are tested with calibrated magnetic eddy-current DFT gauges and cross-hatch tape adhesion tests per ASTM D3359.'
    },
    {
      title: 'Anti-Corrosion VCI Preservation Protocols',
      desc: 'Precision machined surfaces and ground journals receive thorough ultrasonic degreasing followed by a high-grade Vapor Corrosion Inhibitor (VCI) oil coating and heavy-gauge polythene vacuum wrapping.'
    },
    {
      title: 'Heavy-Duty Industrial Crating Standards',
      desc: 'Components are packed in ISPM-15 heat-treated, fumigated wooden cases lined with shock-absorbent high-density polyethylene (HDPE) foam and silica gel desiccants to withstand long-haul highway transit.'
    },
    {
      title: 'Cryptographic Digital Dispatch Gate Pass',
      desc: "No component is allowed to leave the vendor's loading bay without an RKISPro Digital Dispatch Gate Pass. This gate pass contains an immutable QR link to all 4 inspection certificates and dimensional reports."
    },
    {
      title: 'Zero Transit Shock & Cargo Load Strapping Verification',
      desc: 'Photographic evidence of cargo lashing, weight distribution, and tarpaulin waterproofing is uploaded to the portal before the transporter generates the official Lorry Receipt (LR).'
    }
  ];

  g4Points.forEach((pt, i) => {
    const yPos = 478 + i * 58;
    pdf.rect(p, 60, yPos, 475.28, 50, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, `${i + 1}. ${pt.title}`, 72, yPos + 15, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, pt.desc, 72, yPos + 28, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });
}

// ============================================================================
// PAGE 9: LOGISTICS, INWARD INSPECTION & ESCROW SETTLEMENT (Fixed Characters)
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'PHASE 6: LOGISTICS & INWARDING', 50, 60, { bgColor: '#F1F5F9', textColor: '#334155' });
  pdf.text(p, 'LOGISTICS, BUYER INWARDING & 48-HOUR ACCEPTANCE PROTOCOL', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'End-to-End Transit Telematics, e-Way Bill Compliance, Receiving Inspection, and Auto-Handshake', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 7.1 Logistics Architecture
  pdf.rect(p, 50, 118, 495.28, 175, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 118, 495.28, 22, { fill: true, fillColor: '#F8FAFC' });
  pdf.text(p, '7.1 TRANSIT VISIBILITY & STATUTORY FREIGHT COMPLIANCE', 60, 133, { font: 'F2', size: 8.5, color: '#0F172A' });

  const logPoints = [
    { title: 'Automated e-Way Bill Generation (Form GST EWB-01)', text: 'Integrated directly with the GST e-Way Bill API, automatically generating compliant transit documentation linked to invoice values exceeding Rs. 50,000, preventing highway commercial tax detentions.' },
    { title: 'GPS Fleet Tracking & Lorry Receipt (LR) Integration', text: 'Live satellite tracking integration via designated industrial freight carriers, providing procurement teams real-time vehicle positioning and estimated time of arrival (ETA) alerts.' },
    { title: 'Transit Marine & Mechanical Breakdown Insurance', text: 'Every shipment moving under the RKISPro umbrella is covered by comprehensive Goods-In-Transit marine insurance, shielding buyers and vendors from transit accidents or rollover losses.' }
  ];

  logPoints.forEach((lp, i) => {
    const yPos = 150 + i * 44;
    pdf.rect(p, 60, yPos, 475.28, 38, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, lp.title, 72, yPos + 14, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, lp.text, 72, yPos + 26, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });

  // 7.2 Buyer Inwarding & 48-Hour Acceptance Window
  pdf.rect(p, 50, 310, 495.28, 205, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#E2E8F0' });
  pdf.rect(p, 50, 310, 495.28, 22, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, '7.2 CLIENT PLANT RECEIVING & THE CONTRACTUAL 48-HOUR ACCEPTANCE WINDOW', 60, 325, { font: 'F2', size: 8.5, color: '#2DD4BF' });

  const acceptFlow = [
    { step: '1. Physical Inwarding & POD', text: 'Shipment arrives at buyer plant gate. Unloading team inspects crate seal integrity and signs physical Proof of Delivery (POD) / Consignment Note.' },
    { step: '2. Digital Dossier Verification', text: 'Buyer Quality Assurance scans crate QR code to review complete Pre-Dispatch Metrology Dossier (Gates 1, 2, 3 & 4 reports) in real time.' },
    { step: '3. 48-Hour Sampling & Audit Window', text: 'Buyer has a contractual 48-hour SLA window to perform confirmatory dimensional audits against pre-cleared CMM Metrology Certificate.' },
    { step: '4. Automated Acceptance Handshake', text: 'If the buyer signs off digitally or if 48 hours lapse without a formal Non-Conformance Report (NCR) submission, the platform executes an automated acceptance handshake, unlocking final escrow funds.' }
  ];

  acceptFlow.forEach((af, i) => {
    const yPos = 345 + i * 40;
    pdf.rect(p, 60, yPos, 475.28, 34, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, af.step, 72, yPos + 13, { font: 'F2', size: 8, color: '#0D9488' });
    pdf.text(p, af.text, 72, yPos + 24, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });

  // 7.3 Milestone Settlement Flow Chart
  pdf.rect(p, 50, 530, 495.28, 245, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
  pdf.text(p, 'TRANSACTIONAL ESCROW SETTLEMENT & TAXATION BREAKDOWN', 65, 550, { font: 'F2', size: 9, color: '#0F172A' });

  const finSteps = [
    { title: 'Release of Tranche 3 (Final 30%)', text: "The escrow nodal bank receives cryptographic release instruction and executes an immediate automated RTGS/NEFT transfer of final 30% balance to machine shop's designated bank account." },
    { title: 'Platform Service Commission Deduction', text: 'RKISPro automatically deducts its contractual facilitation commission (5% to 12% based on order complexity and metrology intensity) as net technology and quality management revenue.' },
    { title: 'Statutory GST E-Invoice Issuance (CBIC SAC 9988)', text: 'Platform auto-generates CBIC-compliant GST E-Invoices carrying verified Invoice Reference Numbers (IRN) and digitally signed QR codes under SAC Code 9988 (Manufacturing Services on Physical Inputs).' },
    { title: 'TDS Withholding & Tax Reconciliation (Section 194C / 194Q)', text: 'Tax Deducted at Source (TDS) under Section 194C (contractor services) or Section 194Q (goods purchase) is accurately accounted for, with automated credit certificate generation available on user dashboards.' }
  ];

  finSteps.forEach((fs, i) => {
    const yPos = 572 + i * 48;
    pdf.bullet(p, 65, yPos + 3, '#0D9488', 3);
    pdf.text(p, `${fs.title}:`, 75, yPos, { font: 'F2', size: 8, color: '#0D9488' });
    pdf.text(p, fs.text, 75, yPos + 12, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 455 });
  });
}

// ============================================================================
// PAGE 10: INDUSTRIAL SERVICES & EMERGENCY BREAKDOWN DISPATCH
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'RAPID ON-SITE INDUSTRIAL RESPONSE', 50, 60, { bgColor: '#FEE2E2', textColor: '#991B1B' });
  pdf.text(p, 'PLANT MAINTENANCE & 4-HOUR EMERGENCY BREAKDOWN DISPATCH', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'On-Demand Rapid Mobilization, Critical Spares Fabrication, and Root Cause Analysis (RCA)', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // Emergency SLA Banner
  pdf.rect(p, 50, 118, 495.28, 65, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
  pdf.text(p, 'CRITICAL UNPLANNED DOWNTIME COSTS UP TO RS. 2,50,000 PER HOUR', 65, 138, { font: 'F2', size: 9.5, color: '#F87171' });
  pdf.text(p, 'When high-pressure boiler feed pumps fail or main conveyor drives seize, plants cannot afford traditional procurement cycles.', 65, 155, { font: 'F1', size: 8, color: '#E2E8F0' });
  pdf.text(p, 'RKISPro deploys vetted rapid-response field engineering teams on-site within 4 hours across major industrial corridors.', 65, 168, { font: 'F1', size: 8, color: '#E2E8F0' });

  const emerSteps = [
    {
      step: 'STEP 1: 24/7 Priority Emergency Alert Ingestion (< 15 Minutes)',
      desc: 'Plant General Managers initiate an Emergency Breakdown Request via hotline or 1-click mobile dashboard (/services/emergency-breakdown). Instant telemetry logs equipment type, failure symptoms, and required technical trade.'
    },
    {
      step: 'STEP 2: Rapid Crew Mobilization (< 45 Minutes)',
      desc: 'Algorithmic location engine mobilizes the nearest pre-vetted industrial maintenance squad within a 50 km radius. Crews deploy with emergency mobile tooling: inverter TIG/ARC welders, hydraulic bearing pullers, and thermal imaging cameras.'
    },
    {
      step: 'STEP 3: Guaranteed On-Site Arrival (< 4 Hours)',
      desc: 'Certified millwrights, certified welders, and precision mechanics arrive at the plant gate within 4 hours across industrial hubs including Chakan, Sanand, Peenya, Manesar, Sriperumbudur, and Jamshedpur.'
    },
    {
      step: 'STEP 4: Rapid Triage & Spares Fast-Track Machining (< 12 Hours)',
      desc: 'On-site crew stabilizes the line. If a critical shaft, gear, or flange has catastrophically sheared, 3D laser scanners reverse-engineer the broken part in situ and route CAD files to a nearby partner shop for 12-hour turnaround.'
    }
  ];

  emerSteps.forEach((es, i) => {
    const yPos = 195 + i * 65;
    pdf.rect(p, 50, yPos, 495.28, 55, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 50, yPos, 495.28, 20, { fill: true, fillColor: '#F8FAFC' });
    pdf.line(p, 50, yPos + 20, 545.28, yPos + 20, { color: '#E2E8F0', lineWidth: 0.75 });

    pdf.text(p, es.step, 65, yPos + 14, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, es.desc, 65, yPos + 32, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 460 });
  });

  // Root Cause Analysis (RCA) Protocol
  pdf.rect(p, 50, 470, 495.28, 305, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
  pdf.rect(p, 50, 470, 495.28, 24, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, 'POST-INCIDENT METALLURGICAL ROOT CAUSE ANALYSIS (RCA) DELIVERABLE', 60, 486, { font: 'F2', size: 8.5, color: '#2DD4BF' });

  const rcaSteps = [
    { title: 'Fracture Mechanics & SEM Microscopy', text: 'Failure analysis examining fracture surfaces to identify beach marks (fatigue), cleavage (brittle failure), or cup-and-cone morphology (ductile overload).' },
    { title: 'Vibration & Dynamic Misalignment Audit', text: 'Laser shaft alignment and continuous FFT spectrum vibration analysis to detect resonance, soft foot conditions, or unbalance.' },
    { title: 'Lubrication & Tribological Degradation', text: 'Spectrometric analysis of lubricant oil samples to detect metal particulate wear (iron, copper, lead) indicating internal bearing galling.' },
    { title: 'Preventive Engineering Redesign Report', text: 'Platform engineers deliver a comprehensive engineering dossier recommending fillet radius modifications, alloy upgrades, or surface hardening to prevent recurring failures.' }
  ];

  rcaSteps.forEach((rca, idx) => {
    const yPos = 505 + idx * 62;
    pdf.rect(p, 60, yPos, 475.28, 52, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.text(p, `${idx + 1}. ${rca.title}`, 72, yPos + 15, { font: 'F2', size: 8, color: '#0F172A' });
    pdf.text(p, rca.text, 72, yPos + 28, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 450 });
  });
}

// ============================================================================
// PAGE 11: DISPUTE RESOLUTION, WARRANTY & RISK SAFEGUARDS
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'LEGAL GOVERNANCE & RISK MITIGATION', 50, 60, { bgColor: '#FEF3C7', textColor: '#92400E' });
  pdf.text(p, 'DISPUTE RESOLUTION, NCR REWORK & WARRANTY PROTOCOLS', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Non-Conformance Reports (NCR), 24-Hour Metrology Arbitration, and 12-Month Workmanship Warranty', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // NCR Workflow Box
  pdf.rect(p, 50, 118, 495.28, 235, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
  pdf.rect(p, 50, 118, 495.28, 22, { fill: true, fillColor: '#F8FAFC' });
  pdf.text(p, '9.1 FORMAL NON-CONFORMANCE REPORT (NCR) & ARBITRATION PROTOCOL', 60, 133, { font: 'F2', size: 8.5, color: '#0F172A' });

  const ncrSteps = [
    { title: 'Step 1: Automated Escrow Freeze', text: 'When a buyer logs an NCR flagging dimensional out-of-spec or surface defects within the 48-hour window, the remaining escrow tranches are instantly frozen by smart contract logic.' },
    { title: 'Step 2: 24-Hour On-Site Metrology Arbitration', text: "An independent RKISPro Lead Quality Auditor arrives at the buyer's facility within 24 business hours equipped with calibrated metrology gauges to conduct an objective verification." },
    { title: 'Step 3: Pathway Determination & Remedy Execution', text: "Based on the auditor's verification report, one of three mandatory remedy pathways is executed immediately:" }
  ];

  ncrSteps.forEach((st, i) => {
    const yPos = 148 + i * 36;
    pdf.text(p, st.title, 65, yPos, { font: 'F2', size: 8, color: '#0D9488' });
    pdf.text(p, st.text, 65, yPos + 12, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 465 });
  });

  // 3 Remedy Cards
  const remedies = [
    { title: 'PATHWAY A: REWORK', desc: "If out-of-spec dimensions are salvageable (e.g. oversize bore), the part is routed to a specialized grinding/EDM facility for correction at vendor's expense within 48h." },
    { title: 'PATHWAY B: REMANUFACTURE', desc: 'If part is scrap (e.g. undersize bore), vendor is contractually bound to re-manufacture the batch immediately at zero additional cost to buyer.' },
    { title: 'PATHWAY C: FULL REFUND', desc: "If vendor fails to replace parts within stipulated time, 100% of buyer's escrow deposit is returned to their account within 3 business days." }
  ];

  remedies.forEach((rem, idx) => {
    const x = 60 + idx * 160;
    pdf.rect(p, x, 258, 150, 82, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#CBD5E1' });
    pdf.rect(p, x, 258, 150, 18, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, rem.title, x + 8, 270, { font: 'F2', size: 7, color: '#2DD4BF' });
    pdf.text(p, rem.desc, x + 8, 284, { font: 'F1', size: 7, color: '#334155', maxWidth: 135 });
  });

  // Warranty & Insurance Safeguards
  pdf.rect(p, 50, 365, 495.28, 410, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
  pdf.rect(p, 50, 365, 495.28, 24, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, '9.2 12-MONTH MECHANICAL WARRANTY & COMMERCIAL LIABILITY COVERAGE', 60, 381, { font: 'F2', size: 8.5, color: '#FFFFFF' });

  const warrantyPoints = [
    {
      title: 'Standard 12-Month Mechanical Workmanship Warranty',
      desc: 'All precision machined assemblies, welded pressure structures, and turnkey fabrication jobs executed via RKISPro carry an ironclad 12-Month Warranty against subsurface material porosity, weld seam cracking, or dimensional creep.'
    },
    {
      title: 'Commercial General Liability (CGL) Umbrella',
      desc: 'RKISPro maintains an active INR 5 Crore Commercial General Liability (CGL) policy covering third-party bodily injury, structural plant damage, or consequential operational losses arising from defective manufactured parts.'
    },
    {
      title: 'Vendor Performance Bond & Default Reserve Pool',
      desc: 'Every vetted machine shop contributes a security reserve or irrevocable bank guarantee. In the event of catastrophic vendor default, the reserve pool funds immediate replacement from alternate Tier-1 shops without buyer loss.'
    },
    {
      title: 'Arbitration Jurisdiction & Digital Dispute Filing',
      desc: 'All disputes are subject to expedited digital arbitration under the Indian Arbitration and Conciliation Act, 1996, with legal jurisdiction in Mumbai/Pune, resolving complex disputes within 30 days without protracted courtroom delays.'
    }
  ];

  warrantyPoints.forEach((wp, idx) => {
    const yPos = 405 + idx * 88;
    pdf.rect(p, 60, yPos, 475.28, 76, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
    pdf.rect(p, 60, yPos, 4, 76, { fill: true, fillColor: '#0D9488' });
    pdf.text(p, wp.title, 75, yPos + 18, { font: 'F2', size: 8.5, color: '#0F172A' });
    pdf.text(p, wp.desc, 75, yPos + 34, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 445 });
  });
}

// ============================================================================
// PAGE 12: MASTER 18-STEP EXECUTION MATRIX (Balanced & Formatted Table)
// ============================================================================
{
  const p = pdf.addPage();
  pdf.badge(p, 'COMPLETE OPERATING SUMMARY', 50, 60, { bgColor: '#0F172A', textColor: '#2DD4BF' });
  pdf.text(p, 'MASTER 18-STEP END-TO-END OPERATIONAL EXECUTION MATRIX', 50, 88, { font: 'F2', size: 13, color: '#0F172A' });
  pdf.text(p, 'Complete Chronological Process: From Initial User Login to Final Vendor Payout & Tax Filing', 50, 102, { font: 'F3', size: 8.5, color: '#64748B' });

  // 18-Step Master Table
  const tableY = 118;
  pdf.rect(p, 50, tableY, 495.28, 20, { fill: true, fillColor: '#0F172A' });
  pdf.text(p, '#', 55, tableY + 13, { font: 'F2', size: 7.5, color: '#2DD4BF' });
  pdf.text(p, 'PROCESS STAGE', 72, tableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
  pdf.text(p, 'STAKEHOLDER', 185, tableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
  pdf.text(p, 'DELIVERABLE / OUTPUT', 270, tableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
  pdf.text(p, 'TIMELINE / SLA', 465, tableY + 13, { font: 'F2', size: 7.5, color: '#2DD4BF' });

  const steps = [
    ['01', 'User Registration & KYC', 'Buyer / Enterprise', 'GSTN API Verification; RBAC Profile', '< 5 Mins'],
    ['02', 'RFQ & CAD Ingestion', 'Buyer Procurement', 'STEP/PDF with GD&T & Material Specs', 'Buyer Defined'],
    ['03', 'DFM Feasibility & Redline', 'RKISPro Engineering', 'DFM Review & Tolerancing Audit Report', '2 - 4 Hours'],
    ['04', 'Targeted Vendor Routing', 'Platform Engine', 'Dispatched to 3-5 Pre-Vetted Shops', 'Instant'],
    ['05', 'Line-Item Quote Submission', 'Vetted Machine Shops', 'Standardized BOM Cost Breakdown', '12 - 24 Hours'],
    ['06', 'Quote Award & Work Order', 'Buyer Procurement', 'Tripartite PO & Non-Circumvention', 'Buyer Decision'],
    ['07', 'Milestone Escrow Funding', 'Buyer Finance', '100% Contract Value Locked in Escrow', 'Immediate on PO'],
    ['08', 'Gate 1: Raw Material QA', 'RKISPro QA / Vendor', 'NABL MTC & OES Spectrometry Sign-off', 'Day 1-2'],
    ['09', 'Tranche 1 Disbursement', 'Escrow Controller', '30% Advance Released to Vendor', '2 Hours'],
    ['10', 'Gate 2: FAI CMM Inspection', 'Machine Shop / QA', '3-Axis CMM Dimensional Report', 'Mid-Cycle Run'],
    ['11', 'Gate 3: NDT & Hydro Testing', 'Quality Specialist', 'DPI / UT / Hydro Chart Records', 'Post-Fab'],
    ['12', 'Tranche 2 Disbursement', 'Escrow Controller', '40% Machining Released to Vendor', '2 Hours'],
    ['13', 'Gate 4: Surface & Crate QA', 'RKISPro Field Eng', 'DFT Coating Report & Gate Pass', 'Packing Day'],
    ['14', 'GPS Transport Dispatch', 'Logistics Carrier', 'e-Way Bill & Lorry Receipt (LR) Tracking', 'Same Day'],
    ['15', 'Buyer Receiving Inward', 'Client Plant Team', 'Physical Proof of Delivery (POD)', 'Transit Dep.'],
    ['16', '48-Hour Acceptance Window', 'Buyer Quality Team', 'Dimensional Sign-off or Auto-Accept', '48 Hours'],
    ['17', 'Final Escrow Settlement', 'Escrow Engine', 'Tranche 3 (30%) Released to Vendor', 'Immediate'],
    ['18', 'Tax Invoicing & TDS Filing', 'Automated Billing', 'CBIC GST E-Invoice (SAC 9988) + TDS 194C', 'Monthly Cycle']
  ];

  steps.forEach((st, i) => {
    const rowY = tableY + 20 + i * 32;
    const bgCol = i % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
    pdf.rect(p, 50, rowY, 495.28, 32, { fill: true, stroke: true, fillColor: bgCol, strokeColor: '#E2E8F0', lineWidth: 0.5 });

    pdf.text(p, st[0], 55, rowY + 18, { font: 'F2', size: 7.5, color: '#0F172A' });
    pdf.text(p, st[1], 72, rowY + 18, { font: 'F2', size: 7.5, color: '#0F172A' });
    pdf.text(p, st[2], 185, rowY + 18, { font: 'F1', size: 7, color: '#475569' });
    pdf.text(p, st[3], 270, rowY + 18, { font: 'F1', size: 7, color: '#334155', maxWidth: 190 });
    pdf.text(p, st[4], 535, rowY + 18, { font: 'F2', size: 7.5, color: '#0D9488', align: 'right' });
  });

  // Final Sign-Off Seal
  const footerCardY = tableY + 20 + 18 * 32 + 10;
  pdf.rect(p, 50, footerCardY, 495.28, 70, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#0D9488', lineWidth: 1 });
  pdf.text(p, 'CERTIFICATION OF OPERATIONAL STANDARDS & COMPLIANCE', 65, footerCardY + 22, { font: 'F2', size: 9, color: '#2DD4BF' });
  pdf.text(p, 'This document constitutes the binding standard operating procedure for all manufacturing transactions, metrology', 65, footerCardY + 38, { font: 'F1', size: 7.5, color: '#E2E8F0' });
  pdf.text(p, 'inspections, and banking disbursements executed under the RKISPro Managed Marketplace platform.', 65, footerCardY + 50, { font: 'F1', size: 7.5, color: '#E2E8F0' });
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
