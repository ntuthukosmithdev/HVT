import Image from "next/image";
import { ClipboardCheck, Cable, Cpu, DraftingCompass, Gauge, HardHat } from "lucide-react";
import { company } from "@/lib/site";
import { images } from "@/lib/images";

const facts = [
  { value: company.credentials.bbbee.value, label: "BBBEE contributor", note: "BYO & BWO" },
  { value: company.credentials.cidb.value, label: "CIDB grading", note: "PE" },
  { value: "9001:2015", label: "ISO quality management", note: "Certified" },
  { value: "765kV", label: "Crews trained & accredited up to", note: "8 crews" },
];

const delivery = [
  { icon: DraftingCompass, label: "Substation design and equipment specification" },
  { icon: HardHat, label: "Turnkey construction and refurbishment" },
  { icon: Cable, label: "Equipment erection, cabling, stringing and busbars" },
  { icon: Cpu, label: "Control and protection installations" },
  { icon: Gauge, label: "Testing and commissioning" },
  { icon: ClipboardCheck, label: "Project management and SHEQ systems" },
];

export function Credentials() {
  return (
    <section aria-labelledby="credentials-title" className="inset-card mt-[2vw] bg-mist">
      <div className="container-x section-y">
        <p className="eyebrow mb-6 flex items-center gap-3 text-amber-ink" data-reveal>
          <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
          Credentials & track record
        </p>
        <h2
          id="credentials-title"
          className="max-w-[60rem] text-[1.8rem] font-medium leading-[1.25] text-ink md:text-[2.6rem] lg:text-[3.3rem]"
          data-reveal
        >
          Over <span className="font-bold text-amber-ink">600 reactive power projects</span> from 3.3kV to 765kV, and a
          supplier to <span className="font-bold text-amber-ink">Eskom’s 765kV substation build programme</span>.
        </h2>

        <dl className="mt-14 grid grid-cols-1 gap-px min-[420px]:grid-cols-2 overflow-hidden rounded-[1.25rem] border border-line bg-line md:mt-20 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className="flex flex-col justify-between gap-5 bg-mist p-6 sm:gap-8 md:p-8"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <dt className="order-2 text-sm font-medium text-slate">
                {f.label}
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-amber-ink">{f.note}</span>
              </dt>
              <dd className="order-1 font-display text-[1.45rem] font-bold leading-none tracking-[-0.03em] text-ink sm:text-[2rem] md:text-[2.75rem]">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <hr className="my-16 border-line md:my-24" />

        {/* Technical capability and delivery strip */}
        <div className="grid items-center gap-10 md:grid-cols-[16rem_1fr] lg:grid-cols-[21rem_1fr] lg:gap-16">
          <figure className="relative overflow-hidden rounded-[1.5rem]">
            <div data-reveal-image>
              <Image
                src={images.groeipuntCrew.src}
                alt={images.groeipuntCrew.alt}
                width={images.groeipuntCrew.width}
                height={images.groeipuntCrew.height}
                sizes="(min-width:1024px) 21rem, (min-width:768px) 16rem, 92vw"
                className="aspect-[4/5] h-auto w-full object-cover"
              />
            </div>
            <figcaption className="absolute bottom-3 left-3 z-[3] rounded-full bg-navy-950/60 px-3 py-1 text-[0.68rem] font-medium text-white/85 backdrop-blur-sm">
              HVT · Groeipunt Substation
            </figcaption>
          </figure>
          <div>
          <div data-reveal>
            <h3 className="max-w-[36rem] text-[1.6rem] font-semibold leading-tight md:text-[2.2rem]">
              Technical capability <span className="opacity-55">and delivery, from design to commissioning.</span>
            </h3>
            <p className="mt-4 max-w-[36rem] text-[1.02rem] leading-relaxed text-ink/70">
              HVT provides skilled labour and project management to help utilities and major project companies build
              high-voltage substations, from equipment installation to turnkey construction.
            </p>
          </div>
          <ul className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {delivery.map((d, i) => {
              const Icon = d.icon;
              return (
                <li
                  key={d.label}
                  className="flex items-center gap-4"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-amber" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="text-[0.95rem] font-semibold leading-snug">{d.label}</span>
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
