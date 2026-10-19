import { Hero } from "@/components/sections/Hero";
import { IntroSplit } from "@/components/sections/IntroSplit";
import { CapabilityBanner } from "@/components/sections/CapabilityBanner";
import { KineticBand } from "@/components/sections/KineticBand";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Credentials } from "@/components/sections/Credentials";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Testimonial } from "@/components/sections/Testimonial";
import { FeatureStories } from "@/components/sections/FeatureStories";
import { WhyHvt } from "@/components/sections/WhyHvt";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSplit />
      <CapabilityBanner />
      <KineticBand />
      <ServicesGrid />
      <Credentials />
      <FeaturedProjects />
      <Testimonial />
      <FeatureStories />
      <WhyHvt />
      <ContactSection />
    </>
  );
}
