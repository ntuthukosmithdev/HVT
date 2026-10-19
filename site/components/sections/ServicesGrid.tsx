import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { images } from "@/lib/images";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServiceCard({ service, index = 0 }: { service: (typeof services)[number]; index?: number }) {
  return (
    <li data-reveal style={{ ["--reveal-delay" as string]: `${(index % 4) * 70}ms` }} className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col rounded-[1.5rem] border border-navy-line bg-navy-800/40 p-3 pb-[5.25rem] backdrop-blur-md transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-out-circ)] hover:-translate-y-1.5 hover:border-navy-700 hover:bg-navy-800/80 hover:shadow-[0_30px_30px_-12px_rgb(8_19_33/0.9)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem]">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width:1280px) 22vw, (min-width:768px) 45vw, 92vw"
            className="object-cover transition-transform duration-1000 ease-[var(--ease-out-circ)] group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col px-4 pt-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-display text-base font-bold tracking-wide text-amber">{service.number}.</span>
            <span className="rounded-full border border-white/20 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-white/70">
              {service.category}
            </span>
          </div>
          <h3 className="mt-5 text-[1.3rem] font-semibold leading-snug text-white transition-transform duration-500 ease-[var(--ease-out-circ)] group-hover:translate-x-1">
            {service.title}
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65 transition-transform delay-75 duration-500 ease-[var(--ease-out-circ)] group-hover:translate-x-1">
            {service.summary}
          </p>
        </div>
        <span className="absolute inset-x-3 bottom-3 flex h-14 items-center justify-between gap-4 rounded-[1.1rem] bg-gradient-to-r from-amber-deep to-amber px-5 font-display text-sm font-bold text-ink transition-[height] duration-500 ease-[var(--ease-out-circ)] group-hover:h-16">
          Explore Service
          <span className="flex flex-1 items-center justify-end" aria-hidden="true">
            <span className="h-px w-full max-w-0 bg-ink/70 transition-[max-width] duration-700 ease-[var(--ease-out-circ)] group-hover:max-w-[6rem]" />
            <ArrowRight size={18} className="-ml-1" />
          </span>
        </span>
      </Link>
    </li>
  );
}

export function ServicesGrid() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="inset-card relative isolate mt-[2vw] bg-navy-900 text-white"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src={images.groeipuntSite.src} alt="" fill sizes="96vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/95 to-navy-950" />
      </div>

      <div className="container-x section-y">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            eyebrow="Core capabilities"
            title={<span id="services-title">High-voltage and medium-voltage services,</span>}
            muted="from design and supply to installation and maintenance."
            tone="dark"
            align="center"
            className="max-w-[52rem]"
          />
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-20 xl:grid-cols-4 xl:gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
