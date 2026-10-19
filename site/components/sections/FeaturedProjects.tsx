import Image from "next/image";
import { projects } from "@/lib/projects";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const featured = ["groeipunt-substation", "bokmakierie-substation", "mount-edgecombe-interchange"];

export function FeaturedProjects() {
  const list = featured.map((slug) => projects.find((p) => p.slug === slug)!);

  return (
    <section
      aria-labelledby="projects-title"
      className="mt-[2vw] rounded-[1.1rem] bg-navy-950 text-white md:rounded-[1.5rem]"
    >
      <div className="container-x section-y">
        <SectionHeading
          eyebrow="Featured projects"
          title={<span id="projects-title">Work HVT has documented</span>}
          muted="across substations and infrastructure."
          tone="dark"
          align="center"
          className="max-w-[46rem]"
        />

        <ul className="mt-14 flex flex-col gap-6 md:mt-20">
          {list.map((p, i) => (
            <li
              key={p.slug}
              className="relative isolate flex min-h-[30rem] items-end overflow-hidden rounded-[1.5rem] border border-navy-line md:min-h-[34rem]"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            >
              <Image src={p.image.src} alt={p.image.alt} fill sizes="92vw" className="-z-10 object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/60 to-navy-950/10" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent" />

              <div className="grid w-full gap-8 p-6 md:p-10 lg:grid-cols-[1fr_1fr_auto] lg:items-end lg:gap-10">
                <div>
                  <p className="eyebrow text-white/60">{p.type}</p>
                  <h3 className="mt-3 text-[1.8rem] font-semibold leading-tight text-amber md:text-[2.4rem]">{p.title}</h3>
                  <p className="mt-3 max-w-[30rem] text-[0.98rem] leading-relaxed text-white/75">{p.summary}</p>
                </div>
                <dl className="grid gap-4 border-l border-amber/40 pl-6 text-sm">
                  {p.facts.slice(0, 3).map((f) => (
                    <div key={f.label}>
                      <dt className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">{f.label}</dt>
                      <dd className="mt-1 font-display text-[1.05rem] font-semibold">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <ButtonLink href={`/projects/${p.slug}`} variant="ghost-dark" className="justify-self-start">
                  View Project
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-16 flex max-w-[44rem] flex-col items-center gap-8 text-center" data-reveal>
          <p className="text-[1.1rem] leading-relaxed text-white/70 md:text-[1.25rem]">
            From a 220kV transmission substation for a renewable grid connection to lighting the Mount Edgecombe
            Interchange, explore the projects HVT has documented in its own photographs.
          </p>
          <ButtonLink href="/projects" variant="primary">
            View Our Projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
