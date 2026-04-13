import type { Metadata } from "next";
import "./globals.css";

// ── Global SEO Metadata ───────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://bqkitchen.vercel.app"), // Update with actual domain
  title: {
    default: "BQ Kitchen Set & Interior Design — Tegal & Slawi",
    template: "%s | BQ Kitchen Set Tegal Slawi",
  },
  description:
    "Spesialis Kitchen Set & Interior Design kustom premium di Tegal dan Slawi. " +
    "Wujudkan dapur impian Anda bersama BQ Kitchen Set — konsultasi gratis!",
  keywords: [
    "Jasa Kitchen Set Tegal",
    "Kitchen Set Slawi",
    "Interior Design Tegal",
    "Interior Design Slawi",
    "Kitchen Set Custom Tegal",
    "Wardrobe Custom Slawi",
    "Lemari Pakaian Custom Tegal",
    "Interior Rumah Tegal",
    "BQ Kitchen Set",
    "Kitchen Set Minimalis Tegal",
    "Jasa Interior Slawi Tegal",
  ],
  authors: [{ name: "BQ Kitchen Set & Interior Design" }],
  creator: "BQ Kitchen Set",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "BQ Kitchen Set & Interior Design",
    title: "BQ Kitchen Set & Interior Design — Tegal & Slawi",
    description:
      "Spesialis Kitchen Set & Interior Design kustom premium di Tegal dan Slawi. Konsultasi gratis!",
  },
  twitter: {
    card: "summary_large_image",
    title: "BQ Kitchen Set & Interior Design — Tegal & Slawi",
    description: "Spesialis Kitchen Set & Interior Design kustom premium di Tegal dan Slawi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
  },
};

// ── LocalBusiness JSON-LD Schema ──────────────────────────────
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "BQ Kitchen Set & Interior Design",
  description:
    "Spesialis Kitchen Set & Interior Design kustom premium di Tegal dan Slawi, Jawa Tengah.",
  url: "https://bqkitchen.vercel.app",
  telephone: "+6281385203317",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dukuhdamu, Lebaksiu",
    addressLocality: "Tegal",
    addressRegion: "Jawa Tengah",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.0,   // Approximate — update with real coordinates
    longitude: 109.15,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  image: "https://bqkitchen.vercel.app/og-image.jpg",
  priceRange: "Konsultasi Gratis",
  areaServed: [
    { "@type": "City", name: "Tegal" },
    { "@type": "City", name: "Slawi" },
    { "@type": "AdministrativeArea", name: "Jawa Tengah" },
  ],
};

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect to Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />

        {/* Favicon placeholder */}


        {/* LocalBusiness JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
