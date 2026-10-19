import { images, type SiteImage } from "./images";

/**
 * Service content.
 *
 * Titles follow the service list on hvt.co.za/home/. Descriptions and lists are
 * taken from the matching service pages on hvt.co.za, lightly edited for
 * grammar only. Nothing here claims that HVT manufactures equipment: HVT
 * describes itself as a supplier, installer and agent of international OEMs.
 */

export type ServiceGroup = { title: string; items: string[] };

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  intro: string[];
  groups: ServiceGroup[];
  highlights?: string[];
  highlightsTitle?: string;
  note?: string;
  image: SiteImage;
  gallery: SiteImage[];
  /** Official pages this content was taken from (for maintainers; not rendered) */
  sourceUrls: string[];
};

export const services: Service[] = [
  {
    slug: "reactive-power-facts-hvdc",
    number: "01",
    title: "Reactive Power, FACTS & HVDC",
    shortTitle: "Reactive Power",
    category: "Transmission",
    summary:
      "Reactive power compensation, FACTS, HVDC and power quality solutions, from capacitor banks and reactors to SVCs and StatComs.",
    intro: [
      "The RPC, FACTS & HVDC division provides a comprehensive range of solutions in Reactive Power Compensation (RPC), Flexible AC Transmission Systems (FACTS), High Voltage Direct Current (HVDC) and Power Quality.",
      "Reactive power compensation projects help customers improve the technical reliability and economics of their transmission and distribution systems.",
    ],
    highlightsTitle: "Track record, as published by HVT",
    highlights: [
      "Over 600 reactive power projects completed, from 3.3kV to 765kV",
      "Over 95% of Eskom high-voltage shunt capacitor banks supplied",
      "Apollo 533kV HVDC valves and control & protection installed",
      "Series compensation up to 765kV installed and project managed",
      "African experience in Mauritius, Botswana, Swaziland, Mozambique, Namibia, Zambia, Zimbabwe, Tanzania, Kenya, Uganda, Nigeria, Ghana and Benin",
    ],
    groups: [
      {
        title: "Capacitor banks",
        items: [
          "Shunt capacitor banks for power factor correction (PFC)",
          "Shunt and series capacitor banks for transmission systems",
          "Complex harmonic filters",
          "Overhead line compensation systems",
        ],
      },
      {
        title: "Reactors & systems",
        items: [
          "Shunt and series reactors: air core, iron core and oil cooled",
          "Dynamic compensation systems",
          "Associated switchgear, bay equipment, control & protection",
          "Monitoring, maintenance and optimisation of existing installations",
        ],
      },
      {
        title: "FACTS & HVDC",
        items: [
          "Static Var Compensators (SVCs)",
          "StatCom (SVGs)",
          "Series Capacitors (SCs)",
          "HVDC primary equipment, control & protection and HVDC Lite (VSC-HVDC)",
        ],
      },
      {
        title: "Power quality & design",
        items: [
          "Voltage regulation and dip mitigation",
          "Harmonic filtering and power quality SCADA",
          "Full design service, including harmonic integration and economic (savings) impact studies",
          "Technical Service Centre integrating solutions from world-class OEMs",
        ],
      },
    ],
    image: images.capacitorBankLift,
    gallery: [images.capacitorBankLift, images.seriesCompensation, images.airCoreReactor],
    sourceUrls: ["https://www.hvt.co.za/rpc-facts-hvdc/"],
  },
  {
    slug: "control-protection-commissioning",
    number: "02",
    title: "Control, Protection & Commissioning",
    shortTitle: "Control & Protection",
    category: "Secondary systems",
    summary:
      "Products and solutions across protection, telecommunication, measurement, automation and control (PTMA&C), through to testing and commissioning.",
    intro: [
      "HVT’s Control and Protection division offers a complete range of products and solutions in the Protection, Telecommunication, Measurement, Automation & Control (PTMA&C) field.",
      "HVT has strengthened the division through partnerships with international OEMs and created a subsidiary, Intelligent African Technologies, which specialises in control and protection.",
    ],
    groups: [
      {
        title: "PTMA&C scope",
        items: ["Protection", "Telecommunication", "Measurement", "Automation & control"],
      },
      {
        title: "Site delivery",
        items: [
          "Control & protection panels",
          "Control & protection cabling",
          "Substation secondary installations",
          "Testing & commissioning",
        ],
      },
    ],
    image: images.controlProtectionPanel,
    gallery: [images.controlProtectionPanel, images.switchgearPanels, images.hvTestCt],
    sourceUrls: ["https://www.hvt.co.za/control-protection/", "https://www.hvt.co.za/substation-lines-services/"],
  },
  {
    slug: "substation-site-services",
    number: "03",
    title: "Substation Site Services",
    shortTitle: "Substation Services",
    category: "Construction",
    summary:
      "Design, supply, construction and installation, from equipment erection to turnkey substation construction and refurbishment up to 765kV.",
    intro: [
      "HVT is one of the largest installation contractors of high-voltage cabling and stringing, tubular busbar projects and substation equipment for substation build and renewal programmes.",
      "Services include the design, supply, construction and installation of substation site services, from equipment installation to turnkey substation construction. Site Services provides skilled labour and project management to help utilities and major project companies build high-voltage substations.",
    ],
    highlightsTitle: "HV-accredited, equipped teams",
    highlights: [
      "8 crews trained and accredited up to 765kV",
      "Supplier to Eskom’s 765kV substation build programme",
      "Each team equipped with supervision, crane trucks, cherry pickers, tools and safety gear",
      "Experienced technical, design and project management team",
      "Full quality, safety and environmental management system",
    ],
    groups: [
      {
        title: "Site services",
        items: [
          "Semi-turnkey substation construction & refurbishment",
          "Substation primary equipment installations",
          "Cabling, stringing, earthing and tubular busbars",
          "Substation secondary installations",
          "Testing & commissioning",
          "Design, installation and commissioning of indoor substations",
        ],
      },
      {
        title: "Specialised services",
        items: [
          "Tavrida breaker and dog box retrofitting, testing and commissioning",
          "Transformer & tap changer maintenance, rigging, specialised testing, installation and commissioning",
          "Indoor and outdoor switchgear installation, maintenance, testing and commissioning",
          "Breakdown services",
        ],
      },
      {
        title: "Structures & busbars",
        items: [
          "Erection of steel structures",
          "Lightning shielding",
          "Tubular and conductor busbars",
          "Stringing of equipment and busbars (droppers & clamps)",
          "Equipment labelling and fencing",
        ],
      },
      {
        title: "Design",
        items: [
          "Distribution and transmission substation design",
          "Equipment specification",
          "Layout and arrangement",
          "Control and protection design",
        ],
      },
    ],
    image: images.groeipuntSteelwork,
    gallery: [images.groeipuntSteelwork, images.bokmakierieGantries, images.groeipuntCrew],
    sourceUrls: ["https://www.hvt.co.za/substation-lines-services/"],
  },
  {
    slug: "substation-equipment",
    number: "04",
    title: "Substation Equipment",
    shortTitle: "Substation Equipment",
    category: "Supply & logistics",
    summary:
      "Supplier and installer of high-voltage substation equipment and logistics, acting as local agent for major international OEMs.",
    intro: [
      "HVT supplies and installs high-voltage substation equipment and logistics for utilities and HV project companies as an agent of major international OEMs.",
      "As local representative, HVT links customers with overseas principal operations and products, providing regional technical support and a regional office facility for the overseas principal.",
    ],
    highlightsTitle: "Liaison between manufacturers and regional customers",
    highlights: [
      "Interpreting customer needs and advising the manufacturer",
      "Assisting with technical specifications to meet local needs",
      "Assisting with, or providing, international and local procurement and logistics",
      "After-sales technical support and advice",
      "Providing manufacturers with local knowledge and market intelligence",
    ],
    groups: [
      {
        title: "Transformers",
        items: [
          "Power transformers, 5–2000 MVA, oil and dry resin type",
          "Instrument transformers, 11kV–800kV: CVTs, CCs and CTs (oil, SF6, dry resin)",
          "Distribution transformers (new and refurbished) up to 1MVA",
          "Skid-mounted and mobile substations/transformers",
        ],
      },
      {
        title: "Switching & reactive",
        items: [
          "Circuit breakers, 11kV–800kV SF6",
          "Disconnectors: pantograph, centre break/rotating, knee type",
          "Capacitors: full film power, surge and test capacitors",
          "Air-cored reactors, 11kV–800kV, and line traps",
        ],
      },
      {
        title: "Busbars & fittings",
        items: [
          "Insulators: porcelain station post and composite line",
          "Aluminium tube busbars and fittings",
          "Line fittings: aluminium clamps, terminals and line hardware",
          "Switchgear and mini substations",
        ],
      },
    ],
    image: images.substationEquipment,
    gallery: [images.substationEquipment, images.airCoreReactor, images.bokmakierieYard],
    sourceUrls: ["https://www.hvt.co.za/substation-equipment/"],
  },
  {
    slug: "civil-works-electrification",
    number: "05",
    title: "Civil Works & Electrification",
    shortTitle: "Civil & Electrification",
    category: "Civil & earthing",
    summary:
      "Bulk earthworks, foundations, control rooms, earthing systems and overhead lines from 11kV to 132kV for substation projects.",
    intro: [
      "HVT’s civil and earthworks teams prepare and complete the substation platform, from bulk earthworks and drainage to reinforced concrete, control rooms and yard finishes.",
      "Earthing systems and electrification work, including 11–132kV overhead lines, are delivered alongside the civil scope.",
    ],
    groups: [
      {
        title: "Civil & earthwork",
        items: [
          "Bulk earthworks, excavation and grading",
          "Drainage layout and drainage",
          "Shuttering and reinforced concrete",
          "Building of control rooms",
          "Paving, kerbing and cable racking",
          "Vegetation control, yard stoning, safety & security fencing, notices and signs",
        ],
      },
      {
        title: "Earthing systems",
        items: [
          "Trenching and installation of earthmats",
          "Earth rods",
          "Jointing (Exo-weld and Silbra-Alloy)",
          "Earth resistance testing",
        ],
      },
      {
        title: "Lines & electrification",
        items: ["11–132kV overhead lines", "Primary and secondary cabling"],
      },
    ],
    note: "HVT lists “Electrification” as a service. The scope above is drawn from its civil, earthing and site-services pages.",
    image: images.civilFoundations,
    gallery: [images.civilFoundations, images.civilCompaction, images.overheadLine],
    sourceUrls: [
      "https://www.hvt.co.za/civil-earthwork/",
      "https://www.hvt.co.za/earthing-systems/",
      "https://www.hvt.co.za/substation-lines-services/",
    ],
  },
  {
    slug: "renewable-energy",
    number: "06",
    title: "Renewable Energy",
    shortTitle: "Renewable Energy",
    category: "Renewables",
    summary:
      "Balance-of-plant, substation design and maintenance, full O&M and HV/MV design, supply and installation for renewable energy plants.",
    intro: [
      "High Voltage Technology primarily uses its subsidiary, Electrovaya Construction, for renewable energy projects.",
      "Electrovaya’s primary involvement is providing electrical engineering services to the power industry. Together with the Group’s experience, it is driving into the renewable energy sector to become a full value-chain service and solutions provider.",
    ],
    groups: [
      {
        title: "Renewable services",
        items: [
          "Sub-EPC balance-of-plant contractor",
          "Substation design",
          "Substation maintenance",
          "Full O&M for renewable energy plants",
          "HV/MV design, supply and installation",
        ],
      },
    ],
    image: images.groeipuntCrane,
    gallery: [images.groeipuntCrane, images.groeipuntSite, images.groeipuntAerial],
    sourceUrls: ["https://www.hvt.co.za/renewable-energy/"],
  },
  {
    slug: "transformer-field-services",
    number: "07",
    title: "Transformer Field Services",
    shortTitle: "Transformer Services",
    category: "Maintenance",
    summary:
      "High-voltage testing, oil leak repairs, rigging, tap changer maintenance and oil purification, with 24/7 breakdown support.",
    intro: [
      "HVT carries out high-voltage tests on Eskom transformers at power stations, transmission stations and distribution stations, as well as for large municipalities and the private sector.",
      "Field teams provide turnkey transformer maintenance and a 24/7 breakdown service.",
    ],
    groups: [
      {
        title: "High-voltage testing",
        items: [
          "5/10kV insulation (Megger) and polarisation index tests",
          "Impedance (copper loss) and magnetisation (iron loss) tests",
          "Full winding ratio (all taps) and vector polarity tests",
          "Bushing and winding tan delta / capacitance tests",
          "Sweep frequency response analysis (SFRA)",
          "Winding DC resistance, zero phase sequence, CT and tap changer diverter continuity tests",
          "Protection cold and final commissioning tests",
        ],
      },
      {
        title: "Oil leaks maintenance",
        items: [
          "Complete transformer re-gasketing",
          "Oil leaks on main covers, bushings and gauge glasses",
          "Silica gel and breather replacement",
          "Corrosion treatment and spray painting",
        ],
      },
      {
        title: "Rigging & tap changers",
        items: [
          "Transformer removal, installation and commissioning up to 1000MVA",
          "Maintenance on all types of tap changers",
          "Contact change, oil change and testing",
        ],
      },
      {
        title: "Oil purification",
        items: [
          "7000-litre oil purification plant",
          "Cold and hot oil circulation",
          "Vacuum drawing, water content and kV testing",
          "Oil transport",
        ],
      },
    ],
    image: images.hvTestSfra,
    gallery: [images.hvTestSfra, images.hvTestCt],
    sourceUrls: [
      "https://www.hvt.co.za/transformer-field-services/",
      "https://www.hvt.co.za/high-voltage-testing/",
      "https://www.hvt.co.za/oil-leaks-maintenance/",
      "https://www.hvt.co.za/rigging/",
      "https://www.hvt.co.za/tap-changers/",
      "https://www.hvt.co.za/oil-purification/",
    ],
  },
  {
    slug: "switchgear-transformers-mini-substations",
    number: "08",
    title: "Switchgear, Transformers & Mini Substations",
    shortTitle: "Switchgear & Mini Subs",
    category: "Distribution",
    summary:
      "Switchgear installation, maintenance, testing and commissioning, plus supply of distribution transformers, mini substations and mobile mini substations.",
    intro: [
      "HVT installs, maintains, tests and commissions indoor and outdoor switchgear, covering both oil-filled and SF6 circuit breakers.",
      "Through its OEM relationships, HVT also supplies switchgear, distribution transformers, mini substations and skid-mounted or mobile substations and transformers.",
    ],
    groups: [
      {
        title: "Circuit breaker maintenance",
        items: [
          "Oil-filled breakers: annual inspections, periodic maintenance and major overhauls",
          "SF6 breakers: condition monitoring, annual inspections, periodic maintenance and major overhauls",
        ],
      },
      {
        title: "Testing & commissioning",
        items: [
          "Speed and timing tests",
          "Contact resistance",
          "SF6 percentage, dew point and acidity tests",
          "SF6 leak detection",
        ],
      },
      {
        title: "Supply",
        items: [
          "MV and HV switchgear",
          "Distribution transformers (new and refurbished) up to 1MVA",
          "Mini substations",
          "Mobile mini substations",
        ],
      },
    ],
    image: images.switchgearLineUp,
    gallery: [images.switchgearLineUp, images.switchgearPanels],
    sourceUrls: ["https://www.hvt.co.za/switchgear/", "https://www.hvt.co.za/substation-equipment/"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
