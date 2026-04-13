import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./sanity.client";

// Use the SanityImageSource type directly from the builder's input type
type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0];

/**
 * Sanity Image URL Builder
 *
 * Uses @sanity/image-url to construct optimized CDN image URLs.
 * Images are automatically resized and converted to WebP by Sanity CDN.
 *
 * Usage examples:
 *   urlFor(image).width(800).format("webp").url()
 *   urlFor(image).width(400).height(300).fit("crop").url()
 *   urlFor(image).width(1200).quality(85).format("webp").url()
 */
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Pre-built image URL helpers for common use cases.
 * Always outputs WebP format for optimal web performance.
 */
export const imagePresets = {
  /** Hero banner - 1440×810 (16:9) */
  hero: (source: SanityImageSource) =>
    urlFor(source).width(1440).height(810).fit("crop").format("webp").quality(90).url(),

  /** Portfolio card thumbnail - 800×600 */
  card: (source: SanityImageSource) =>
    urlFor(source).width(800).height(600).fit("crop").format("webp").quality(85).url(),

  /** Gallery full image - max 1200px wide */
  gallery: (source: SanityImageSource) =>
    urlFor(source).width(1200).format("webp").quality(88).url(),

  /** OG / social share - 1200×630 */
  og: (source: SanityImageSource) =>
    urlFor(source).width(1200).height(630).fit("crop").format("webp").quality(85).url(),

  /** Service icon - 64px square */
  icon: (source: SanityImageSource) =>
    urlFor(source).width(64).height(64).fit("crop").format("webp").url(),
};
