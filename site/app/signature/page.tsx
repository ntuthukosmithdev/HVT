import type { Metadata } from "next";
import { SignatureLoader } from "@/components/signature/SignatureLoader";

/**
 * Staff email signature generator.
 *
 * Unlisted: not linked from any page, left out of the sitemap, and marked noindex
 * (here and via the X-Robots-Tag header in next.config.ts). It is deliberately not
 * listed in robots.txt, because that file is public and would reveal the address.
 */
export const metadata: Metadata = {
  title: "Email Signature",
  description: "Create the official HVT email signature.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function SignaturePage() {
  return (
    <>
      <section className="inset-card bg-navy-950 text-white">
        <div className="container-x py-12 md:py-16">
          <p className="eyebrow flex items-center gap-3 text-amber">
            <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
            HVT staff
          </p>
          <h1 className="mt-4 text-[2.2rem] font-semibold leading-[1.05] md:text-[3rem]">
            Email signature <span className="text-white/70">generator.</span>
          </h1>
          <p className="mt-4 max-w-[44rem] text-[1.05rem] leading-relaxed text-white/75">
            Enter your details, check the preview, then copy your official HVT signature into Gmail or Outlook.
          </p>
        </div>
      </section>
      <div className="container-x section-y !pt-8 md:!pt-10">
        <SignatureLoader />
      </div>
    </>
  );
}
