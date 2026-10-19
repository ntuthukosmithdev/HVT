import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { company, addressLine } from "@/lib/site";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

type Props = { headingLevel?: "h1" | "h2"; defaultService?: string };

export function ContactSection({ headingLevel: H = "h2", defaultService }: Props) {
  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="inset-card mt-[2vw] scroll-mt-24 bg-white/45">
      <div className="container-x section-y grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div className="flex flex-col">
          <p className="eyebrow mb-5 flex items-center gap-3 text-amber-ink" data-reveal>
            <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
            Project enquiries
          </p>
          <H id="enquiry-title" className="text-[2rem] font-semibold leading-[1.08] md:text-[2.75rem] lg:text-[3.25rem]" data-reveal>
            Let’s discuss your next <span className="opacity-55">infrastructure project.</span>
          </H>
          <p className="mt-6 max-w-[30rem] text-[1.05rem] leading-relaxed text-ink/70" data-reveal>
            Contact HVT to discuss your high-voltage, medium-voltage or electrical infrastructure requirements.
          </p>

          <ul className="mt-10 grid gap-3" data-reveal>
            <li>
              <a
                href={company.contact.phoneHref}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white/60 p-4 transition-colors hover:border-ink"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-ink text-amber" aria-hidden="true">
                  <Phone size={20} />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate">Telephone</span>
                  <span className="font-display text-lg font-semibold">{company.contact.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={company.contact.emailHref}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white/60 p-4 transition-colors hover:border-ink"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-ink text-amber" aria-hidden="true">
                  <Mail size={20} />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate">Email</span>
                  <span className="font-display text-lg font-semibold">{company.contact.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={company.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white/60 p-4 transition-colors hover:border-ink"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-amber" aria-hidden="true">
                  <MapPin size={20} />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate">
                    Head office <span className="sr-only">(opens Google Maps)</span>
                  </span>
                  <span className="font-semibold leading-snug">{addressLine}</span>
                </span>
              </a>
            </li>
          </ul>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate" data-reveal>
            <Printer size={16} aria-hidden="true" /> Fax {company.contact.fax} · Postal: {company.contact.postal}
          </p>
        </div>

        <div data-reveal>
          <EnquiryForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
