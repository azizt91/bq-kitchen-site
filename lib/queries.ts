import { sanityClient } from "./sanity.client";
import type { Project, Service, SiteSettings } from "@/types";

// ──────────────────────────────────────────────────────────────
// GROQ Query Definitions
// ──────────────────────────────────────────────────────────────

/** Reusable fragment: project fields without heavy gallery */
const PROJECT_CARD_FIELDS = `
  _id,
  title,
  slug,
  mainImage,
  localizedLocation,
  completionDate,
  priceRange,
  "category": category->{ _id, title }
`;

/** Full project fields including gallery and rich text */
const PROJECT_FULL_FIELDS = `
  _id,
  title,
  slug,
  mainImage,
  gallery,
  localizedLocation,
  description,
  completionDate,
  materialsUsed,
  duration,
  priceRange,
  "category": category->{ _id, title, briefDescription }
`;

/**
 * Safe fetch wrapper — returns fallback value if Sanity is unreachable
 * (e.g. during development with a placeholder project ID).
 */
async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, params, { next: { revalidate: 3600 } });
  } catch (error) {
    console.warn("[Sanity] Fetch failed (is your Project ID configured?):", (error as Error).message);
    return fallback;
  }
}

// ──────────────────────────────────────────────────────────────
// Site Settings (Singleton)
// ──────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0]{
      _id,
      _type,
      companyName,
      mainHeroImage,
      contactNumber,
      contactAddress,
      whatsappNumber,
      instagramUrl,
      facebookUrl,
      googleMapsEmbedUrl
    }`,
    {},
    null,
  );
}

// ──────────────────────────────────────────────────────────────
// Projects
// ──────────────────────────────────────────────────────────────

/** Fetch 4 most recent projects for the homepage featured grid */
export async function getFeaturedProjects(): Promise<Project[]> {
  return safeFetch<Project[]>(
    `*[_type == "project"] | order(_createdAt desc) [0..3] {
      ${PROJECT_CARD_FIELDS}
    }`,
    {},
    [],
  );
}

/** Fetch ALL projects for the portfolio page */
export async function getAllProjects(): Promise<Project[]> {
  return safeFetch<Project[]>(
    `*[_type == "project"] | order(_createdAt desc) {
      ${PROJECT_CARD_FIELDS}
    }`,
    {},
    [],
  );
}

/** Fetch a single project by slug for the dynamic project page */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return safeFetch<Project | null>(
    `*[_type == "project" && slug.current == $slug][0] {
      ${PROJECT_FULL_FIELDS}
    }`,
    { slug },
    null,
  );
}

/** Fetch all project slugs for generateStaticParams */
export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  try {
    const slugs = await sanityClient.fetch<{ slug: { current: string } }[]>(
      `*[_type == "project"]{ slug }`,
      {},
      { next: { revalidate: 3600 } },
    );
    return slugs.map((item) => ({ slug: item.slug.current }));
  } catch {
    console.warn("[Sanity] Could not fetch project slugs.");
    return [];
  }
}

// ──────────────────────────────────────────────────────────────
// Services
// ──────────────────────────────────────────────────────────────

export async function getAllServices(): Promise<Service[]> {
  return safeFetch<Service[]>(
    `*[_type == "service"] | order(_createdAt asc) {
      _id,
      _type,
      title,
      icon,
      briefDescription,
      startingPrice
    }`,
    {},
    [],
  );
}
