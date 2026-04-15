import type { Metadata } from "next";
import "./globals.css";

// ── Global SEO Metadata ───────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://www.kitchensetslawitegal.com"),
  title: {
    default: "BQ Kitchen Set & Interior Design — Tegal & Slawi",
    template: "%s | BQ Kitchen Set Tegal Slawi",
  },

  // ── Favicon (browser tab icon) ────────────────────────────
  icons: {
    icon: [
      { url: "/bq-logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/bq-logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/bq-logo.png",
  },

  description:
    "Spesialis Kitchen Set & Interior Design kustom premium di Tegal dan Slawi. " +
    "Wujudkan dapur impian Anda bersama BQ Kitchen Set — konsultasi gratis!",
  keywords: [
    "Kitchen Set Tegal",
    "Kitchen Set Slawi",
    "Kitchen Set Lebaksiu",
    "Interior Design Tegal",
    "Interior Design Slawi",
    "Kitchen Set Slawi Tegal",
    "Tukang Kitchen Set Tegal",
    "Kitchen Set Minimalis Tegal",
    "Jasa Interior Tegal",
    "Kitchen Set Brebes",
    "Kitchen Set Pemalang",
    "Custom Furniture Tegal",
    "Lemari Pakaian Tegal",
    "Backdrop TV Tegal",
  ],
  authors: [{ name: "BQ Kitchen Set & Interior Design" }],
  creator: "BQ Kitchen Set",

  // ── OG Image (pratinjau saat share link di WA, FB, dll) ──
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "BQ Kitchen Set & Interior Design",
    title: "BQ Kitchen Set & Interior Design — Tegal & Slawi",
    description:
      "Spesialis Kitchen Set & Interior Design kustom premium di Tegal dan Slawi. Konsultasi gratis!",
    images: [
      {
        url: "/og-image.png",
        width: 512,
        height: 512,
        alt: "BQ Kitchen Set & Interior Design — Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "BQ Kitchen Set & Interior Design — Tegal & Slawi",
    description: "Spesialis Kitchen Set & Interior Design kustom premium di Tegal dan Slawi.",
    images: ["/og-image.png"],
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
  url: "https://www.kitchensetslawitegal.com",
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
  image: "https://www.kitchensetslawitegal.com/og-image.png",
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
