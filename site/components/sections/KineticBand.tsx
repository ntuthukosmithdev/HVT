"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { images } from "@/lib/images";

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
        if (row) row.style.transform = `translate3d(${p * lines[i].dir * 14}vw,0,0)`;
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
            className={`block whitespace-nowrap px-[3%] font-display text-[17vw] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] will-change-transform ${l.cls}`}
          >
            {l.text}
          </span>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 h-[46%] w-[58vw] -translate-x-1/2 -translate-y-1/2 md:h-[62%] md:w-[30vw]">
        <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] shadow-[0_40px_60px_-30px_rgb(8_19_33/0.6)]" data-reveal-image>
          <Image
            src={images.bokmakierieGantries.src}
            alt={images.bokmakierieGantries.alt}
            fill
            sizes="(min-width:768px) 30vw, 58vw"
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-center text-[0.7rem] font-medium text-slate">{images.bokmakierieGantries.caption}</p>
      </div>
    </section>
  );
}
