import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { images } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects documented by HVT, including the Groeipunt 220kV transmission substation, Bokmakierie Substation, the Mount Edgecombe Interchange and community electrification in Kaalfontein.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work HVT has documented"
        muted="in its own photographs."
        intro="A selection of substation, infrastructure and community projects published by HVT."
        image={images.groeipuntAerial}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <section aria-label="Project list" className="container-x section-y">
        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
              <Link
                href={`/projects/${p.slug}`}
                className="group relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-navy-950 p-6 text-white md:min-h-[34rem] md:p-9"
              >
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width:768px) 46vw, 92vw"
                  className="-z-10 object-cover transition-transform duration-1000 ease-[var(--ease-out-circ)] group-hover:scale-105"
                />
                <span className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />
                <p className="eyebrow text-white/65">{p.type}</p>
                <h2 className="mt-3 text-[1.8rem] font-semibold leading-tight text-amber md:text-[2.2rem]">{p.title}</h2>
                <p className="mt-3 max-w-[32rem] text-white/75">{p.summary}</p>
                <span className="mt-7 inline-flex items-center gap-3 self-start rounded-full border border-white/30 py-1.5 pl-5 pr-1.5 font-display text-sm font-bold transition-colors group-hover:border-amber">
                  View Project
                  <span className="grid size-8 place-items-center rounded-full bg-amber text-ink transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
