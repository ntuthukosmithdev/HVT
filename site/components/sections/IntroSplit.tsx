import { CalendarCheck2, Compass, HeartHandshake, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { company } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

type Card = { icon: LucideIcon; badge: string; title: string; body: React.ReactNode; accent?: boolean };

const cards: Card[] = [
  {
    icon: CalendarCheck2,
    badge: "Since 1994",
    title: "A long-term supplier to Eskom and utilities",
    body: "HVT was established in 1994 and has been a long-term supplier to Eskom, other utilities and major customers since then.",
  },
  {
    icon: Compass,
    badge: "Vision",
    title: "A significant Southern African group",
    body: company.vision,
  },
  {
    icon: UsersRound,
    badge: "Philosophy",
    title: "Empower the person",
    body: "An “empower the person” philosophy means that the best skills and experience are available. HVT is committed to the training and development of its staff.",
  },
  {
    icon: HeartHandshake,
    badge: "Core values",
    title: "Values every member of staff shares",
    body: (
      <ul className="mt-1 grid gap-2 sm:grid-cols-2">
        {company.values.map((v) => (
          <li key={v} className="flex items-center gap-2 font-semibold">
            <span className="size-1.5 rounded-full bg-ink" aria-hidden="true" />
            {v}
          </li>
        ))}
      </ul>
    ),
    accent: true,
  },
];

export function IntroSplit() {
  return (
    <section aria-labelledby="intro-title" className="relative mt-[2vw]">
      <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-6 px-[3%] md:grid-cols-2 md:gap-[4%]">
        {/* Sticky intro */}
        <div className="relative md:sticky md:top-[4vh] md:h-[92vh]">
          <div className="dot-grid pointer-events-none absolute inset-0 -z-10 hidden rounded-[1.5rem] bg-white/35 md:block" aria-hidden="true" />
          <div className="flex h-full flex-col justify-center px-2 py-16 md:px-[10%] md:py-0">
            <p className="eyebrow mb-5 flex items-center gap-3 text-amber-ink" data-reveal>
              <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
              About HVT
            </p>
            <h2
              id="intro-title"
              className="text-[2rem] font-semibold leading-[1.08] md:text-[2.6rem] lg:text-[3.25rem]"
              data-reveal
            >
              “Can do” solutions <span className="opacity-55">for tough problems in transmission &amp; distribution.</span>
            </h2>
            <div className="mt-6 max-w-[34rem] space-y-4 text-[1.05rem] leading-relaxed text-ink/75" data-reveal>
              <p>
                High Voltage Technology SA is a specialist high-voltage and medium-voltage engineering business serving
                the electrical power market in Southern Africa.
              </p>
              <p>
                Its divisions cover reactive power, control and protection, substation construction and equipment,
                civil works, renewable energy and transformer field services, with excellent BBBEE credentials and a
                commitment to the social development of its staff and communities.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal>
              <ButtonLink href="/about" variant="dark">
                About HVT
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost-light">
                Our Services
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Scrolling cards */}
        <ul className="flex flex-col gap-5 pb-8 md:gap-10 md:py-[22vh]">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <li
                key={c.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 40}ms` }}
                className={`relative rounded-[1.5rem] border p-7 md:p-10 ${
                  c.accent
                    ? "border-amber-deep/40 bg-gradient-to-r from-amber-deep to-amber text-ink"
                    : "border-line bg-gradient-to-r from-[#eef1f4] to-mist"
                }`}
              >
                <span
                  className={`absolute right-6 top-6 rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] ${
                    c.accent ? "bg-ink text-white" : "border border-line bg-white text-navy-700"
                  }`}
                >
                  {c.badge}
                </span>
                <span
                  className={`mb-7 inline-grid size-14 place-items-center rounded-xl ${
                    c.accent ? "bg-ink text-amber" : "bg-ink text-amber"
                  }`}
                  aria-hidden="true"
                >
                  <Icon size={26} strokeWidth={1.75} />
                </span>
                <h3 className="max-w-[22ch] text-[1.4rem] font-semibold leading-tight md:text-[1.6rem]">{c.title}</h3>
                <div className={`mt-3 text-[1.02rem] leading-relaxed ${c.accent ? "text-ink/85" : "text-ink/70"}`}>
                  {c.body}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
