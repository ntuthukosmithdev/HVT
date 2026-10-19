import { images } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="inset-card relative isolate flex min-h-[70svh] items-center bg-navy-950 text-white">
      <div className="absolute inset-0 -z-10">
        <Photo image={images.heroTower} sizes="96vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/30" />
      </div>
      <div className="px-5 py-24 md:px-14">
        <p className="eyebrow text-amber">Error 404</p>
        <h1 className="mt-5 max-w-[18ch] text-[2.4rem] font-semibold leading-[1.05] md:text-[4rem]">
          This page is <span className="text-white/70">out of circuit.</span>
        </h1>
        <p className="mt-5 max-w-[34rem] text-white/75">
          The page you were looking for doesn’t exist or has moved. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="primary">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/services" variant="ghost-dark">
            Our Services
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost-dark">
            Contact HVT
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
