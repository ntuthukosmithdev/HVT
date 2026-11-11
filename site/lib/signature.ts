import { company } from "./site";

/**
 * Builds the official HVT email signature.
 *
 * The HTML is email-safe: nested tables, inline styles, web-safe fonts and an
 * absolute image URL, because Gmail and Outlook strip <style> blocks and don't
 * display embedded (data:) images in signatures.
 */

export type SignatureDetails = {
  name: string;
  title: string;
  dept: string;
  email: string;
  mobile: string;
  direct: string;
  address: boolean;
  legal: boolean;
  disclaimer: boolean;
};

/** Always the production domain: signatures live on in sent mail long after they're copied. */
export const SIGNATURE_ASSET_BASE = "https://www.hvt.co.za";
const LOGO_PATH = "/brand/email/hvt-logo-email.png";
const ISO_PATH = "/brand/email/iso-9001-dqs.png";

/** The "What we do" band, as supplied by HVT. */
export const SIGNATURE_SERVICES = [
  "Reactive Power, FACTS and HVDC",
  "Control, Protection and Commissioning",
  "Electrification and Renewable Energy",
  "Substation and Line Services",
  "Transformer Field Services",
  "Substation & OH Lines Equipment Supply & Installation",
];

const SITE = "www.hvt.co.za";
const ADDRESS = "128 Belvedere Road, Glen Austin, Midrand, Gauteng, South Africa";
const LEGAL = `${company.legalName} · Reg. no. ${company.registrationNumber}`;
const DISCLAIMER =
  "This email and any attachments are confidential and intended only for the addressee. If you have received it in error, please tell the sender and delete it. High Voltage Technology SA (Pty) Ltd processes personal information in line with the Protection of Personal Information Act (POPIA).";
const C = { ink: "#171B20", text: "#3B4450", muted: "#6B7685", faint: "#8A94A0", amber: "#F07800", amberInk: "#9A4A00" };

export const EXAMPLE_DETAILS: SignatureDetails = {
  name: "Firstname Lastname",
  title: "Job Title",
  dept: "Department",
  email: "firstname.lastname@hvt.co.za",
  mobile: "+27 (0)82 000 0000",
  direct: "",
  address: true,
  legal: true,
  disclaimer: true,
};

export const EMPTY_DETAILS: SignatureDetails = {
  name: "",
  title: "",
  dept: "",
  email: "",
  mobile: "",
  direct: "",
  address: true,
  legal: true,
  disclaimer: true,
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const telHref = (s: string) => "tel:" + s.replace(/\(0\)/g, "").replace(/[^\d+]/g, "");

export const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

function contactRow(label: string, value: string, href: string) {
  return `<tr><td style="padding:1px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:17px;color:${C.text};white-space:nowrap;"><span style="color:${C.amberInk};font-weight:bold;">${label}</span>&nbsp;&nbsp;<a href="${esc(href)}" style="color:${C.text};text-decoration:none;">${esc(value)}</a></td></tr>`;
}

/**
 * @param assetBase where the images load from: the production domain for the copied
 * signature, or "" (same site) for the on-page preview.
 */
export function buildSignatureHtml(d: SignatureDetails, assetBase: string = SIGNATURE_ASSET_BASE) {
  const phone = d.direct || company.contact.phone;
  const role = [d.title, d.dept].filter(Boolean).map(esc).join(" &nbsp;|&nbsp; ");
  const rows = [contactRow("T", phone, telHref(phone))];
  if (d.mobile) rows.push(contactRow("M", d.mobile, telHref(d.mobile)));
  if (d.email) rows.push(contactRow("E", d.email, `mailto:${d.email}`));
  rows.push(contactRow("W", SITE, `https://${SITE}`));

  const address = d.address
    ? `<tr><td style="padding:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:15px;color:${C.muted};">${esc(ADDRESS)}</td></tr>`
    : "";
  const legal = d.legal
    ? `<tr><td colspan="3" style="padding:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:14px;color:${C.muted};">${esc(LEGAL)}</td></tr>`
    : "";
  const disclaimer = d.disclaimer
    ? `<tr><td colspan="3" style="padding:${d.legal ? 4 : 12}px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:13px;color:${C.faint};max-width:560px;">${esc(DISCLAIMER)}</td></tr>`
    : "";
  // Dark band with amber rule: bgcolor attribute as well as CSS so Outlook paints it too.
  const services = SIGNATURE_SERVICES.map((s) => `<span style="white-space:nowrap;">${esc(s)}</span>`).join(
    `<span style="color:${C.amber};">&nbsp;&nbsp;|&nbsp;&nbsp;</span>`,
  );
  const servicesBand = `<tr><td colspan="3" style="padding:14px 0 0;">
<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" bgcolor="${C.ink}" style="border-collapse:collapse;background-color:${C.ink};border-top:3px solid ${C.amber};">
<tr>
<td style="padding:9px 0 9px 14px;vertical-align:top;white-space:nowrap;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:17px;font-weight:bold;letter-spacing:1.5px;color:${C.amber};">WHAT WE DO</td>
<td style="padding:9px 14px 9px 12px;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:17px;font-weight:bold;color:#FFFFFF;">${services}</td>
</tr>
</table>
</td></tr>`;
  const roleRow = role
    ? `<tr><td style="padding:2px 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;font-weight:bold;color:${C.amberInk};">${role}</td></tr>`
    : `<tr><td style="padding:0 0 8px;font-size:1px;line-height:1px;">&nbsp;</td></tr>`;

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;font-family:Arial,Helvetica,sans-serif;max-width:620px;">
<tr>
<td style="padding:2px 18px 0 0;vertical-align:top;border-right:2px solid ${C.amber};"><a href="https://${SITE}" style="text-decoration:none;"><img src="${assetBase}${LOGO_PATH}" width="150" height="52" alt="HVT High Voltage Technology" style="display:block;border:0;outline:none;width:150px;height:52px;"></a></td>
<td style="padding:0 18px 0 18px;vertical-align:top;">
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
<tr><td style="padding:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:20px;font-weight:bold;color:${C.ink};">${esc(d.name || "Your name")}</td></tr>
${roleRow}
${rows.join("\n")}
${address}
</table>
</td>
<td style="padding:2px 0 0;vertical-align:top;" align="right"><img src="${assetBase}${ISO_PATH}" width="63" height="52" alt="ISO 9001 Quality Management (DQS)" style="display:block;border:0;outline:none;width:63px;height:52px;"></td>
</tr>
${servicesBand}
${legal}
${disclaimer}
</table>`;
}

export function buildSignatureText(d: SignatureDetails) {
  const lines = [d.name || "Your name"];
  const role = [d.title, d.dept].filter(Boolean).join(" | ");
  if (role) lines.push(role);
  lines.push("HVT | High Voltage Technology", "");
  lines.push(`T  ${d.direct || company.contact.phone}`);
  if (d.mobile) lines.push(`M  ${d.mobile}`);
  if (d.email) lines.push(`E  ${d.email}`);
  lines.push(`W  ${SITE}`);
  lines.push("", `What we do: ${SIGNATURE_SERVICES.join(" | ")}`);
  return lines.join("\n");
}
