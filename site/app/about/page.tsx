import type { Metadata } from "next";
import Image from "next/image";
import { company } from "@/lib/site";
import { images } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About HVT",
  description:
    "Established in 1994, High Voltage Technology SA is a long-term supplier to Eskom, other utilities and major customers in the high-voltage and medium-voltage power market.",
  alternates: { canonical: "/about" },
};

// From hvt.co.za/history/ and /bbbee/
const timeline = [
  { year: "1994", text: "High Voltage Technology Southern Africa (Pty) Ltd is established as the agent for the Haefely Trench Group in Southern Africa." },
  { year: "1999", text: "The first move to Black Economic Empowerment brings an expanded shareholder base and a move into equipment erection and substation site services." },
  { year: "2005", text: "Charmaine Naidoo acquires a majority interest and the company registers as a Black Woman Owned (BWO) vendor with Eskom." },
  { year: "2006", text: "In August, HVT acquires the business of HTSA Power Economy, strengthening its marketing and design of substation and reactive power compensation projects." },
  { year: "2007", text: "In March, Ganas (Boogie) Naidoo takes over the controlling share and is appointed CEO." },
  { year: "2010", text: "In January, HVT is awarded ISO 9001 accreditation for its commitment to quality." },
];

const group = [
  { name: "Intelligent African Technologies", role: "HVT subsidiary specialising in control and protection." },
  { name: "Electrovaya Construction", role: "HVT subsidiary used primarily for renewable energy projects." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About HVT"
        title="An engineering partner"
        muted="to Southern Africa’s power sector since 1994."
        intro={company.positioning}
        image={images.bokmakierieAerial}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="container-x section-y grid gap-12 lg:grid-cols-2 lg:gap-20">
        <SectionHeading eyebrow="Who we are" title="A long-term supplier" muted="to Eskom, utilities and major customers." />
        <div className="space-y-5 text-[1.05rem] leading-relaxed text-ink/75" data-reveal>
          <p>
            HVT was established in 1994 and has been a long-term supplier to Eskom, other utilities and major customers
            since then. The company has excellent BBBEE credentials and is committed to the social development of its
            staff and communities.
          </p>
          <p>
            HVT is an independent BBBEE service provider to the high-voltage and medium-voltage electrical power market in
            Southern Africa. An “empower the person” philosophy means that the best skills and experience are available.
          </p>
          <p>
            There are numerous teams, trained and equipped to manage multiple large projects from medium voltages up to
            765kV, supported by a strong technical, design and project management team.
          </p>
        </div>
      </section>

      {/* Vision & values */}
      <section className="inset-card bg-navy-950 text-white">
        <div className="container-x section-y grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Vision" title="To become a significant Southern African group" muted="in the high voltage engineering field." tone="dark" />
          </div>
          <div data-reveal>
            <p className="eyebrow text-amber">Core values</p>
            <p className="mt-4 text-white/75">{company.valuesIntro}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {company.values.map((v, i) => (
                <li key={v} className="rounded-[1.25rem] border border-navy-line bg-navy-800/50 p-6">
                  <span className="font-display text-sm font-bold text-amber">{String(i + 1).padStart(2, "0")}.</span>
                  <p className="mt-3 font-display text-[1.25rem] font-semibold">{v}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="container-x section-y">
        <SectionHeading eyebrow="History" title="Three decades" muted="of growth and empowerment." />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {timeline.map((t, i) => (
            <li key={t.year} className="bg-mist p-7 md:p-9" data-reveal style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}>
              <span className="font-display text-[2.4rem] font-bold leading-none tracking-[-0.03em] text-amber-ink">{t.year}</span>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/75">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Leadership & group */}
      <section className="inset-card bg-mist">
        <div className="container-x section-y grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Leadership" title="Ganas (Boogie) Naidoo," muted="Chief Executive Officer." size="md" />
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-ink/75" data-reveal>
              <p>
                Boogie is a classic entrepreneur with an instinct for balancing a deal and customer relationships.
                Following an early career in the trade union movement, he developed a sound appreciation of the South
                African business environment.
              </p>
              <p>
                His entry to the electrical engineering sector was via Baymont Power Projects in 2000. He now owns a stake
                in HVT, Transformco and other companies, and provides leadership to these companies as CEO of HVT,
                Transformco and HTSA Power.
              </p>
            </div>
          </div>
          <div data-reveal>
            <p className="eyebrow text-amber-ink">Group companies</p>
            <ul className="mt-6 grid gap-3">
              {group.map((g) => (
                <li key={g.name} className="rounded-[1.25rem] border border-line bg-white p-6">
                  <p className="font-display text-[1.2rem] font-semibold">{g.name}</p>
                  <p className="mt-1 text-ink/70">{g.role}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {Object.values(company.credentials).map((c) => (
                <div key={c.short} className="rounded-[1.25rem] bg-ink p-5 text-white">
                  <dt className="text-xs text-white/60">{c.detail}</dt>
                  <dd className="mt-2 font-display text-lg font-bold text-amber">{c.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-x section-y grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
          <div className="absolute inset-0" data-reveal-image>
            <Image src={images.staffHomes.src} alt={images.staffHomes.alt} fill sizes="(min-width:1024px) 46vw, 92vw" className="object-cover" />
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Social footprint" title="Committed to enterprise development" muted="and social upliftment." size="md" />
          <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink/75" data-reveal>
            HVT incubates and provides assistance to small and emerging black contractors to facilitate skills transfer and
            social upliftment, and supports staff and community initiatives.
          </p>
          <div className="mt-8" data-reveal>
            <ButtonLink href="/social-impact" variant="dark">
              Our Social Impact
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
