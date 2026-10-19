import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { SiteImage } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  muted?: React.ReactNode;
  intro?: React.ReactNode;
  image: SiteImage;
  crumbs: Crumb[];
  children?: React.ReactNode;
};

/** Inner-page hero: the homepage's inset dark card at a shorter height. */
export function PageHero({ eyebrow, title, muted, intro, image, crumbs, children }: Props) {
  return (
    <section className="inset-card relative isolate flex min-h-[32rem] flex-col justify-end bg-navy-950 text-white md:min-h-[38rem]">
      <div className="absolute inset-0 -z-10">
        <Photo image={image} sizes="96vw" priority label labelPosition="top-right" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/40 to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/30 to-transparent" />
      </div>

      <div className="px-5 pb-10 pt-32 md:px-10 md:pb-14 lg:px-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/65">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
                {c.href ? (
                  <Link href={c.href} className="link-underline hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mb-5 flex items-center gap-3 text-amber" data-reveal>
          <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="max-w-[22ch] text-[2.4rem] font-semibold leading-[1.05] md:text-[3.6rem] lg:text-[4.4rem]" data-reveal>
          {title} {muted && <span className="text-white/70">{muted}</span>}
        </h1>
        {intro && (
          <div className="mt-6 max-w-[44rem] text-[1.05rem] leading-relaxed text-white/80 md:text-[1.15rem]" data-reveal>
            {intro}
          </div>
        )}
        {children && <div className="mt-10" data-reveal>{children}</div>}
      </div>
    </section>
  );
}
