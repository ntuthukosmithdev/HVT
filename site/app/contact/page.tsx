import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact HVT on +27 (0)11 316 7873 or info@hvt.co.za to discuss high-voltage, medium-voltage or electrical infrastructure requirements. Head office: Glen Austin, Midrand.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactSection headingLevel="h1" />;
}
