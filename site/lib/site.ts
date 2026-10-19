/**
 * Company facts used across the site.
 *
 * Every value here was taken from https://www.hvt.co.za (crawled 16 October 2026).
 * Where official pages disagree, the most recently updated wording is used and
 * the conflict is recorded in HANDOVER.md for HVT to confirm.
 */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hvt.co.za").replace(/\/$/, "");

export const company = {
  shortName: "HVT",
  name: "High Voltage Technology",
  legalName: "High Voltage Technology SA (Pty) Ltd",
  founded: 1994,
  registrationNumber: "1994/06312/07",
  vatNumber: "4390154096",
  positioning:
    "High Voltage Technology SA (Pty) Ltd (“HVT”) provides “Can do” solutions for tough problems in the electricity transmission & distribution industry.",
  vision: "HVT’s vision is to become a significant Southern African group in the high voltage engineering field.",
  valuesIntro: "HVT delivers superior results for its customers because all staff share the following core values:",
  values: ["Passion for success", "Empower the person", "Eager for competition", "Social conscience"],
  contact: {
    phone: "+27 (0)11 316 7873",
    phoneHref: "tel:+27113167873",
    fax: "+27 (0)11 316 7860",
    email: "info@hvt.co.za",
    emailHref: "mailto:info@hvt.co.za",
    address: {
      street: "128 Belvedere Road",
      suburb: "Glen Austin",
      city: "Midrand",
      province: "Gauteng",
      country: "South Africa",
    },
    postal: "PO Box 8683, Centurion, 0046",
    geo: { lat: -25.958269983547925, lng: 28.16429131534744 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=High+Voltage+Technology+SA+Pty+Ltd%2C+128+Belvedere+Road%2C+Glen+Austin%2C+Midrand",
  },
  credentials: {
    bbbee: { value: "Level 3", short: "BBBEE Level 3", detail: "BBBEE contributor (BYO & BWO)" },
    cidb: { value: "8EP · 7CE", short: "CIDB 8EP · 7CE", detail: "CIDB grading (PE)" },
    iso: { value: "ISO 9001:2015", short: "ISO 9001:2015", detail: "Quality management certification" },
  },
} as const;

export const addressLine = `${company.contact.address.street}, ${company.contact.address.suburb}, ${company.contact.address.city}, ${company.contact.address.province}, ${company.contact.address.country}`;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Quality & Safety", href: "/quality-safety" },
  { label: "Contact", href: "/contact" },
];

export const secondaryNav: NavItem[] = [
  { label: "Social Impact", href: "/social-impact" },
  { label: "Privacy Notice", href: "/privacy" },
  { label: "Image Credits", href: "/image-credits" },
];
