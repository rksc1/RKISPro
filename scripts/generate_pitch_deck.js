const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const LOGO_LIGHT = path.join(PUBLIC_DIR, 'logo/logo-horizontal-light.png');
const LOGO_DARK = path.join(PUBLIC_DIR, 'logo/logo-horizontal-dark.png');
const LOGO_ICON = path.join(PUBLIC_DIR, 'logo/icon.png');
const ARTIFACT_DIR = 'C:/Users/rksc5/.gemini/antigravity/brain/437e1109-ff91-4847-9987-ee6829402543';

// Brand Color Palette (Official RKISPro Identity)
const COLORS = {
  NAVY_DARK: '07131F',
  NAVY_PANEL: '0F2A3F',
  NAVY_BORDER: '1A3F5C',
  NAVY_TEXT: '0F172A',
  BRAND_NAVY: '0B3968',
  BRAND_TEAL: '118781',
  TEAL_LIGHT: '00C4CC',
  TEAL_ACCENT: '14B8A6',
  TEAL_BG: 'F0FDFA',
  TEAL_BORDER: 'CCFBF1',
  RED_BG: 'FEF2F2',
  RED_BORDER: 'FCA5A5',
  GREEN_BG: 'ECFDF5',
  GREEN_BORDER: 'A7F3D0',
  SLATE_BG: 'F8FAFC',
  SLATE_CARD: 'FFFFFF',
  SLATE_BORDER: 'E2E8F0',
  SLATE_TEXT: '475569',
  SLATE_MUTED: '94A3B8',
  WHITE: 'FFFFFF',
  GOLD: 'F59E0B',
  RED_ACCENT: 'E11D48',
  GREEN_ACCENT: '10B981',
};

async function buildPitchDeck() {
  const pptx = new pptxgen();
  // Set true 16:9 widescreen layout (13.333" x 7.5" = 12192000 x 6858000 EMU)
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'RKISPro Industrial Technologies';
  pptx.company = 'RKISPro';
  pptx.title = 'RKISPro - Seed Investor Presentation (Idea Phase)';

  // Helper for adding consistent header with logo on content slides
  // Bounded width (9.7") ensures zero collision with the top-right logo at x: 10.73
  function addContentHeader(slide, category, title) {
    slide.background = { color: COLORS.SLATE_BG };

    // Category / Kicker
    slide.addText(category.toUpperCase(), {
      x: 0.8,
      y: 0.42,
      w: 9.7,
      h: 0.28,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: COLORS.BRAND_TEAL,
      charSpacing: 2
    });

    // Slide Title
    slide.addText(title, {
      x: 0.8,
      y: 0.72,
      w: 9.7,
      h: 0.65,
      fontSize: 21,
      fontFace: 'Arial',
      bold: true,
      color: COLORS.NAVY_TEXT,
      lineSpacingMultiple: 1.1
    });

    // Top-right Logo Mark (w: 1.8, h: 0.56, ends at x: 12.53, matching right margin 0.8)
    if (fs.existsSync(LOGO_DARK)) {
      slide.addImage({
        path: LOGO_DARK,
        x: 10.73,
        y: 0.45,
        w: 1.8,
        h: 0.56
      });
    }
  }

  // ==========================================
  // SLIDE 1: COVER & STAGE TRANSPARENCY
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: COLORS.NAVY_DARK };

    // Light Logo Mark on dark navy
    if (fs.existsSync(LOGO_LIGHT)) {
      slide.addImage({
        path: LOGO_LIGHT,
        x: 0.8,
        y: 0.75,
        w: 3.2,
        h: 1.0
      });
    }

    // Category / Stage Kicker
    slide.addText('MANAGED MANUFACTURING NETWORK  |  SEED INVESTOR DECK', {
      x: 0.8,
      y: 2.05,
      w: 11.73,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: COLORS.TEAL_LIGHT,
      charSpacing: 2
    });

    // Headline
    slide.addText('Managed Precision Metal Fabrication &\nCNC Machining for Indian Industry', {
      x: 0.8,
      y: 2.45,
      w: 11.73,
      h: 1.35,
      fontSize: 34,
      fontFace: 'Arial',
      bold: true,
      color: COLORS.WHITE,
      lineSpacingMultiple: 1.15
    });

    // Subtitle / Tagline
    slide.addText(
      '"Eliminating the ₹10 Lakh Crore trust deficit between industrial buyers and fragmented machine shops through hands-on drawing triage, captive anchor capacity, and rigorous 4-gate metrology."',
      {
        x: 0.8,
        y: 3.95,
        w: 11.73,
        h: 0.75,
        fontSize: 13.5,
        fontFace: 'Arial',
        italic: true,
        color: COLORS.SLATE_MUTED,
        lineSpacingMultiple: 1.25
      }
    );

    // Stage Transparency Callout Box
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 4.95,
      w: 11.73,
      h: 1.95,
      rectRadius: 0.12,
      fill: { color: COLORS.NAVY_PANEL },
      line: { color: COLORS.NAVY_BORDER, width: 1.5 }
    });

    // Stage Pill & Target Ask
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 1.1,
      y: 5.15,
      w: 4.8,
      h: 0.32,
      rectRadius: 0.08,
      fill: { color: COLORS.BRAND_TEAL }
    });
    slide.addText('CURRENT STAGE: IDEA & CONCIERGE PILOT VALIDATION', {
      x: 1.1,
      y: 5.15,
      w: 4.8,
      h: 0.32,
      fontSize: 9.5,
      fontFace: 'Arial',
      bold: true,
      color: COLORS.WHITE,
      align: 'center'
    });

    slide.addText('TARGET PRE-SEED RAISE: ₹20 LAKHS – ₹25 LAKHS', {
      x: 6.2,
      y: 5.15,
      w: 6.0,
      h: 0.32,
      fontSize: 10.5,
      fontFace: 'Arial',
      bold: true,
      color: COLORS.TEAL_LIGHT,
      charSpacing: 1.5
    });

    // Stage Details
    slide.addText('Day-0 Captive Anchor: Marks Engineering & Co.   •   Launch Cluster: Bilaspur & Raipur Corridor   •   Zero Setup Capex Model', {
      x: 1.1,
      y: 5.65,
      w: 11.1,
      h: 0.35,
      fontSize: 12.5,
      fontFace: 'Arial',
      bold: true,
      color: COLORS.WHITE
    });

    // Operators
    slide.addText('FOUNDING OPERATORS: Rajeev Tiwari (CEO — 3 Yrs Fabrication Leadership) & Rupesh Tiwari (Head of Ops — Owner, Marks Engineering & Co.)', {
      x: 1.1,
      y: 6.15,
      w: 11.1,
      h: 0.55,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: COLORS.SLATE_MUTED,
      lineSpacingMultiple: 1.2
    });
  }

  // ==========================================
  // SLIDE 2: THE SOURCING PAIN (UNORGANIZED SOURCING)
  // ==========================================
  {
    const slide = pptx.addSlide();
    addContentHeader(slide, 'The Sourcing Pain', 'The Ground-Level Reality of Sourcing Custom Parts in India');

    const cards = [
      {
        num: '01',
        title: 'Open Directories Resell Leads, Not Parts',
        desc: 'Platforms like IndiaMART and Justdial sell buyer phone numbers to 25+ unvetted local brokers. Procurement heads get flooded with telemarketing calls instead of technical engineering reviews.'
      },
      {
        num: '02',
        title: 'Chronic 30–45 Day Delivery Delays',
        desc: 'Unorganized machine shops promise 10 days but routinely take 35 to 45 days. Buyers face unexpected assembly line stoppages, penalty charges, and hidden mid-project tooling costs.'
      },
      {
        num: '03',
        title: 'Zero Metallurgy & Dimensional Traceability',
        desc: 'Sub-tier workshops frequently substitute uncertified commercial re-rolled scrap for prime alloys (SS304, AISI 4140, EN8). Counterfeit materials cause catastrophic equipment failure inside customer plants.'
      },
      {
        num: '04',
        title: 'High Counterparty Risk for Both Sides',
        desc: 'Buyers risk advance wires with unverified contractors. Conversely, competent MSME workshops wait 90–120 days for corporate buyer payments, starving them of working capital to purchase prime steel billets.'
      }
    ];

    cards.forEach((c, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.8 + col * 5.98;
      const y = 1.6 + row * 2.75;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 5.75, h: 2.55,
        rectRadius: 0.12,
        fill: { color: COLORS.WHITE },
        line: { color: COLORS.SLATE_BORDER, width: 1.2 }
      });

      // Number badge pill
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.35, y: y + 0.25, w: 0.65, h: 0.32,
        rectRadius: 0.08,
        fill: { color: COLORS.RED_BG },
        line: { color: COLORS.RED_BORDER, width: 1.0 }
      });
      slide.addText(c.num, {
        x: x + 0.35, y: y + 0.25, w: 0.65, h: 0.32,
        fontSize: 12, fontFace: 'Arial', bold: true, color: COLORS.RED_ACCENT, align: 'center'
      });

      // Card Title (positioned cleanly next to the pill, avoiding collision)
      slide.addText(c.title, {
        x: x + 1.15, y: y + 0.22, w: 4.25, h: 0.58,
        fontSize: 13.5, fontFace: 'Arial', bold: true, color: COLORS.NAVY_TEXT, lineSpacingMultiple: 1.1
      });

      // Description cleanly below both
      slide.addText(c.desc, {
        x: x + 0.35, y: y + 0.92, w: 5.05, h: 1.45,
        fontSize: 11.5, fontFace: 'Arial', color: COLORS.SLATE_TEXT, lineSpacingMultiple: 1.25
      });
    });
  }

  // ==========================================
  // SLIDE 3: CUSTOMER DISCOVERY (35+ INTERVIEWS)
  // ==========================================
  {
    const slide = pptx.addSlide();
    addContentHeader(slide, 'Ideation-Phase Discovery', 'Voices from 35+ Plant GMs & Machine Shop Owners in Bilaspur & Raipur');

    const findings = [
      {
        stat: '88%',
        label: 'Face Chronic Delays',
        quote: '"Every local contractor promises 10 days, but takes 35 days with unexpected extra charges. We don\'t need 20 spam calls from brokers—we need one dependable engineering partner who inspects drawings and delivers on time."',
        source: 'DGM Sourcing, Heavy Engineering Enterprise, Urla-Raipur'
      },
      {
        stat: '74%',
        label: 'Suffered Raw Material Fraud',
        quote: '"We ordered precision forged EN24 shafts. The supplier delivered commercial mild steel with surface hardening. The drive shaft sheared inside our mixer after two weeks, causing ₹18 Lakhs in downtime."',
        source: 'Operations Head, Industrial Plant, Sirgitti-Bilaspur'
      },
      {
        stat: '92%',
        label: 'Shops Starved by Credit Terms',
        quote: '"We have modern Mazak VMCs and skilled turners, but our machines sit idle because corporate buyers hold our payments for 90 to 120 days. We cannot buy certified tool steel billets without advance cash."',
        source: 'Owner, Precision Machine Shop, Tifra Industrial Area'
      }
    ];

    findings.forEach((f, i) => {
      const x = 0.8 + i * 3.98;
      const y = 1.6;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 3.76, h: 5.25,
        rectRadius: 0.12,
        fill: { color: COLORS.WHITE },
        line: { color: COLORS.SLATE_BORDER, width: 1.2 }
      });

      // Stat
      slide.addText(f.stat, {
        x: x + 0.3, y: y + 0.3, w: 3.16, h: 0.7,
        fontSize: 38, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL
      });

      // Label
      slide.addText(f.label, {
        x: x + 0.3, y: y + 1.05, w: 3.16, h: 0.35,
        fontSize: 13, fontFace: 'Arial', bold: true, color: COLORS.NAVY_TEXT
      });

      // Soft divider line
      slide.addShape(pptx.shapes.RECTANGLE, {
        x: x + 0.3, y: y + 1.45, w: 3.16, h: 0.02,
        fill: { color: COLORS.SLATE_BORDER },
        line: { color: COLORS.SLATE_BORDER, width: 0.5 }
      });

      // Quote
      slide.addText(f.quote, {
        x: x + 0.3, y: y + 1.6, w: 3.16, h: 2.35,
        fontSize: 11.5, fontFace: 'Arial', italic: true, color: COLORS.SLATE_TEXT, lineSpacingMultiple: 1.25
      });

      // Dedicated Source Accent Panel (eliminates dead void)
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.25, y: y + 4.15, w: 3.26, h: 0.85,
        rectRadius: 0.08,
        fill: { color: COLORS.SLATE_BG },
        line: { color: COLORS.SLATE_BORDER, width: 1.0 }
      });

      slide.addText('VERIFIED INTERVIEW', {
        x: x + 0.35, y: y + 4.23, w: 3.06, h: 0.22,
        fontSize: 8.5, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL, charSpacing: 1.5
      });

      slide.addText(`— ${f.source}`, {
        x: x + 0.35, y: y + 4.45, w: 3.06, h: 0.5,
        fontSize: 10, fontFace: 'Arial', bold: true, color: COLORS.NAVY_TEXT, lineSpacingMultiple: 1.15
      });
    });
  }

  // ==========================================
  // SLIDE 4: THE PRACTICAL SOLUTION (HOW IT WORKS)
  // ==========================================
  {
    const slide = pptx.addSlide();
    addContentHeader(slide, 'The Pragmatic Solution', 'RKISPro: Managed Sourcing Backed by Contractual Delivery Liability');

    const steps = [
      {
        step: 'Step 01',
        title: 'Rapid Drawing Triage',
        desc: 'Founders personally review 2D/3D CAD drawings (STEP/DWG/PDF). We resolve DFM feasibility, tight tolerances, and certified metallurgy within 4 hours.',
        badgeLabel: 'FEASIBILITY SLA',
        badgeVal: '< 4-Hour Sign-off',
        badgeSub: 'STEP, DWG, DXF & 2D PDF'
      },
      {
        step: 'Step 02',
        title: 'Captive & Vetted Hubs',
        desc: 'Work is fulfilled directly via Marks Engineering & Co. or routed to 3–5 neighboring partner machine shops with verified spindle accuracy.',
        badgeLabel: 'EXECUTION ANCHOR',
        badgeVal: 'Marks Eng. & Co.',
        badgeSub: 'VMC, CNC Lathes, TIG/MIG'
      },
      {
        step: 'Step 03',
        title: '4-Gate Metrology Protocol',
        desc: 'Gate 1: Raw Material Chemical/MTC\nGate 2: First Article (FAI) Dimensions\nGate 3: In-Process Weld NDT Check\nGate 4: Pre-Dispatch Quality Report',
        badgeLabel: 'ZERO-DEFECT GATES',
        badgeVal: 'Digital Inspection',
        badgeSub: 'Tolerances to ±10 Microns'
      },
      {
        step: 'Step 04',
        title: 'Milestone Escrow Terms',
        desc: 'Transparent milestones protect both sides:\n• 30% PO Advance (Certified steel)\n• 40% Pre-Dispatch Quality Pass\n• 30% Inward Delivery Acceptance',
        badgeLabel: 'ESCROW SECURITY',
        badgeVal: 'Back-to-Back Flow',
        badgeSub: 'Day-1 Positive Cash Flow'
      }
    ];

    steps.forEach((s, i) => {
      const x = 0.8 + i * 2.98;
      const y = 1.6;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 2.78, h: 5.25,
        rectRadius: 0.12,
        fill: { color: COLORS.WHITE },
        line: { color: COLORS.SLATE_BORDER, width: 1.2 }
      });

      // Step Badge
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.25, y: y + 0.25, w: 0.95, h: 0.32,
        rectRadius: 0.08,
        fill: { color: COLORS.BRAND_NAVY }
      });
      slide.addText(s.step, {
        x: x + 0.25, y: y + 0.25, w: 0.95, h: 0.32,
        fontSize: 9.5, fontFace: 'Arial', bold: true, color: COLORS.WHITE, align: 'center'
      });

      // Title
      slide.addText(s.title, {
        x: x + 0.25, y: y + 0.68, w: 2.28, h: 0.65,
        fontSize: 14, fontFace: 'Arial', bold: true, color: COLORS.NAVY_TEXT, lineSpacingMultiple: 1.15
      });

      // Desc
      slide.addText(s.desc, {
        x: x + 0.25, y: y + 1.42, w: 2.28, h: 2.35,
        fontSize: 11, fontFace: 'Arial', color: COLORS.SLATE_TEXT, lineSpacingMultiple: 1.25
      });

      // Bottom Feature / Metric Container (fills bottom void cleanly)
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.2, y: y + 3.95, w: 2.38, h: 1.05,
        rectRadius: 0.08,
        fill: { color: COLORS.TEAL_BG },
        line: { color: COLORS.TEAL_BORDER, width: 1.0 }
      });

      slide.addText(s.badgeLabel, {
        x: x + 0.25, y: y + 4.02, w: 2.28, h: 0.2,
        fontSize: 8.5, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL, charSpacing: 1.2
      });

      slide.addText(s.badgeVal, {
        x: x + 0.25, y: y + 4.25, w: 2.28, h: 0.32,
        fontSize: 11, fontFace: 'Arial', bold: true, color: COLORS.BRAND_NAVY
      });

      slide.addText(s.badgeSub, {
        x: x + 0.25, y: y + 4.58, w: 2.28, h: 0.32,
        fontSize: 9.5, fontFace: 'Arial', color: COLORS.SLATE_TEXT
      });
    });
  }

  // ==========================================
  // SLIDE 5: CAPTIVE ANCHOR (MARKS ENGINEERING)
  // ==========================================
  {
    const slide = pptx.addSlide();
    addContentHeader(slide, 'Our Operational Anchor', 'Marks Engineering & Co. — Captive Execution Hub From Day 0');

    const pillars = [
      {
        badge: 'WORKSHOP INFRASTRUCTURE',
        title: 'Immediate Captive Workshop Capacity',
        desc: 'Co-founder Rupesh Tiwari owns Marks Engineering & Co., providing RKISPro with immediate physical machine capacity, overhead crane bays, heavy TIG/MIG welding stations, and skilled turners without capital expenditure.'
      },
      {
        badge: 'QUALITY CONTROL LAB',
        title: 'Operational Sandbox for Quality Protocols',
        desc: 'We execute our initial 10 to 15 customer pilot batch runs directly inside Marks Engineering. This allows founders to personally calibrate inspection protocols, packaging, and logistics before scaling to partner shops.'
      },
      {
        badge: 'PROCUREMENT CLOUT',
        title: 'Local Supplier Clout & Prime Steel Pricing',
        desc: 'Decades of direct procurement relationships with primary steel distributors (Tata, SAIL, Jindal) ensure volume raw-material discounts and certified Mill Test Certificates (MTC) from Day 1.'
      },
      {
        badge: 'CAPITAL EFFICIENCY',
        title: 'Zero Third-Party Setup & Low Burn Expenses',
        desc: 'While pure-tech startups burn ₹20L+ hiring contract shops to build samples, RKISPro leverages captive capacity to achieve positive unit economics and cash contribution on our very first commercial order.'
      }
    ];

    pillars.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.8 + col * 5.98;
      const y = 1.6 + row * 2.75;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 5.75, h: 2.55,
        rectRadius: 0.12,
        fill: { color: COLORS.WHITE },
        line: { color: COLORS.SLATE_BORDER, width: 1.2 }
      });

      // Category Pill
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.35, y: y + 0.22, w: 2.4, h: 0.28,
        rectRadius: 0.06,
        fill: { color: COLORS.TEAL_BG },
        line: { color: COLORS.TEAL_BORDER, width: 1.0 }
      });
      slide.addText(p.badge, {
        x: x + 0.35, y: y + 0.22, w: 2.4, h: 0.28,
        fontSize: 8.5, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL, charSpacing: 1.2, align: 'center'
      });

      // Title
      slide.addText(p.title, {
        x: x + 0.35, y: y + 0.58, w: 5.05, h: 0.45,
        fontSize: 13.5, fontFace: 'Arial', bold: true, color: COLORS.BRAND_NAVY
      });

      // Desc
      slide.addText(p.desc, {
        x: x + 0.35, y: y + 1.08, w: 5.05, h: 1.3,
        fontSize: 11.5, fontFace: 'Arial', color: COLORS.SLATE_TEXT, lineSpacingMultiple: 1.25
      });
    });
  }

  // ==========================================
  // SLIDE 6: TANGIBLE ASSETS BUILT IN IDEA PHASE
  // ==========================================
  {
    const slide = pptx.addSlide();
    addContentHeader(slide, 'Ideation Phase Execution', 'Tangible Proprietary Assets Built Before Raising Seed Capital');

    const assets = [
      {
        badge: 'ENGINEERING VISUALIZATION',
        title: 'Interactive 3D WebGL CAD & Metrology Viewer',
        desc: 'Production-ready Three.js metrology viewer directly in Next.js. Features 360° orbit drag, alloy shader switching (Stainless SS304, Aluminum 6061, Brass), wireframe inspect, and CMM datum callouts.'
      },
      {
        badge: 'PARAMETRIC PRICING',
        title: 'Instant Metal Fabrication & Machining Estimator',
        desc: 'Algorithmic cost model computing raw material weight, spindle cycle hours, tooling amortization, and surface finishing rates (powder coat, zinc primer) to give buyers reliable ROM budgets.'
      },
      {
        badge: 'QUALITY GOVERNANCE',
        title: 'Standardized 40-Point Workshop Audit Framework',
        desc: 'Ground-level physical audit matrix evaluating machine axis travels (X, Y, Z), spindle run-out tolerances, calibration certificates, certified welder logs, and overhead crane lifting capacity.'
      },
      {
        badge: 'DIGITAL ARCHITECTURE',
        title: 'Full Enterprise Marketplace Platform Architecture',
        desc: 'Complete responsive system with 48 active routes, daylight industrial design system, Supabase PostgreSQL schema, and multi-tenant authentication for buyers, vendors, and QA inspectors.'
      }
    ];

    assets.forEach((a, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.8 + col * 5.98;
      const y = 1.6 + row * 2.75;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 5.75, h: 2.55,
        rectRadius: 0.12,
        fill: { color: COLORS.WHITE },
        line: { color: COLORS.SLATE_BORDER, width: 1.2 }
      });

      // Styled Pill Badge
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.35, y: y + 0.22, w: 2.6, h: 0.28,
        rectRadius: 0.06,
        fill: { color: COLORS.TEAL_BG },
        line: { color: COLORS.TEAL_BORDER, width: 1.0 }
      });
      slide.addText(a.badge, {
        x: x + 0.35, y: y + 0.22, w: 2.6, h: 0.28,
        fontSize: 8.5, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL, charSpacing: 1.2, align: 'center'
      });

      // Title
      slide.addText(a.title, {
        x: x + 0.35, y: y + 0.58, w: 5.05, h: 0.45,
        fontSize: 13.5, fontFace: 'Arial', bold: true, color: COLORS.NAVY_TEXT
      });

      // Desc
      slide.addText(a.desc, {
        x: x + 0.35, y: y + 1.08, w: 5.05, h: 1.3,
        fontSize: 11.5, fontFace: 'Arial', color: COLORS.SLATE_TEXT, lineSpacingMultiple: 1.25
      });
    });
  }

  // ==========================================
  // SLIDE 7: PILOT GTM (BILASPUR & RAIPUR CORRIDOR)
  // ==========================================
  {
    const slide = pptx.addSlide();
    addContentHeader(slide, 'Go-To-Market Strategy', 'Phase 1: Hyper-Focused Regional Launch in Bilaspur & Raipur Corridor');

    const gtmCards = [
      {
        title: 'Why Start Hyper-Local in Bilaspur & Raipur?',
        points: [
          'Over 2,500 fabrication workshops & machine units across Sirgitti, Tifra, Urla & Bhanpuri.',
          'Heart of Central India\'s heavy industry, power, sponge iron, cement & railway corridor.',
          'Proximity allows our Field Quality Engineers to physically inspect parts within 45 minutes.'
        ],
        kpiLabel: 'CLUSTER ADVANTAGE',
        kpiVal: 'Sirgitti, Tifra & Urla Hubs'
      },
      {
        title: 'Demand-Side Wedge Strategy',
        points: [
          'Target mid-market industrial OEMs, core sector plants (₹15 Cr to ₹100 Cr revenue).',
          'Focus on replacement spares, heavy structural sheds, custom machine frames & overflow runs.',
          'Offer free First Article Inspection (FAI) and guaranteed on-time delivery on first 3 batch runs.'
        ],
        kpiLabel: 'TARGET ACCOUNTS',
        kpiVal: 'Mid-Market OEMs & Core Industry'
      },
      {
        title: 'Supply-Side Partner Micro-Network',
        points: [
          'Marks Engineering & Co. serves as captive operational anchor hub.',
          'Onboard 5 to 8 pre-vetted peer machine shops in Sirgitti & Urla known personally to founders.',
          'Guarantee 48-hour milestone payouts upon inspection pass, breaking the 90-day receivable drought.'
        ],
        kpiLabel: 'SUPPLIER INCENTIVE',
        kpiVal: 'Guaranteed 48-Hour Payouts'
      }
    ];

    gtmCards.forEach((c, i) => {
      const x = 0.8 + i * 3.98;
      const y = 1.6;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 3.76, h: 5.25,
        rectRadius: 0.12,
        fill: { color: COLORS.WHITE },
        line: { color: COLORS.SLATE_BORDER, width: 1.2 }
      });

      // Title
      slide.addText(c.title, {
        x: x + 0.3, y: y + 0.3, w: 3.16, h: 0.6,
        fontSize: 14.5, fontFace: 'Arial', bold: true, color: COLORS.BRAND_NAVY, lineSpacingMultiple: 1.15
      });

      // Unified Bullet Block (removes awkward floating 0.8" gaps)
      slide.addText(c.points.map(pt => `•  ${pt}`).join('\n\n'), {
        x: x + 0.3, y: y + 1.05, w: 3.16, h: 2.9,
        fontSize: 11.5, fontFace: 'Arial', color: COLORS.SLATE_TEXT, lineSpacingMultiple: 1.25
      });

      // Bottom KPI Panel
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.25, y: y + 4.15, w: 3.26, h: 0.85,
        rectRadius: 0.08,
        fill: { color: COLORS.SLATE_BG },
        line: { color: COLORS.SLATE_BORDER, width: 1.0 }
      });

      slide.addText(c.kpiLabel, {
        x: x + 0.35, y: y + 4.23, w: 3.06, h: 0.22,
        fontSize: 8.5, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL, charSpacing: 1.2
      });

      slide.addText(c.kpiVal, {
        x: x + 0.35, y: y + 4.45, w: 3.06, h: 0.5,
        fontSize: 10.5, fontFace: 'Arial', bold: true, color: COLORS.NAVY_TEXT
      });
    });
  }

  // ==========================================
  // SLIDE 8: UNIT ECONOMICS & BUSINESS MODEL
  // ==========================================
  {
    const slide = pptx.addSlide();
    addContentHeader(slide, 'Unit Economics & Model', 'Asset-Light Managed Spread with Positive Contribution from Day 1');

    // 4 Top Metric Cards
    const metrics = [
      { label: 'Target Order Value (AOV)', val: '₹1.5L – ₹5.0L', sub: 'Custom batch fabrication orders' },
      { label: 'Target Gross Take Rate', val: '11% – 14%', sub: 'Contractual sourcing spread' },
      { label: 'Direct Quality Cost', val: '₹3,000 – ₹8,000', sub: 'Pay-per-test NABL lab fees' },
      { label: 'Working Capital Cycle', val: 'Self-Funded', sub: 'Customer 30% PO advance' }
    ];

    metrics.forEach((m, i) => {
      const x = 0.8 + i * 2.98;
      const y = 1.6;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 2.78, h: 1.7,
        rectRadius: 0.1,
        fill: { color: COLORS.WHITE },
        line: { color: COLORS.SLATE_BORDER, width: 1.2 }
      });

      slide.addText(m.label, {
        x: x + 0.2, y: y + 0.18, w: 2.38, h: 0.3,
        fontSize: 10, fontFace: 'Arial', color: COLORS.SLATE_MUTED
      });

      slide.addText(m.val, {
        x: x + 0.2, y: y + 0.50, w: 2.38, h: 0.45,
        fontSize: 18, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL
      });

      slide.addText(m.sub, {
        x: x + 0.2, y: y + 1.02, w: 2.38, h: 0.45,
        fontSize: 9.5, fontFace: 'Arial', color: COLORS.SLATE_TEXT
      });
    });

    // Bottom Sample Order Breakdown Card
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: 3.55, w: 11.73, h: 3.35,
      rectRadius: 0.12,
      fill: { color: COLORS.WHITE },
      line: { color: COLORS.SLATE_BORDER, width: 1.2 }
    });

    // Sample Order Header
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 1.1, y: 3.75, w: 2.2, h: 0.28,
      rectRadius: 0.06,
      fill: { color: COLORS.TEAL_BG },
      line: { color: COLORS.TEAL_BORDER, width: 1.0 }
    });
    slide.addText('SAMPLE PO BREAKDOWN', {
      x: 1.1, y: 3.75, w: 2.2, h: 0.28,
      fontSize: 8.5, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL, charSpacing: 1.2, align: 'center'
    });

    slide.addText('ILLUSTRATIVE UNIT ECONOMICS: ₹5,00,000 CUSTOM FABRICATION ORDER', {
      x: 3.45, y: 3.73, w: 8.8, h: 0.32,
      fontSize: 12, fontFace: 'Arial', bold: true, color: COLORS.BRAND_NAVY, charSpacing: 1.5
    });

    const econItems = [
      { label: 'Customer Purchase Order (Buyer Contract)', val: '₹5,00,000', note: 'Milestone Terms: 30% PO Adv / 40% Pre-Dispatch / 30% Inward Delivery' },
      { label: 'Workshop Partner Manufacturing Payout', val: '₹4,40,000', note: 'Disbursed back-to-back across 3 milestone verification gates' },
      { label: 'RKISPro Gross Margin (12% Take Rate Spread)', val: '₹60,000', note: 'Asset-light spread; zero capital tied up in machines or scrap' },
      { label: 'Direct Quality & NABL Testing Cost', val: '₹9,000', note: 'Pay-per-test spectrometry + QA engineer site travel' },
      { label: 'Net Contribution Profit per Order', val: '₹51,000', note: '85.0% Contribution Margin on Gross Take Rate' }
    ];

    econItems.forEach((item, i) => {
      const rowY = 4.25 + i * 0.48;
      const isTotal = i === 4;

      if (isTotal) {
        // Highlighted container for the net profit row
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: 1.05, y: rowY - 0.05, w: 11.23, h: 0.46,
          rectRadius: 0.08,
          fill: { color: COLORS.GREEN_BG },
          line: { color: COLORS.GREEN_BORDER, width: 1.2 }
        });
      }

      slide.addText(item.label, {
        x: 1.2, y: rowY, w: 4.8, h: 0.38,
        fontSize: isTotal ? 12 : 11, fontFace: 'Arial', bold: isTotal, color: isTotal ? COLORS.BRAND_NAVY : COLORS.NAVY_TEXT
      });

      slide.addText(item.val, {
        x: 6.0, y: rowY, w: 1.8, h: 0.38,
        fontSize: isTotal ? 14 : 12, fontFace: 'Arial', bold: true, color: isTotal ? COLORS.GREEN_ACCENT : COLORS.NAVY_TEXT, align: 'right'
      });

      slide.addText(item.note, {
        x: 8.0, y: rowY, w: 4.15, h: 0.38,
        fontSize: 9.5, fontFace: 'Arial', italic: true, color: isTotal ? COLORS.BRAND_NAVY : COLORS.SLATE_MUTED
      });
    });
  }

  // ==========================================
  // SLIDE 9: MARKET OPPORTUNITY (TAM/SAM/SOM)
  // ==========================================
  {
    const slide = pptx.addSlide();
    addContentHeader(slide, 'Market Sizing', 'A ₹10 Lakh Crore Unorganized Market Ready for Managed Disruption');

    const tiers = [
      {
        size: '₹10L Cr',
        label: 'Total Addressable Market (TAM)',
        scope: 'INDIAN INDUSTRIAL CONTRACT MANUFACTURING',
        desc: 'Total annual Indian industrial contract manufacturing, structural fabrication, precision CNC machining, and industrial maintenance across heavy engineering sectors.',
        detailLabel: 'VERIFIED SOURCE',
        detail: 'Ministry of Heavy Industries & MSME Annual Report'
      },
      {
        size: '₹2L Cr',
        label: 'Serviceable Market (SAM)',
        scope: 'HIGH-PRECISION MACHINING & FABRICATION',
        desc: 'Precision contract machining and custom fabricated assemblies across automotive components, aerospace, defense, pharma reactors, and cement mills needing verified QA.',
        detailLabel: 'TARGET ENTERPRISES',
        detail: 'Mid-Market OEMs & Tier-1/Tier-2 Suppliers'
      },
      {
        size: '₹25 Cr',
        label: 'Immediate Pilot Target (SOM)',
        scope: 'BILASPUR & RAIPUR CORRIDOR LAUNCH',
        desc: 'Capturing 0.1% of the Bilaspur-Raipur industrial corridor over the first 24–36 months through 50 active recurring manufacturing client accounts.',
        detailLabel: '24-MONTH ROADMAP',
        detail: 'Achievable via 1 anchor hub + 15 audited partner shops'
      }
    ];

    tiers.forEach((t, i) => {
      const x = 0.8 + i * 3.98;
      const y = 1.6;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 3.76, h: 5.25,
        rectRadius: 0.12,
        fill: { color: COLORS.WHITE },
        line: { color: COLORS.SLATE_BORDER, width: 1.2 }
      });

      // Size Stat
      slide.addText(t.size, {
        x: x + 0.3, y: y + 0.3, w: 3.16, h: 0.8,
        fontSize: 42, fontFace: 'Arial', bold: true, color: COLORS.BRAND_NAVY
      });

      // Label
      slide.addText(t.label, {
        x: x + 0.3, y: y + 1.15, w: 3.16, h: 0.4,
        fontSize: 13, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL
      });

      // Soft divider line
      slide.addShape(pptx.shapes.RECTANGLE, {
        x: x + 0.3, y: y + 1.6, w: 3.16, h: 0.02,
        fill: { color: COLORS.SLATE_BORDER },
        line: { color: COLORS.SLATE_BORDER, width: 0.5 }
      });

      // Scope Pill
      slide.addText(t.scope, {
        x: x + 0.3, y: y + 1.72, w: 3.16, h: 0.3,
        fontSize: 8.5, fontFace: 'Arial', bold: true, color: COLORS.SLATE_MUTED, charSpacing: 1.2
      });

      // Desc
      slide.addText(t.desc, {
        x: x + 0.3, y: y + 2.08, w: 3.16, h: 1.85,
        fontSize: 11.5, fontFace: 'Arial', color: COLORS.SLATE_TEXT, lineSpacingMultiple: 1.25
      });

      // Bottom Detail Container (eliminates empty void)
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.25, y: y + 4.15, w: 3.26, h: 0.85,
        rectRadius: 0.08,
        fill: { color: COLORS.SLATE_BG },
        line: { color: COLORS.SLATE_BORDER, width: 1.0 }
      });

      slide.addText(t.detailLabel, {
        x: x + 0.35, y: y + 4.23, w: 3.06, h: 0.22,
        fontSize: 8.5, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL, charSpacing: 1.2
      });

      slide.addText(t.detail, {
        x: x + 0.35, y: y + 4.45, w: 3.06, h: 0.5,
        fontSize: 10, fontFace: 'Arial', bold: true, color: COLORS.NAVY_TEXT, lineSpacingMultiple: 1.15
      });
    });
  }

  // ==========================================
  // SLIDE 10: 3-STAGE PRAGMATIC ROADMAP
  // ==========================================
  {
    const slide = pptx.addSlide();
    addContentHeader(slide, 'Milestone Roadmap', 'Pragmatic 3-Stage Plan: From Concierge Pilot to Scaled Platform');

    const stages = [
      {
        badge: 'STAGE 1: MONTHS 1–4',
        name: 'The Concierge Pilot',
        status: 'CURRENT IDEA-STAGE GOAL',
        items: [
          'Deliver first 10–12 pilot batch orders via Marks Engineering & Co.',
          'Achieve ₹25L–₹35L in fulfilled GMV with zero customer rejections.',
          'Validate pay-per-test NABL spectrometry and CMM reporting protocols.',
          'Secure 3 recurring enterprise monthly purchase agreements.'
        ]
      },
      {
        badge: 'STAGE 2: MONTHS 5–9',
        name: 'The Trusted Micro-Network',
        status: 'PRE-SEED CAPITAL DEPLOYMENT',
        items: [
          'Deploy ₹25 Lakhs pre-seed funding to audit 10 Bilaspur & Raipur machine shops.',
          'Hire 1 full-time Lead Metrology QA Inspector for daily site audits.',
          'Fulfill 30+ batch orders across auto and heavy equipment clients.',
          'Achieve ₹1.0 Cr cumulative GMV and ₹12 Lakhs gross margin.'
        ]
      },
      {
        badge: 'STAGE 3: MONTHS 10–18',
        name: 'Digital Scale & Multi-Cluster',
        status: 'PRODUCT-MARKET FIT (PMF)',
        items: [
          'Launch lightweight buyer RFQ & milestone tracking mobile web app.',
          'Expand audited vendor footprint into Bhilai, Durg & Central India belt.',
          'Reach ₹50 Lakhs/month GMV run-rate with 20+ active recurring buyers.',
          'Command a ₹1.5 Cr – ₹2.5 Cr institutional Seed Round with audited metrics.'
        ]
      }
    ];

    stages.forEach((st, i) => {
      const x = 0.8 + i * 3.98;
      const y = 1.6;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 3.76, h: 5.25,
        rectRadius: 0.12,
        fill: { color: COLORS.WHITE },
        line: { color: i === 0 ? COLORS.BRAND_TEAL : COLORS.SLATE_BORDER, width: i === 0 ? 2 : 1.2 }
      });

      // Stage Badge
      slide.addText(st.badge, {
        x: x + 0.3, y: y + 0.28, w: 3.16, h: 0.28,
        fontSize: 9.5, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL, charSpacing: 1.5
      });

      // Stage Name
      slide.addText(st.name, {
        x: x + 0.3, y: y + 0.58, w: 3.16, h: 0.45,
        fontSize: 15, fontFace: 'Arial', bold: true, color: COLORS.NAVY_TEXT
      });

      // Stage Status
      slide.addText(st.status, {
        x: x + 0.3, y: y + 1.05, w: 3.16, h: 0.28,
        fontSize: 9, fontFace: 'Arial', bold: true, color: COLORS.SLATE_MUTED, charSpacing: 1.2
      });

      // Soft divider line
      slide.addShape(pptx.shapes.RECTANGLE, {
        x: x + 0.3, y: y + 1.4, w: 3.16, h: 0.02,
        fill: { color: COLORS.SLATE_BORDER },
        line: { color: COLORS.SLATE_BORDER, width: 0.5 }
      });

      // Stage Items (consolidated bullet text block)
      slide.addText(st.items.map(it => `•  ${it}`).join('\n\n'), {
        x: x + 0.3, y: y + 1.55, w: 3.16, h: 3.4,
        fontSize: 11, fontFace: 'Arial', color: COLORS.SLATE_TEXT, lineSpacingMultiple: 1.25
      });
    });
  }

  // ==========================================
  // SLIDE 11: FOUNDING TEAM & MANUFACTURING DNA
  // ==========================================
  {
    const slide = pptx.addSlide();
    addContentHeader(slide, 'Founding Team', 'True Shop-Floor Operators Backed by Family Fabrication Pedigree');

    // Founder 1: Rajeev Tiwari
    {
      const x = 0.8;
      const y = 1.6;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 5.75, h: 5.25,
        rectRadius: 0.12,
        fill: { color: COLORS.WHITE },
        line: { color: COLORS.SLATE_BORDER, width: 1.2 }
      });

      slide.addText('CO-FOUNDER & CHIEF EXECUTIVE OFFICER', {
        x: x + 0.35, y: y + 0.25, w: 5.05, h: 0.28,
        fontSize: 10, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL, charSpacing: 1.5
      });

      slide.addText('Rajeev Tiwari', {
        x: x + 0.35, y: y + 0.55, w: 5.05, h: 0.48,
        fontSize: 22, fontFace: 'Arial', bold: true, color: COLORS.NAVY_TEXT
      });

      slide.addText('Operations & Commercial Sourcing', {
        x: x + 0.35, y: y + 1.05, w: 5.05, h: 0.32,
        fontSize: 12, fontFace: 'Arial', color: COLORS.SLATE_MUTED
      });

      // Soft divider line
      slide.addShape(pptx.shapes.RECTANGLE, {
        x: x + 0.35, y: y + 1.45, w: 5.05, h: 0.02,
        fill: { color: COLORS.SLATE_BORDER },
        line: { color: COLORS.SLATE_BORDER, width: 0.5 }
      });

      const rajeevPoints = [
        '3 years of hands-on operational leadership and commercial project execution inside an industrial metal fabrication enterprise.',
        'Second-generation manufacturing entrepreneur whose family owns and operates an established fabrication enterprise in Central India.',
        'Deep ground-level domain expertise across workshop contractor pricing, raw steel procurement, and engineering drawing triage.',
        'Direct relationships with plant managers, core sector industrial suppliers, and steel stockists across the Bilaspur-Raipur manufacturing belt.'
      ];

      // Consolidated bullet block (eliminates overflow past 6.80 bottom border)
      slide.addText(rajeevPoints.map(pt => `•  ${pt}`).join('\n\n'), {
        x: x + 0.35, y: y + 1.6, w: 5.05, h: 3.35,
        fontSize: 11, fontFace: 'Arial', color: COLORS.SLATE_TEXT, lineSpacingMultiple: 1.25
      });
    }

    // Founder 2: Rupesh Tiwari
    {
      const x = 6.78;
      const y = 1.6;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 5.75, h: 5.25,
        rectRadius: 0.12,
        fill: { color: COLORS.WHITE },
        line: { color: COLORS.SLATE_BORDER, width: 1.2 }
      });

      slide.addText('CO-FOUNDER & HEAD OF MANUFACTURING OPERATIONS', {
        x: x + 0.35, y: y + 0.25, w: 5.05, h: 0.28,
        fontSize: 10, fontFace: 'Arial', bold: true, color: COLORS.BRAND_TEAL, charSpacing: 1.5
      });

      slide.addText('Rupesh Tiwari', {
        x: x + 0.35, y: y + 0.55, w: 5.05, h: 0.48,
        fontSize: 22, fontFace: 'Arial', bold: true, color: COLORS.NAVY_TEXT
      });

      slide.addText('Owner & Founder, Marks Engineering and Co.', {
        x: x + 0.35, y: y + 1.05, w: 5.05, h: 0.32,
        fontSize: 12, fontFace: 'Arial', color: COLORS.SLATE_MUTED
      });

      // Soft divider line
      slide.addShape(pptx.shapes.RECTANGLE, {
        x: x + 0.35, y: y + 1.45, w: 5.05, h: 0.02,
        fill: { color: COLORS.SLATE_BORDER },
        line: { color: COLORS.SLATE_BORDER, width: 0.5 }
      });

      const rupeshPoints = [
        'Founder & Owner of Marks Engineering and Co., an active precision industrial fabrication and machining enterprise in Chhattisgarh.',
        'Directly provides RKISPro with immediate captive workshop capacity, certified welders, skilled machinists, and established supplier clout.',
        'Authentic insider understanding of MSME machine shop bottlenecks, spindle run-out tolerances, and milestone cash-flow needs.',
        'Decades of trusted relationships with certified primary raw material stockists across Bilaspur, Raipur, and Central India industrial areas.'
      ];

      // Consolidated bullet block (eliminates overflow past 6.80 bottom border)
      slide.addText(rupeshPoints.map(pt => `•  ${pt}`).join('\n\n'), {
        x: x + 0.35, y: y + 1.6, w: 5.05, h: 3.35,
        fontSize: 11, fontFace: 'Arial', color: COLORS.SLATE_TEXT, lineSpacingMultiple: 1.25
      });
    }
  }

  // ==========================================
  // SLIDE 12: THE SEED ASK & CAPITAL ALLOCATION
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: COLORS.NAVY_DARK };

    // Light Logo Mark
    if (fs.existsSync(LOGO_LIGHT)) {
      slide.addImage({
        path: LOGO_LIGHT,
        x: 0.8,
        y: 0.55,
        w: 2.4,
        h: 0.75
      });
    }

    slide.addText('THE PRE-SEED INVESTMENT ASK  |  IDEA & CONCIERGE PILOT PHASE', {
      x: 0.8, y: 1.45, w: 11.73, h: 0.28,
      fontSize: 10.5, fontFace: 'Arial', bold: true, color: COLORS.TEAL_LIGHT, charSpacing: 2
    });

    slide.addText('Raising ₹20 Lakhs – ₹25 Lakhs for 9–12 Months Runway to Cashflow & Scaled Seed Round', {
      x: 0.8, y: 1.78, w: 11.73, h: 0.55,
      fontSize: 22, fontFace: 'Arial', bold: true, color: COLORS.WHITE
    });

    const allocations = [
      {
        pct: '36%',
        title: 'Field Quality & Metrology Operations',
        desc: 'Hire 1 dedicated Lead Metrology QA Inspector (₹9,00,000 for 12 mos) to physically audit partner machine shops and oversee all pre-dispatch sign-offs in Sirgitti & Urla.'
      },
      {
        pct: '24%',
        title: 'Physical Shop Audits & NABL Retainers',
        desc: 'Audit 8–10 precision machine shops (₹6,00,000) and establish corporate pay-per-test rates with accredited NABL spectrometry & metallurgy laboratories.'
      },
      {
        pct: '24%',
        title: 'Working Capital & Raw Steel Buffer',
        desc: 'Liquid safety reserve (₹6,00,000) to smooth procurement timing between buyer purchase advances and delivery payouts, securing volume primary steel discounts.'
      },
      {
        pct: '16%',
        title: 'Pvt Ltd Setup, Compliance & Portal',
        desc: 'Pvt Ltd incorporation, legal partner agreements, GST SAC 9988 e-invoicing setup, and lightweight digital buyer milestone tracking portal (₹4,00,000).'
      }
    ];

    allocations.forEach((al, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.8 + col * 5.98;
      const y = 2.55 + row * 2.15;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 5.75, h: 1.95,
        rectRadius: 0.12,
        fill: { color: COLORS.NAVY_PANEL },
        line: { color: COLORS.NAVY_BORDER, width: 1.2 }
      });

      // Percentage Pill Box
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.3, y: y + 0.25, w: 1.05, h: 0.65,
        rectRadius: 0.08,
        fill: { color: COLORS.NAVY_DARK },
        line: { color: COLORS.TEAL_LIGHT, width: 1.2 }
      });
      slide.addText(al.pct, {
        x: x + 0.3, y: y + 0.25, w: 1.05, h: 0.65,
        fontSize: 22, fontFace: 'Arial', bold: true, color: COLORS.TEAL_LIGHT, align: 'center'
      });

      // Card Title (clean vertical alignment, no collision)
      slide.addText(al.title, {
        x: x + 1.55, y: y + 0.22, w: 3.9, h: 0.5,
        fontSize: 13, fontFace: 'Arial', bold: true, color: COLORS.WHITE, lineSpacingMultiple: 1.1
      });

      // Card Desc (starts at y + 0.78 with ample clearance below title)
      slide.addText(al.desc, {
        x: x + 1.55, y: y + 0.78, w: 3.9, h: 1.0,
        fontSize: 10.5, fontFace: 'Arial', color: COLORS.SLATE_MUTED, lineSpacingMultiple: 1.2
      });
    });

    // Contact Footer
    slide.addText('Connect with Founders: contact@rkispro.com  |  www.rkispro.com  |  Sirgitti Industrial Area, Bilaspur & Raipur, CG, India', {
      x: 0.8, y: 6.85, w: 11.73, h: 0.35,
      fontSize: 10.5, fontFace: 'Arial', color: COLORS.TEAL_LIGHT, align: 'center'
    });
  }

  // Save outputs
  const localPreSeedPath = path.join(ROOT_DIR, 'RKISPro_PreSeed_Pitch_Deck.pptx');
  const localSeedPath = path.join(ROOT_DIR, 'RKISPro_Seed_Pitch_Deck.pptx');
  const publicPreSeedPath = path.join(PUBLIC_DIR, 'RKISPro_PreSeed_Pitch_Deck.pptx');
  const publicSeedPath = path.join(PUBLIC_DIR, 'RKISPro_Seed_Pitch_Deck.pptx');
  const artifactPreSeedPath = path.join(ARTIFACT_DIR, 'RKISPro_PreSeed_Pitch_Deck.pptx');
  const artifactSeedPath = path.join(ARTIFACT_DIR, 'RKISPro_Seed_Pitch_Deck.pptx');

  await pptx.writeFile({ fileName: localPreSeedPath });
  console.log('Saved to:', localPreSeedPath);

  fs.copyFileSync(localPreSeedPath, localSeedPath);
  console.log('Synced to:', localSeedPath);

  fs.copyFileSync(localPreSeedPath, publicPreSeedPath);
  fs.copyFileSync(localPreSeedPath, publicSeedPath);
  console.log('Copied to public folder:', publicPreSeedPath, publicSeedPath);

  if (fs.existsSync(ARTIFACT_DIR)) {
    fs.copyFileSync(localPreSeedPath, artifactPreSeedPath);
    fs.copyFileSync(localPreSeedPath, artifactSeedPath);
    console.log('Copied to artifact directory:', artifactPreSeedPath, artifactSeedPath);
  }

  console.log('Pitch Deck generation successfully completed with true 16:9 widescreen layout and resolved alignments!');
}

buildPitchDeck().catch(console.error);
