import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { images, type SiteImage } from "@/lib/images";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Reason = { tag: string; title: string; body: string; image: SiteImage; href: string; link: string };

const reasons: Reason[] = [
  {
    tag: "Approach",
    title: "A practical “Can do” approach",
    body: "HVT exists to provide “Can do” solutions for tough problems in the electricity transmission and distribution industry.",
    image: images.capacitorBankLift,
    href: "/about",
    link: "About",
  },
  {
    tag: "Breadth",
    title: "A broad range of HV and MV services",
    body: "Reactive power, FACTS and HVDC, control and protection, substation construction and equipment, civil works, renewables, switchgear and transformer field services.",
    image: images.substationEquipment,
    href: "/services",
    link: "Services",
  },
  {
    tag: "Delivery",
    title: "Technical, design and project management depth",
    body: "Crews are supported by an experienced technical, design and project management team, from substation design to testing and commissioning.",
    image: images.groeipuntAerial,
    href: "/services/substation-site-services",
    link: "Site services",
  },
  {
    tag: "Supply",
    title: "Local agent for international OEMs",
    body: "HVT links customers with overseas manufacturers and provides local technical support, procurement, logistics and after-sales advice.",
    image: images.airCoreReactor,
    href: "/services/substation-equipment",
    link: "Equipment",
  },
  {
    tag: "SHEQ",
    title: "Safety, health, environment and quality management",
    body: "A SHEQ office that reports directly to the CEO, ISO 9001:2015 certification and a full quality, safety and environmental management system.",
    image: images.civilFoundations,
    href: "/quality-safety",
    link: "Quality & safety",
  },
  {
    tag: "Region",
    title: "Southern African engineering focus",
    body: "Based in Gauteng, with reactive power project experience across the region, including Botswana, Namibia, Mozambique, Zambia, Zimbabwe, Swaziland and Mauritius.",
    image: images.overheadLine,
    href: "/projects",
    link: "Projects",
  },
];

/** Glass list rows, adapted from the reference's product list. */
export function WhyHvt() {
  return (
    <section aria-labelledby="why-title" className="container-x section-y">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Why HVT"
          title={<span id="why-title">Why work</span>}
          muted="with HVT?"
          size="lg"
        />
        <p className="max-w-[26rem] text-[1rem] leading-relaxed text-ink/70" data-reveal>
          What HVT brings to utilities, EPC contractors, mining and industrial clients and renewable energy developers.
        </p>
      </div>

      <ul className="mt-12 grid gap-4 md:mt-16 md:rounded-[1.5rem] md:border md:border-white/60 md:bg-white/35 md:p-3">
        {reasons.map((r, i) => (
          <li key={r.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 40}ms` }}>
            <Link
              href={r.href}
              className="group grid grid-cols-1 items-center gap-5 rounded-[1.25rem] bg-white/60 p-3 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-circ)] hover:bg-mist hover:shadow-[0_0_80px_10px_rgb(8_19_33/0.12)] sm:grid-cols-[9rem_1fr] md:bg-transparent md:p-4 lg:grid-cols-[11rem_1fr_auto] lg:gap-10"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-[1rem] sm:aspect-[4/3]">
                <Image
                  src={r.image.src}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 11rem, (min-width:640px) 9rem, 92vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="px-2 sm:px-0">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-amber-ink">
                  {String(i + 1).padStart(2, "0")} · {r.tag}
                </p>
                <h3 className="mt-2 text-[1.2rem] font-semibold leading-snug md:text-[1.4rem]">{r.title}</h3>
                <p className="mt-2 max-w-[44rem] text-[0.95rem] leading-relaxed text-ink/70">{r.body}</p>
              </div>
              <span className="mx-2 mb-2 inline-flex items-center gap-3 justify-self-start rounded-full border border-line bg-white/70 py-1.5 pl-4 pr-1.5 text-sm font-semibold sm:col-start-2 sm:mx-0 lg:col-start-auto lg:mb-0">
                {r.link}
                <span className="grid size-8 place-items-center rounded-full bg-ink text-amber transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
