import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, addressLine, mainNav, secondaryNav } from "@/lib/site";
import { services } from "@/lib/services";
import { ButtonLink } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="mt-[2vw] bg-navy-950 text-white">
      <div className="container-x pb-10 pt-14 md:pt-20">
        {/* Row 1: pill navigation bar, the reference's footer signature */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Footer" className="rounded-[1.25rem] border border-white/12 px-2 lg:rounded-full lg:px-6">
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:flex">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-4 font-display text-[0.95rem] font-semibold text-white/80 transition-[color,padding] duration-500 hover:text-amber lg:py-6 lg:hover:px-6"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href="/contact" variant="primary">
            Discuss a Project
          </ButtonLink>
        </div>

        {/* Row 2: brand, services, contact */}
        <div className="mt-14 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/hvt-logo-white.svg"
              alt="HVT High Voltage Technology"
              width={674}
              height={222}
              className="h-14 w-auto"
              unoptimized
            />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/65">
              {company.legalName} provides “Can do” solutions for tough problems in the electricity transmission and
              distribution industry across Southern Africa.
            </p>
            <dl className="mt-6 flex flex-wrap gap-2 text-xs">
              {Object.values(company.credentials).map((c) => (
                <div key={c.short} className="rounded-full border border-white/15 px-3 py-1.5">
                  <dt className="sr-only">{c.detail}</dt>
                  <dd className="font-semibold text-white/80">{c.short}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="eyebrow mb-5 text-amber">Services</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="link-underline text-white/70 hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-amber">Contact</p>
            <ul className="space-y-4 text-[0.95rem]">
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
                <span>
                  <a href={company.contact.phoneHref} className="link-underline font-semibold">
                    {company.contact.phone}
                  </a>
                  <span className="block text-sm text-white/50">Fax {company.contact.fax}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
                <a href={company.contact.emailHref} className="link-underline font-semibold">
                  {company.contact.email}
                </a>
              </li>
              <li className="flex gap-3 text-white/70">
                <MapPin size={18} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
                <address className="not-italic">
                  <span className="block font-semibold text-white">Head office</span>
                  {addressLine}
                  <span className="mt-2 block text-sm text-white/50">Postal: {company.contact.postal}</span>
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. Reg. no. {company.registrationNumber} · VAT no.{" "}
            {company.vatNumber}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {secondaryNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
