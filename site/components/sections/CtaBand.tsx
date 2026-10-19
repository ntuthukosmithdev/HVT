import { images, type SiteImage } from "@/lib/images";
import { company } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";

type Props = {
  title?: React.ReactNode;
  body?: string;
  image?: SiteImage;
};

export function CtaBand({
  title = (
    <>
      Let’s discuss your next <span className="text-white/70">infrastructure project.</span>
    </>
  ),
  body = "Contact HVT to discuss your high-voltage, medium-voltage or electrical infrastructure requirements.",
  image = images.heroTower,
}: Props) {
  return (
    <section aria-label="Contact HVT" className="inset-card relative isolate mt-[2vw] bg-navy-950 text-white">
      <div className="absolute inset-0 -z-10">
        <Photo image={image} sizes="96vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/30" />
      </div>
      <div className="container-x flex flex-col gap-10 py-20 md:py-28 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[40rem]" data-reveal>
          <h2 className="text-[2rem] font-semibold leading-[1.08] md:text-[2.8rem] lg:text-[3.3rem]">{title}</h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-white/75">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3" data-reveal>
          <ButtonLink href="/contact" variant="primary">
            Discuss Your Project
          </ButtonLink>
          <ButtonLink href={company.contact.phoneHref} variant="ghost-dark">
            {company.contact.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
