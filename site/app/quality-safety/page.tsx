import type { Metadata } from "next";
import Image from "next/image";
import { Award, HardHat, Leaf, ShieldCheck } from "lucide-react";
import { company } from "@/lib/site";
import { images } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Testimonial } from "@/components/sections/Testimonial";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Quality & Safety",
  description:
    "HVT’s safety, health, environment and quality (SHEQ) systems: a SHEQ office reporting directly to the CEO, ISO 9001:2015 certification and a dedicated SHE team.",
  alternates: { canonical: "/quality-safety" },
};

const pillars = [
  {
    icon: ShieldCheck,
    title: "SHEQ leadership",
    body: "The safety, health, environment and quality (SHEQ) office reports directly to the CEO. This stature has been instrumental in ensuring that the company embeds the correct culture in its staff to prioritise SHEQ performance.",
  },
  {
    icon: Award,
    title: "Quality",
    body: "HVT is ISO 9001:2015 certified. This international certification is formal recognition of the company’s quality record. HVT was first awarded ISO 9001 accreditation in January 2010.",
  },
  {
    icon: HardHat,
    title: "Health & safety",
    body: "Health and safety has always been a main priority at HVT. A dedicated SHE team and systems operate to ensure that HVT’s record continues, and the company strives to continuously improve its systems.",
  },
  {
    icon: Leaf,
    title: "Environment",
    body: "Environmental management is part of HVT’s SHEQ systems, and its site services operate under a full quality, safety and environmental management system.",
  },
];

const training = ["HV regulations", "Safety", "First aid", "Fall arrest", "OEM training"];

export default function QualitySafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & Safety"
        title="Safety, health, environment and quality,"
        muted="reporting directly to the CEO."
        intro="HVT has developed safety, health, environment and quality (SHEQ) systems, with a dedicated SHE team and a SHEQ office that reports directly to the CEO."
        image={images.groeipuntMast}
        crumbs={[{ label: "Home", href: "/" }, { label: "Quality & Safety" }]}
      />

      <section className="container-x section-y">
        <ul className="grid gap-4 md:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={p.title}
                className="rounded-[1.5rem] border border-line bg-gradient-to-r from-[#eef1f4] to-mist p-7 md:p-10"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 2) * 70}ms` }}
              >
                <span className="inline-grid size-14 place-items-center rounded-xl bg-ink text-amber" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.75} />
                </span>
                <h2 className="mt-7 text-[1.5rem] font-semibold">{p.title}</h2>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-ink/75">{p.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="inset-card bg-navy-950 text-white">
        <div className="container-x section-y grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] lg:aspect-[4/4.4]">
            <div className="absolute inset-0" data-reveal-image>
              <Image src={images.civilFoundations.src} alt={images.civilFoundations.alt} fill sizes="(min-width:1024px) 44vw, 92vw" className="object-cover" />
            </div>
            <span className="absolute bottom-3 left-3 z-[3] rounded-full bg-navy-950/60 px-3 py-1 text-[0.68rem] text-white/85 backdrop-blur-sm">
              HVT · Bokmakierie Substation
            </span>
          </div>
          <div>
            <SectionHeading eyebrow="Equipped, trained teams" title="Accredited crews" muted="with the right training and equipment." tone="dark" />
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-white/75" data-reveal>
              <p>
                HVT’s site services are delivered by eight crews trained and accredited up to 765kV, qualifying for a
                CIDB grading of {company.credentials.cidb.value} (PE). Each team is fully equipped with supervision,
                crane trucks, cherry pickers, appropriate tools and safety gear.
              </p>
              <p>Site staff receive appropriate training, including:</p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2" data-reveal>
              {training.map((t) => (
                <li key={t} className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Testimonial />
      <CtaBand image={images.heroSubstation} />
    </>
  );
}
