import type { Metadata } from "next";
import { company, addressLine } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How High Voltage Technology SA (Pty) Ltd handles personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="container-x section-y">
      <div className="mx-auto max-w-[46rem]">
        <p className="eyebrow text-amber-ink">Legal</p>
        <h1 className="mt-4 text-[2.2rem] font-semibold leading-tight md:text-[3rem]">Privacy notice</h1>
        <div className="mt-10 space-y-8 text-[1.02rem] leading-relaxed text-ink/80 [&_h2]:mb-3 [&_h2]:text-[1.3rem] [&_h2]:font-semibold [&_h2]:text-ink">
          <section>
            <h2>Who we are</h2>
            <p>
              This website is operated by {company.legalName} (registration number {company.registrationNumber}),{" "}
              {addressLine}. HVT is the responsible party for personal information collected through this website, in
              terms of the Protection of Personal Information Act, 2013 (POPIA).
            </p>
          </section>
          <section>
            <h2>What we collect and why</h2>
            <p>
              When you submit the project enquiry form we collect your name, company, email address, contact number,
              service of interest, project location and the project details you provide. We use this information only to
              respond to your enquiry and to discuss your project with you.
            </p>
          </section>
          <section>
            <h2>How it is processed</h2>
            <p>
              Enquiries are delivered by email to HVT through a transactional email service provider acting as an
              operator on HVT’s behalf. We do not sell your information or use it for unrelated marketing.
            </p>
          </section>
          <section>
            <h2>Cookies and tracking</h2>
            <p>
              This website does not use advertising or analytics cookies and does not track visitors across other
              websites. Map links open Google Maps in a new tab, where Google’s own privacy policy applies.
            </p>
          </section>
          <section>
            <h2>Retention and your rights</h2>
            <p>
              We keep enquiry information only for as long as needed to respond and for related business records. You may
              ask to access, correct or delete your personal information, or object to its processing, by emailing{" "}
              <a href={company.contact.emailHref} className="font-semibold underline">
                {company.contact.email}
              </a>{" "}
              or calling{" "}
              <a href={company.contact.phoneHref} className="font-semibold underline">
                {company.contact.phone}
              </a>
              . You also have the right to lodge a complaint with the Information Regulator (South Africa).
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
