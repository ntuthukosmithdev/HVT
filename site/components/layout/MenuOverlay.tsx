"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, X } from "lucide-react";
import { company, addressLine } from "@/lib/site";
import { services } from "@/lib/services";
import { images } from "@/lib/images";

const tiles = [
  { label: "About HVT", href: "/about", image: images.bokmakierieAerial },
  { label: "Services", href: "/services", image: images.groeipuntSteelwork },
  { label: "Projects", href: "/projects", image: images.bokmakierieGantries },
  { label: "Quality & Safety", href: "/quality-safety", image: images.groeipuntCrew },
];

type Props = { open: boolean; onClose: () => void; pathname: string };

/** Full-screen navigation panel, opened by the Menu pill at every screen size. */
export function MenuOverlay({ open, onClose, pathname }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      id="site-menu"
      className={`fixed inset-0 z-[60] ${open ? "visible" : "invisible"}`}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        className={`absolute inset-0 bg-navy-950/45 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`absolute inset-x-0 top-0 max-h-dvh overflow-y-auto rounded-b-[1.5rem] bg-mist shadow-2xl transition-transform duration-700 ease-[var(--ease-in-out-circ)] ${
          open ? "translate-y-0" : "-translate-y-[101%]"
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="group flex h-16 w-full items-center justify-center gap-3 rounded-b-[1.5rem] bg-ink font-display text-sm font-bold text-white transition-[height,background-color] duration-500 hover:h-20 hover:bg-navy-800 md:h-20 md:hover:h-24"
        >
          <X size={20} className="text-amber transition-transform duration-500 group-hover:rotate-90" aria-hidden="true" />
          Close menu
        </button>

        <div className="container-x py-8 md:py-10">
          <nav aria-label="Menu">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tiles.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    aria-current={pathname.startsWith(t.href) ? "page" : undefined}
                    className="group relative flex min-h-[9rem] items-end overflow-hidden rounded-[1.25rem] p-5 text-white transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-circ)] hover:-translate-y-1 hover:shadow-[0_24px_30px_-18px_rgb(8_19_33/0.7)] md:min-h-[12rem]"
                  >
                    <Image
                      src={t.image.src}
                      alt=""
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-br from-navy-950/85 via-navy-950/45 to-navy-950/10" />
                    <span className="relative flex w-full items-center justify-between font-display text-lg font-semibold">
                      {t.label}
                      <ArrowUpRight size={20} className="text-amber" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="eyebrow mb-4 text-amber-ink">Services</p>
                <ul className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="inline-flex rounded-full border border-amber/45 bg-amber-soft px-4 py-2 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Social Impact", href: "/social-impact" },
                    { label: "Contact", href: "/contact" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-underline text-navy-700 hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.25rem] border-t-2 border-amber bg-white p-6">
                <p className="eyebrow mb-4 text-amber-ink">Talk to HVT</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <Phone size={18} className="mt-0.5 shrink-0 text-amber-ink" aria-hidden="true" />
                    <a href={company.contact.phoneHref} className="link-underline font-semibold">
                      {company.contact.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0 text-amber-ink" aria-hidden="true" />
                    <a href={company.contact.emailHref} className="link-underline font-semibold">
                      {company.contact.email}
                    </a>
                  </li>
                  <li className="flex gap-3 text-slate">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-amber-ink" aria-hidden="true" />
                    {addressLine}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
