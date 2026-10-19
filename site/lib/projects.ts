import { images, type SiteImage } from "./images";

/**
 * Projects published by HVT on hvt.co.za.
 *
 * Only facts HVT itself has published are included. When HVT has not published
 * a fact (scope, client, location, dates), the field is left out rather than
 * inferred.
 */

export type ProjectFact = { label: string; value: string };

export type Project = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  body: string[];
  facts: ProjectFact[];
  image: SiteImage;
  gallery: SiteImage[];
  /** Official page this content was taken from (for maintainers; not rendered) */
  sourceUrl: string;
  external?: { label: string; href: string };
  /** Shown on the page so readers know what HVT has and hasn't published */
  disclosure?: string;
};

export const projects: Project[] = [
  {
    slug: "groeipunt-substation",
    title: "Groeipunt Substation",
    type: "220kV transmission substation · Renewable grid connection",
    summary:
      "The first 220kV transmission substation that a renewable energy project will connect on to the Eskom transmission grid.",
    body: [
      "Groeipunt Substation is the first 220kV transmission substation that a renewable energy project will connect on to the Eskom transmission grid.",
      "It forms part of the network upgrades to accommodate the Kangnas wind farm onto the Eskom network.",
    ],
    facts: [
      { label: "Voltage", value: "220kV" },
      { label: "Purpose", value: "Network upgrade for the Kangnas wind farm" },
      { label: "Grid", value: "Eskom transmission network" },
    ],
    image: images.groeipuntSteelwork,
    gallery: [
      images.groeipuntSteelwork,
      images.groeipuntAerial,
      images.groeipuntMast,
      images.groeipuntSite,
      images.groeipuntCrew,
      images.groeipuntCrane,
    ],
    sourceUrl: "https://www.hvt.co.za/groeipunt-substation/",
    disclosure: "HVT’s detailed scope, contract dates and location for this project are not published.",
  },
  {
    slug: "bokmakierie-substation",
    title: "Bokmakierie Substation",
    type: "Substation construction",
    summary:
      "A substation project documented in HVT’s project gallery, from platform civils and foundations to steel structures, equipment and the completed yard.",
    body: [
      "HVT’s Bokmakierie Substation gallery records the project from bulk earthworks and compaction, through foundations, steel structures and gantries, to equipment installation, the control building and the completed, fenced yard.",
    ],
    facts: [
      { label: "Project type", value: "Substation" },
      { label: "Documented stages", value: "Civils, structures, equipment, completed yard" },
    ],
    image: images.bokmakierieGantries,
    gallery: [
      images.bokmakierieAerial,
      images.bokmakierieGantries,
      images.civilCompaction,
      images.civilFoundations,
      images.substationEquipment,
      images.airCoreReactor,
      images.controlRoom,
      images.bokmakierieYard,
    ],
    sourceUrl: "https://www.hvt.co.za/bokmakierie-substation/",
    disclosure: "HVT publishes photographs of this project only. The client, location, voltage and dates are not published.",
  },
  {
    slug: "mount-edgecombe-interchange",
    title: "Mount Edgecombe Interchange, N2",
    type: "Infrastructure lighting",
    summary:
      "HVT lighting up the longest bridge in South Africa: the Mount Edgecombe Interchange on the N2 in KwaZulu-Natal.",
    body: [
      "HVT published this project as “HVT lighting up the longest bridge in South Africa, Mount Edgecombe Interchange on the N2.”",
      "The award-winning Mt. Edgecombe Interchange is a vital artery of the greater eThekwini Metropolitan highway system. The R1.4 billion, four-level interchange was completed in July 2018 and officially launched on 30 October 2018, adding to the iconic bridge structures undertaken in KwaZulu-Natal by the South African National Roads Agency Limited (SANRAL).",
    ],
    facts: [
      { label: "Location", value: "N2, eThekwini, KwaZulu-Natal" },
      { label: "Infrastructure owner", value: "SANRAL" },
      { label: "Interchange completed", value: "July 2018" },
    ],
    image: images.mountEdgecombeAerial,
    gallery: [images.mountEdgecombeAerial, images.mountEdgecombeNight],
    sourceUrl: "https://www.hvt.co.za/mount-edgecombe/",
    disclosure: "HVT’s published description refers to lighting the interchange. Its detailed scope is not published.",
  },
  {
    slug: "kaalfontein-containers",
    title: "Kaalfontein Containers",
    type: "Community electrification",
    summary: "Electrical wiring and connecting power to seniors in Kaalfontein.",
    body: [
      "As part of its social development work, HVT carried out electrical wiring and connected power to container homes for seniors in Kaalfontein.",
    ],
    facts: [
      { label: "Scope", value: "Electrical wiring and power connection" },
      { label: "Beneficiaries", value: "Seniors in Kaalfontein" },
      { label: "Programme", value: "HVT social development" },
    ],
    image: images.kaalfontein,
    gallery: [images.kaalfontein, images.kaalfontein2],
    sourceUrl: "https://www.hvt.co.za/social-development/",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
