import { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.kitchensetslawitegal.com";

  // Get all project slugs from Sanity
  const projectSlugs = await getAllProjectSlugs();

  // Create dynamic URLs for each project
  const projectUrls: MetadataRoute.Sitemap = projectSlugs.map((slugObj) => ({
    url: `${baseUrl}/proyek/${slugObj.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Static URLs
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/proyek`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...projectUrls];
}
