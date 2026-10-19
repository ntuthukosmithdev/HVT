"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { mainNav } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "./Logo";
import { MenuOverlay } from "./MenuOverlay";
import { ButtonLink } from "@/components/ui/Button";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const servicesRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Sticky behaviour: header rests in the page flow, then returns as a compact
  // frosted bar when the visitor scrolls back up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 140);
      setHidden(y > 400 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the dropdown and menu on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setServicesOpen(false);
    setMenuOpen(false);
  }

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 180);
  };

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-ink px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {/* Spacer keeps layout stable when the bar becomes fixed */}
      <div className="h-[4.75rem] lg:h-[6rem]" aria-hidden="true" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-out-circ)] ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-page/80 shadow-[0_10px_40px_-20px_rgb(8_19_33/0.35)] backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div
          className={`mx-auto flex w-full items-center gap-6 px-[4%] transition-[height] duration-500 lg:px-[2%] ${
            scrolled ? "h-[4.25rem] lg:h-[4.75rem]" : "h-[4.75rem] lg:h-[6rem]"
          }`}
        >
          <Logo priority className={`w-auto transition-[height] duration-500 ${scrolled ? "h-9 lg:h-10" : "h-10 lg:h-12"}`} />

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="group ml-auto inline-flex h-11 items-center gap-3 rounded-full bg-ink pl-4 pr-5 font-display text-sm font-bold text-white transition-[transform,box-shadow,background-color] duration-500 ease-[var(--ease-out-circ)] hover:-translate-x-px hover:-translate-y-px hover:bg-navy-800 hover:shadow-[18px_18px_20px_-16px_rgb(8_19_33/0.6)] lg:order-none lg:ml-6"
          >
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
              <span className="h-[2px] w-full rounded bg-amber" />
              <span className="h-[2px] w-3/4 rounded bg-amber transition-[width] duration-500 group-hover:w-full" />
              <span className="h-[2px] w-1/2 rounded bg-amber transition-[width] duration-500 group-hover:w-full" />
            </span>
            Menu
          </button>

          <nav aria-label="Main" className="mr-auto hidden lg:block">
            <ul className="flex items-center">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                if (item.href === "/services") {
                  return (
                    <li
                      key={item.href}
                      ref={servicesRef}
                      className="relative flex items-center"
                      onMouseEnter={openServices}
                      onMouseLeave={scheduleClose}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`relative py-2 pl-4 pr-1 font-display text-[0.95rem] font-bold transition-colors ${
                          active ? "text-ink" : "text-navy-700 hover:text-ink"
                        }`}
                      >
                        {item.label}
                        {active && <ActiveBar />}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="services-menu"
                        aria-label="Show services"
                        onClick={() => setServicesOpen((v) => !v)}
                        className="rounded-full p-1.5 text-navy-700 hover:text-ink"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <ServicesPanel open={servicesOpen} />
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block px-4 py-2 font-display text-[0.95rem] font-bold transition-colors ${
                        active ? "text-ink" : "text-navy-700 hover:text-ink"
                      }`}
                    >
                      {item.label}
                      {active && <ActiveBar />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <ButtonLink href="/contact" variant="dark" className="!min-h-12 !text-[0.9rem]">
              Discuss a Project
            </ButtonLink>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}

function ActiveBar() {
  return <span className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded bg-amber" aria-hidden="true" />;
}

function ServicesPanel({ open }: { open: boolean }) {
  return (
    <div
      id="services-menu"
      className={`fixed left-1/2 top-[5.25rem] w-[min(92vw,72rem)] -translate-x-1/2 transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-out-circ)] ${
        open ? "visible translate-y-0 opacity-100" : "invisible translate-y-4 opacity-0"
      }`}
    >
      <div className="rounded-[1.75rem] border border-navy-line bg-navy-900 p-6 text-white shadow-[0_30px_60px_10px_rgb(8_19_33/0.3)]">
        <div className="mb-5 flex items-end justify-between gap-6 px-2">
          <p className="eyebrow text-amber">Our services</p>
          <Link href="/services" className="link-underline text-sm font-semibold text-white/80 hover:text-white">
            View all services
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex h-full flex-col gap-1 rounded-2xl border border-navy-line px-5 py-4 pr-11 transition-colors duration-300 hover:border-amber/60 hover:bg-navy-800"
              >
                <span className="font-display text-xs font-bold text-amber">{s.number}.</span>
                <span className="font-display text-[0.95rem] font-semibold leading-snug">{s.title}</span>
                <span className="text-xs text-white/55">{s.category}</span>
                <ArrowUpRight
                  size={18}
                  className="absolute right-4 top-4 text-white/40 transition-[transform,color] duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
