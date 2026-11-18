const fs = require('fs');
const path = require('path');
const { PDFEngine } = require('./pdf_engine');

function buildFinancialModel() {
  const pdf = new PDFEngine({
    headerTitle: 'RKISPRO INDUSTRIAL TECHNOLOGIES',
    headerSubtitle: '18-MONTH LEAN PRE-SEED FINANCIAL MODEL & OPERATING BUDGET',
    footerText: 'CONFIDENTIAL  |  LEAN PRE-SEED CAPITAL: RS. 75 LAKHS ($90,000 USD)'
  });

  // ============================================================================
  // PAGE 1: EXECUTIVE SUMMARY & CAPITAL ALLOCATION (RS. 75 LAKHS)
  // ============================================================================
  {
    const p = pdf.addPage({ skipHeaderFooter: true });
    pdf.rect(p, 0, 0, 595.28, 841.89, { fill: true, fillColor: '#0F172A' });
    pdf.rect(p, 0, 0, 595.28, 10, { fill: true, fillColor: '#0D9488' });
    pdf.rect(p, 0, 831.89, 595.28, 10, { fill: true, fillColor: '#0D9488' });

    pdf.badge(p, 'LEAN PRE-SEED FINANCIAL ARCHITECTURE & OPERATING BUDGET', 50, 75, {
      bgColor: '#134E4A',
      textColor: '#2DD4BF',
      fontSize: 9,
      paddingX: 12,
      paddingY: 5
    });

    pdf.text(p, 'RKISPRO', 50, 130, { font: 'F2', size: 36, color: '#FFFFFF' });
    pdf.text(p, '18-MONTH LEAN PRE-SEED FINANCIAL MODEL', 50, 162, { font: 'F2', size: 18, color: '#2DD4BF' });
    pdf.text(p, 'Capital Allocation, Runway Projections & Unit Economics', 50, 198, { font: 'F2', size: 21, color: '#F8FAFC' });
    pdf.text(p, 'Target Capital Ask: Rs. 75 Lakhs ($90,000 USD) | Runway: 15-18 Months to Institutional Seed', 50, 225, { font: 'F3', size: 11, color: '#94A3B8' });

    pdf.line(p, 50, 248, 545.28, 248, { color: '#334155', lineWidth: 1.5 });

    const finCards = [
      { label: 'Target Capital Ask', val: 'Rs. 75 Lakhs', sub: '$90,000 USD Pre-Seed', col: '#0D9488' },
      { label: 'Monthly Net Burn', val: 'Rs. 3.8L - 4.5L', sub: 'Highly Disciplined Ramp', col: '#0284C7' },
      { label: 'Target Take-Rate', val: '12.0%', sub: 'Asset-Light Margin Spread', col: '#D97706' },
      { label: '18-Mo Target GMV', val: 'Rs. 7.43 Cr', sub: '174 Batch Deliveries', col: '#16A34A' }
    ];

    finCards.forEach((fc, idx) => {
      const x = 50 + idx * 127;
      pdf.rect(p, x, 268, 118, 70, { fill: true, stroke: true, fillColor: '#1E293B', strokeColor: '#334155' });
      pdf.rect(p, x, 268, 118, 4, { fill: true, fillColor: fc.col });
      pdf.text(p, fc.label, x + 8, 288, { font: 'F2', size: 8, color: '#94A3B8' });
      pdf.text(p, fc.val, x + 8, 310, { font: 'F2', size: 13.5, color: '#FFFFFF' });
      pdf.text(p, fc.sub, x + 8, 326, { font: 'F1', size: 7.5, color: '#CBD5E1' });
    });

    // Use of Funds Table (Rs. 75 Lakhs)
    pdf.rect(p, 50, 360, 495.28, 215, { fill: true, stroke: true, fillColor: '#1E293B', strokeColor: '#334155' });
    pdf.rect(p, 50, 360, 495.28, 24, { fill: true, fillColor: '#090D16' });
    pdf.text(p, 'LEAN PRE-SEED CAPITAL ALLOCATION & USE OF FUNDS (RS. 75 LAKHS)', 65, 376, { font: 'F2', size: 9, color: '#2DD4BF' });

    const allocData = [
      ['1. Field Quality Inspector & Ops', '40.0%', 'Rs. 30,00,000', 'Full-time Lead Metrology QA Engineer, digital gauges/calipers, daily workshop visits in Chakan.'],
      ['2. Factory Audits & Pay-Per-Test Labs', '25.0%', 'Rs. 18,75,000', 'Physical audits of 15-20 machine shops, on-demand NABL spectrometry & CMM testing fees.'],
      ['3. Working Capital & Raw Steel Buffer', '20.0%', 'Rs. 15,00,000', 'Liquid buffer securing certified raw material advance without balance-sheet strain.'],
      ['4. Legal, Compliance & Lean Web Portal', '15.0%', 'Rs. 11,25,000', 'Vendor milestone contracts, GST e-invoicing compliance, lightweight buyer tracking portal.'],
      ['TOTAL LEAN PRE-SEED CAPITAL', '100.0%', 'Rs. 75,00,000', '15-18 Months Runway to reach Rs. 75L+/mo GMV run rate and command a $1.5M Institutional Seed.']
    ];

    allocData.forEach((row, i) => {
      const yPos = 390 + i * 36;
      const isTotal = i === 4;
      pdf.rect(p, 50, yPos, 495.28, 36, { fill: true, stroke: true, fillColor: isTotal ? '#090D16' : (i % 2 === 0 ? '#1E293B' : '#141E2E'), strokeColor: '#334155', lineWidth: 0.5 });
      pdf.text(p, row[0], 65, yPos + 16, { font: 'F2', size: 8, color: isTotal ? '#2DD4BF' : '#FFFFFF' });
      pdf.text(p, row[1], 230, yPos + 16, { font: 'F2', size: 8, color: isTotal ? '#2DD4BF' : '#38BDF8' });
      pdf.text(p, row[2], 280, yPos + 16, { font: 'F2', size: 8, color: isTotal ? '#2DD4BF' : '#FFFFFF' });
      pdf.text(p, row[3], 365, yPos + 14, { font: 'F1', size: 7.2, color: '#94A3B8', maxWidth: 170 });
    });

    // Founding Team & Anchor Note
    pdf.rect(p, 50, 595, 495.28, 160, { fill: true, stroke: true, fillColor: '#090D16', strokeColor: '#1E293B' });
    pdf.text(p, 'FOUNDER DNA: CAPTIVE INDUSTRIAL ANCHOR CAPACITY (MARKS ENGINEERING)', 70, 620, { font: 'F2', size: 9.5, color: '#38BDF8' });
    pdf.line(p, 70, 632, 525.28, 632, { color: '#1E293B', lineWidth: 0.75 });

    pdf.text(p, 'Founder: Rajeev Tiwari (CEO)', 70, 650, { font: 'F2', size: 8.5, color: '#FFFFFF' });
    pdf.text(p, '3 years operational experience in metal fabrication; 2nd-generation manufacturing family.', 230, 650, { font: 'F1', size: 8, color: '#94A3B8' });

    pdf.text(p, 'Co-Founder: Rupesh Tiwari (Head of Mfg)', 70, 672, { font: 'F2', size: 8.5, color: '#FFFFFF' });
    pdf.text(p, 'Owner of Marks Engineering and Co. (active precision fabrication company in Maharashtra).', 230, 672, { font: 'F1', size: 8, color: '#94A3B8' });

    pdf.text(p, 'Captive Workshop Subsidy:', 70, 694, { font: 'F2', size: 8.5, color: '#2DD4BF' });
    pdf.text(p, 'Marks Engineering & Co. provides captive machine capacity and skilled welders from Day 0, eliminating setup overheads and saving Rs. 15L - Rs. 20L during the concierge pilot phase.', 230, 694, { font: 'F1', size: 7.5, color: '#CBD5E1', maxWidth: 295 });

    pdf.text(p, 'Confidential & Proprietary. Prepared for angel networks, family offices, and seed funds.', 50, 785, { font: 'F1', size: 8, color: '#64748B' });
  }

  // ============================================================================
  // PAGE 2: 18-MONTH LEAN OPERATING BUDGET & MONTHLY CASH BURN
  // ============================================================================
  {
    const p = pdf.addPage();
    pdf.text(p, '18-MONTH LEAN OPERATING BUDGET & MONTHLY CASH BURN SCHEDULE', 50, 68, { font: 'F2', size: 13, color: '#0F172A' });
    pdf.text(p, 'Disciplined Cash Management: Field Inspection, On-Demand Testing & Working Capital Buffer', 50, 82, { font: 'F3', size: 8.5, color: '#64748B' });

    const tableY = 100;
    pdf.rect(p, 50, tableY, 495.28, 20, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'MO', 55, tableY + 13, { font: 'F2', size: 7.5, color: '#2DD4BF' });
    pdf.text(p, 'PHASE & FOCUS', 78, tableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'PAYROLL', 185, tableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'AUDITS & QA', 245, tableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'PORTAL / OPS', 315, tableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'LEGAL / ADMIN', 385, tableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'NET BURN', 460, tableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'REMAINING', 540, tableY + 13, { font: 'F2', size: 7.5, color: '#2DD4BF', align: 'right' });

    const burnData = [
      ['M01', 'Stage 1: Setup & Milestone Terms', 'Rs. 1.8L', 'Rs. 0.8L', 'Rs. 0.3L', 'Rs. 0.9L', 'Rs. 3.8L', 'Rs. 71.2L'],
      ['M02', 'Stage 1: 5 Concierge Pilot POs', 'Rs. 1.8L', 'Rs. 1.0L', 'Rs. 0.3L', 'Rs. 0.6L', 'Rs. 3.7L', 'Rs. 67.5L'],
      ['M03', 'Stage 1: 10 Pilot Batch Orders', 'Rs. 1.8L', 'Rs. 1.2L', 'Rs. 0.4L', 'Rs. 0.5L', 'Rs. 3.9L', 'Rs. 63.6L'],
      ['M04', 'Stage 2: Hire Field QA Inspector', 'Rs. 2.4L', 'Rs. 1.3L', 'Rs. 0.4L', 'Rs. 0.5L', 'Rs. 4.6L', 'Rs. 59.0L'],
      ['M05', 'Stage 2: Audit 5 Neighbor Shops', 'Rs. 2.4L', 'Rs. 1.3L', 'Rs. 0.4L', 'Rs. 0.5L', 'Rs. 4.6L', 'Rs. 54.4L'],
      ['M06', 'Stage 2: Commercial Batch Scale', 'Rs. 2.4L', 'Rs. 1.4L', 'Rs. 0.5L', 'Rs. 0.5L', 'Rs. 4.8L', 'Rs. 49.6L'],
      ['M07', 'Stage 2: Expand to 8 Partner Shops', 'Rs. 2.5L', 'Rs. 1.4L', 'Rs. 0.5L', 'Rs. 0.5L', 'Rs. 4.9L', 'Rs. 44.7L'],
      ['M08', 'Stage 2: High-Precision Fab Orders', 'Rs. 2.5L', 'Rs. 1.4L', 'Rs. 0.5L', 'Rs. 0.5L', 'Rs. 4.9L', 'Rs. 39.8L'],
      ['M09', 'Stage 2: Repeat Order Consolidation', 'Rs. 2.5L', 'Rs. 1.5L', 'Rs. 0.5L', 'Rs. 0.5L', 'Rs. 5.0L', 'Rs. 34.8L'],
      ['M10', 'Stage 3: Lightweight Web Portal', 'Rs. 2.6L', 'Rs. 1.5L', 'Rs. 0.6L', 'Rs. 0.5L', 'Rs. 5.2L', 'Rs. 29.6L'],
      ['M11', 'Stage 3: Onboard 15 Audited Shops', 'Rs. 2.6L', 'Rs. 1.5L', 'Rs. 0.6L', 'Rs. 0.5L', 'Rs. 5.2L', 'Rs. 24.4L'],
      ['M12', 'Stage 3: 15 Active Enterprise Clients', 'Rs. 2.6L', 'Rs. 1.5L', 'Rs. 0.6L', 'Rs. 0.5L', 'Rs. 5.2L', 'Rs. 19.2L'],
      ['M13', 'Stage 3: Bhosari & Talwade Clusters', 'Rs. 2.7L', 'Rs. 1.6L', 'Rs. 0.6L', 'Rs. 0.5L', 'Rs. 5.4L', 'Rs. 13.8L'],
      ['M14', 'Stage 3: Multi-Shop Routing', 'Rs. 2.7L', 'Rs. 1.6L', 'Rs. 0.6L', 'Rs. 0.5L', 'Rs. 5.4L', 'Rs. 8.4L'],
      ['M15', 'Stage 3: Run-Rate Acceleration', 'Rs. 2.7L', 'Rs. 1.6L', 'Rs. 0.6L', 'Rs. 0.5L', 'Rs. 5.4L', 'Rs. 3.0L'],
      ['M16', 'Stage 3: Seed Round Roadshow', 'Rs. 2.7L', 'Rs. 1.5L', 'Rs. 0.6L', 'Rs. 0.5L', 'Rs. 5.3L', 'Rev Buffer*'],
      ['M17', 'Stage 3: Institutional Term Sheet', 'Rs. 2.7L', 'Rs. 1.5L', 'Rs. 0.6L', 'Rs. 0.5L', 'Rs. 5.3L', 'Rev Buffer*'],
      ['M18', 'Stage 3: $1.5M Seed Round Close', 'Rs. 2.7L', 'Rs. 1.5L', 'Rs. 0.6L', 'Rs. 0.5L', 'Rs. 5.3L', 'Seed Funded']
    ];

    burnData.forEach((row, i) => {
      const rowY = tableY + 20 + i * 32;
      const bgCol = i % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
      pdf.rect(p, 50, rowY, 495.28, 32, { fill: true, stroke: true, fillColor: bgCol, strokeColor: '#E2E8F0', lineWidth: 0.5 });

      pdf.text(p, row[0], 55, rowY + 18, { font: 'F2', size: 7.5, color: '#0F172A' });
      pdf.text(p, row[1], 78, rowY + 18, { font: 'F2', size: 7.5, color: '#0F172A' });
      pdf.text(p, row[2], 185, rowY + 18, { font: 'F1', size: 7, color: '#475569' });
      pdf.text(p, row[3], 245, rowY + 18, { font: 'F1', size: 7, color: '#475569' });
      pdf.text(p, row[4], 315, rowY + 18, { font: 'F1', size: 7, color: '#475569' });
      pdf.text(p, row[5], 385, rowY + 18, { font: 'F1', size: 7, color: '#475569' });
      pdf.text(p, row[6], 460, rowY + 18, { font: 'F2', size: 7.5, color: '#E11D48' });
      pdf.text(p, row[7], 540, rowY + 18, { font: 'F2', size: 7.5, color: '#0D9488', align: 'right' });
    });

    const calloutY = tableY + 20 + 18 * 32 + 10;
    pdf.rect(p, 50, calloutY, 495.28, 65, { fill: true, stroke: true, fillColor: '#F0FDFA', strokeColor: '#0D9488', lineWidth: 1 });
    pdf.text(p, 'REVENUE CASH RECIRCULATION & RUNWAY EXTENSION', 65, calloutY + 18, { font: 'F2', size: 8.5, color: '#0F766E' });
    pdf.text(p, 'Starting Month 3, 12% contractual gross margin spreads from completed orders begin generating operating cash flow', 65, calloutY + 34, { font: 'F1', size: 7.5, color: '#134E4A' });
    pdf.text(p, '(generating approx. Rs. 89.2 Lakhs in gross revenue over 18 months). This organic cash generation completely covers', 65, calloutY + 46, { font: 'F1', size: 7.5, color: '#134E4A' });
    pdf.text(p, 'working expenses from Month 15 onwards, extending pre-seed runway comfortably beyond 20 months.', 65, calloutY + 58, { font: 'F1', size: 7.5, color: '#134E4A' });
  }

  // ============================================================================
  // PAGE 3: 3-STAGE OPERATIONAL ROADMAP & QUARTERLY GMV RAMP
  // ============================================================================
  {
    const p = pdf.addPage();
    pdf.text(p, '3-STAGE OPERATIONAL ROADMAP & QUARTERLY GMV RAMP', 50, 68, { font: 'F2', size: 13, color: '#0F172A' });
    pdf.text(p, 'Quarterly Breakdown: Workshop Network, Order Velocity, Gross Merchandise Value & Net Revenue', 50, 82, { font: 'F3', size: 8.5, color: '#64748B' });

    const phases = [
      {
        title: 'STAGE 1: CONCIERGE PILOT (M1-M3)',
        kpis: ['Marks Eng. + 2 Partner Shops', '3 Enterprise Buyer Accounts', '8 Delivered Pilot Orders', 'Rs. 24 Lakhs GMV'],
        focus: 'Focus: Hands-on order delivery via Marks Engineering & Co., rapid manual drawing triage by founders, zero software capex, establishing trusted commercial relationship.'
      },
      {
        title: 'STAGE 2: LOCAL MICRO-NETWORK (M4-M9)',
        kpis: ['8 Audited Machine Shops', '10 Enterprise Buyer Accounts', '39 Delivered Commercial Batches', 'Rs. 1.72 Cr Cumulative GMV'],
        focus: 'Focus: Deploying full-time Field Quality Inspector across Bhosari and Chakan, pay-per-test NABL testing partnerships, maintaining < 1% scrap rate, proving repeat buyer retention.'
      },
      {
        title: 'STAGE 3: DIGITAL NETWORK SCALE (M10-M18)',
        kpis: ['25 Audited Machine Shops', '28 Enterprise Buyer Accounts', '127 Commercial Batches', 'Rs. 7.43 Cr Cumulative GMV'],
        focus: 'Focus: Lightweight order tracking web portal, multi-shop capacity routing, reaching Rs. 75L+/mo run rate -> commands $1.5M Institutional Seed round.'
      }
    ];

    phases.forEach((ph, idx) => {
      const yPos = 105 + idx * 105;
      pdf.rect(p, 50, yPos, 495.28, 95, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
      pdf.rect(p, 50, yPos, 495.28, 22, { fill: true, fillColor: '#0F172A' });
      pdf.text(p, ph.title, 65, yPos + 15, { font: 'F2', size: 8.5, color: '#2DD4BF' });

      ph.kpis.forEach((kp, kIdx) => {
        const kX = 65 + kIdx * 120;
        pdf.badge(p, kp, kX, yPos + 32, { bgColor: '#F1F5F9', textColor: '#0F172A', fontSize: 7 });
      });

      pdf.text(p, ph.focus, 65, yPos + 62, { font: 'F1', size: 7.5, color: '#475569', maxWidth: 460 });
    });

    const qTableY = 440;
    pdf.rect(p, 50, qTableY, 495.28, 20, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'QUARTER', 55, qTableY + 13, { font: 'F2', size: 7.5, color: '#2DD4BF' });
    pdf.text(p, 'SHOPS', 115, qTableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'BUYERS', 165, qTableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'ORDERS', 220, qTableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'QUARTERLY GMV', 280, qTableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'TAKE-RATE', 370, qTableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'GROSS REV', 445, qTableY + 13, { font: 'F2', size: 7.5, color: '#FFFFFF' });
    pdf.text(p, 'NET CONTRIB', 540, qTableY + 13, { font: 'F2', size: 7.5, color: '#2DD4BF', align: 'right' });

    const qData = [
      ['Q1 (M1-M3)', '3', '3', '8', 'Rs. 24,00,000', '12.0%', 'Rs. 2,88,000', 'Rs. 2.45L (85.0%)'],
      ['Q2 (M4-M6)', '6', '6', '15', 'Rs. 52,50,000', '12.0%', 'Rs. 6,30,000', 'Rs. 5.35L (85.0%)'],
      ['Q3 (M7-M9)', '10', '10', '24', 'Rs. 96,00,000', '12.0%', 'Rs. 11,52,000', 'Rs. 9.79L (85.0%)'],
      ['Q4 (M10-M12)','15', '16', '35', 'Rs. 1,47,00,000', '12.0%', 'Rs. 17,64,000', 'Rs. 15.00L (85.0%)'],
      ['Q5 (M13-M15)','20', '22', '42', 'Rs. 1,89,00,000', '12.0%', 'Rs. 22,68,000', 'Rs. 19.28L (85.0%)'],
      ['Q6 (M16-M18)','25', '28', '50', 'Rs. 2,35,00,000', '12.0%', 'Rs. 28,20,000', 'Rs. 23.97L (85.0%)'],
      ['TOTAL', '25', '28', '174', 'Rs. 7,43,50,000', '12.0%', 'Rs. 89,22,000', 'Rs. 75.84L (85.0%)']
    ];

    qData.forEach((row, i) => {
      const rowY = qTableY + 20 + i * 36;
      const isTotal = i === 6;
      pdf.rect(p, 50, rowY, 495.28, 36, { fill: true, stroke: true, fillColor: isTotal ? '#F1F5F9' : (i % 2 === 0 ? '#FFFFFF' : '#F8FAFC'), strokeColor: '#CBD5E1', lineWidth: 0.5 });

      pdf.text(p, row[0], 55, rowY + 20, { font: 'F2', size: 7.5, color: '#0F172A' });
      pdf.text(p, row[1], 115, rowY + 20, { font: 'F1', size: 7.5, color: '#475569' });
      pdf.text(p, row[2], 165, rowY + 20, { font: 'F1', size: 7.5, color: '#475569' });
      pdf.text(p, row[3], 220, rowY + 20, { font: 'F1', size: 7.5, color: '#475569' });
      pdf.text(p, row[4], 280, rowY + 20, { font: 'F2', size: 7.5, color: '#0F172A' });
      pdf.text(p, row[5], 370, rowY + 20, { font: 'F1', size: 7.5, color: '#0D9488' });
      pdf.text(p, row[6], 445, rowY + 20, { font: 'F2', size: 7.5, color: '#0F172A' });
      pdf.text(p, row[7], 540, rowY + 20, { font: 'F2', size: 7.5, color: '#16A34A', align: 'right' });
    });

    pdf.rect(p, 50, 715, 495.28, 65, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#1E293B' });
    pdf.text(p, 'MONTH 18 SEED EXIT RUNWAY STATUS', 65, 735, { font: 'F2', size: 9, color: '#2DD4BF' });
    pdf.text(p, 'By Month 18, RKISPro achieves a run-rate of Rs. 75L - Rs. 80L/month with 174 verified batch deliveries,', 65, 750, { font: 'F1', size: 7.5, color: '#E2E8F0' });
    pdf.text(p, 'demonstrating capital-efficient, profitable Product-Market Fit to command a $1.5M Seed round at an $8M+ valuation.', 65, 762, { font: 'F1', size: 7.5, color: '#E2E8F0' });
  }

  // ============================================================================
  // PAGE 4: UNIT ECONOMICS & SENSITIVITY MATRIX
  // ============================================================================
  {
    const p = pdf.addPage();
    pdf.text(p, 'GRANULAR UNIT ECONOMICS & RUNWAY SENSITIVITY ANALYSIS', 50, 68, { font: 'F2', size: 13, color: '#0F172A' });
    pdf.text(p, 'Transaction Economics on a Sample Rs. 5,00,000 Order and Lean Capital Sensitivity Scenarios', 50, 82, { font: 'F3', size: 8.5, color: '#64748B' });

    pdf.rect(p, 50, 105, 495.28, 280, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 50, 105, 495.28, 24, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'CASE STUDY: TRANSACTION UNIT ECONOMICS ON A RS. 5,00,000 CNC ORDER', 65, 121, { font: 'F2', size: 8.5, color: '#2DD4BF' });

    const unitSteps = [
      ['1. Buyer Purchase Order Value', 'Rs. 5,00,000', '30% Advance at PO | 40% Pre-Dispatch Quality Sign-off | 30% Inward Delivery.'],
      ['2. Machine Shop Execution COGS', '- Rs. 4,40,000', 'Certified Raw Steel: Rs. 1.35L | CNC Machining: Rs. 1.75L | Surface Finishing: Rs. 1.30L.'],
      ['3. Gross Platform Revenue (12.0%)', 'Rs. 60,000', 'Contractual managed take-rate spread retained upon final milestone settlement.'],
      ['4. Direct Cost of Quality (COQ)', '- Rs. 9,000', 'On-demand NABL Spectrometry (Rs. 2.5K) + QA Field Travel (Rs. 3.5K) + Transit Ins. (Rs. 3.0K).'],
      ['5. Net Contribution Margin (85.0%)', 'Rs. 51,000', 'High net contribution margin on platform revenue; zero inventory or debt liability.']
    ];

    unitSteps.forEach((us, i) => {
      const yPos = 135 + i * 44;
      const isNet = i === 4;
      pdf.rect(p, 60, yPos, 475.28, 38, { fill: true, stroke: true, fillColor: isNet ? '#F0FDFA' : '#F8FAFC', strokeColor: isNet ? '#0D9488' : '#E2E8F0', lineWidth: isNet ? 1 : 0.5 });
      pdf.text(p, us[0], 75, yPos + 16, { font: 'F2', size: 8, color: isNet ? '#0F766E' : '#0F172A' });
      pdf.text(p, us[1], 270, yPos + 16, { font: 'F2', size: 8.5, color: isNet ? '#0D9488' : (i === 1 || i === 3 ? '#E11D48' : '#0F172A') });
      pdf.text(p, us[2], 360, yPos + 14, { font: 'F1', size: 7, color: '#475569', maxWidth: 165 });
    });

    pdf.text(p, 'KEY WORKING CAPITAL ADVANTAGE: BACK-TO-BACK MILESTONE DISCIPLINE', 65, 365, { font: 'F2', size: 8, color: '#0D9488' });
    pdf.text(p, 'Because buyer tranches match vendor operational milestones, RKISPro operates with negative working capital risk.', 65, 377, { font: 'F1', size: 7.5, color: '#64748B' });

    pdf.rect(p, 50, 405, 495.28, 250, { fill: true, stroke: true, fillColor: '#FFFFFF', strokeColor: '#CBD5E1' });
    pdf.rect(p, 50, 405, 495.28, 24, { fill: true, fillColor: '#0F172A' });
    pdf.text(p, 'LEAN RUNWAY & VOLUME SENSITIVITY ANALYSIS (RS. 75 LAKHS ASK)', 65, 421, { font: 'F2', size: 8.5, color: '#2DD4BF' });

    const sensData = [
      ['Metric', 'Conservative Case (-25%)', 'Base Case (Plan)', 'Aggressive Case (+30%)'],
      ['Total Delivered Orders', '130 Orders', '174 Orders', '225 Orders'],
      ['18-Month Cumulative GMV', 'Rs. 5.58 Crore', 'Rs. 7.43 Crore', 'Rs. 9.66 Crore'],
      ['Average Managed Take-Rate', '11.0%', '12.0%', '12.5%'],
      ['Gross Platform Revenue', 'Rs. 61.4 Lakhs', 'Rs. 89.2 Lakhs', 'Rs. 1,20.7 Lakhs'],
      ['Net Contribution Margin', '80.0%', '85.0%', '88.0%'],
      ['Effective Runway Supported', '14.5 Months', '18.0 Months', '21.5 Months'],
      ['Seed Round Valuation Target', '$1.0M Raise @ $5M Post', '$1.5M Raise @ $8M Post', '$2.0M Raise @ $10M Post']
    ];

    sensData.forEach((row, i) => {
      const rowY = 435 + i * 26;
      const isHeader = i === 0;
      pdf.rect(p, 50, rowY, 495.28, 26, { fill: true, stroke: true, fillColor: isHeader ? '#F1F5F9' : (i % 2 === 0 ? '#FFFFFF' : '#F8FAFC'), strokeColor: '#CBD5E1', lineWidth: 0.5 });

      pdf.text(p, row[0], 65, rowY + 16, { font: 'F2', size: 7.5, color: '#0F172A' });
      pdf.text(p, row[1], 215, rowY + 16, { font: isHeader ? 'F2' : 'F1', size: 7.5, color: isHeader ? '#0F172A' : '#64748B' });
      pdf.text(p, row[2], 340, rowY + 16, { font: 'F2', size: 7.5, color: isHeader ? '#0F172A' : '#0D9488' });
      pdf.text(p, row[3], 465, rowY + 16, { font: isHeader ? 'F2' : 'F1', size: 7.5, color: isHeader ? '#0F172A' : '#16A34A' });
    });

    pdf.rect(p, 50, 675, 495.28, 90, { fill: true, stroke: true, fillColor: '#0F172A', strokeColor: '#0D9488', lineWidth: 1 });
    pdf.text(p, 'CERTIFICATION OF LEAN FINANCIAL MODEL INTEGRITY', 65, 698, { font: 'F2', size: 9, color: '#2DD4BF' });
    pdf.text(p, 'This model has been built on ground-truth unit economics reflecting active machine shop cycle rates,', 65, 715, { font: 'F1', size: 7.5, color: '#E2E8F0' });
    pdf.text(p, 'pay-per-test NABL laboratory rates, and captive shop benchmark cost structures from Marks Engineering & Co.', 65, 728, { font: 'F1', size: 7.5, color: '#E2E8F0' });
    pdf.text(p, 'Founders: Rajeev Tiwari (CEO) & Rupesh Tiwari (Head of Manufacturing)  |  RKISPro Industrial Technologies', 65, 745, { font: 'F2', size: 7.5, color: '#38BDF8' });
  }

  // Compile & Output PDF
  const pdfBuffer = pdf.build();

  const outputPathRoot = path.join('e:', 'RKISPro Marketplace', 'RKISPro_PreSeed_Financial_Model.pdf');
  const outputPathPublic = path.join('e:', 'RKISPro Marketplace', 'public', 'RKISPro_PreSeed_Financial_Model.pdf');
  const outputPathArtifact = path.join('C:', 'Users', 'rksc5', '.gemini', 'antigravity', 'brain', '437e1109-ff91-4847-9987-ee6829402543', 'RKISPro_PreSeed_Financial_Model.pdf');

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

  console.log('Lean Financial Model PDF Re-compiled Successfully.');
}

buildFinancialModel();
