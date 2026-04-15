import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Next.js Draft Mode — Activation Route
 * This allows Sanity Studio to request a "Preview" version of the site.
 * 
 * Usage: /api/draft?slug=...&token=... (optional token check)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // In a real production app, check for a secret token here
  // const token = searchParams.get("token");
  // if (token !== process.env.SANITY_REVALIDATE_SECRET) return new Response("Invalid token", { status: 401 });

  (await draftMode()).enable();

  // Redirect to the slug being previewed, or fallback to homepage
  redirect(slug ? `/proyek/${slug}` : "/");
}
