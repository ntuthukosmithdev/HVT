"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import {
  enquiryMailto,
  limits,
  normaliseEnquiry,
  serviceOptions,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryInput,
} from "@/lib/enquiry";
import { company } from "@/lib/site";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "failed"; reason: "not_configured" | "delivery_failed" | "rate_limited" | "network" | "unknown"; input: EnquiryInput };

const failureCopy: Record<Exclude<Status, { kind: "idle" | "submitting" | "sent" }>["reason"], string> = {
  not_configured:
    "Online enquiries are not connected yet, so your message has not been sent. Please email or call HVT directly. Your details can be copied into an email below.",
  delivery_failed: "We could not deliver your enquiry just now, so it has not been sent. Please try again, or email or call HVT directly.",
  rate_limited: "Too many enquiries have been sent from this connection. Please wait a few minutes, or email or call HVT directly.",
  network: "Your enquiry could not be sent because of a connection problem. Please check your connection and try again.",
  unknown: "Something went wrong and your enquiry has not been sent. Please email or call HVT directly.",
};

const inputCls =
  "w-full rounded-2xl border bg-white px-4 py-3.5 text-[0.98rem] text-ink placeholder:text-slate/70 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-4 focus:ring-amber/25";

function Label({ name, children, optional }: { name: EnquiryField; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={`enquiry-${name}`} className="mb-2 block text-sm font-semibold text-ink">
      {children} {optional && <span className="font-normal text-slate">(optional)</span>}
    </label>
  );
}

function Err({ name, errors }: { name: EnquiryField; errors: EnquiryErrors }) {
  if (!errors[name]) return null;
  return (
    <p id={`enquiry-${name}-error`} className="mt-2 text-sm font-medium text-red-700">
      {errors[name]}
    </p>
  );
}

export function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const read = (): EnquiryInput => {
    const fd = new FormData(formRef.current!);
    return normaliseEnquiry(Object.fromEntries(fd.entries()));
  };

  const revalidate = () => {
    if (touched) setErrors(validateEnquiry(read()));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    const input = read();
    const found = validateEnquiry(input);
    setErrors(found);
    const first = Object.keys(found)[0] as EnquiryField | undefined;
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    const website = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: EnquiryErrors };
      if (res.ok && data.ok) {
        setStatus({ kind: "sent" });
        formRef.current?.reset();
        setTouched(false);
      } else if (res.status === 422 && data.fields) {
        setErrors(data.fields);
        setStatus({ kind: "idle" });
      } else {
        const reason =
          data.error === "not_configured" || data.error === "delivery_failed" || data.error === "rate_limited"
            ? data.error
            : "unknown";
        setStatus({ kind: "failed", reason, input });
      }
    } catch {
      setStatus({ kind: "failed", reason: "network", input });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field = (name: EnquiryField) => ({
    id: `enquiry-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `enquiry-${name}-error` : undefined,
    className: `${inputCls} ${errors[name] ? "border-red-600" : "border-line hover:border-slate-300 focus:border-amber-deep"}`,
  });

  if (status.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[1.5rem] bg-white p-8 md:p-10">
        <CheckCircle2 size={40} className="text-green-700" aria-hidden="true" />
        <h3 className="mt-5 text-[1.6rem] font-semibold">Thank you. Your enquiry has been sent.</h3>
        <p className="mt-3 text-ink/70">
          HVT has received your project details and will respond by email or phone. For anything urgent, call{" "}
          <a href={company.contact.phoneHref} className="font-semibold underline">
            {company.contact.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 text-sm font-semibold text-amber-ink underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onBlur={revalidate}
      noValidate
      aria-label="Project enquiry"
      className="relative rounded-[1.5rem] border border-white/70 bg-white/55 p-5 backdrop-blur md:p-8"
    >
      {status.kind === "failed" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 rounded-2xl border border-amber-deep/40 bg-amber-soft p-5 text-[0.95rem]"
        >
          <p className="flex gap-3 font-semibold text-ink">
            <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-ink" aria-hidden="true" />
            {failureCopy[status.reason]}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 pl-8">
            <a
              href={enquiryMailto(status.input, company.contact.email)}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
            >
              <Mail size={16} aria-hidden="true" /> Email this enquiry
            </a>
            <a
              href={company.contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 text-sm font-semibold hover:border-ink"
            >
              <Phone size={16} aria-hidden="true" /> {company.contact.phone}
            </a>
          </div>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label name="name">Full name</Label>
          <input {...field("name")} type="text" autoComplete="name" maxLength={limits.name} required />
          <Err name="name" errors={errors} />
        </div>
        <div>
          <Label name="company" optional>
            Company
          </Label>
          <input {...field("company")} type="text" autoComplete="organization" maxLength={limits.company} />
          <Err name="company" errors={errors} />
        </div>
        <div>
          <Label name="email">Email address</Label>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" maxLength={limits.email} required />
          <Err name="email" errors={errors} />
        </div>
        <div>
          <Label name="phone">Contact number</Label>
          <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" maxLength={limits.phone} required />
          <Err name="phone" errors={errors} />
        </div>
        <div>
          <Label name="service">Service of interest</Label>
          <select {...field("service")} defaultValue={defaultService ?? ""} required>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Err name="service" errors={errors} />
        </div>
        <div>
          <Label name="location" optional>
            Project location
          </Label>
          <input {...field("location")} type="text" placeholder="e.g. Rustenburg, North West" maxLength={limits.location} />
          <Err name="location" errors={errors} />
        </div>
        <div className="md:col-span-2">
          <Label name="details">Project details</Label>
          <textarea
            {...field("details")}
            rows={5}
            maxLength={limits.details}
            placeholder="Scope, voltage level, timelines and anything else that will help HVT respond."
            required
          />
          <Err name="details" errors={errors} />
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="enquiry-website">Website</label>
        <input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-ink/80">
          <input
            type="checkbox"
            name="consent"
            id="enquiry-consent"
            onChange={revalidate}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "enquiry-consent-error" : undefined}
            className="mt-1 size-4 shrink-0 accent-[var(--color-amber-deep)]"
          />
          <span>
            I agree that HVT may use these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy" className="font-semibold underline underline-offset-2">
              privacy notice
            </Link>
            .
          </span>
        </label>
        <Err name="consent" errors={errors} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary self-start" disabled={status.kind === "submitting"}>
          <span className="btn-label">{status.kind === "submitting" ? "Sending…" : "Send Enquiry"}</span>
          <span className="btn-capsule" aria-hidden="true">
            {status.kind === "submitting" ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
          </span>
        </button>
        <p className="text-xs text-slate">All fields are required unless marked optional.</p>
      </div>
    </form>
  );
}
