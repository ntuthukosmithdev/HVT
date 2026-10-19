import { NextResponse } from "next/server";
import { normaliseEnquiry, validateEnquiry } from "@/lib/enquiry";

/**
 * Project enquiry endpoint.
 *
 * Delivery uses the Resend email API (https://resend.com) over HTTPS, so no SDK is needed.
 * Required environment variables (see .env.example):
 *   RESEND_API_KEY      API key from Resend
 *   ENQUIRY_FROM_EMAIL  sender on a domain verified in Resend, e.g. "HVT Website <website@hvt.co.za>"
 *   ENQUIRY_TO_EMAIL    recipient inbox (defaults to info@hvt.co.za)
 *
 * When these are missing the endpoint returns 503 and the form tells the visitor
 * plainly that their enquiry was NOT sent, offering email and phone instead.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Honeypot field: real visitors never see or fill it.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: false, error: "rejected" }, { status: 400 });
  }

  const input = normaliseEnquiry(raw);
  const errors = validateEnquiry(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL || "info@hvt.co.za";

  if (!apiKey || !from) {
    console.warn("[enquiry] Email delivery is not configured. Set RESEND_API_KEY and ENQUIRY_FROM_EMAIL.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const text = [
    "New project enquiry from the HVT website",
    "",
    `Name: ${input.name}`,
    `Company: ${input.company || "-"}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Service of interest: ${input.service}`,
    `Project location: ${input.location || "-"}`,
    "",
    "Project details:",
    input.details,
    "",
    `Consent to process details for this enquiry: yes (${new Date().toISOString()})`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `Website enquiry: ${input.service}${input.company ? `, ${input.company}` : ""}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("[enquiry] Delivery failed", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[enquiry] Delivery error", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
