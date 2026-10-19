import type { Metadata } from "next";
import { services } from "@/lib/services";
import { images } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServicesGrid";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Reactive power, FACTS and HVDC; control, protection and commissioning; substation site services and equipment; civil works; renewable energy; switchgear and transformer field services.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="High-voltage and medium-voltage services"
        muted="under one engineering group."
        intro="HVT’s services span transmission and distribution infrastructure, from reactive power compensation and substation construction to equipment supply, secondary systems and transformer field services."
        image={images.groeipuntSteelwork}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <section aria-label="All services" className="inset-card mt-[2vw] bg-navy-900 text-white">
        <div className="container-x section-y">
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
