import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { company, siteUrl } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const description =
  "High Voltage Technology SA provides high-voltage and medium-voltage engineering services for electricity transmission, distribution and associated infrastructure in Southern Africa.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HVT | High Voltage Engineering & Electrical Infrastructure",
    template: "%s | HVT High Voltage Technology",
  },
  description,
  applicationName: "HVT High Voltage Technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "HVT High Voltage Technology",
    title: "HVT | High Voltage Engineering & Electrical Infrastructure",
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#081321",
};

// Organisation data uses only details HVT publishes on hvt.co.za.
const organisation = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  alternateName: company.shortName,
  url: siteUrl,
  logo: `${siteUrl}/brand/hvt-logo-on-charcoal-1500.png`,
  foundingDate: String(company.founded),
  email: company.contact.email,
  telephone: "+27113167873",
  faxNumber: "+27113167860",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.contact.address.street,
    addressLocality: `${company.contact.address.suburb}, ${company.contact.address.city}`,
    addressRegion: company.contact.address.province,
    addressCountry: "ZA",
  },
  areaServed: "Southern Africa",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-ZA"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables reveal animations before first paint; content stays visible if JS is off. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        />
      </head>
      <body className="min-h-dvh">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
