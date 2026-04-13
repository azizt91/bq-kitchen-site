import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects, getAllServices } from "@/lib/queries";
import { imagePresets } from "@/lib/sanity.image";
import PortfolioFilter from "./PortfolioFilter";

// ── SEO Metadata ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Portfolio Proyek Kitchen Set & Interior",
  description:
    "Lihat katalog lengkap proyek Kitchen Set, Wardrobe, dan Interior Design " +
    "yang telah kami kerjakan di area Tegal, Slawi, dan sekitarnya.",
  alternates: { canonical: "/portfolio" },
};

// ── Portfolio Page (Server Component) ────────────────────────
export default async function PortfolioPage() {
  const [projects, services] = await Promise.all([
    getAllProjects(),
    getAllServices(),
  ]);

  // Extract unique locations for filter options
  const locations = Array.from(
    new Set(projects.map((p) => p.localizedLocation).filter(Boolean))
  ) as string[];

  // Serialize for client component
  const serializedProjects = projects.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug?.current || "",
    mainImageUrl: p.mainImage ? imagePresets.card(p.mainImage) : null,
    mainImageAlt: p.mainImage?.alt || p.title,
    localizedLocation: p.localizedLocation || "",
    categoryTitle: p.category?.title || "",
    priceRange: p.priceRange || null,
  }));

  return (
    <>
      {/* Hero Banner */}
      <section className="portfolio-hero">
        <div className="container-site">
          <p className="section-header__eyebrow gold-accent">Portfolio</p>
          <h1 className="section-title">Semua Proyek Kami</h1>
          <p className="portfolio-hero__desc">
            Telusuri semua proyek Kitchen Set &amp; Interior Design yang telah kami selesaikan
            di area Tegal, Slawi, dan sekitarnya.
          </p>
        </div>
      </section>

      {/* Filter + Grid (client component) */}
      <section className="section-py">
        <div className="container-site">
          <PortfolioFilter
            projects={serializedProjects}
            categories={services.map((s) => s.title)}
            locations={locations}
          />
        </div>
      </section>
    </>
  );
}
