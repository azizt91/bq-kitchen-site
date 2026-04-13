// ============================================================
// TypeScript Type Definitions for BQ Kitchen Site
// ============================================================

// ─── Sanity Image Reference ──────────────────────────────────
export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// ─── Sanity Slug ─────────────────────────────────────────────
export interface SanitySlug {
  _type: "slug";
  current: string;
}

// ─── Sanity Block Content (Portable Text) ────────────────────
export interface SanityBlock {
  _key: string;
  _type: "block";
  style: string;
  children: {
    _key: string;
    _type: "span";
    marks: string[];
    text: string;
  }[];
  markDefs: {
    _key: string;
    _type: string;
    href?: string;
  }[];
}

export type PortableTextContent = (SanityBlock | { _type: string; [key: string]: unknown })[];

// ─── Service ─────────────────────────────────────────────────
export interface Service {
  _id: string;
  _type: "service";
  title: string;
  icon?: string;           // SVG string or emoji icon
  briefDescription?: string;
  startingPrice?: number;
}

// ─── Project ─────────────────────────────────────────────────
export interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImageAsset;
  gallery?: SanityImageAsset[];
  localizedLocation?: string;   // e.g. "Kitchen Set Minimalis, Slawi"
  description?: PortableTextContent;
  completionDate?: string;       // ISO date string
  category?: Service;            // Populated via _ref
  materialsUsed?: string;
  duration?: string;
  priceRange?: string;
}

// ─── Site Settings (Singleton) ───────────────────────────────
export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  companyName?: string;
  mainHeroImage?: SanityImageAsset;
  contactNumber?: string;
  contactAddress?: string;
  email?: string;
  /**
   * WhatsApp number in international format WITHOUT spaces or '+' prefix.
   * Example: "6281385203317"
   * Usage: `https://wa.me/${whatsappNumber}?text=...`
   */
  whatsappNumber?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  googleMapsEmbedUrl?: string;
}

// ─── Utility: WhatsApp URL builder ──────────────────────────
export const WA_MESSAGE_TEMPLATE =
  "Hallo%20BQ%20Kitchen%2C%20saya%20tertarik%20konsultasi%20mengenai...";

export function buildWhatsAppUrl(number: string = "6281385203317"): string {
  return `https://wa.me/${number}?text=${WA_MESSAGE_TEMPLATE}`;
}
