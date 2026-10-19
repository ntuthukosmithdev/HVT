import { images } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";

export function CapabilityBanner() {
  return (
    <section
      aria-labelledby="capability-title"
      className="inset-card relative isolate mt-[2vw] flex min-h-[36rem] items-center bg-navy-950 px-5 py-16 md:min-h-[42rem] md:px-[6%] lg:px-[8%]"
    >
      <div className="absolute inset-0 -z-10">
        <Photo image={images.gordonia} sizes="96vw" labelPosition="bottom-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/10" />
      </div>

      <div
        className="glass-dark w-full max-w-[34rem] rounded-[1.5rem] p-8 text-center text-white md:p-12"
        data-reveal
      >
        <p className="eyebrow text-amber">Delivery capability</p>
        <h2 id="capability-title" className="mt-5 text-[1.9rem] font-semibold leading-[1.12] md:text-[2.4rem]">
          Eight fully equipped crews, <span className="text-white/70">trained and accredited up to 765kV.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[26rem] text-[1rem] leading-relaxed text-white/75">
          Supported by strong technical, design and project management abilities, and equipped with supervision, crane
          trucks, cherry pickers, tools and safety gear.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/services/substation-site-services" variant="ghost-dark">
            Substation Site Services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
