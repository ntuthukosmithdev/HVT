import { services } from "./services";

/** Shared by the enquiry form (client) and /api/enquiry (server). */

export const serviceOptions = [...services.map((s) => s.title), "Other / not sure"] as const;

export type EnquiryInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  details: string;
  consent: boolean;
};

export type EnquiryField = keyof EnquiryInput;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const limits = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  location: 160,
  details: 4000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+()\d\s-]{7,20}$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function normaliseEnquiry(raw: Record<string, unknown>): EnquiryInput {
  return {
    name: str(raw.name),
    company: str(raw.company),
    email: str(raw.email),
    phone: str(raw.phone),
    service: str(raw.service),
    location: str(raw.location),
    details: str(raw.details),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (input.name.length < 2) errors.name = "Please enter your full name.";
  else if (input.name.length > limits.name) errors.name = "Name is too long.";

  if (input.company.length > limits.company) errors.company = "Company name is too long.";

  if (!input.email) errors.email = "Please enter your email address.";
  else if (!emailPattern.test(input.email) || input.email.length > limits.email)
    errors.email = "Please enter a valid email address.";

  if (!input.phone) errors.phone = "Please enter a contact number.";
  else if (!phonePattern.test(input.phone)) errors.phone = "Please enter a valid phone number, e.g. +27 11 316 7873.";

  if (!input.service || !(serviceOptions as readonly string[]).includes(input.service))
    errors.service = "Please choose the service you are interested in.";

  if (input.location.length > limits.location) errors.location = "Location is too long.";

  if (input.details.length < 20) errors.details = "Please give a short description of your project (at least 20 characters).";
  else if (input.details.length > limits.details) errors.details = `Please keep project details under ${limits.details} characters.`;

  if (!input.consent) errors.consent = "Please confirm that HVT may use these details to respond to your enquiry.";

  return errors;
}

/** Builds a mailto: link so visitors can still send an enquiry if online delivery is unavailable. */
export function enquiryMailto(input: EnquiryInput, to: string) {
  const subject = `Project enquiry: ${input.service || "General"}${input.company ? ` (${input.company})` : ""}`;
  const body = [
    `Name: ${input.name}`,
    `Company: ${input.company || "-"}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Service: ${input.service}`,
    `Project location: ${input.location || "-"}`,
    "",
    input.details,
  ].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
