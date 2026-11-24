import type { CheckpointCategory, CheckpointItem, VendorAuditEvaluation, VerifiedBadge } from "@/types/audit";

export const CHECKPOINT_CATEGORIES: { id: CheckpointCategory; label: string; tier: "bare_minimum" | "enterprise"; description: string }[] = [
  {
    id: "bare_minimum",
    label: "Tier A: Bare-Minimum Essentials (15 Points)",
    tier: "bare_minimum",
    description: "Physical craftsmanship, working welding/cutting machines, squareness, and honest ownership. Required for all local fabrication jobs."
  },
  {
    id: "ent_raw_material",
    label: "Enterprise Cat 1: Raw Material Metallurgy & Traceability",
    tier: "enterprise",
    description: "Primary Tata/SAIL/Jindal MTC 3.1 certificates, OES spectrometry chemical testing, and heat-number physical stamping."
  },
  {
    id: "ent_welding",
    label: "Enterprise Cat 2: Certified Welding Engineering",
    tier: "enterprise",
    description: "WPS, PQR, ASME IX / AWS D1.1 certified welders, low-hydrogen baking ovens, edge beveling, and inter-pass temperature control."
  },
  {
    id: "ent_ndt",
    label: "Enterprise Cat 3: Non-Destructive Testing (NDT)",
    tier: "enterprise",
    description: "Liquid Dye Penetrant (DPT) by Level-II inspector, Magnetic Particle (MPI), and Ultrasonic Testing (UT) for heavy plates."
  },
  {
    id: "ent_machining",
    label: "Enterprise Cat 4: Precision CNC Machining & Calibration",
    tier: "enterprise",
    description: "Multi-axis VMC/CNC, spindle dynamic runout < 0.005mm, annual NABL calibration certificates, and granite surface plate."
  },
  {
    id: "ent_coating",
    label: "Enterprise Cat 5: Surface Prep & Protective Coating",
    tier: "enterprise",
    description: "ISO 8501-1 Sa 2.5 sandblasting/grit-blasting, multi-coat epoxy/PU airless painting, and digital DFT micron measurement."
  },
  {
    id: "ent_governance",
    label: "Enterprise Cat 6: Plant Governance, Safety & MDR Dossier",
    tier: "enterprise",
    description: "Overhead EOT crane proof-load certification, locked non-conformance quarantine cage, and complete Manufacturer's Data Report."
  }
];

export const CHECKPOINTS: CheckpointItem[] = [
  // ==========================================
  // TIER A: BARE-MINIMUM CHECKPOINTS (1 - 15)
  // ==========================================
  {
    id: "bm_01",
    number: 1,
    title: "Entity Legitimacy & Banking Mandate",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Active GSTIN / MSME Udyam registration and clean bank passbook/UPI for milestone escrow payouts.",
    testInstruction: "Inspect physical GST certificate and verify bank account details matching workshop owner.",
    passStandard: "Active GST/Udyam matching factory address + clean bank passbook or canceled check.",
    maxScore: 2
  },
  {
    id: "bm_02",
    number: 2,
    title: "Covered Workshop Shed & Truck Logistics",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Covered shed (>= 1,200 sq.ft) with paved access road for 16-ton/25-ton multi-axle freight trucks.",
    testInstruction: "Measure shed floor area and check road turning radius for heavy transport vehicles.",
    passStandard: "Covered dry shed >= 1,200 sq.ft; heavy transport trucks can enter and load easily.",
    maxScore: 2
  },
  {
    id: "bm_03",
    number: 3,
    title: "Connected Electrical Power & Breakers",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Stable industrial electrical supply (>= 15-25 kVA) with functional MCB/breakers and safe wiring.",
    testInstruction: "Inspect main distribution panel for proper circuit breakers (no bare jumper wires).",
    passStandard: "Can run 2 welding machines and chop saw concurrently without power trip.",
    maxScore: 2
  },
  {
    id: "bm_04",
    number: 4,
    title: "Welding Machine Health & Ground Clamps",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Minimum 2 working welding machines (400A Inverter ARC/SMAW or MIG/MAG CO2) with copper ground clamps.",
    testInstruction: "Inspect cables for insulation damage; test weld arc stability for 60 seconds.",
    passStandard: "Smooth, continuous arc with zero thermal tripping; tight copper earthing clamps.",
    maxScore: 2
  },
  {
    id: "bm_05",
    number: 5,
    title: "Gas Cutting Set & Abrasive Chop Saw",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Operational Oxy-LPG / Oxy-Acetylene gas cutting set with flashback arrestors and abrasive pipe chop saw.",
    testInstruction: "Check cutting torch nozzle and observe test slicing of steel pipe/angle.",
    passStandard: "Clean square cut with minimal melted slag beard; functional flashback arrestor.",
    maxScore: 2
  },
  {
    id: "bm_06",
    number: 6,
    title: "Angle Grinders & Deburring Tools",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Functional 4-inch and 7-inch angle grinders with wheel guards and wire cup brushes.",
    testInstruction: "Check wheel guards, spindle tightness, and motor vibration on grinders.",
    passStandard: "Guards firmly attached; bearings sound; abrasive discs in safe, unchipped condition.",
    maxScore: 2
  },
  {
    id: "bm_07",
    number: 7,
    title: "Tri-Square Accuracy & Right-Angle Clamps",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Workshop possesses heavy steel 90-degree tri-squares and magnetic clamping jigs.",
    testInstruction: "Check shop tri-square against FQE's master engineer square on a flat surface.",
    passStandard: "Zero light gap; right angle accurate within +/- 0.5 degrees across blade length.",
    maxScore: 2
  },
  {
    id: "bm_08",
    number: 8,
    title: "Linear Measuring Tapes Calibration Check",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Shop steel measuring tapes (5m & 30m) unkinked with tight end hook rivets.",
    testInstruction: "Compare shop 5m tape against FQE master stainless steel rule at 1000mm and 3000mm marks.",
    passStandard: "Measuring discrepancy <= 1.0mm over 3.0 meters.",
    maxScore: 2
  },
  {
    id: "bm_09",
    number: 9,
    title: "Vernier Caliper for Thickness Checking",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "At least one working digital or manual vernier caliper (150mm or 300mm) for plate and pipe thickness.",
    testInstruction: "Close jaws against light to verify zero datum; measure known thickness gauge block.",
    passStandard: "Jaws parallel with zero light gap at zero; reading matches gauge block within 0.05mm.",
    maxScore: 2
  },
  {
    id: "bm_10",
    number: 10,
    title: "Magnetic Base Drill / Heavy Pillar Drill",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Working magnetic drill or heavy pillar drill press (13mm - 32mm capacity) with true spindle.",
    testInstruction: "Mount drill bit and drill hole in 10mm scrap plate; check hole roundness.",
    passStandard: "Perpendicular, round hole with zero elliptical walloping or excessive spindle wobble.",
    maxScore: 2
  },
  {
    id: "bm_11",
    number: 11,
    title: "Weld Penetration Craftsmanship Test",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Welder performs a T-fillet weld on two 8-10mm steel plates; FQE fractures joint to inspect root fusion.",
    testInstruction: "Observe welder arc angle, travel speed, and fracture joint with sledgehammer to inspect weld root.",
    passStandard: "Complete root fusion; zero cold lapping; uniform ripple bead without excessive porosity.",
    maxScore: 2
  },
  {
    id: "bm_12",
    number: 12,
    title: "Box Trueness & Diagonal Symmetry Test",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Physical inspection of fabricated frame diagonals to verify squareness (A to C vs B to D).",
    testInstruction: "Cross-measure corner-to-corner diagonals on an existing frame or gate on the shop floor.",
    passStandard: "Diagonal difference <= 2.0mm across a 2.0-meter rectangular assembly.",
    maxScore: 2
  },
  {
    id: "bm_13",
    number: 13,
    title: "Grind Finish & Weld Spatter Removal",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Finished workpieces have weld spatter chiseled off, burrs ground flush, and smooth touch.",
    testInstruction: "Conduct bare-hand swipe test across completed joints and edges.",
    passStandard: "Smooth touch; zero sharp finger-cutting edges; all weld spatter removed.",
    maxScore: 2
  },
  {
    id: "bm_14",
    number: 14,
    title: "Basic Shop Safety, Earthing & PPE",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Proper copper earthing directly clamped to table; welders using shields, leather gloves, and closed shoes.",
    testInstruction: "Check earthing connection (no loose rebar wraps) and observe worker PPE usage.",
    passStandard: "Solid earthing clamp; basic PPE in active use; functional dry chemical fire extinguisher.",
    maxScore: 2
  },
  {
    id: "bm_15",
    number: 15,
    title: "Owner Integrity & Delivery Commitment",
    category: "bare_minimum",
    categoryLabel: "Tier A: Bare-Minimum",
    tier: "bare_minimum",
    description: "Owner is reachable, agrees to milestone inspection protocols, and commits to realistic timelines.",
    testInstruction: "Interview owner on past delivery track record, capacity commitments, and FQE pre-dispatch sign-offs.",
    passStandard: "Clear communication, transparent capacity disclosure, agreements to FQE inspection.",
    maxScore: 2
  },

  // ==========================================
  // TIER B: ENTERPRISE CHECKPOINTS (16 - 40)
  // ==========================================

  // Category 1: Raw Material Metallurgy & Traceability (16 - 19)
  {
    id: "ent_c1_16",
    number: 16,
    title: "Primary Mill Sourcing & MTC 3.1 Traceability",
    category: "ent_raw_material",
    categoryLabel: "Enterprise Cat 1: Raw Material",
    tier: "enterprise",
    description: "Raw steel plates and bars sourced strictly from primary producers (Tata/SAIL/Jindal) with EN 10204 3.1 MTC.",
    testInstruction: "Audit raw material inwarding register and verify heat numbers on plates against MTC documents.",
    passStandard: "100% of prime stock has genuine MTC 3.1 certificates matching heat numbers.",
    maxScore: 2
  },
  {
    id: "ent_c1_17",
    number: 17,
    title: "Chemical Spectrometry (OES Testing) Access",
    category: "ent_raw_material",
    categoryLabel: "Enterprise Cat 1: Raw Material",
    tier: "enterprise",
    description: "In-house optical spectrometer or active SLA with NABL testing lab for OES chemical spark analysis.",
    testInstruction: "Review recent NABL chemical test reports for carbon, manganese, sulfur, and phosphorus.",
    passStandard: "Valid testing SLA with accredited NABL lab; turnaround time <= 24 hours.",
    maxScore: 2
  },
  {
    id: "ent_c1_18",
    number: 18,
    title: "Mechanical Tensile & Charpy Impact Testing",
    category: "ent_raw_material",
    categoryLabel: "Enterprise Cat 1: Raw Material",
    tier: "enterprise",
    description: "Certified yield strength, ultimate tensile strength, and Charpy impact values verified via NABL lab.",
    testInstruction: "Inspect mechanical test certificates from accredited lab on recent steel batches.",
    passStandard: "Mechanical yield and tensile values conform to specified grade (e.g. IS 2062 E250/E350).",
    maxScore: 2
  },
  {
    id: "ent_c1_19",
    number: 19,
    title: "Heat Number Stamping & Color Coding",
    category: "ent_raw_material",
    categoryLabel: "Enterprise Cat 1: Raw Material",
    tier: "enterprise",
    description: "Physical storage protocols: Color-coding on bar ends and hard-stamped heat numbers on plate off-cuts.",
    testInstruction: "Inspect steel storage racks and check for stencil or punch markings on cut pieces.",
    passStandard: "Alloy grades color-coded; off-cuts retain stamped heat numbers, preventing mix-ups.",
    maxScore: 2
  },

  // Category 2: Certified Welding Engineering (20 - 25)
  {
    id: "ent_c2_20",
    number: 20,
    title: "Welding Procedure Specifications (WPS)",
    category: "ent_welding",
    categoryLabel: "Enterprise Cat 2: Certified Welding",
    tier: "enterprise",
    description: "Documented, approved Welding Procedure Specifications detailing voltage, amperage, travel speed, and gas flow.",
    testInstruction: "Check for laminated WPS sheets mounted near welding bays.",
    passStandard: "Qualified WPS documents readily available for MS (IS 2062) and SS (SS304/316).",
    maxScore: 2
  },
  {
    id: "ent_c2_21",
    number: 21,
    title: "Procedure Qualification Records (PQR)",
    category: "ent_welding",
    categoryLabel: "Enterprise Cat 2: Certified Welding",
    tier: "enterprise",
    description: "Supporting PQR test documents with mechanical bend and tensile test clearance for the WPS.",
    testInstruction: "Review PQR test reports signed by recognized third-party inspection agency.",
    passStandard: "Valid PQR records available for all active structural welding procedures.",
    maxScore: 2
  },
  {
    id: "ent_c2_22",
    number: 22,
    title: "Welder Performance Qualification (ASME/AWS)",
    category: "ent_welding",
    categoryLabel: "Enterprise Cat 2: Certified Welding",
    tier: "enterprise",
    description: "Shop welders hold active Welder Performance Qualification (WPQ) cards certified under ASME Sec IX or AWS D1.1.",
    testInstruction: "Check welder certification cards, issuing agency (TUV, DNV, BV, EIL), and welder ID stamps.",
    passStandard: "At least 2 qualified welders on staff with active certificates within 6-month validity.",
    maxScore: 2
  },
  {
    id: "ent_c2_23",
    number: 23,
    title: "Low-Hydrogen Electrode Baking Ovens",
    category: "ent_welding",
    categoryLabel: "Enterprise Cat 2: Certified Welding",
    tier: "enterprise",
    description: "Temperature-controlled mother baking oven (250-350C) and portable holding quivers (100-150C) for E7018.",
    testInstruction: "Inspect electrode baking oven temperature gauge and verify welders carry heated quivers.",
    passStandard: "Mother oven at required temperature; electrodes kept dry to eliminate hydrogen cracking.",
    maxScore: 2
  },
  {
    id: "ent_c2_24",
    number: 24,
    title: "Plate Edge Beveling & Root Gap Control",
    category: "ent_welding",
    categoryLabel: "Enterprise Cat 2: Certified Welding",
    tier: "enterprise",
    description: "Mechanical plate beveling machines delivering uniform 30-35 degree V-grooves and calibrated root gaps.",
    testInstruction: "Measure bevel angle and root gap on prepared plates prior to welding.",
    passStandard: "Bevel angle 30-35 deg; root face 1.5-2.0mm; root gap uniform across full plate joint.",
    maxScore: 2
  },
  {
    id: "ent_c2_25",
    number: 25,
    title: "Inter-Pass Temperature & Back-Purging Setup",
    category: "ent_welding",
    categoryLabel: "Enterprise Cat 2: Certified Welding",
    tier: "enterprise",
    description: "Digital infrared pyrometers for inter-pass temperature monitoring and argon purging setup for SS joints.",
    testInstruction: "Verify temperature chalks/pyrometer availability and argon back-purging dams.",
    passStandard: "Calibrated pyrometer on site; argon purging setup operational for stainless steel work.",
    maxScore: 2
  },

  // Category 3: Non-Destructive Testing (NDT) Readiness (26 - 29)
  {
    id: "ent_c3_26",
    number: 26,
    title: "Dye Penetrant Testing (DPT) Level-II",
    category: "ent_ndt",
    categoryLabel: "Enterprise Cat 3: NDT Readiness",
    tier: "enterprise",
    description: "In-house or retainer ASNT/ISNT Level-II technician performing DPT crack inspection on critical butt welds.",
    testInstruction: "Check DPT chemical aerosol cans (cleaner, penetrant, developer) expiry date and Level-II certificate.",
    passStandard: "Valid Level-II inspector on call; fresh DPT test kits in stock.",
    maxScore: 2
  },
  {
    id: "ent_c3_27",
    number: 27,
    title: "Magnetic Particle Inspection (MPI) Yoke",
    category: "ent_ndt",
    categoryLabel: "Enterprise Cat 3: NDT Readiness",
    tier: "enterprise",
    description: "Electromagnetic yoke with magnetic powder/ink for detecting surface and sub-surface weld flaws.",
    testInstruction: "Inspect MPI yoke lift capacity (10 lb AC lift test) and particle suspension.",
    passStandard: "Calibrated MPI yoke with valid annual lift test certificate.",
    maxScore: 2
  },
  {
    id: "ent_c3_28",
    number: 28,
    title: "Ultrasonic Flaw Detection (UT) Access",
    category: "ent_ndt",
    categoryLabel: "Enterprise Cat 3: NDT Readiness",
    tier: "enterprise",
    description: "Access to ultrasonic shear-wave testing for thick plate full-penetration butt welds (> 12mm).",
    testInstruction: "Check recent ultrasonic testing reports and contractual agreement with UT agency.",
    passStandard: "UT agency agreement in place; inspection reports conform to ASME Sec V Art 4.",
    maxScore: 2
  },
  {
    id: "ent_c3_29",
    number: 29,
    title: "Industrial Radiography (RT / X-Ray) Access",
    category: "ent_ndt",
    categoryLabel: "Enterprise Cat 3: NDT Readiness",
    tier: "enterprise",
    description: "Coordination with licensed BARC-approved industrial radiography agency for X-ray weld examination.",
    testInstruction: "Verify arrangement with licensed radiography contractor for pressure piping/tanks.",
    passStandard: "BARC-licensed RT agency on retainership for radiographic testing requirements.",
    maxScore: 2
  },

  // Category 4: Precision CNC Machining & Calibration (30 - 34)
  {
    id: "ent_c4_30",
    number: 30,
    title: "Multi-Axis VMC / CNC Machining Centers",
    category: "ent_machining",
    categoryLabel: "Enterprise Cat 4: Precision CNC",
    tier: "enterprise",
    description: "High-rigidity VMC (3-axis / 4-axis) or CNC turning center with Fanuc/Siemens/Haas controllers.",
    testInstruction: "Review machine specifications and inspect controller programming interface.",
    passStandard: "Production-ready CNC/VMC machines holding tolerances down to +/- 0.015mm.",
    maxScore: 2
  },
  {
    id: "ent_c4_31",
    number: 31,
    title: "Spindle Dynamic Runout Verification",
    category: "ent_machining",
    categoryLabel: "Enterprise Cat 4: Precision CNC",
    tier: "enterprise",
    description: "Dynamic radial runout of VMC/lathe spindle < 0.005mm tested with a 300mm precision mandrel.",
    testInstruction: "Mount dial test indicator on spindle taper and measure total indicator reading (TIR).",
    passStandard: "Radial runout < 0.005mm at nose and < 0.012mm at 300mm test bar overhang.",
    maxScore: 2
  },
  {
    id: "ent_c4_32",
    number: 32,
    title: "NABL Annual Calibration on Precision Tools",
    category: "ent_machining",
    categoryLabel: "Enterprise Cat 4: Precision CNC",
    tier: "enterprise",
    description: "100% of precision micrometers, bore gauges, and verniers carry active NABL calibration stickers.",
    testInstruction: "Audit calibration logbook against physical tools; check certificate expiry dates.",
    passStandard: "All precision tools calibrated within the last 12 months with traceable NABL certificates.",
    maxScore: 2
  },
  {
    id: "ent_c4_33",
    number: 33,
    title: "Granite Surface Plate & Digital Height Master",
    category: "ent_machining",
    categoryLabel: "Enterprise Cat 4: Precision CNC",
    tier: "enterprise",
    description: "Grade 00 granite surface plate (>= 1000x1000mm) with calibrated 2D digital height gauge.",
    testInstruction: "Check surface plate calibration planarity certificate and test height master probe.",
    passStandard: "Grade 00 plate with planarity < 0.003mm; digital height master operational.",
    maxScore: 2
  },
  {
    id: "ent_c4_34",
    number: 34,
    title: "Surface Roughness Stylus Tester (Ra / Rz)",
    category: "ent_machining",
    categoryLabel: "Enterprise Cat 4: Precision CNC",
    tier: "enterprise",
    description: "Portable stylus surface roughness tester (Mitutoyo Surftest or equivalent) calibrated against master patch.",
    testInstruction: "Run a test traverse on reference roughness standard patch.",
    passStandard: "Tester operational and calibrated; capable of verifying ground finishes to Ra <= 0.8 um.",
    maxScore: 2
  },

  // Category 5: Surface Preparation & Protective Coating (35 - 37)
  {
    id: "ent_c5_35",
    number: 35,
    title: "Grit / Sand Blasting to Sa 2.5 Standard",
    category: "ent_coating",
    categoryLabel: "Enterprise Cat 5: Surface Prep",
    tier: "enterprise",
    description: "Enclosed blasting booth or blast pot achieving surface profile cleanliness to ISO 8501-1 Sa 2.5.",
    testInstruction: "Inspect blasting compressor pressure and examine surface comparator profile on blasted steel.",
    passStandard: "Near-white blast finish conforming to Sa 2.5 with clean anchor profile (40-75 um).",
    maxScore: 2
  },
  {
    id: "ent_c5_36",
    number: 36,
    title: "Industrial Airless Spray Painting System",
    category: "ent_coating",
    categoryLabel: "Enterprise Cat 5: Surface Prep",
    tier: "enterprise",
    description: "High-pressure airless spray painting unit applying multi-coat industrial epoxy and polyurethane (PU).",
    testInstruction: "Check spray pump pressure, fluid hoses, and paint mixing temperature control.",
    passStandard: "Functional airless sprayer delivering uniform paint coat without runs, sags, or orange peel.",
    maxScore: 2
  },
  {
    id: "ent_c5_37",
    number: 37,
    title: "Digital Dry Film Thickness (DFT) Gauge",
    category: "ent_coating",
    categoryLabel: "Enterprise Cat 5: Surface Prep",
    tier: "enterprise",
    description: "Digital magnetic/eddy-current DFT gauge calibrated against precision shim foils.",
    testInstruction: "Calibrate gauge on zero substrate and measure paint coating thickness across 5 spot checks.",
    passStandard: "Gauge accurate within +/- 2 um; readings verify specified paint thickness (e.g. >= 120 um).",
    maxScore: 2
  },

  // Category 6: Plant Governance, Safety & MDR Dossier (38 - 40)
  {
    id: "ent_c6_38",
    number: 38,
    title: "Overhead EOT Crane Proof-Load Certificate",
    category: "ent_governance",
    categoryLabel: "Enterprise Cat 6: Governance",
    tier: "enterprise",
    description: "Overhead EOT crane (>= 5-10 MT) with valid annual Form 11 proof-load test certificate.",
    testInstruction: "Inspect crane wire ropes, hoist brakes, safety latch, and Form 11 test document.",
    passStandard: "Form 11 certificate valid; wire ropes intact with no broken strands or deformed hooks.",
    maxScore: 2
  },
  {
    id: "ent_c6_39",
    number: 39,
    title: "Locked Non-Conformance Quarantine Cage",
    category: "ent_governance",
    categoryLabel: "Enterprise Cat 6: Governance",
    tier: "enterprise",
    description: "Physically segregated, locked 'Red-Tag Quarantine Area' for defective or rejected workpieces.",
    testInstruction: "Inspect locked rejection area and check non-conformance logging register.",
    passStandard: "Dedicated locked cage preventing accidental dispatch of rejected components.",
    maxScore: 2
  },
  {
    id: "ent_c6_40",
    number: 40,
    title: "Manufacturer's Data Report (MDR / Quality Dossier)",
    category: "ent_governance",
    categoryLabel: "Enterprise Cat 6: Governance",
    tier: "enterprise",
    description: "System to compile complete final quality dossier (MTC 3.1, NDT reports, DIR, DFT paint report).",
    testInstruction: "Review a completed client quality dossier from a previous job order.",
    passStandard: "Shop staff able to assemble complete documented MDR dossier for corporate handover.",
    maxScore: 2
  }
];

/**
 * Mathematical Badge Calculation Engine
 * 
 * Rules:
 * 1. Iron: Bare-minimum score >= 20 / 30.
 * 2. Bronze: Full bare-minimum points (30 / 30, meaning all 15 checkpoints scored 2).
 * 3. Silver: Full bare-minimum points (30 / 30) AND Enterprise Category 1 & Category 2 cleared (all items scored 2).
 * 4. Gold: 100% of ALL checkpoints cleared (Bare-Min + all 6 Enterprise categories = 80 / 80).
 * 5. None: Bare-minimum score < 20.
 */
export function evaluateVendorAudit(responses: Record<string, number>): VendorAuditEvaluation {
  let bareMinScore = 0;
  let bareMinMax = 0;
  let enterpriseScore = 0;
  let enterpriseMax = 0;

  const categoryScores: Record<CheckpointCategory, { score: number; max: number }> = {
    bare_minimum: { score: 0, max: 0 },
    ent_raw_material: { score: 0, max: 0 },
    ent_welding: { score: 0, max: 0 },
    ent_ndt: { score: 0, max: 0 },
    ent_machining: { score: 0, max: 0 },
    ent_coating: { score: 0, max: 0 },
    ent_governance: { score: 0, max: 0 }
  };

  let allBareMinFull = true;
  let allEntCat1And2Full = true;
  let allCheckpointsFull = true;

  for (const cp of CHECKPOINTS) {
    const rawVal = responses[cp.id];
    const score = typeof rawVal === "number" ? Math.min(Math.max(rawVal, 0), cp.maxScore) : 0;

    categoryScores[cp.category].score += score;
    categoryScores[cp.category].max += cp.maxScore;

    if (cp.tier === "bare_minimum") {
      bareMinScore += score;
      bareMinMax += cp.maxScore;
      if (score < cp.maxScore) {
        allBareMinFull = false;
      }
    } else {
      enterpriseScore += score;
      enterpriseMax += cp.maxScore;
      if (cp.category === "ent_raw_material" || cp.category === "ent_welding") {
        if (score < cp.maxScore) {
          allEntCat1And2Full = false;
        }
      }
    }

    if (score < cp.maxScore) {
      allCheckpointsFull = false;
    }
  }

  const isBareMinPassed = bareMinScore >= 20;
  const isBareMinFull = allBareMinFull && bareMinScore === bareMinMax;
  const isEntCat1And2Full = isBareMinFull && allEntCat1And2Full;
  const isAllCleared = allCheckpointsFull && (bareMinScore + enterpriseScore) === (bareMinMax + enterpriseMax);

  let badge: VerifiedBadge = "none";
  if (isAllCleared) {
    badge = "gold";
  } else if (isEntCat1And2Full) {
    badge = "silver";
  } else if (isBareMinFull) {
    badge = "bronze";
  } else if (isBareMinPassed) {
    badge = "iron";
  }

  return {
    badge,
    totalScore: bareMinScore + enterpriseScore,
    totalMax: bareMinMax + enterpriseMax,
    bareMinScore,
    bareMinMax,
    enterpriseScore,
    enterpriseMax,
    isBareMinPassed,
    isBareMinFull,
    isEntCat1And2Full,
    isAllCleared,
    categoryScores
  };
}
