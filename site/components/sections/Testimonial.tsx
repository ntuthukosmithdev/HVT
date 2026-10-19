import { Quote } from "lucide-react";

/**
 * The only client testimonial HVT publishes (hvt.co.za/testimonials/), reproduced
 * verbatim with its published attribution. No other testimonials are used.
 */
export function Testimonial() {
  return (
    <section aria-labelledby="testimonial-title" className="section-y">
      <div className="container-x">
        <figure className="mx-auto max-w-[62rem] text-center" data-reveal>
          <p id="testimonial-title" className="eyebrow flex items-center justify-center gap-3 text-amber-ink">
            <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
            Client feedback
            <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
          </p>
          <span className="mx-auto mt-8 grid size-16 place-items-center rounded-full bg-ink text-amber" aria-hidden="true">
            <Quote size={26} />
          </span>
          <blockquote className="mt-8">
            <p className="font-display text-[1.45rem] font-medium leading-[1.45] tracking-[-0.01em] md:text-[2rem]">
              “I hereby like to compliment your company (HVT) with the high level of safety awareness that your workers
              demonstrate on site (Prairie, Matla, Duvha and Kriel), also the detailed mitigation plans that your company
              are using to perform all tasks safely.”
            </p>
            <p className="mx-auto mt-6 max-w-[40rem] text-[1.05rem] leading-relaxed text-ink/70 md:text-[1.15rem]">
              “Please keep up the good work and assist Eskom in putting safety first at all times.”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <span className="block font-display text-sm font-bold uppercase tracking-[0.16em]">Danie Bekker</span>
            <span className="mt-1 block text-sm text-slate">Senior Advisor, P&amp;WP, Transmission, Eskom</span>
          </figcaption>
          <div className="mx-auto mt-10 flex max-w-[16rem] gap-1.5" aria-hidden="true">
            <span className="h-px flex-1 bg-amber-deep" />
            <span className="h-px flex-1 bg-amber-deep/25" />
            <span className="h-px flex-1 bg-amber-deep/25" />
          </div>
        </figure>
      </div>
    </section>
  );
}
