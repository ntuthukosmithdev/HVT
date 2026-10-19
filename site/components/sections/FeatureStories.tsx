import Image from "next/image";
import { HardHat, HeartHandshake, type LucideIcon } from "lucide-react";
import { images, type SiteImage } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";

type Story = {
  id: string;
  icon: LucideIcon;
  kicker: string;
  title: React.ReactNode;
  badge: string;
  body: string;
  href: string;
  cta: string;
  image: SiteImage;
};

const stories: Story[] = [
  {
    id: "sheq",
    icon: HardHat,
    kicker: "Safety, health, environment & quality",
    title: (
      <>
        SHEQ reports directly to the CEO, <span className="text-white/70">so safety and quality come first in the culture.</span>
      </>
    ),
    badge: "Quality & safety",
    body: "HVT’s SHEQ office reports directly to the CEO, which has been instrumental in embedding a culture that prioritises SHEQ performance. HVT holds ISO 9001:2015 certification and has a dedicated SHE team and systems.",
    href: "/quality-safety",
    cta: "Quality & Safety",
    image: images.groeipuntMast,
  },
  {
    id: "impact",
    icon: HeartHandshake,
    kicker: "Enterprise development & social upliftment",
    title: (
      <>
        Incubating emerging contractors <span className="text-white/70">and investing in communities.</span>
      </>
    ),
    badge: "Social impact",
    body: "HVT is committed to enterprise development. It incubates and assists small and emerging black contractors to facilitate skills transfer and social upliftment, alongside staff home improvements and community initiatives.",
    href: "/social-impact",
    cta: "Our Social Impact",
    image: images.migConstruction,
  },
];

/** Two dark editorial cards, adapted from the reference's featured-article layout. */
export function FeatureStories() {
  return (
    <section aria-label="Responsible engineering" className="flex flex-col gap-[2vw]">
      {stories.map((s) => {
        const Icon = s.icon;
        return (
          <article
            key={s.id}
            aria-labelledby={`${s.id}-title`}
            className="inset-card relative isolate flex min-h-[38rem] items-end bg-navy-950 text-white md:min-h-[44rem]"
          >
            <div className="absolute inset-0 -z-10">
              <Image src={s.image.src} alt={s.image.alt} fill sizes="96vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/10" />
            </div>
            <span className="absolute right-4 top-4 rounded-full bg-navy-950/60 px-3 py-1 text-[0.68rem] font-medium text-white/85 backdrop-blur-sm md:right-6 md:top-6">
              {s.image.caption.replace("HVT photograph: ", "HVT · ")}
            </span>

            <div className="flex w-full flex-col gap-10 px-5 pb-8 pt-40 md:px-10 md:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-14">
              <div className="max-w-[44rem]" data-reveal>
                <p className="flex items-center gap-3 text-sm font-semibold text-white/75">
                  <span className="grid size-10 place-items-center rounded-full bg-amber text-ink" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  {s.kicker}
                </p>
                <h2 id={`${s.id}-title`} className="mt-6 text-[1.9rem] font-semibold leading-[1.1] md:text-[2.6rem] lg:text-[3rem]">
                  {s.title}
                </h2>
              </div>
              <div className="max-w-[30rem] border-l border-amber/50 pl-6 md:pl-8" data-reveal>
                <span className="glass-dark inline-block rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
                  {s.badge}
                </span>
                <p className="mt-4 text-[1rem] leading-relaxed text-white/80">{s.body}</p>
                <div className="mt-7">
                  <ButtonLink href={s.href} variant="ghost-dark">
                    {s.cta}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
