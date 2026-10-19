import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { getService, services } from "@/lib/services";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { ButtonLink } from "@/components/ui/Button";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} | HVT`, description: service.summary, images: [service.image.src] },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={`${service.number} · ${service.category}`}
        title={service.title}
        intro={service.summary}
        image={service.image}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.shortTitle }]}
      >
        <ButtonLink href="#enquiry" variant="primary">
          Discuss Your Project
        </ButtonLink>
      </PageHero>

      <section className="container-x section-y grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="space-y-5 text-[1.08rem] leading-relaxed text-ink/80" data-reveal>
          {service.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {service.note && <p className="text-sm text-slate">{service.note}</p>}
        </div>
        {service.highlights && (
          <div className="rounded-[1.5rem] bg-ink p-7 text-white md:p-9" data-reveal>
            <p className="eyebrow text-amber">{service.highlightsTitle}</p>
            <ul className="mt-6 space-y-4">
              {service.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[0.98rem] leading-relaxed text-white/85">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-amber text-ink" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section aria-labelledby="scope-title" className="inset-card bg-mist">
        <div className="container-x section-y">
          <h2 id="scope-title" className="text-[1.8rem] font-semibold md:text-[2.4rem]" data-reveal>
            Scope of services
          </h2>
          <div
            className={`mt-10 grid gap-4 md:grid-cols-2 ${
              service.groups.length === 4 ? "xl:grid-cols-4" : service.groups.length === 3 ? "xl:grid-cols-3" : ""
            }`}
          >
            {service.groups.map((g, i) => (
              <div
                key={g.title}
                className="rounded-[1.25rem] border border-line bg-white p-6 md:p-7"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              >
                <p className="font-display text-sm font-bold text-amber-ink">{String(i + 1).padStart(2, "0")}.</p>
                <h3 className="mt-3 text-[1.2rem] font-semibold">{g.title}</h3>
                <ul className="mt-5 space-y-3">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/75">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-amber-deep" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Photographs" className="container-x section-y">
        <ul className="grid gap-4 md:grid-cols-3">
          {service.gallery.map((img, i) => (
            <li key={img.src} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
              <figure className="h-full">
                <div className={`relative overflow-hidden rounded-[1.25rem] ${i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full md:min-h-[28rem]" : "aspect-[4/3]"}`}>
                  <div className="absolute inset-0" data-reveal-image>
                    <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? "(min-width:768px) 62vw, 92vw" : "(min-width:768px) 30vw, 92vw"} className="object-cover" />
                  </div>
                </div>
                <figcaption className="mt-2 text-xs text-slate">{img.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="other-title" className="container-x pb-16">
        <h2 id="other-title" className="eyebrow text-amber-ink">
          Other services
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                {s.title}
                <ArrowUpRight size={15} className="text-amber-ink group-hover:text-amber" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContactSection defaultService={service.title} />
    </>
  );
}
