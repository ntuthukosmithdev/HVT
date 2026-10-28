"use client";

import { useEffect, useRef } from "react";

// Horizontal drift (in vw) as the band scrolls past. Kept small so every word stays fully on screen.
const DRIFT = 4;

const lines = [
  { text: "Transmission", dir: 1, cls: "text-amber-deep" },
  { text: "Distribution", dir: -1, cls: "text-ink text-right" },
  { text: "Substations", dir: 1, cls: "text-amber-deep" },
];

/**
 * Oversized typography that drifts horizontally as the section scrolls past,
 * adapted from the reference's kinetic title band. Static under reduced motion.
 */
export function KineticBand() {
  const ref = useRef<HTMLElement>(null);
  const rows = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the band enters from below, +1 when it leaves at the top
      const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
      rows.current.forEach((row, i) => {
        if (row) row.style.transform = `translate3d(${p * lines[i].dir * DRIFT}vw,0,0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={ref} aria-label="Transmission, distribution and substations" className="relative overflow-hidden py-20 md:py-28">
      <div aria-hidden="true" className="select-none">
        {lines.map((l, i) => (
          <span
            key={l.text}
            ref={(n) => {
              rows.current[i] = n;
            }}
            className={`block whitespace-nowrap px-[5%] font-display text-[11vw] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] will-change-transform ${l.cls}`}
          >
            {l.text}
          </span>
        ))}
      </div>
    </section>
  );
}
