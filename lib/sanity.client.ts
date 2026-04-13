import { createClient } from "@sanity/client";

const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET    || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

/**
 * Public client — used for fetching published content on the frontend.
 * CDN caching is enabled for performance.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use Sanity CDN for caching (faster reads)
  perspective: "published",
});

/**
 * Server-side client — used for authenticated reads (e.g., draft preview).
 * CDN is disabled so we always get the freshest data.
 */
export const sanityServerClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});
