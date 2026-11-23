const fs = require('fs');
const path = require('path');
const { PDFEngine } = require('./pdf_engine');

function buildLaunchChecklistPDF() {
  const pdf = new PDFEngine({
    headerTitle: 'RKISPRO INDUSTRIAL TECHNOLOGIES PRIVATE LIMITED',
    headerSubtitle: 'MASTER STARTUP LAUNCH CHECKLIST & EXECUTION BLUEPRINT',
    footerText: 'CONFIDENTIAL  |  BOOTSTRAPPED TO SEED EXECUTION PLAYBOOK 2026'
  });

  // ============================================================================
  // PAGE 1: TITLE, EXECUTIVE BRIEF, 4 STATS & MASTER TIMELINE / BUDGET
  // ============================================================================
  {
    const p = pdf.addPage({ skipHeaderFooter: true });
    // Top teal stripe
    pdf.rect(p, 0, 0, 595.28, 8, { fill: true, fillColor: '#0D9488' });

    // Header Card
    pdf.rect(p, 35, 25, 525.28, 95, { fill: true, fillColor: '#0F172A' });
    pdf.badge(p, 'OFFICIAL FOUNDER LAUNCH PLAYBOOK & STEP-BY-STEP CHECKLIST', 50, 40, {
      bgColor: '#134E4A',
      textColor: '#2DD4BF',
      fontSize: 8.5
    });
    pdf.text(p, 'RKISPRO: THE DEFINITIVE STARTUP LAUNCH CHECKLIST', 50, 66, { font: 'F2', size: 17, color: '#FFFFFF' });
    pdf.text(p, 'From Domain Purchase & Pvt Ltd Incorporation to Hiring, Supply Onboarding & Startup India Grants', 50, 86, { font: 'F3', size: 9.5, color: '#94A3B8' });
    pdf.badge(p, 'LAUNCH HUB: BILASPUR & RAIPUR (CG)', 545, 40, { bgColor: '#1E293B', textColor: '#38BDF8', fontSize: 7.5, align: 'right' });
    pdf.badge(p, 'TIMELINE: 60 - 90 DAYS', 545, 62, { bgColor: '#134E4A', textColor: '#2DD4BF', fontSize: 7.5, align: 'right' });

    // 4 Key Metrics Bar
    const stats = [
      { val: 'Rs. 70k - 110k', label: 'Total Bootstrapped Launch Budget', col: '#0D9488' },
      { val: '60 - 90 Days', label: 'From Day 0 to Commercial Revenue', col: '#0284C7' },
      { val: '20 Workshops', label: 'Vetted Partner Network (CG Corridor)', col: '#D97706' },
      { val: 'Up to Rs. 20L', label: 'Startup India SISFS Seed Grant', col: '#16A34A' }
    ];

    stats.forEach((st, idx) => {
      const x = 35 + idx * 133.8;
      pdf.rect(p, x, 130, 124, 48, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#CBD5E1', lineWidth: 0.75 });
      pdf.rect(p, x, 130, 124, 3.5, { fill: true, fillColor: st.col });
      pdf.text(p, st.val, x + 8, 150, { font: 'F2', size: 10, color: '#0F172A' });
      pdf.text(p, st.label, x + 8, 166, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 108 });
    });

    // Core Strategic Thesis Box
    pdf.rect(p, 35, 190, 525.28, 90, { fill: true, stroke: true, fillColor: '#F0FDFA', strokeColor: '#0D9488', lineWidth: 1 });
    pdf.text(p, 'CORE STRATEGIC GUIDELINE: ASSET-LIGHT MANAGED MARKETPLACE ARCHITECTURE', 50, 210, { font: 'F2', size: 9, color: '#0F766E' });
    pdf.text(p, 'Do NOT spend precious capital on buying heavy machinery, renting industrial fabrication sheds, or hiring shop-floor', 50, 228, { font: 'F1', size: 8, color: '#134E4A' });
    pdf.text(p, 'welders. RKISPro is an asset-light technology and quality coordination platform. You aggregate existing uncommitted workshop', 50, 242, { font: 'F1', size: 8, color: '#134E4A' });
    pdf.text(p, 'capacity, standardize cut-list BOM pricing, enforce milestone escrow trust, and take a net spread of 8% to 15% on every order.', 50, 256, { font: 'F1', size: 8, color: '#134E4A' });
    pdf.text(p, 'This ensures the startup operates with negative working capital, zero debt, and positive operational cashflow from Day 1.', 50, 270, { font: 'F2', size: 8, color: '#0F766E' });

    // Master Timeline & Budget Allocation Table
    pdf.rect(p, 35, 292, 525.28, 450, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 292, 525.28, 24, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'PHASE', 45, 308, { font: 'F2', size: 8, color: '#2DD4BF' });
    pdf.text(p, 'KEY MILESTONE DELIVERABLE', 105, 308, { font: 'F2', size: 8, color: '#FFFFFF' });
    pdf.text(p, 'TARGET TIMELINE', 375, 308, { font: 'F2', size: 8, color: '#FFFFFF' });
    pdf.text(p, 'BUDGET ESTIMATE', 550, 308, { font: 'F2', size: 8, color: '#2DD4BF', align: 'right' });

    const timelineRows = [
      { phase: 'Phase 0', task: 'Brand Assets, Domains (.com/.in), Google Workspace & TM-A Trademark Filing', time: 'Week 1', cost: 'Rs. 8,000 - 12,000' },
      { phase: 'Phase 1', task: 'Private Limited Incorporation (SPICe+, DSC, Name Approval, MOA/AOA, COI, PAN, TAN)', time: 'Weeks 2 - 3', cost: 'Rs. 7,000 - 12,000' },
      { phase: 'Phase 2', task: 'Bank Current Account (Virtual Accounts), GSTIN (CG 22), MSME Udyam & Gumasta', time: 'Weeks 3 - 4', cost: 'Rs. 2,000 - 4,000' },
      { phase: 'Phase 3', task: 'DPIIT Startup India Recognition & Seed Fund Scheme (SISFS) Filing via 36Inc', time: 'Weeks 4 - 6', cost: 'Rs. 0 (Govt Free)' },
      { phase: 'Phase 4', task: 'Platform Next.js Deployment, Supabase DB & Cashfree/Razorpay Dynamic UPI Escrow', time: 'Weeks 4 - 5', cost: 'Rs. 3,000 - 6,000' },
      { phase: 'Phase 5', task: 'Supply Scouting & Physical Onboarding of First 20 Workshops (Bilaspur & Raipur)', time: 'Weeks 5 - 7', cost: 'Rs. 5,000 - 8,000' },
      { phase: 'Phase 6', task: 'Hiring Core Team (Operations Fabrication Lead + Customer/WhatsApp Coordinator)', time: 'Weeks 6 - 8', cost: 'Rs. 30k - 45k / mo' },
      { phase: 'Phase 7', task: 'Hyperlocal Demand Generation (Scouting Sites, Local Ads & Civil Contractor Tie-Ups)', time: 'Weeks 7 - 10', cost: 'Rs. 15,000 - 25,000' },
      { phase: 'Phase 8', task: 'Execution of First 30 Orders, 3-Gate Local QA Enforcement & Video Testimonials', time: 'Weeks 8 - 12', cost: 'Self-Funding (Cash+)' },
      { phase: 'TOTAL', task: 'Comprehensive Launch to Commercial Cashflow & Seed Round Readiness', time: '60 - 90 Days', cost: 'Rs. 70k - 1,10,000' }
    ];

    timelineRows.forEach((row, i) => {
      const yPos = 316 + i * 42;
      const isTotal = row.phase === 'TOTAL';
      const bgCol = isTotal ? '#FEF3C7' : (i % 2 === 0 ? '#FFFFFF' : '#F8FAFC');
      pdf.rect(p, 35, yPos, 525.28, 42, { fill: true, stroke: true, fillColor: bgCol, strokeColor: '#E2E8F0', lineWidth: isTotal ? 1 : 0.5 });
      pdf.text(p, row.phase, 45, yPos + 22, { font: 'F2', size: 8, color: isTotal ? '#92400E' : '#0F172A' });
      pdf.text(p, row.task, 105, yPos + 18, { font: isTotal ? 'F2' : 'F1', size: 7.5, color: isTotal ? '#78350F' : '#334155', maxWidth: 260 });
      pdf.text(p, row.time, 375, yPos + 22, { font: 'F2', size: 7.8, color: isTotal ? '#92400E' : '#0D9488' });
      pdf.text(p, row.cost, 550, yPos + 22, { font: 'F2', size: 7.8, color: isTotal ? '#92400E' : '#0F172A', align: 'right' });
    });

    // Bottom seal
    pdf.rect(p, 35, 755, 525.28, 55, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
    pdf.text(p, 'RKISPRO INDUSTRIAL TECHNOLOGIES PRIVATE LIMITED', 50, 775, { font: 'F2', size: 9, color: '#2DD4BF' });
    pdf.text(p, 'Confidential Internal Blueprint for Founders & Directors  |  Bilaspur & Raipur Launch Corridor', 50, 792, { font: 'F1', size: 7.5, color: '#94A3B8' });
  }

  // ============================================================================
  // PAGE 2: PHASE 0 (BRAND & DIGITAL ASSETS) & PHASE 1 (PVT LTD INCORPORATION)
  // ============================================================================
  {
    const p = pdf.addPage();
    pdf.badge(p, 'PHASE 0 & PHASE 1: BRANDING & LEGAL INCORPORATION', 35, 60, { bgColor: '#E0F2FE', textColor: '#0369A1' });
    pdf.text(p, 'BRAND IDENTITY SETUP & PRIVATE LIMITED INCORPORATION', 35, 88, { font: 'F2', size: 13, color: '#0F172A' });
    pdf.text(p, 'Domain Acquisition, Corporate Email, Trademark Search, and SPICe+ MCA Company Registration', 35, 102, { font: 'F3', size: 8.5, color: '#64748B' });

    // Section 0: Brand & Digital Assets
    pdf.rect(p, 35, 118, 525.28, 220, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 118, 525.28, 24, { fill: true, fillColor: '#F8FAFC' });
    pdf.text(p, 'PHASE 0: BRAND IDENTITY, DOMAINS, WORKSPACE & TRADEMARK (WEEK 1)', 45, 134, { font: 'F2', size: 8.5, color: '#0F172A' });

    const p0Items = [
      {
        num: '[01]',
        title: 'Domain Portfolio Acquisition (rkispro.com & rkispro.in)',
        desc: 'Purchase both rkispro.com (primary international brand) and rkispro.in (India-specific redirect) via Namecheap, GoDaddy, or Squarespace. Enable WHOIS privacy protection and DNSSEC.'
      },
      {
        num: '[02]',
        title: 'Google Workspace / Zoho Professional Email Setup',
        desc: 'Configure corporate MX and SPF/DKIM records. Setup foundational mailboxes: founder@rkispro.com (direct investor/bank contacts), orders@rkispro.com (job requests), support@rkispro.com, and partners@rkispro.com.'
      },
      {
        num: '[03]',
        title: 'Dedicated Corporate Mobile & WhatsApp Business Setup',
        desc: 'Procure a dedicated dual-SIM / eSIM line exclusively for RKISPro operations. Register on WhatsApp Business with automated greeting, operating hours, catalog links, and map NEXT_PUBLIC_WHATSAPP_NUMBER.'
      },
      {
        num: '[04]',
        title: 'IP India Trademark Public Search & TM-A Application Filing',
        desc: 'Conduct a public search on ipindia.gov.in. File Form TM-A under Class 35 (Commercial online marketplace) and Class 40 (Custom metal fabrication, welding, and CNC machining). Startup govt fee: Rs. 4,500.'
      }
    ];

    p0Items.forEach((item, idx) => {
      const yPos = 148 + idx * 46;
      pdf.rect(p, 45, yPos, 505.28, 40, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.text(p, item.num, 55, yPos + 15, { font: 'F2', size: 8, color: '#0D9488' });
      pdf.text(p, item.title, 82, yPos + 15, { font: 'F2', size: 8, color: '#0F172A' });
      pdf.text(p, item.desc, 82, yPos + 27, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 455 });
    });

    // Section 1: Pvt Ltd Incorporation
    pdf.rect(p, 35, 350, 525.28, 420, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 350, 525.28, 24, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'PHASE 1: PRIVATE LIMITED COMPANY INCORPORATION VIA MCA SPICe+ (WEEKS 2 - 3)', 45, 366, { font: 'F2', size: 8.5, color: '#2DD4BF' });

    const p1Items = [
      {
        step: 'Step 1: Why Private Limited is Mandatory (Not LLP or Proprietorship)',
        desc: 'To qualify for the DPIIT Startup India Seed Fund Scheme (SISFS up to Rs. 20L grant), venture capital equity investment, and ESOP issuance, an Indian Private Limited Company is strictly mandatory under law. LLPs are excluded from SISFS grants.'
      },
      {
        step: 'Step 2: Director & Shareholder KYC Documentation',
        desc: 'Prepare self-attested documents for at least 2 directors: PAN Card (mandatory), Voter ID/Passport/Driving License, and latest Bank Statement or Electricity Bill (< 2 months old with matching address spelling).'
      },
      {
        step: 'Step 3: Class-3 Digital Signature Certificate (DSC)',
        desc: 'Procure Class-3 USB token Digital Signatures for all directors to digitally sign SPICe+ Part A/B forms on the Ministry of Corporate Affairs (MCA) V3 portal.'
      },
      {
        step: 'Step 4: Name Reservation via MCA RUN / SPICe+ Part A',
        desc: 'Submit proposed name: e.g. "RKISPro Industrial Technologies Private Limited" or "RKISPro Manufacturing Technologies Private Limited". Include clear industrial/technology suffixes to avoid MCA name rejection.'
      },
      {
        step: 'Step 5: Drafting MOA & AOA with Strategic Main Objects Clause',
        desc: 'Ensure Memorandum of Association Main Objects explicitly covers: Managed digital marketplace operations, industrial procurement, metal fabrication coordination, CNC precision machining, structural steel contracting, metrology QA, and supply chain technology.'
      },
      {
        step: 'Step 6: SPICe+ Part B Filing & Certificate of Incorporation (COI)',
        desc: 'File unified incorporation form. Receive Certificate of Incorporation (COI) containing Corporate Identity Number (CIN), Company Permanent Account Number (PAN), and Tax Deduction Account Number (TAN).'
      }
    ];

    p1Items.forEach((item, idx) => {
      const yPos = 382 + idx * 62;
      pdf.rect(p, 45, yPos, 505.28, 54, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.rect(p, 45, yPos, 4, 54, { fill: true, fillColor: '#0D9488' });
      pdf.text(p, item.step, 58, yPos + 16, { font: 'F2', size: 8, color: '#0F172A' });
      pdf.text(p, item.desc, 58, yPos + 30, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 480 });
    });
  }

  // ============================================================================
  // PAGE 3: PHASE 2 (BANKING & TAXES) & PHASE 3 (STARTUP INDIA & SISFS GRANTS)
  // ============================================================================
  {
    const p = pdf.addPage();
    pdf.badge(p, 'PHASE 2 & PHASE 3: BANKING, COMPLIANCE & GOVT FUNDING', 35, 60, { bgColor: '#DCFCE7', textColor: '#15803D' });
    pdf.text(p, 'CURRENT ACCOUNT, GST, UDYAM & STARTUP INDIA SEED GRANTS', 35, 88, { font: 'F2', size: 13, color: '#0F172A' });
    pdf.text(p, 'Setting Up Nodal Banking, State Tax Registrations, and Tapping Non-Dilutive Government Grants', 35, 102, { font: 'F3', size: 8.5, color: '#64748B' });

    // Section 2: Banking, GST, Udyam
    pdf.rect(p, 35, 118, 525.28, 275, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 118, 525.28, 24, { fill: true, fillColor: '#F8FAFC' });
    pdf.text(p, 'PHASE 2: CORPORATE BANKING, GSTIN & MSME UDYAM REGISTRATIONS (WEEKS 3 - 4)', 45, 134, { font: 'F2', size: 8.5, color: '#0F172A' });

    const p2Items = [
      {
        title: 'Corporate Current Account with API Banking & Virtual Accounts',
        text: 'Open account with HDFC, ICICI, or SBI. Ensure support for Virtual Accounts (smart routing of customer milestone deposits) and higher daily IMPS/NEFT limits for instant vendor raw material advance releases.'
      },
      {
        title: 'Chhattisgarh GST Registration (State Code 22)',
        text: 'Apply for GSTIN with principal place of business in Bilaspur (Rent Agreement + Electricity Bill + NOC). Ensure mandatory mapping of SAC 9988 (Job work / manufacturing services), HSN 7308 (Steel structures, sheds, gates), and SAC 9983/9985.'
      },
      {
        title: 'MSME Udyam Registration (Crucial for Bank Subsidies & Legal Protection)',
        text: 'Register free on udyamregistration.gov.in. Verify mandatory 5-digit NIC codes: NIC 63122 (web portals), 82990 (support services), 25111 (gates, shutters, windows), and 25920 (machining, cutting, welding). Grants protection against delayed payments under Sec 43B(h).'
      },
      {
        title: 'Chhattisgarh Gumasta (Shop & Establishment) & Professional Tax (PT)',
        text: 'Obtain commercial establishment Gumasta license from the Chhattisgarh Labor Department and register for employer Professional Tax with the state commercial tax office.'
      }
    ];

    p2Items.forEach((item, idx) => {
      const yPos = 148 + idx * 58;
      pdf.rect(p, 45, yPos, 505.28, 50, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.text(p, item.title, 55, yPos + 15, { font: 'F2', size: 8, color: '#0D9488' });
      pdf.text(p, item.text, 55, yPos + 28, { font: 'F1', size: 7.2, color: '#334155', maxWidth: 485 });
    });

    // Section 3: DPIIT Startup India & SISFS Grants
    pdf.rect(p, 35, 405, 525.28, 365, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 405, 525.28, 24, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'PHASE 3: DPIIT STARTUP INDIA RECOGNITION & SEED FUND SCHEMES (WEEKS 4 - 6)', 45, 421, { font: 'F2', size: 8.5, color: '#2DD4BF' });

    const p3Items = [
      {
        title: 'DPIIT Recognition Application (startupindia.gov.in)',
        desc: 'Apply online (100% free). Sector: Industrial Products & Manufacturing Tech. Innovation thesis: Managed marketplace converting unorganized manual metalwork into engineered cut-lists with 3-Gate QA and milestone escrow. Processing time: 5-10 business days.'
      },
      {
        title: 'Section 80-IAC (3-Year Tax Holiday) & Section 56 Angel Tax Exemption',
        desc: 'File Form 1 for Section 56(2)(viib) exemption (protects against angel tax on equity investments) and submit application to the Inter-Ministerial Board (IMB) for 100% income tax exemption for 3 consecutive financial years.'
      },
      {
        title: 'Startup India Seed Fund Scheme (SISFS) - Up to Rs. 20 Lakhs Non-Dilutive Grant',
        desc: 'Apply through registered incubators on the Startup India portal. Qualifying startups receive up to Rs. 20 Lakhs as a 100% non-dilutive grant for proof of concept, prototype validation, platform testing, and customer acquisition trials.'
      },
      {
        title: 'Up to Rs. 50 Lakhs Debt / Convertible Debentures via SISFS',
        desc: 'For commercialization, working capital scaling, and workshop partner expansion. 10-year repayment tenure with soft interest terms through participating incubator committees.'
      },
      {
        title: 'Key Registered Incubators in Chhattisgarh to Apply Through',
        desc: '(1) 36Inc (Chhattisgarh State Govt Incubator, Raipur) - Highly active, state-backed, ideal for manufacturing tech; (2) IIM Raipur Foundation (IIMR-FIE); (3) NIT Raipur Incubation Centre; (4) IIT Bhilai Innovation Center.'
      }
    ];

    p3Items.forEach((item, idx) => {
      const yPos = 437 + idx * 64;
      pdf.rect(p, 45, yPos, 505.28, 56, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.text(p, item.title, 55, yPos + 16, { font: 'F2', size: 8, color: '#0F172A' });
      pdf.text(p, item.desc, 55, yPos + 30, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 485 });
    });
  }

  // ============================================================================
  // PAGE 4: PHASE 4 (TECH & PAYMENTS) & PHASE 5 (SUPPLY ONBOARDING IN CG)
  // ============================================================================
  {
    const p = pdf.addPage();
    pdf.badge(p, 'PHASE 4 & PHASE 5: PLATFORM DEPLOYMENT & LOCAL WORKSHOP NETWORK', 35, 60, { bgColor: '#EDE9FE', textColor: '#6D28D9' });
    pdf.text(p, 'TECH DEPLOYMENT, PAYMENTS & ONBOARDING 20 WORKSHOPS', 35, 88, { font: 'F2', size: 13, color: '#0F172A' });
    pdf.text(p, 'Vercel/Supabase Hosting, Dynamic UPI QR Escrow, and Physical Scouting in Bilaspur & Raipur', 35, 102, { font: 'F3', size: 8.5, color: '#64748B' });

    // Section 4: Tech & Payments
    pdf.rect(p, 35, 118, 525.28, 250, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 118, 525.28, 24, { fill: true, fillColor: '#F8FAFC' });
    pdf.text(p, 'PHASE 4: PLATFORM DEPLOYMENT, SUPABASE & VIRTUAL UPI ESCROW (WEEKS 4 - 5)', 45, 134, { font: 'F2', size: 8.5, color: '#0F172A' });

    const p4Items = [
      {
        title: 'Production Hosting & Custom Domain DNS',
        desc: 'Deploy Next.js repository on Vercel Pro linked to rkispro.com. Configure SSL, HTTPS enforcement, and automated continuous deployment from the GitHub main branch.'
      },
      {
        title: 'Supabase Production Database & Cloud Storage Buckets',
        desc: 'Run database schema migrations for users, RFQs, workshop catalog, and milestone escrow states. Setup buckets: customer-sketches (public photo/drawing uploads), cad-drawings (encrypted), and quality-reports (vernier/weld photos).'
      },
      {
        title: 'Payment Gateway with Dynamic UPI QR & Virtual Escrow',
        desc: 'Integrate Cashfree Marketplace or Razorpay Route. When a customer confirms a quote, generate a Dynamic UPI QR code. Customers pay the 40% Raw Material Advance via Google Pay/PhonePe; webhooks update RFQ state to ESCROW_FUNDED.'
      },
      {
        title: 'WhatsApp Cloud API Integration (WATI / Interakt)',
        desc: 'Connect dedicated WhatsApp Business number. Configure automated alerts: "Lead Received" -> "Quote Ready with BOM" -> "Primer Applied" -> "Dispatched with Driver Phone".'
      }
    ];

    p4Items.forEach((item, idx) => {
      const yPos = 148 + idx * 52;
      pdf.rect(p, 45, yPos, 505.28, 44, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.text(p, item.title, 55, yPos + 15, { font: 'F2', size: 8, color: '#0D9488' });
      pdf.text(p, item.desc, 55, yPos + 27, { font: 'F1', size: 7.2, color: '#334155', maxWidth: 485 });
    });

    // Section 5: Workshop Onboarding in CG
    pdf.rect(p, 35, 380, 525.28, 390, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 380, 525.28, 24, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'PHASE 5: SUPPLY-SIDE ONBOARDING: 20 WORKSHOPS IN BILASPUR & RAIPUR (WEEKS 5 - 7)', 45, 396, { font: 'F2', size: 8.5, color: '#2DD4BF' });

    const p5Items = [
      {
        hub: 'Physical Cluster Scouting in Bilaspur & Raipur',
        text: 'Visit Sirgitti Industrial Area (structural sheds, racks), Tifra (gates, lathe turners), and Vyapar Vihar (commercial metalwork) in Bilaspur. In Raipur, visit Urla (heavy overhauls, casting), Bhanpuri (laser cutting, CNC), and Rawabhata (structural steel).'
      },
      {
        hub: 'The Irresistible Workshop Value Proposition (Pitch Script)',
        text: '"We are not IndiaMART. We do not sell you leads or take upfront fees. We bring you confirmed, funded work orders. We pay 40% cash advance for raw materials before you cut steel, and your final payment is locked in bank escrow."'
      },
      {
        hub: '2-Page Workshop Partner MOU & Bank Verification',
        text: 'Sign standardized agreement: Workshop agrees to use primary steel brands, true 90-degree squareness, and anti-rust primer coats. Collect bank details and cancelled cheque for instant IMPS milestone releases.'
      },
      {
        hub: 'Target Supply Network for Commercial Launch (20 Workshops)',
        text: '6 Gate & Railing Workshops | 4 Industrial Roof Shed & Truss Fabricators | 3 Storage Rack & Sheet Metal Shops | 3 Precision Lathe / CNC Job Shops | 4 On-Site Mobile Welding & Breakdown Mechanics.'
      }
    ];

    p5Items.forEach((item, idx) => {
      const yPos = 412 + idx * 88;
      pdf.rect(p, 45, yPos, 505.28, 76, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.rect(p, 45, yPos, 4, 76, { fill: true, fillColor: '#0D9488' });
      pdf.text(p, item.hub, 58, yPos + 18, { font: 'F2', size: 8, color: '#0F172A' });
      pdf.text(p, item.text, 58, yPos + 34, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 480 });
    });
  }

  // ============================================================================
  // PAGE 5: PHASE 6 (LEAN CORE TEAM HIRING) & PHASE 7 (DEMAND GENERATION)
  // ============================================================================
  {
    const p = pdf.addPage();
    pdf.badge(p, 'PHASE 6 & PHASE 7: LEAN TEAM & DEMAND GENERATION', 35, 60, { bgColor: '#FEF3C7', textColor: '#B45309' });
    pdf.text(p, 'LEAN HIRING ROADMAP & FIRST 30 CUSTOMERS GO-TO-MARKET', 35, 88, { font: 'F2', size: 13, color: '#0F172A' });
    pdf.text(p, 'Building the 3-Person Core Team and Hyperlocal Acquisition in Bilaspur & Raipur', 35, 102, { font: 'F3', size: 8.5, color: '#64748B' });

    // Section 6: Lean Core Team
    pdf.rect(p, 35, 118, 525.28, 260, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 118, 525.28, 24, { fill: true, fillColor: '#F8FAFC' });
    pdf.text(p, 'PHASE 6: LEAN CORE TEAM HIRING ROADMAP (WEEKS 6 - 8)', 45, 134, { font: 'F2', size: 8.5, color: '#0F172A' });

    const roles = [
      {
        role: 'Founder / CEO (You) - Strategy, High-Value Sales & Finance',
        desc: 'Owns key customer closings, workshop relationships, government incubator liaison, financial escrow oversight, and investor relations. Takes a modest living stipend during Phase 1.'
      },
      {
        role: 'Hire #1: Operations & Technical Fabrication Lead (Rs. 18k - 28k / mo)',
        desc: 'Profile: Diploma / ITI Mechanical Engineering or experienced supervisor from local fabrication/PEB shed yard. Responsibilities: On-site measurements, cut-list BOM synthesis, and conducting the 3-Gate physical quality inspection at workshops.'
      },
      {
        role: 'Hire #2: Customer Support & WhatsApp Sales Coordinator (Rs. 12k - 18k / mo)',
        desc: 'Profile: Graduate fluent in Hindi and Chhattisgarhi/English with strong WhatsApp communication. Responsibilities: < 10-minute response to inquiries, delivering quotes, explaining escrow, and sending progress videos.'
      },
      {
        role: 'Fractional Support: Retainer Chartered Accountant & Local Logistics Drivers',
        desc: 'Retain local CA (Rs. 2,500 - 5,000/mo) for GST/TDS filings. Tie up with 3 local mini-truck (Tata Ace / Pickup) drivers on a per-trip delivery rate (Rs. 800 - 2,000 per trip based on distance).'
      }
    ];

    roles.forEach((r, idx) => {
      const yPos = 148 + idx * 56;
      pdf.rect(p, 45, yPos, 505.28, 48, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.text(p, r.role, 55, yPos + 15, { font: 'F2', size: 8, color: '#0D9488' });
      pdf.text(p, r.desc, 55, yPos + 28, { font: 'F1', size: 7.2, color: '#334155', maxWidth: 485 });
    });

    // Section 7: Demand Generation
    pdf.rect(p, 35, 390, 525.28, 380, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 390, 525.28, 24, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'PHASE 7: DEMAND GENERATION & GETTING YOUR FIRST 30 CUSTOMERS (WEEKS 7 - 10)', 45, 406, { font: 'F2', size: 8.5, color: '#2DD4BF' });

    const gtmChannels = [
      {
        chan: 'Channel 1: Hyperlocal New Construction Scouting (Bilaspur & Raipur)',
        points: 'Scout residential expansion belts (Sakri, Seepat Road, Rajkishore Nagar, Mungeli Road in Bilaspur; Naya Raipur, VIP Road in Raipur). Houses reaching roof slab level will need gates, SS railings, and window grills within 30 days. Distribute physical flyers to owners and site contractors.'
      },
      {
        chan: 'Channel 2: Commercial Warehouses, Rice Mills & Industrial Plants',
        points: 'Directly visit local rice mills, fly ash brick factories, warehouse godowns, and auto showrooms. Pitch heavy warehouse pallet storage racks, steel parking shed canopies, and emergency breakdown welding repair.'
      },
      {
        chan: 'Channel 3: Targeted Local Meta & Google Ads (Rs. 300 - 500 / Day)',
        points: 'Run geo-targeted ads across Bilaspur (+ 25 km) and Raipur (+ 30 km). Creative: Before-and-after photos of sliding gates, SS glass railings, and sheds with transparent prices (e.g. "Gates from Rs. 180/sq.ft"). CTA: 1-click button opening pre-filled WhatsApp chat.'
      },
      {
        chan: 'Channel 4: Referral Network with Local Civil Contractors & Architects',
        points: 'Meet 10 local civil contractors, structural consultants, and interior decorators. Offer 3% to 5% referral commission: "You construct the civil building; we guarantee 100% precision metalwork on time for your clients."'
      }
    ];

    gtmChannels.forEach((c, idx) => {
      const yPos = 422 + idx * 84;
      pdf.rect(p, 45, yPos, 505.28, 74, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.rect(p, 45, yPos, 4, 74, { fill: true, fillColor: '#0D9488' });
      pdf.text(p, c.chan, 58, yPos + 18, { font: 'F2', size: 8, color: '#0F172A' });
      pdf.text(p, c.points, 58, yPos + 34, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 480 });
    });
  }

  // ============================================================================
  // PAGE 6: PHASE 8 (EXECUTION & 3-GATE QA) & PHASE 9 (INVESTOR DATA ROOM)
  // ============================================================================
  {
    const p = pdf.addPage();
    pdf.badge(p, 'PHASE 8 & PHASE 9: EXECUTION EXCELLENCE & INVESTOR READINESS', 35, 60, { bgColor: '#FEE2E2', textColor: '#B91C1C' });
    pdf.text(p, 'EXECUTION RIGOR, 3-GATE QA & INVESTOR DATA ROOM', 35, 88, { font: 'F2', size: 13, color: '#0F172A' });
    pdf.text(p, 'Personal Founder Oversight, Capturing Video Reviews, and Preparing for Pre-Seed Seed Rounds', 35, 102, { font: 'F3', size: 8.5, color: '#64748B' });

    // Section 8: Execution & Quality Rigor
    pdf.rect(p, 35, 118, 525.28, 260, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 118, 525.28, 24, { fill: true, fillColor: '#F8FAFC' });
    pdf.text(p, 'PHASE 8: EXECUTION RIGOR & QUALITY SIGN-OFF ON FIRST 30 ORDERS (WEEKS 8 - 12)', 45, 134, { font: 'F2', size: 8.5, color: '#0F172A' });

    const p8Items = [
      {
        title: 'Personal Founder Site & Workshop Oversight',
        desc: 'On the first 10 orders, the founder must personally accompany the Operations Lead to the customer site and the workshop. Build direct operational intuition and document every step with high-resolution photos.'
      },
      {
        title: 'Rigorous 3-Gate Local Quality Assurance Enforcement',
        desc: 'Gate F1: Digital vernier pipe wall thickness and brand check before cutting. Gate F2: Diagonal squareness and weld slag chipping inspection. Gate F3: Anti-rust primer coverage, on-site plumb/level check, and customer OTP sign-off.'
      },
      {
        title: 'Customer Video Review & Testimonial Capture',
        desc: 'Immediately upon final handover, record a 45-second phone video testimonial from the homeowner or plant manager: "Was the quote fair? Was delivery on time? How is the finish?" Post directly on website, YouTube, and WhatsApp status.'
      },
      {
        title: 'Instant Vendor Settlement (Building Supplier Loyalty)',
        desc: 'Release final 20% balance to the fabricator bank account within 2 hours of customer OTP entry. Fast payment creates fierce workshop loyalty; vendors will prioritize RKISPro orders over random walk-in customers.'
      }
    ];

    p8Items.forEach((item, idx) => {
      const yPos = 148 + idx * 56;
      pdf.rect(p, 45, yPos, 505.28, 48, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.text(p, item.title, 55, yPos + 15, { font: 'F2', size: 8, color: '#0D9488' });
      pdf.text(p, item.desc, 55, yPos + 28, { font: 'F1', size: 7.2, color: '#334155', maxWidth: 485 });
    });

    // Section 9: Metrics & Investor Data Room
    pdf.rect(p, 35, 390, 525.28, 380, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 390, 525.28, 24, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'PHASE 9: OPERATIONAL METRICS & INVESTOR DATA ROOM PREPARATION (WEEKS 10 - 12)', 45, 406, { font: 'F2', size: 8.5, color: '#2DD4BF' });

    const p9Items = [
      {
        head: 'Weekly Operational KPI Dashboard',
        text: 'Track: (1) Total inquiries received (target: 30+/wk), (2) Quote delivery SLA (target: < 4 hours), (3) Conversion rate (target: > 25%), (4) Gross Merchandise Value (GMV), (5) Gross platform margin (target: 8-15%), and (6) On-time delivery rate (> 95%).'
      },
      {
        head: 'Runway & Working Capital Management',
        text: 'Maintain strict negative working capital: Customer milestone advances fund workshop raw material procurement. Keep fixed monthly burn under Rs. 60,000 during Phase 1 (Founder stipend + 2 junior staff + cloud tools).'
      },
      {
        head: 'Investor Data Room Package (Linked Artifacts)',
        text: 'Assemble formal investor folder: Pitch Deck (RKISPro_Seed_Pitch_Deck_and_Investor_Stress_Test), Financial Model (RKISPro_PreSeed_Financial_Model), 1-Page Teaser (RKISPro_1Page_Executive_Teaser), and Operating Manual (RKISPro_End_to_End_Operating_Manual).'
      },
      {
        head: 'Transitioning from Phase 1 Local Pilot to Seed Funding & Track B Expansion',
        text: 'With 30 verified customer orders, positive unit economics, and DPIIT recognition, pitch angel networks (e.g. Inflection Point Ventures, Mumbai Angels, Chhattisgarh Angel Network) and apply for the Rs. 20 Lakh SISFS grant to expand into Track B industrial machining.'
      }
    ];

    p9Items.forEach((item, idx) => {
      const yPos = 422 + idx * 84;
      pdf.rect(p, 45, yPos, 505.28, 74, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0' });
      pdf.rect(p, 45, yPos, 4, 74, { fill: true, fillColor: '#0D9488' });
      pdf.text(p, item.head, 58, yPos + 18, { font: 'F2', size: 8, color: '#0F172A' });
      pdf.text(p, item.text, 58, yPos + 34, { font: 'F1', size: 7.2, color: '#475569', maxWidth: 480 });
    });
  }

  // Compile PDF
  const pdfBuffer = pdf.build();

  const outputPathRoot = path.join('e:', 'RKISPro Marketplace', 'RKISPro_Master_Startup_Launch_Checklist.pdf');
  const outputPathPublic = path.join('e:', 'RKISPro Marketplace', 'public', 'RKISPro_Master_Startup_Launch_Checklist.pdf');
  const outputPathArtifact = path.join('C:', 'Users', 'rksc5', '.gemini', 'antigravity', 'brain', '437e1109-ff91-4847-9987-ee6829402543', 'RKISPro_Master_Startup_Launch_Checklist.pdf');

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

  console.log('Launch Checklist PDF Generation Complete: 6 Full Pages Generated Successfully.');
}

buildLaunchChecklistPDF();
