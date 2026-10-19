import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images, type SiteImage } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Social Impact",
  description:
    "HVT is committed to enterprise development, incubating small and emerging black contractors to facilitate skills transfer and social upliftment.",
  alternates: { canonical: "/social-impact" },
};

type Initiative = { title: string; when?: string; body: string; image?: SiteImage; href?: string };

// From hvt.co.za/social-development/ (dates given only where HVT published them)
const initiatives: Initiative[] = [
  {
    title: "Kaalfontein Containers",
    body: "Electrical wiring and connecting power to seniors in Kaalfontein.",
    image: images.kaalfontein,
    href: "/projects/kaalfontein-containers",
  },
  {
    title: "HVT Staff Home Improvements",
    body: "An HVT initiative improving the homes of its staff, documented in photographs of completed and in-progress houses.",
    image: images.staffHomes,
  },
  {
    title: "MIG Construction",
    body: "HVT sponsoring equipment to John Mphatsoe of MIG Construction.",
    image: images.migConstruction,
  },
  {
    title: "Solidarity Buckets",
    body: "A multi-pronged initiative that allows individuals and businesses to contribute towards saving lives and preserving livelihoods, by helping households in need with food staples and sanitation essentials. Travel and hospitality partners market, source, collate and deliver the buckets, keeping their own staff employed.",
  },
  {
    title: "Tembisa Soccer Club",
    body: "The Tembisa boys (Dawn Carriers) received their new boots.",
  },
  {
    title: "King Zwelonke Legacy Golf Day",
    when: "3 April 2018",
    body: "An annual fund-raising event for the King Zwelonke Legacy Project, held at the West Bank Golf Course in East London.",
  },
  {
    title: "Gymnastics sponsorship",
    body: "HVT sponsored Bajabulile Tshele, an 8-year-old gymnast from Kwenante gymnastics club, to attend an international gymnastics training course and event in Malta.",
  },
];

export default function SocialImpactPage() {
  const featured = initiatives.filter((i) => i.image);
  const more = initiatives.filter((i) => !i.image);

  return (
    <>
      <PageHero
        eyebrow="Social impact"
        title="Enterprise development"
        muted="and social upliftment."
        intro="HVT is committed to enterprise development. HVT incubates and provides assistance to small and emerging black contractors to facilitate skills transfer and social upliftment."
        image={images.kaalfontein2}
        crumbs={[{ label: "Home", href: "/" }, { label: "Social Impact" }]}
      />

      <section className="container-x section-y grid gap-12 lg:grid-cols-2 lg:gap-20">
        <SectionHeading eyebrow="Empower the person" title="A holistic approach" muted="to skills development." />
        <div className="space-y-5 text-[1.05rem] leading-relaxed text-ink/75" data-reveal>
          <p>
            HVT is committed to affirmative action and to the training and development of its staff. In its expansion it
            has kept to a very simple rule: the key to its future success as a company, and inevitably the success of the
            nation, is a holistic approach to skills development. Quite simply, “Empower the Person”.
          </p>
          <p>HVT is committed to the social development of its staff and the communities in which it works.</p>
        </div>
      </section>

      <section aria-label="Initiatives" className="inset-card bg-mist">
        <div className="container-x section-y">
          <ul className="grid gap-6 md:grid-cols-3">
            {featured.map((it, i) => (
              <li key={it.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white">
                  <div className="relative aspect-[4/3]">
                    <Image src={it.image!.src} alt={it.image!.alt} fill sizes="(min-width:768px) 30vw, 92vw" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h2 className="text-[1.3rem] font-semibold">{it.title}</h2>
                    <p className="mt-2 flex-1 text-ink/70">{it.body}</p>
                    {it.href && (
                      <Link href={it.href} className="link-underline mt-5 self-start text-sm font-bold text-amber-ink">
                        View project
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <ul className="mt-6 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:grid-cols-2">
            {more.map((it) => (
              <li key={it.title} className="bg-mist p-7 md:p-9" data-reveal>
                <h2 className="text-[1.2rem] font-semibold">{it.title}</h2>
                {it.when && <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-amber-ink">{it.when}</p>}
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/70">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
