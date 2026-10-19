/**
 * Image registry.
 *
 * `source: "hvt"` images were published by HVT on hvt.co.za. Their captions
 * name the gallery they came from, and they are never attributed to a project
 * other than the one HVT published them under.
 *
 * `source: "stock"` images are illustrative only, used under the licence
 * recorded below, and are labelled as such wherever they appear.
 */

export type ImageSource = "hvt" | "stock";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  source: ImageSource;
  /** Where the photo appears on hvt.co.za, or what a stock image shows */
  caption: string;
  credit?: { author: string; licence: string; licenceUrl?: string; url: string };
};

const img = (
  file: string,
  width: number,
  height: number,
  alt: string,
  source: ImageSource,
  caption: string,
  credit?: SiteImage["credit"],
): SiteImage => ({ src: `/images/${file}.jpg`, width, height, alt, source, caption, credit });

export const images = {
  // Illustrative stock (Wikimedia Commons)
  heroSunset: img(
    "hero-transmission-sunset", 2400, 1600,
    "Lattice transmission towers and overhead lines silhouetted against an amber sunset",
    "stock", "Illustrative image: transmission lines at sunset",
    { author: "Kkiefuik", licence: "CC BY 4.0", licenceUrl: "https://creativecommons.org/licenses/by/4.0", url: "https://commons.wikimedia.org/wiki/File:Transmission_Lines_at_Sunset.jpg" },
  ),
  heroSubstation: img(
    "hero-substation-silhouette", 2400, 1800,
    "Outdoor high-voltage substation equipment silhouetted at dusk",
    "stock", "Illustrative image: 110kV substation at dusk",
    { author: "Oest71", licence: "Public domain", url: "https://commons.wikimedia.org/wiki/File:Umspannungswerk_Hoya.jpg" },
  ),
  heroTower: img(
    "hero-tower-dusk", 2400, 1600,
    "A transmission tower and conductors against a deep blue evening sky",
    "stock", "Illustrative image: transmission tower at dusk",
    { author: "Adi Ulici", licence: "CC0 1.0", licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/", url: "https://commons.wikimedia.org/wiki/File:Transmission_tower_at_dusk_(Unsplash).jpg" },
  ),
  gordonia: img(
    "stock-gordonia-substation", 2400, 1607,
    "Eskom's Gordonia substation in the Northern Cape at dusk",
    "stock", "Illustrative image: Gordonia substation, Northern Cape (not an HVT project)",
    { author: "Graeme Williams, Media Club South Africa", licence: "CC BY-SA 2.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0", url: "https://commons.wikimedia.org/wiki/File:Gordonia_substation_ZA_2008.jpg" },
  ),

  // HVT photography: Groeipunt Substation gallery
  groeipuntSteelwork: img(
    "groeipunt-steelwork", 2400, 1350,
    "Galvanised steel lattice structures being erected across the Groeipunt substation platform",
    "hvt", "HVT photograph: Groeipunt Substation",
  ),
  groeipuntSite: img(
    "groeipunt-site", 2400, 1350,
    "Wide view of the Groeipunt substation site with steel structures and site fencing",
    "hvt", "HVT photograph: Groeipunt Substation",
  ),
  groeipuntMast: img(
    "groeipunt-mast-erection", 1600, 2844,
    "A crane lifting a steel mast into position while crew members in PPE guide it",
    "hvt", "HVT photograph: Groeipunt Substation",
  ),
  groeipuntCrew: img(
    "groeipunt-crew", 1600, 2844,
    "Site crew in high-visibility PPE bolting a lattice steel structure",
    "hvt", "HVT photograph: Groeipunt Substation",
  ),
  groeipuntCrane: img(
    "groeipunt-crane", 1600, 2844,
    "A mobile crane erecting a lattice structure at the Groeipunt substation",
    "hvt", "HVT photograph: Groeipunt Substation",
  ),
  groeipuntAerial: img(
    "groeipunt-aerial", 1000, 750,
    "Aerial drone view of the Groeipunt substation under construction in a mountainous, arid landscape",
    "hvt", "HVT photograph: Groeipunt Substation",
  ),

  // HVT photography: Bokmakierie Substation gallery
  bokmakierieAerial: img(
    "bokmakierie-aerial", 1064, 798,
    "Aerial view of the completed Bokmakierie substation yard and control building",
    "hvt", "HVT photograph: Bokmakierie Substation",
  ),
  bokmakierieGantries: img(
    "bokmakierie-gantries", 1064, 709,
    "Rows of substation gantries and lightning masts with a crane working on the busbar structures",
    "hvt", "HVT photograph: Bokmakierie Substation",
  ),
  bokmakierieYard: img(
    "bokmakierie-yard", 1064, 798,
    "A completed, fenced substation yard with control building under a cloudy sky",
    "hvt", "HVT photograph: Bokmakierie Substation",
  ),
  substationEquipment: img(
    "substation-equipment", 1064, 798,
    "High-voltage substation equipment with line traps mounted on top of capacitor voltage transformers",
    "hvt", "HVT photograph: Bokmakierie Substation",
  ),
  airCoreReactor: img(
    "air-core-reactor", 1064, 798,
    "Close-up of an air-core reactor mounted above porcelain insulators",
    "hvt", "HVT photograph: Bokmakierie Substation",
  ),
  civilCompaction: img(
    "civil-compaction", 922, 692,
    "A roller compacting the substation platform while a flagman in PPE keeps watch",
    "hvt", "HVT photograph: Bokmakierie Substation",
  ),
  civilFoundations: img(
    "civil-foundations", 1064, 798,
    "Crew members in overalls and hard hats casting a concrete foundation",
    "hvt", "HVT photograph: Bokmakierie Substation",
  ),
  controlRoom: img(
    "control-room", 922, 692,
    "A face-brick substation control building on a stoned yard",
    "hvt", "HVT photograph: Bokmakierie Substation",
  ),

  // HVT photography: service galleries
  switchgearPanels: img(
    "switchgear-panels", 2000, 1333,
    "A long line-up of medium-voltage switchgear panels inside a building",
    "hvt", "HVT photograph: Control & Protection gallery",
  ),
  controlProtectionPanel: img(
    "control-protection-panel", 1400, 2100,
    "Front view of a switchgear and protection panel with relays and indicators",
    "hvt", "HVT photograph: Control & Protection gallery",
  ),
  switchgearLineUp: img(
    "switchgear-line-up", 2000, 1333,
    "Switchgear panels installed in a row on a new building floor",
    "hvt", "HVT photograph: Control & Protection gallery",
  ),
  capacitorBankLift: img(
    "capacitor-bank-lift", 907, 615,
    "A capacitor bank platform being lifted into position by crane at a substation",
    "hvt", "HVT photograph: Reactive Power gallery",
  ),
  seriesCompensation: img(
    "series-compensation", 1003, 567,
    "An elevated reactive power compensation platform at a transmission substation",
    "hvt", "HVT photograph: Reactive Power gallery",
  ),
  hvTestCt: img(
    "hv-test-ct-analyser", 1662, 1247,
    "A CT analyser test instrument used for transformer and protection testing",
    "hvt", "HVT photograph: High Voltage Testing gallery",
  ),
  hvTestSfra: img(
    "hv-test-sfra", 1662, 1247,
    "A sweep frequency response analyser in its field case",
    "hvt", "HVT photograph: High Voltage Testing gallery",
  ),
  overheadLine: img(
    "overhead-line", 1024, 768,
    "Overhead line poles and conductors crossing open veld",
    "hvt", "HVT photograph: Lines gallery",
  ),

  // HVT photography: Mount Edgecombe
  mountEdgecombeAerial: img(
    "mount-edgecombe-aerial", 1024, 643,
    "Night aerial view of the illuminated Mount Edgecombe Interchange flyover on the N2",
    "hvt", "HVT photograph: Mount Edgecombe Interchange",
  ),
  mountEdgecombeNight: img(
    "mount-edgecombe-night", 1280, 622,
    "The lit Mount Edgecombe flyover deck at night",
    "hvt", "HVT photograph: Mount Edgecombe Interchange",
  ),

  // HVT photography: social development
  migConstruction: img(
    "mig-construction", 1600, 900,
    "HVT representatives with John Mphatsoe of MIG Construction beside sponsored scaffolding equipment",
    "hvt", "HVT photograph: MIG Construction sponsorship",
  ),
  staffHomes: img(
    "staff-home-improvements", 1400, 1400,
    "A collage of completed and in-progress homes from the HVT staff home improvements initiative",
    "hvt", "HVT photograph: Staff Home Improvements",
  ),
  kaalfontein: img(
    "kaalfontein-containers", 960, 1280,
    "A painted container home in Kaalfontein that HVT wired and connected to power",
    "hvt", "HVT photograph: Kaalfontein Containers",
  ),
  kaalfontein2: img(
    "kaalfontein-containers-2", 960, 1280,
    "A row of painted container homes in Kaalfontein",
    "hvt", "HVT photograph: Kaalfontein Containers",
  ),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
