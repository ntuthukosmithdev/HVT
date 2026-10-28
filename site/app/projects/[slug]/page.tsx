import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.title} | HVT`, description: project.summary, images: [project.image.src] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <PageHero
        eyebrow={project.type}
        title={project.title}
        intro={project.summary}
        image={project.image}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.title }]}
      />

      <section className="container-x section-y grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div data-reveal>
          <h2 className="text-[1.8rem] font-semibold md:text-[2.4rem]">Overview</h2>
          <div className="mt-6 space-y-5 text-[1.08rem] leading-relaxed text-ink/80">
            {project.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <dl className="h-fit divide-y divide-white/10 rounded-[1.5rem] bg-ink p-7 text-white md:p-9" data-reveal>
          {project.facts.map((f) => (
            <div key={f.label} className="py-4 first:pt-0 last:pb-0">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">{f.label}</dt>
              <dd className="mt-1.5 font-display text-[1.15rem] font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="gallery-title" className="inset-card bg-mist">
        <div className="container-x section-y">
          <h2 id="gallery-title" className="text-[1.8rem] font-semibold md:text-[2.4rem]" data-reveal>
            Project photographs
          </h2>
          <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {project.gallery.map((img) => (
              <li key={img.src} className="mb-4 break-inside-avoid">
                <figure>
                  <div className="overflow-hidden rounded-[1.25rem]" data-reveal-image>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 92vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-slate">{img.alt}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="more-title" className="container-x section-y">
        <h2 id="more-title" className="eyebrow text-amber-ink">
          More projects
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width:768px) 30vw, 92vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <p className="mt-3 font-display text-lg font-semibold group-hover:text-amber-ink">{p.title}</p>
                <p className="text-sm text-slate">{p.type}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
