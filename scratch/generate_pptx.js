const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function createLeanDeck() {
  const pptx = new pptxgen();

  // Modern widescreen 16:9 layout (13.333 x 7.5 inches)
  pptx.defineLayout({ name: 'WIDE_16x9', width: 13.333, height: 7.5 });
  pptx.layout = 'WIDE_16x9';

  pptx.author = 'RKISPro Industrial Technologies';
  pptx.company = 'RKISPro';
  pptx.title = 'RKISPro Lean Pre-Seed Pitch Deck';
  pptx.subject = 'Managed B2B Industrial Manufacturing Platform';

  // Enterprise Color Palette
  const NAVY_DARK = '07131F';
  const NAVY_SLATE = '0F172A';
  const TEAL_PRIMARY = '0D9488';
  const TEAL_BRIGHT = '00C4CC';
  const TEAL_BG = 'F0FDFA';
  const AMBER = 'D97706';
  const ROSE = 'E11D48';
  const SLATE_BG = 'F8FAFC';
  const SLATE_BORDER = 'E2E8F0';
  const SLATE_TEXT = '0F172A';
  const SLATE_MUTED = '475569';
  const WHITE = 'FFFFFF';

  const logoIconPath = path.resolve('public/logo/icon.png');
  const logoDarkPath = path.resolve('public/logo/logo-horizontal-dark.png');

  function addHeader(slide, category, title, darkTheme = false) {
    slide.addText(category.toUpperCase(), {
      x: 0.8,
      y: 0.45,
      w: 9.5,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: darkTheme ? TEAL_BRIGHT : TEAL_PRIMARY,
      letterSpacing: 2
    });

    slide.addText(title, {
      x: 0.8,
      y: 0.75,
      w: 10.5,
      h: 0.6,
      fontSize: 21,
      fontFace: 'Arial',
      bold: true,
      color: darkTheme ? WHITE : SLATE_TEXT
    });

    if (fs.existsSync(logoIconPath)) {
      slide.addImage({
        path: logoIconPath,
        x: 12.0,
        y: 0.45,
        w: 0.55,
        h: 0.55
      });
    }
  }

  // -------------------------------------------------------------
  // SLIDE 1: Title Slide (Lean & Grounded)
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: NAVY_DARK };

    if (fs.existsSync(logoDarkPath)) {
      slide.addImage({
        path: logoDarkPath,
        x: 0.8,
        y: 0.8,
        w: 2.8,
        h: 0.66
      });
    }

    slide.addText('RKISPro Industrial Technologies  |  Lean Pre-Seed Pitch', {
      x: 0.8,
      y: 1.85,
      w: 11.5,
      h: 0.35,
      fontSize: 12.5,
      fontFace: 'Arial',
      bold: true,
      color: TEAL_BRIGHT,
      letterSpacing: 2
    });

    slide.addText('Managed Precision Fabrication &\nMachining for Indian Industry', {
      x: 0.8,
      y: 2.3,
      w: 11.5,
      h: 1.4,
      fontSize: 32,
      fontFace: 'Arial',
      bold: true,
      color: WHITE,
      lineSpacing: 38
    });

    slide.addText(
      '"A lean, quality-first manufacturing partner combining captive workshop capacity with a trusted micro-network of vetted CNC machine shops."',
      {
        x: 0.8,
        y: 3.9,
        w: 11.5,
        h: 0.75,
        fontSize: 13.5,
        fontFace: 'Arial',
        italic: true,
        color: '94A3B8'
      }
    );

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 4.95,
      w: 11.733,
      h: 1.8,
      fill: { color: '0F2A3F' },
      line: { color: TEAL_PRIMARY, width: 1.5 },
      rectRadius: 0.1
    });

    slide.addText('STAGE: CONCIERGE PILOT VALIDATION  |  LEAN TARGET RAISE: ₹75 LAKHS ($90,000 USD)', {
      x: 1.1,
      y: 5.15,
      w: 11.0,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: TEAL_BRIGHT
    });

    slide.addText('Captive Anchor Workshop: Marks Engineering & Co.  ·  Focus Hub: Pune-Chakan Corridor  ·  Zero Capex Model', {
      x: 1.1,
      y: 5.55,
      w: 11.0,
      h: 0.35,
      fontSize: 11,
      fontFace: 'Arial',
      color: 'CBD5E1'
    });

    slide.addText('FOUNDERS: Rajeev Tiwari (3 Yrs Industrial Fabrication)  &  Rupesh Tiwari (Owner, Marks Engineering & Co.)', {
      x: 1.1,
      y: 5.95,
      w: 11.0,
      h: 0.5,
      fontSize: 10.5,
      fontFace: 'Arial',
      bold: true,
      color: '38BDF8'
    });
  }

  // -------------------------------------------------------------
  // SLIDE 2: The Core Problem: Why Sourcing Fails
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: SLATE_BG };
    addHeader(slide, 'The Sourcing Pain', 'The Ground-Level Reality of Sourcing Parts in India');

    const problems = [
      {
        num: '01',
        title: 'Open Directories Resell Leads, Not Parts',
        desc: 'Platforms like IndiaMART sell buyer RFQs to 25+ unvetted workshops. Procurement heads are overwhelmed by spam calls from brokers with no technical comprehension.'
      },
      {
        num: '02',
        title: 'Unpredictable Delivery Timelines',
        desc: 'Job shops promise 10 days but routinely take 30 to 45 days. Buyers face constant assembly line stoppages and hidden surcharges added mid-project.'
      },
      {
        num: '03',
        title: 'Zero Material & Dimensional Traceability',
        desc: 'Workshops frequently substitute uncertified re-rolled commercial steel for prime alloys, resulting in premature cracking and component failure in the plant.'
      },
      {
        num: '04',
        title: 'High Counterparty Risk for Both Sides',
        desc: 'Buyers risk advance money with unverified contractors, while quality MSME workshops wait 90-120 days for corporate payments, crushing their cash flow.'
      }
    ];

    problems.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.6 + row * 2.65;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y,
        w: 5.7,
        h: 2.4,
        fill: { color: WHITE },
        line: { color: SLATE_BORDER, width: 1 },
        rectRadius: 0.12
      });

      slide.addText(p.num, {
        x: x + 0.35,
        y: y + 0.25,
        w: 1.0,
        h: 0.3,
        fontSize: 12,
        fontFace: 'Arial',
        bold: true,
        color: ROSE
      });

      slide.addText(p.title, {
        x: x + 0.35,
        y: y + 0.6,
        w: 5.0,
        h: 0.4,
        fontSize: 13.5,
        fontFace: 'Arial',
        bold: true,
        color: SLATE_TEXT
      });

      slide.addText(p.desc, {
        x: x + 0.35,
        y: y + 1.1,
        w: 5.0,
        h: 1.1,
        fontSize: 11,
        fontFace: 'Arial',
        color: SLATE_MUTED,
        lineSpacing: 16
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 3: Ground-Truth Discovery: What Plant Heads Say
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: SLATE_BG };
    addHeader(slide, 'Customer Discovery', 'Conversations with 35+ Plant Managers & Machine Shop Owners');

    const insights = [
      {
        stat: '88%',
        title: 'Experience Delivery Delays',
        quote: '"We don’t need 20 phone calls from random vendors. We just want one dependable partner who reviews the drawing and delivers on time." — DGM Sourcing, Automotive Tier-1'
      },
      {
        stat: '74%',
        title: 'Suffered Raw Material Fraud',
        quote: '"We ordered forged shafts and received cheap mild steel with surface hardening. It sheared inside our mixer after two weeks." — Operations Head, Heavy Industry'
      },
      {
        stat: '92%',
        title: 'Shops Paralyzed by Delayed Credit',
        quote: '"Our machines sit idle because corporate buyers hold our payments for 90 days. We cannot buy raw steel billets without cash advances." — MSME Workshop Owner'
      }
    ];

    insights.forEach((item, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.65,
        w: 3.75,
        h: 5.0,
        fill: { color: WHITE },
        line: { color: SLATE_BORDER, width: 1 },
        rectRadius: 0.12
      });

      slide.addText(item.stat, {
        x: x + 0.35,
        y: 2.05,
        w: 3.1,
        h: 0.8,
        fontSize: 36,
        fontFace: 'Arial',
        bold: true,
        color: TEAL_PRIMARY
      });

      slide.addText(item.title, {
        x: x + 0.35,
        y: 2.95,
        w: 3.1,
        h: 0.45,
        fontSize: 14,
        fontFace: 'Arial',
        bold: true,
        color: SLATE_TEXT
      });

      slide.addText(item.quote, {
        x: x + 0.35,
        y: 3.65,
        w: 3.1,
        h: 2.7,
        fontSize: 11,
        fontFace: 'Arial',
        italic: true,
        color: SLATE_MUTED,
        lineSpacing: 18
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 4: The Lean Solution: The Managed Execution Partner
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: SLATE_BG };
    addHeader(slide, 'The Practical Solution', 'RKISPro: Pragmatic Managed Sourcing Without Software Bloat');

    const steps = [
      {
        step: 'Step 01',
        title: 'Hands-On Drawing Triage',
        desc: 'Rajeev & Rupesh review 2D/3D technical drawings directly. We identify manufacturing feasibility, tolerance issues, and material grades within 4 hours.'
      },
      {
        step: 'Step 02',
        title: 'Captive & Vetted Spindles',
        desc: 'Work is fulfilled directly via Marks Engineering & Co. or routed to 3–5 neighboring partner machine shops with verified spindle accuracy.'
      },
      {
        step: 'Step 03',
        title: 'Structured Commercials',
        desc: 'Transparent milestone pricing: 30% PO advance for raw steel, 40% on pre-dispatch inspection sign-off, and 30% upon inward delivery acceptance.'
      },
      {
        step: 'Step 04',
        title: 'Pay-Per-Test Metrology',
        desc: 'Zero Capex. We partner with established NABL labs in Bhosari/Chakan for PMI spectrometry and 3-axis CMM inspection reports on demand.'
      }
    ];

    steps.forEach((s, idx) => {
      const x = 0.8 + idx * 2.95;
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.65,
        w: 2.75,
        h: 5.0,
        fill: { color: WHITE },
        line: { color: idx === 1 || idx === 3 ? TEAL_PRIMARY : SLATE_BORDER, width: idx === 1 || idx === 3 ? 2 : 1 },
        rectRadius: 0.12
      });

      slide.addText(s.step, {
        x: x + 0.25,
        y: 1.95,
        w: 2.25,
        h: 0.35,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: TEAL_PRIMARY
      });

      slide.addText(s.title, {
        x: x + 0.25,
        y: 2.35,
        w: 2.25,
        h: 0.6,
        fontSize: 14.5,
        fontFace: 'Arial',
        bold: true,
        color: SLATE_TEXT
      });

      slide.addText(s.desc, {
        x: x + 0.25,
        y: 3.15,
        w: 2.25,
        h: 3.0,
        fontSize: 11,
        fontFace: 'Arial',
        color: SLATE_MUTED,
        lineSpacing: 18
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 5: Day-1 Engine: Marks Engineering & Co. Anchor
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: NAVY_DARK };
    addHeader(slide, 'Our Operational Anchor', 'Marks Engineering & Co. — Captive Execution Hub From Day 0', true);

    const anchorPoints = [
      {
        title: '1. Immediate Captive Workshop Infrastructure',
        desc: 'Co-founder Rupesh Tiwari owns Marks Engineering and Co., giving RKISPro immediate physical capacity, overhead crane bays, welding stations, and skilled machinists without capital expenditure.'
      },
      {
        title: '2. The Operational Sandbox for Quality',
        desc: 'We execute our initial 10 to 15 customer pilot batch runs directly inside Marks Engineering. This allows us to refine inspection protocols, packaging, and logistics under direct founder supervision.'
      },
      {
        title: '3. Local Supplier Clout & Raw Material Pricing',
        desc: 'Decades of local procurement relationships with certified primary steel distributors (Tata, SAIL, Jindal) ensure volume raw-material discounts from day one.'
      },
      {
        title: '4. Zero Third-Party Setup Expenses',
        desc: 'While pure-tech startups burn ₹20L+ hiring contract shops to build samples, RKISPro leverages captive capacity to achieve positive unit economics on our very first order.'
      }
    ];

    anchorPoints.forEach((a, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.6 + row * 2.65;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y,
        w: 5.7,
        h: 2.4,
        fill: { color: '0F2A3F' },
        line: { color: '1A3F5C', width: 1 },
        rectRadius: 0.12
      });

      slide.addText(a.title, {
        x: x + 0.35,
        y: y + 0.3,
        w: 5.0,
        h: 0.4,
        fontSize: 14.5,
        fontFace: 'Arial',
        bold: true,
        color: TEAL_BRIGHT
      });

      slide.addText(a.desc, {
        x: x + 0.35,
        y: y + 0.8,
        w: 5.0,
        h: 1.3,
        fontSize: 11,
        fontFace: 'Arial',
        color: 'CBD5E1',
        lineSpacing: 18
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 6: Go-To-Market: The Chakan-Bhosari Micro-Corridor
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: SLATE_BG };
    addHeader(slide, 'Go-To-Market Execution', 'Phase 1: Hyper-Focused Regional Launch in Pune-Chakan');

    const gtmCards = [
      {
        title: 'Why Start Hyper-Local in Chakan?',
        points: [
          'Over 4,000 machining and fabrication units within a 40 km radius.',
          'India’s automotive & capital goods heartland (Tata Motors, Bajaj, Bharat Forge, Mahindra).',
          'Founders can physically visit any customer plant or partner shop within 30 to 45 minutes.'
        ]
      },
      {
        title: 'Target Customer Profile',
        points: [
          'Mid-market industrial OEMs (₹15 Cr to ₹100 Cr revenue) needing precision components.',
          'Focus on replacement spares, custom fabrications, and overflow production batches.',
          'Offer free First Article Inspection (FAI) and guaranteed on-time dispatch on first order.'
        ]
      },
      {
        title: 'Supply-Side Micro-Network',
        points: [
          'Marks Engineering & Co. handles initial capacity.',
          'Onboard 5 to 8 pre-vetted peer machine shops in Bhosari/Chakan known personally to founders.',
          'We provide them work and guarantee 48-hour milestone payment upon inspection sign-off.'
        ]
      }
    ];

    gtmCards.forEach((g, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.65,
        w: 3.75,
        h: 5.0,
        fill: { color: WHITE },
        line: { color: SLATE_BORDER, width: 1 },
        rectRadius: 0.12
      });

      slide.addText(g.title, {
        x: x + 0.35,
        y: 1.95,
        w: 3.1,
        h: 0.6,
        fontSize: 13,
        fontFace: 'Arial',
        bold: true,
        color: TEAL_PRIMARY
      });

      g.points.forEach((pt, ptIdx) => {
        slide.addText(`• ${pt}`, {
          x: x + 0.35,
          y: 2.65 + ptIdx * 1.3,
          w: 3.1,
          h: 1.2,
          fontSize: 10.5,
          fontFace: 'Arial',
          color: SLATE_MUTED,
          lineSpacing: 16
        });
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 7: Lean Unit Economics & Cash Flow Model
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: SLATE_BG };
    addHeader(slide, 'Unit Economics', 'Real Shop-Floor Economics: Positive Cash Flow from Day 1');

    const economics = [
      {
        title: 'Target Order Value (AOV)',
        value: '₹1,50,000 – ₹5,00,000',
        sub: 'Mid-sized batch fabrication orders'
      },
      {
        title: 'Target Gross Take Rate',
        value: '11% – 14%',
        sub: 'Contractual sourcing spread'
      },
      {
        title: 'Direct Quality Cost',
        value: '₹3,000 – ₹8,000',
        sub: 'Pay-per-test NABL lab fees'
      },
      {
        title: 'Working Capital',
        value: 'Self-Funded',
        sub: 'Customer 30% PO advance'
      }
    ];

    economics.forEach((e, idx) => {
      const x = 0.8 + idx * 2.95;
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.65,
        w: 2.75,
        h: 2.05,
        fill: { color: WHITE },
        line: { color: SLATE_BORDER, width: 1 },
        rectRadius: 0.1
      });

      slide.addText(e.title, {
        x: x + 0.2,
        y: 1.85,
        w: 2.35,
        h: 0.35,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: SLATE_MUTED
      });

      slide.addText(e.value, {
        x: x + 0.2,
        y: 2.25,
        w: 2.35,
        h: 0.5,
        fontSize: 16,
        fontFace: 'Arial',
        bold: true,
        color: TEAL_PRIMARY
      });

      slide.addText(e.sub, {
        x: x + 0.2,
        y: 2.85,
        w: 2.35,
        h: 0.6,
        fontSize: 10,
        fontFace: 'Arial',
        color: SLATE_TEXT
      });
    });

    // Realistic Case Study
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 4.0,
      w: 11.6,
      h: 2.65,
      fill: { color: WHITE },
      line: { color: SLATE_BORDER, width: 1 },
      rectRadius: 0.1
    });

    slide.addText('Real Unit Economics on a Sample ₹3,00,000 Precision Machining Order', {
      x: 1.1,
      y: 4.25,
      w: 11.0,
      h: 0.35,
      fontSize: 14,
      fontFace: 'Arial',
      bold: true,
      color: SLATE_TEXT
    });

    slide.addText(
      '• Buyer Contract PO Value: ₹3,00,000 (30% Advance ₹90,000 paid upon drawing approval)\n' +
      '• Workshop Execution Payout: ₹2,62,000 (Raw Material: ₹85,000, Machining & Labour: ₹1,27,000, Delivery: ₹50,000)\n' +
      '• RKISPro Gross Revenue: ₹38,000 (12.7% Take-Rate)\n' +
      '• Direct Quality Cost (NABL Lab Chemical Test + Surface Roughness): ₹6,000\n' +
      '• Net Contribution Margin: ₹32,000 (84.2% Contribution Margin on Net Revenue)',
      {
        x: 1.1,
        y: 4.75,
        w: 11.0,
        h: 1.6,
        fontSize: 11.5,
        fontFace: 'Arial',
        color: SLATE_MUTED,
        lineSpacing: 21
      }
    );
  }

  // -------------------------------------------------------------
  // SLIDE 8: Market Opportunity: Focus on the $24B Core
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: SLATE_BG };
    addHeader(slide, 'Market Opportunity', 'Capturing High-Margin Precision Manufacturing Work');

    const tiers = [
      {
        label: 'Total Addressable Market (TAM)',
        size: '$120B',
        desc: 'Total annual Indian industrial contract manufacturing, structural fabrication, precision CNC machining, and maintenance.'
      },
      {
        label: 'Serviceable Market (SAM)',
        size: '$24B',
        desc: 'Organized mid-market precision machining & fabricated equipment across automotive components, heavy engineering, and pharma.'
      },
      {
        label: 'Immediate Pilot Target (SOM)',
        size: '₹15 Cr',
        desc: 'Capturing 0.1% of the Pune-Chakan manufacturing corridor over the first 24 months through 50 active recurring clients.'
      }
    ];

    tiers.forEach((t, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.65,
        w: 3.75,
        h: 5.0,
        fill: { color: WHITE },
        line: { color: idx === 2 ? TEAL_PRIMARY : SLATE_BORDER, width: idx === 2 ? 2 : 1 },
        rectRadius: 0.12
      });

      slide.addText(t.size, {
        x: x + 0.35,
        y: 2.05,
        w: 3.1,
        h: 0.8,
        fontSize: 34,
        fontFace: 'Arial',
        bold: true,
        color: idx === 2 ? TEAL_PRIMARY : SLATE_TEXT
      });

      slide.addText(t.label, {
        x: x + 0.35,
        y: 2.95,
        w: 3.1,
        h: 0.5,
        fontSize: 13,
        fontFace: 'Arial',
        bold: true,
        color: SLATE_TEXT
      });

      slide.addText(t.desc, {
        x: x + 0.35,
        y: 3.65,
        w: 3.1,
        h: 2.5,
        fontSize: 11,
        fontFace: 'Arial',
        color: SLATE_MUTED,
        lineSpacing: 18
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 9: Why We Win: Founder Moat & Execution Edge
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: NAVY_DARK };
    addHeader(slide, 'Competitive Advantage', 'Four Practical Moats That Software-Only Founders Cannot Replicate', true);

    const moats = [
      {
        title: '1. Second-Generation Manufacturing DNA',
        desc: 'Rajeev & Rupesh Tiwari are not software coders guessing at manufacturing. They have spent years inside fabrication shops reading prints, operating welders, and managing machine operators.'
      },
      {
        title: '2. Captive Shop-Floor Infrastructure',
        desc: 'Marks Engineering & Co. provides immediate physical validation. We never have to tell a buyer "we are just a middleman software portal" — we show them our actual working workshop.'
      },
      {
        title: '3. Personal Quality Sign-Off & Accountability',
        desc: 'Buyers don’t trust an algorithm; they trust experienced manufacturing leaders who personally inspect the first article before it leaves the workshop gate.'
      },
      {
        title: '4. Zero Tech-Debt & Negative Capex',
        desc: 'While competitors burn millions building software that plant managers don’t use, RKISPro focuses on physical execution, repeat customer trust, and cash-flow positive unit economics.'
      }
    ];

    moats.forEach((m, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.6 + row * 2.65;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y,
        w: 5.7,
        h: 2.4,
        fill: { color: '0F2A3F' },
        line: { color: '1A3F5C', width: 1 },
        rectRadius: 0.12
      });

      slide.addText(m.title, {
        x: x + 0.35,
        y: y + 0.3,
        w: 5.0,
        h: 0.4,
        fontSize: 14.5,
        fontFace: 'Arial',
        bold: true,
        color: TEAL_BRIGHT
      });

      slide.addText(m.desc, {
        x: x + 0.35,
        y: y + 0.8,
        w: 5.0,
        h: 1.3,
        fontSize: 11,
        fontFace: 'Arial',
        color: 'CBD5E1',
        lineSpacing: 18
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 10: 3-Stage Lean Execution Roadmap
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: SLATE_BG };
    addHeader(slide, 'Milestone Roadmap', 'Pragmatic 3-Stage Plan: From Concierge Pilot to Scaled Platform');

    const phases = [
      {
        phase: 'Stage 1: Months 1–4',
        title: 'The Concierge Pilot',
        milestones: [
          'Deliver first 10–12 pilot orders via Marks Engineering & Co.',
          'Achieve ₹25L–₹35L in fulfilled GMV with zero customer rejections.',
          'Validate pay-per-test NABL spectrometry and CMM reporting.',
          'Secure 3 recurring enterprise monthly purchase agreements.'
        ]
      },
      {
        phase: 'Stage 2: Months 5–9',
        title: 'The Trusted Micro-Network',
        milestones: [
          'Bring on 5 to 8 pre-vetted partner machine shops in Chakan.',
          'Fulfill 30+ batch orders across auto and heavy equipment clients.',
          'Achieve ₹1.0 Cr cumulative GMV and ₹12L gross margin.',
          'Hire 1 full-time Field Quality Inspector to oversee dispatches.'
        ]
      },
      {
        phase: 'Stage 3: Months 10–18',
        title: 'Digital Portal & Expansion',
        milestones: [
          'Launch digital RFQ & inspection portal based on real user feedback.',
          'Expand audited vendor footprint into Sanand GIDC & Gujarat.',
          'Reach ₹40L/month GMV run-rate with 20+ active buyers.',
          'Command a $1.0M–$1.5M institutional Seed Round with audited GMV.'
        ]
      }
    ];

    phases.forEach((p, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.65,
        w: 3.75,
        h: 5.0,
        fill: { color: WHITE },
        line: { color: idx === 1 ? TEAL_PRIMARY : SLATE_BORDER, width: idx === 1 ? 2 : 1 },
        rectRadius: 0.12
      });

      slide.addText(p.phase, {
        x: x + 0.35,
        y: 1.95,
        w: 3.1,
        h: 0.35,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: TEAL_PRIMARY
      });

      slide.addText(p.title, {
        x: x + 0.35,
        y: 2.35,
        w: 3.1,
        h: 0.55,
        fontSize: 14,
        fontFace: 'Arial',
        bold: true,
        color: SLATE_TEXT
      });

      p.milestones.forEach((m, mIdx) => {
        slide.addText(`• ${m}`, {
          x: x + 0.35,
          y: 3.15 + mIdx * 0.85,
          w: 3.1,
          h: 0.8,
          fontSize: 10.5,
          fontFace: 'Arial',
          color: SLATE_MUTED,
          lineSpacing: 15
        });
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 11: Founding Team: Deep Industrial Roots
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: SLATE_BG };
    addHeader(slide, 'Founding Team', 'True Shop-Floor Operators Backed by Family Fabrication Pedigree');

    const team = [
      {
        role: 'Co-Founder & Chief Executive Officer',
        name: 'Rajeev Tiwari',
        tag: 'Operations & Sourcing',
        desc: '• 3 years of hands-on operational leadership inside an industrial metal fabrication company.\n' +
              '• Second-generation manufacturing entrepreneur; family owns and operates an established fabrication enterprise.\n' +
              '• Deep ground-level mastery of workshop contractor pricing, raw material sourcing, drawing triage, and customer relations.'
      },
      {
        role: 'Co-Founder & Head of Manufacturing',
        name: 'Rupesh Tiwari',
        tag: 'Owner, Marks Engineering and Co.',
        desc: '• Founder & Owner of Marks Engineering and Co., a precision industrial fabrication company in Maharashtra.\n' +
              '• Direct access to captive workshop machine capacity, certified welders, skilled machinists, and established supplier trust.\n' +
              '• Authentic insider understanding of machine shop cash flow bottlenecks and raw material procurement.'
      },
      {
        role: 'The Operational Moat',
        name: 'Marks Engineering Anchor',
        tag: 'Captive Execution Advantage',
        desc: '• Unlike tech founders with no machines, RKISPro has immediate captive shop-floor backing from Day 0.\n' +
              '• Zero initial software capex: Orders are fulfilled, inspected, and delivered with positive contribution margin.\n' +
              '• Key hire post-pre-seed: 1 dedicated Field Quality Inspector to oversee third-party workshop auditing.'
      }
    ];

    team.forEach((t, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.65,
        w: 3.75,
        h: 5.0,
        fill: { color: WHITE },
        line: { color: idx === 0 || idx === 1 ? TEAL_PRIMARY : SLATE_BORDER, width: idx === 0 || idx === 1 ? 2 : 1 },
        rectRadius: 0.12
      });

      slide.addText(t.role, {
        x: x + 0.3,
        y: 1.95,
        w: 3.2,
        h: 0.45,
        fontSize: 10.5,
        fontFace: 'Arial',
        bold: true,
        color: TEAL_PRIMARY
      });

      slide.addText(t.name, {
        x: x + 0.3,
        y: 2.45,
        w: 3.2,
        h: 0.45,
        fontSize: 17,
        fontFace: 'Arial',
        bold: true,
        color: SLATE_TEXT
      });

      slide.addText(t.tag, {
        x: x + 0.3,
        y: 2.9,
        w: 3.2,
        h: 0.35,
        fontSize: 10,
        fontFace: 'Arial',
        bold: true,
        color: AMBER
      });

      slide.addText(t.desc, {
        x: x + 0.3,
        y: 3.35,
        w: 3.2,
        h: 3.1,
        fontSize: 10.5,
        fontFace: 'Arial',
        color: SLATE_MUTED,
        lineSpacing: 16
      });
    });
  }

  // -------------------------------------------------------------
  // SLIDE 12: The Lean Ask & Capital Allocation
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: NAVY_DARK };
    addHeader(slide, 'The Lean Ask', 'Raising ₹75 Lakhs ($90,000 USD) for 15 Months Runway to Deliver 35+ Orders', true);

    const allocations = [
      {
        pct: '40%',
        title: 'Field Quality & Operations',
        desc: 'Hire 1 dedicated Field Quality Inspector (CMM/NDT auditor) to inspect partner workshops and oversee dispatches.'
      },
      {
        pct: '25%',
        title: 'Vendor Vetting & Partner Lab Retainers',
        desc: 'Audit 15 local machine shops in Chakan and establish corporate pay-per-test rates with NABL metallurgy labs.'
      },
      {
        pct: '20%',
        title: 'Working Capital & Delivery Buffer',
        desc: 'Liquid safety reserve to smooth raw material procurement timing between buyer advances and delivery payouts.'
      },
      {
        pct: '15%',
        title: 'Lightweight Web App & Compliance',
        desc: 'Hardening simple digital RFQ status dashboard, legal vendor agreements, and GST SAC 9988 e-invoicing.'
      }
    ];

    allocations.forEach((a, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.6 + row * 2.65;

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x,
        y,
        w: 5.7,
        h: 2.4,
        fill: { color: '0F2A3F' },
        line: { color: '1A3F5C', width: 1 },
        rectRadius: 0.12
      });

      slide.addText(a.pct, {
        x: x + 0.35,
        y: y + 0.25,
        w: 1.5,
        h: 0.5,
        fontSize: 26,
        fontFace: 'Arial',
        bold: true,
        color: TEAL_BRIGHT
      });

      slide.addText(a.title, {
        x: x + 2.0,
        y: y + 0.35,
        w: 3.3,
        h: 0.35,
        fontSize: 13.5,
        fontFace: 'Arial',
        bold: true,
        color: WHITE
      });

      slide.addText(a.desc, {
        x: x + 0.35,
        y: y + 0.9,
        w: 5.0,
        h: 1.2,
        fontSize: 11,
        fontFace: 'Arial',
        color: 'CBD5E1',
        lineSpacing: 18
      });
    });
  }

  // Save the presentation
  const localPath = path.resolve('RKISPro_PreSeed_Pitch_Deck.pptx');
  const publicPath = path.resolve('public/RKISPro_PreSeed_Pitch_Deck.pptx');
  const seedLocalPath = path.resolve('RKISPro_Seed_Pitch_Deck.pptx');
  const seedPublicPath = path.resolve('public/RKISPro_Seed_Pitch_Deck.pptx');
  const artifactPath = path.join('C:', 'Users', 'rksc5', '.gemini', 'antigravity', 'brain', '437e1109-ff91-4847-9987-ee6829402543', 'RKISPro_PreSeed_Pitch_Deck.pptx');

  await pptx.writeFile({ fileName: localPath });
  fs.copyFileSync(localPath, publicPath);
  fs.copyFileSync(localPath, seedLocalPath);
  fs.copyFileSync(localPath, seedPublicPath);
  try {
    fs.copyFileSync(localPath, artifactPath);
  } catch (e) {
    console.error('Artifact save error:', e.message);
  }

  console.log(`Lean Pre-Seed Deck created successfully at:\n- ${localPath}\n- ${publicPath}`);
}

createLeanDeck().catch(err => {
  console.error(err);
  process.exit(1);
});
