"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { images } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";

const slides = [images.heroSunset, images.heroSubstation, images.heroTower];
const INTERVAL = 7000;

const quickLinks = [
  { label: "Explore Our Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Quality & Safety", href: "/quality-safety" },
];

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function Hero() {
  const [index, setIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<"playing" | "paused" | null>(null);
  const [hovered, setHovered] = useState(false);

  // Respect reduced motion: no automatic slide changes unless the visitor presses play.
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
  const paused = userChoice ? userChoice === "paused" : reducedMotion;
  const setPaused = (fn: (p: boolean) => boolean) => setUserChoice(fn(paused) ? "paused" : "playing");

  const running = !paused && !hovered;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [running, index]);

  const current = slides[index];

  return (
    <section
      aria-label="Introduction"
      className="inset-card relative isolate flex min-h-[min(88svh,58rem)] flex-col justify-end bg-navy-950 text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background slides */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {slides.map((s, i) => (
          <div key={s.src} className="hero-slide absolute inset-0" data-active={i === index}>
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 0}
              sizes="96vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-navy-900/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/30 via-transparent to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/25 to-transparent" />
      </div>

      {/* Slide progress + pause control (top right) */}
      <div className="absolute right-5 top-5 flex items-center gap-3 md:right-10 md:top-9">
        <div className="hidden items-center gap-2 sm:flex" aria-hidden="true">
          {slides.map((s, i) => (
            <span key={s.src} className="relative h-[2px] w-10 overflow-hidden bg-white/25 md:w-14">
              {i < index && <span className="absolute inset-0 bg-white" />}
              {i === index && (
                <span
                  key={`${index}-${running}`}
                  className={`absolute inset-0 origin-left bg-amber ${running ? "animate-progress" : "scale-x-100"}`}
                  style={{ animationDuration: `${INTERVAL}ms` }}
                />
              )}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="grid size-9 place-items-center rounded-full border border-white/25 bg-navy-950/30 text-white/85 backdrop-blur-sm transition-colors hover:border-amber hover:text-white"
          aria-label={paused ? "Play background slideshow" : "Pause background slideshow"}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>

      <div className="relative px-5 pb-6 pt-28 md:px-10 md:pb-8 lg:px-14 lg:pb-9">
        <p className="eyebrow mb-6 flex items-center gap-3 text-amber" data-reveal>
          <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
          High Voltage Technology SA · Est. 1994
        </p>
        <h1
          className="max-w-[17ch] text-[2.5rem] font-semibold leading-[1.04] sm:text-[3.3rem] md:text-[4.2rem] lg:text-[4.9rem]"
          data-reveal
          style={{ ["--reveal-delay" as string]: "80ms" }}
        >
          Powering the infrastructure <span className="text-white/70">that moves Southern Africa forward.</span>
        </h1>
        <p
          className="mt-6 max-w-[40rem] text-[1.05rem] leading-relaxed text-white/85 md:text-[1.2rem]"
          data-reveal
          style={{ ["--reveal-delay" as string]: "160ms" }}
        >
          High Voltage Technology provides “Can do” solutions for tough problems in the electricity transmission and
          distribution industry,{" "}
          <span className="text-white/65">
            from reactive power and substation construction to control, protection and commissioning.
          </span>
        </p>

        <div
          className="mt-10 flex flex-col-reverse gap-4 md:mt-12 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
          style={{ ["--reveal-delay" as string]: "240ms" }}
        >
          <nav aria-label="Explore HVT" className="glass-dark overflow-hidden rounded-[1.25rem] sm:rounded-full">
            <ul className="grid sm:flex">
              {quickLinks.map((l, i) => (
                <li key={l.href} className={i > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0" : ""}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-5 px-6 py-4 font-display text-[0.95rem] font-semibold transition-[background-color,padding] duration-500 ease-[var(--ease-out-circ)] hover:bg-white/10 sm:py-5 lg:hover:px-8"
                  >
                    {l.label}
                    <span className="rounded-full border border-white/30 px-3 py-1.5 transition-colors group-hover:border-amber group-hover:text-amber">
                      <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href="#enquiry" variant="primary" className="self-start lg:self-auto">
            Discuss Your Project
          </ButtonLink>
        </div>

        <p className="mt-6 text-right text-[0.68rem] text-white/50">
          Illustrative image ·{" "}
          <a href={current.credit?.url} className="link-underline hover:text-white/80" target="_blank" rel="noopener noreferrer">
            {current.credit?.author}, {current.credit?.licence}
          </a>
        </p>
      </div>
    </section>
  );
}
