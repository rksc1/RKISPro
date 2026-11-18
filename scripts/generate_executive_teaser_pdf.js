const fs = require('fs');
const path = require('path');
const { PDFEngine } = require('./pdf_engine');

function buildExecutiveTeaser() {
  const pdf = new PDFEngine({
    headerTitle: 'RKISPRO INDUSTRIAL TECHNOLOGIES',
    headerSubtitle: 'EXECUTIVE INVESTOR TEASER | LEAN PRE-SEED MEMO',
    footerText: 'CONFIDENTIAL  |  LEAN PRE-SEED ROUND: RS. 75 LAKHS ($90,000 USD)'
  });

  // ============================================================================
  // PAGE 1: EXECUTIVE THESIS, PROBLEM, LEAN SOLUTION & FOUNDER DNA
  // ============================================================================
  {
    const p = pdf.addPage({ skipHeaderFooter: true });
    // Dark Teal Top Stripe
    pdf.rect(p, 0, 0, 595.28, 8, { fill: true, fillColor: '#0D9488' });
    pdf.rect(p, 35, 25, 525.28, 80, { fill: true, fillColor: '#0F172A' });

    pdf.badge(p, 'CONFIDENTIAL PRE-SEED / ANGEL MEMO', 50, 40, { bgColor: '#134E4A', textColor: '#2DD4BF', fontSize: 8.5 });
    pdf.text(p, 'RKISPRO INDUSTRIAL TECHNOLOGIES', 50, 64, { font: 'F2', size: 18, color: '#FFFFFF' });
    pdf.text(p, 'The Lean Managed Manufacturing Network for Precision Metal Fabrication', 50, 84, { font: 'F3', size: 10.5, color: '#94A3B8' });

    pdf.badge(p, 'STAGE: IDEATION / CONCIERGE PILOT', 545, 42, { bgColor: '#1E293B', textColor: '#38BDF8', fontSize: 8, align: 'right' });
    pdf.badge(p, 'ASK: RS. 75 LAKHS ($90K)', 545, 66, { bgColor: '#134E4A', textColor: '#2DD4BF', fontSize: 8.5, align: 'right' });

    // 4 Key Metrics Bar
    const stats = [
      { val: '$120 Billion', label: 'Indian Contract Sourcing TAM', col: '#0D9488' },
      { val: '12-15% Margin', label: 'Asset-Light Managed Spread', col: '#0284C7' },
      { val: 'Pune-Chakan', label: 'Corridor Focus (4,000+ Machine Shops)', col: '#D97706' },
      { val: 'Day-0 Anchor', label: 'Marks Engineering & Co. Captive Hub', col: '#16A34A' }
    ];

    stats.forEach((st, idx) => {
      const x = 35 + idx * 133.8;
      pdf.rect(p, x, 115, 124, 48, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#CBD5E1', lineWidth: 0.75 });
      pdf.rect(p, x, 115, 124, 3.5, { fill: true, fillColor: st.col });
      pdf.text(p, st.val, x + 10, 136, { font: 'F2', size: 11, color: '#0F172A' });
      pdf.text(p, st.label, x + 10, 152, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 105 });
    });

    // SECTION 1: THE STRUCTURAL INDUSTRY PAIN
    pdf.rect(p, 35, 175, 525.28, 175, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 175, 525.28, 26, { fill: true, fillColor: '#F1F5F9' });
    pdf.text(p, '1. THE STRUCTURAL DEFICIT IN TRADITIONAL B2B SOURCING', 50, 193, { font: 'F2', size: 9.5, color: '#0F172A' });

    const problems = [
      ['Lead Classifieds vs. Engineering Ownership:', 'Lead directories (IndiaMART) sell buyer phone numbers to 30+ unvetted workshops. Procurement teams are flooded with telemarketing calls rather than verified engineering and capacity reviews.'],
      ['Advance Payment Risk & Delayed Delivery:', 'Unorganized workshops demand 50% cash advance wires before cutting steel. If deliveries arrive 60 days late or out of spec, corporate buyers absorb 100% of the production loss.'],
      ['Uncertified Raw Materials & Scrap Substitution:', 'Sub-tier job shops frequently substitute commercial re-rolled scrap for certified alloys (SS304/SS316, EN8, AISI 4140), causing in-plant mechanical failures and severe warranty claims.'],
      ['Working Capital Starvation for Skilled MSMEs:', 'Competent precision machine shops wait 90 to 120 days for OEM payments, starving them of working capital to purchase certified mill steel and specialized CNC tooling.']
    ];

    problems.forEach((pr, i) => {
      const yPos = 211 + i * 33;
      pdf.bullet(p, 50, yPos + 4, '#E11D48', 3);
      pdf.text(p, pr[0], 60, yPos, { font: 'F2', size: 9, color: '#0F172A' });
      pdf.text(p, pr[1], 60, yPos + 12, { font: 'F1', size: 8.5, color: '#475569', maxWidth: 485 });
    });

    // SECTION 2: THE LEAN MANAGED MARKETPLACE ARCHITECTURE
    pdf.rect(p, 35, 362, 525.28, 185, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 362, 525.28, 26, { fill: true, fillColor: '#F1F5F9' });
    pdf.text(p, '2. THE RKISPRO LEAN OPERATING MODEL (HOW IT WORKS)', 50, 380, { font: 'F2', size: 9.5, color: '#0F172A' });

    const solutions = [
      ['Contractual Seller of Record:', 'RKISPro acts as single corporate counterparty. We take full commercial and technical delivery liability, backed by compliant GST SAC 9988 e-invoicing and vendor non-circumvention contracts.'],
      ['Day-0 Captive Anchor & Neighbor Micro-Network:', 'First 10-15 pilot orders are executed inside Marks Engineering & Co. and 2-3 trusted neighbor machine shops in Pune-Chakan with zero upfront software or hardware capex.'],
      ['Rigorous 4-Gate Manual Quality Control:', 'Gate 1 (MTC & chemical check) -> Gate 2 (First Article Inspection) -> Gate 3 (Weld NDT / Hydro) -> Gate 4 (Final Pre-Dispatch Visual & Dimensional Sign-Off by RKISPro Quality Engineer).'],
      ['Structured Milestone Terms & Pay-Per-Test Labs:', '30% PO Advance -> 40% Pre-Dispatch Quality Sign-off -> 30% Inward Delivery. NABL metrology testing (CMM, spectrometry) outsourced on-demand for Rs. 500 - Rs. 1,500/test.']
    ];

    solutions.forEach((sl, i) => {
      const yPos = 398 + i * 36;
      pdf.bullet(p, 50, yPos + 4, '#0D9488', 3);
      pdf.text(p, sl[0], 60, yPos, { font: 'F2', size: 9, color: '#0F172A' });
      pdf.text(p, sl[1], 60, yPos + 12, { font: 'F1', size: 8.5, color: '#475569', maxWidth: 485 });
    });

    // SECTION 3: FOUNDING TEAM & UNFAIR ADVANTAGE
    pdf.rect(p, 35, 560, 525.28, 220, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 560, 525.28, 26, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, '3. FOUNDING TEAM: SHOP-FLOOR MANUFACTURING DNA', 50, 578, { font: 'F2', size: 9.5, color: '#2DD4BF' });

    // Founder 1
    pdf.text(p, 'Rajeev Tiwari  |  Co-Founder & Chief Executive Officer', 50, 598, { font: 'F2', size: 9.5, color: '#0F172A' });
    pdf.text(p, '3 years of hands-on operational leadership in industrial metal fabrication. Second-generation manufacturing entrepreneur whose family owns and operates an established fabrication enterprise. Hands-on expertise in rapid drawing triage, vendor rate benchmarking, and client relationship management.', 50, 612, { font: 'F1', size: 8.5, color: '#475569', maxWidth: 495 });

    // Founder 2
    pdf.text(p, 'Rupesh Tiwari  |  Co-Founder & Head of Manufacturing Operations', 50, 652, { font: 'F2', size: 9.5, color: '#0F172A' });
    pdf.text(p, 'Founder & Owner of Marks Engineering and Co. (active precision fabrication company in Maharashtra). Contributes direct captive workshop capacity, certified welders, skilled machinists, and established steel mill supplier accounts across Maharashtra.', 50, 666, { font: 'F1', size: 8.5, color: '#475569', maxWidth: 495 });

    // Captive advantage callout pill
    pdf.rect(p, 50, 710, 495.28, 55, { fill: true, stroke: true, fillColor: '#FEF3C7', strokeColor: '#F59E0B', lineWidth: 0.75 });
    pdf.text(p, 'THE UNFAIR ADVANTAGE: CAPTIVE WORKSHOP ANCHOR FROM DAY 0', 65, 726, { font: 'F2', size: 8.5, color: '#92400E' });
    pdf.text(p, 'Marks Engineering & Co. serves as RKISPro\'s physical operations base and benchmark shop, providing guaranteed production slots and saving Rs. 15L - Rs. 20L in third-party prototyping and setup costs during the concierge pilot phase.', 65, 742, { font: 'F1', size: 8, color: '#78350F', maxWidth: 465 });

    pdf.text(p, 'Confidential Pre-Seed Investor Document  |  Continued on Page 2 (Unit Economics & Lean Roadmap)', 50, 800, { font: 'F3', size: 8, color: '#94A3B8' });
  }

  // ============================================================================
  // PAGE 2: UNIT ECONOMICS, MARKET SIZE, LEAN ROADMAP & CAPITAL ASK
  // ============================================================================
  {
    const p = pdf.addPage({ skipHeaderFooter: true });
    pdf.rect(p, 0, 0, 595.28, 8, { fill: true, fillColor: '#0D9488' });

    // Header strip
    pdf.rect(p, 35, 25, 525.28, 45, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'RKISPRO: LEAN FINANCIAL BLUEPRINT & EXECUTION PLAN', 50, 45, { font: 'F2', size: 14, color: '#FFFFFF' });
    pdf.text(p, 'Unit Economics, Market Sizing, 3-Stage Roadmap & Rs. 75 Lakh Pre-Seed Allocation', 50, 60, { font: 'F3', size: 9, color: '#94A3B8' });
    pdf.badge(p, 'PAGE 2 OF 2', 545, 42, { bgColor: '#1E293B', textColor: '#2DD4BF', fontSize: 8, align: 'right' });

    // SECTION 4: UNIT ECONOMICS (Sample Rs. 5,00,000 Order)
    pdf.rect(p, 35, 80, 525.28, 175, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 80, 525.28, 24, { fill: true, fillColor: '#F1F5F9' });
    pdf.text(p, '4. TRANSACTION UNIT ECONOMICS ON A TYPICAL RS. 5,00,000 BATCH ORDER', 50, 96, { font: 'F2', size: 9.5, color: '#0F172A' });

    const unitTable = [
      ['1. Buyer Purchase Order Value (Milestone Terms: 30% Advance / 40% Inspection / 30% Inward)', 'Rs. 5,00,000', '#0F172A', true],
      ['2. Vendor COGS Payout (Raw Material Rs. 1.35L + Machining Rs. 1.75L + Delivery Rs. 1.30L)', '- Rs. 4,40,000', '#64748B', false],
      ['3. Gross Platform Revenue (12.0% Contractual Managed Take-Rate)', 'Rs. 60,000', '#0D9488', true],
      ['4. Direct Cost of Quality (NABL Pay-Per-Test Rs. 2.5K + Inspector Travel Rs. 3.5K + Insurance Rs. 3K)', '- Rs. 9,000', '#64748B', false],
      ['5. Net Contribution Margin (85.0% Contribution Margin on Platform Revenue)', 'Rs. 51,000', '#16A34A', true]
    ];

    unitTable.forEach((row, i) => {
      const yPos = 112 + i * 23;
      const isNet = i === 4;
      pdf.rect(p, 45, yPos - 3, 505.28, 21, { fill: true, fillColor: isNet ? '#F0FDFA' : (i % 2 === 0 ? '#F8FAFC' : '#FFFFFF') });
      pdf.text(p, row[0], 55, yPos + 11, { font: row[3] ? 'F2' : 'F1', size: 8, color: row[2] });
      pdf.text(p, row[1], 540, yPos + 11, { font: 'F2', size: 8.5, color: row[2], align: 'right' });
    });

    pdf.text(p, 'Cash-Flow Discipline: Back-to-back milestone payments protect working capital. Zero balance-sheet inventory debt.', 50, 238, { font: 'F2', size: 8, color: '#0D9488' });

    // SECTION 5: MARKET OPPORTUNITY (TAM / SAM / SOM)
    pdf.rect(p, 35, 265, 525.28, 105, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 265, 525.28, 24, { fill: true, fillColor: '#F1F5F9' });
    pdf.text(p, '5. MARKET SIZING & TARGET MANUFACTURING CORRIDORS', 50, 281, { font: 'F2', size: 9.5, color: '#0F172A' });

    const markets = [
      { num: '$120 Billion', title: 'TAM (Total Market)', desc: 'Annual Indian contract manufacturing, structural fab, and precision machining market.' },
      { num: '$24 Billion', title: 'SAM (Serviceable)', desc: 'High-precision contract fabrication & CNC machining across automotive, pharma, and heavy engineering.' },
      { num: '$25 Million', title: 'SOM (Initial Focus)', desc: 'Initial 24-36 month focus on Pune-Chakan industrial cluster (Bhosari, Talwade, Chakan GIDC).' }
    ];

    markets.forEach((m, idx) => {
      const x = 50 + idx * 170;
      pdf.rect(p, x, 298, 155, 62, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#E2E8F0', lineWidth: 0.5 });
      pdf.text(p, m.num, x + 8, 316, { font: 'F2', size: 13, color: '#0D9488' });
      pdf.text(p, m.title, x + 8, 330, { font: 'F2', size: 8, color: '#0F172A' });
      pdf.text(p, m.desc, x + 8, 342, { font: 'F1', size: 7, color: '#64748B', maxWidth: 140 });
    });

    // SECTION 6: 3-STAGE PRAGMATIC EXECUTION ROADMAP
    pdf.rect(p, 35, 380, 525.28, 140, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 380, 525.28, 24, { fill: true, fillColor: '#F1F5F9' });
    pdf.text(p, '6. 3-STAGE PRAGMATIC ROADMAP: FROM CONCIERGE TO SCALE', 50, 396, { font: 'F2', size: 9.5, color: '#0F172A' });

    const phases = [
      {
        phase: 'Stage 1: Months 1-3 (Concierge)',
        title: 'Zero Software Capex Pilot',
        items: ['Deliver 10-15 orders via Marks Eng.', 'Personal drawing triage by founders', 'Manual 4-gate QA & NABL tests', 'Rs. 30L-40L GMV self-funded']
      },
      {
        phase: 'Stage 2: Months 4-12 (Network)',
        title: 'Local Micro-Network (Ask)',
        items: ['Onboard 8-12 vetted partner shops', 'Full-time Quality Inspector hired', 'Deliver 45-60 batch orders', 'Rs. 2.0 Cr - 2.5 Cr GMV run-rate']
      },
      {
        phase: 'Stage 3: Months 13-18 (Scale)',
        title: 'Digital Portal & Expansion',
        items: ['Launch automated order portal', 'Expand to 25+ audited workshops', 'Expand to Sanand / Aurangabad', 'Ready for $1.5M Institutional Seed']
      }
    ];

    phases.forEach((ph, idx) => {
      const x = 50 + idx * 170;
      pdf.rect(p, x, 412, 155, 98, { fill: true, stroke: true, fillColor: '#F8FAFC', strokeColor: '#CBD5E1', lineWidth: 0.5 });
      pdf.text(p, ph.phase, x + 8, 428, { font: 'F2', size: 7.5, color: '#0D9488' });
      pdf.text(p, ph.title, x + 8, 442, { font: 'F2', size: 8.5, color: '#0F172A' });
      ph.items.forEach((it, itIdx) => {
        pdf.bullet(p, x + 8, 456 + itIdx * 12 + 3, '#0D9488', 2);
        pdf.text(p, it, x + 15, 456 + itIdx * 12, { font: 'F1', size: 7.2, color: '#475569' });
      });
    });

    // SECTION 7: THE LEAN PRE-SEED ASK (RS. 75 LAKHS)
    pdf.rect(p, 35, 530, 525.28, 140, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 35, 530, 525.28, 24, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, '7. THE LEAN PRE-SEED ASK: RS. 75 LAKHS ($90,000 USD)', 50, 546, { font: 'F2', size: 9.5, color: '#2DD4BF' });

    const allocs = [
      ['40% (Rs. 30.0 Lakhs)', 'Field Quality Inspector & Operations', 'Full-time Lead Metrology QA Engineer, precision calipers/gauges, shop-floor travel.'],
      ['25% (Rs. 18.75 Lakhs)', 'Factory Audits & Pay-Per-Test Labs', 'Physical audits of 15-20 shops in Chakan, on-demand NABL spectroscopy & CMM tests.'],
      ['20% (Rs. 15.0 Lakhs)', 'Working Capital & Raw Steel Advance Buffer', 'Liquid buffer securing certified raw material advance without balance-sheet strain.'],
      ['15% (Rs. 11.25 Lakhs)', 'Legal, Compliance & Lean Web Portal', 'Vendor milestone contracts, GST filing, simple buyer order tracking web interface.']
    ];

    allocs.forEach((al, i) => {
      const yPos = 562 + i * 24;
      pdf.rect(p, 45, yPos - 2, 505.28, 22, { fill: true, fillColor: i % 2 === 0 ? '#F8FAFC' : '#FFFFFF' });
      pdf.text(p, al[0], 55, yPos + 11, { font: 'F2', size: 8, color: '#0D9488' });
      pdf.text(p, al[1], 180, yPos + 11, { font: 'F2', size: 8, color: '#0F172A' });
      pdf.text(p, al[2], 305, yPos + 11, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 235 });
    });

    // Master Contact Footer Box
    pdf.rect(p, 35, 680, 525.28, 105, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#0D9488', lineWidth: 1 });
    pdf.text(p, 'FOUNDER CONTACT & NEXT STEPS', 50, 700, { font: 'F2', size: 9, color: '#2DD4BF' });
    pdf.text(p, 'Rajeev Tiwari (Co-Founder & CEO)  |  Rupesh Tiwari (Co-Founder & Head of Manufacturing / Marks Engineering & Co.)', 50, 718, { font: 'F2', size: 8, color: '#FFFFFF' });
    pdf.text(p, 'RKISPro Industrial Technologies Pvt. Ltd.  |  Operations Hub: Pune / Chakan, Maharashtra', 50, 732, { font: 'F1', size: 7.5, color: '#94A3B8' });
    pdf.text(p, 'Target: Rs. 75 Lakhs Pre-Seed SAFE / Equity  |  15-18 Months Runway  |  Pilot Traction In Progress', 50, 746, { font: 'F1', size: 7.5, color: '#CBD5E1' });

    pdf.badge(p, 'INVESTOR INQUIRIES: OPEN FOR DISCUSSIONS', 545, 765, { bgColor: '#0D9488', textColor: '#FFFFFF', fontSize: 7.5, align: 'right' });
    pdf.text(p, 'Strictly Confidential. Prepared for angel investors, family offices, and early-stage industrial micro-funds.', 50, 770, { font: 'F3', size: 7, color: '#64748B' });
  }

  // Compile & Output PDF
  const pdfBuffer = pdf.build();

  const outputPathRoot = path.join('e:', 'RKISPro Marketplace', 'RKISPro_1Page_Executive_Teaser.pdf');
  const outputPathPublic = path.join('e:', 'RKISPro Marketplace', 'public', 'RKISPro_1Page_Executive_Teaser.pdf');
  const outputPathArtifact = path.join('C:', 'Users', 'rksc5', '.gemini', 'antigravity', 'brain', '437e1109-ff91-4847-9987-ee6829402543', 'RKISPro_1Page_Executive_Teaser.pdf');

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

  console.log('High-Legibility Lean Executive Teaser PDF Generated Successfully.');
}

buildExecutiveTeaser();
