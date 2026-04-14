export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/queries";
import { imagePresets, urlFor } from "@/lib/sanity.image";
import { buildWhatsAppUrl } from "@/types";
import type { PortableTextContent } from "@/types";

// ─── Static Params for SSG ──────────────────────────────────
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs;
}

// ─── Dynamic Metadata per Page ──────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Proyek Tidak Ditemukan" };
  }

  const ogImage = project.mainImage
    ? imagePresets.og(project.mainImage)
    : undefined;

  return {
    title: `${project.title} — ${project.localizedLocation || "Portfolio"}`,
    description: `Proyek ${project.title} di ${project.localizedLocation || "Tegal/Slawi"} oleh BQ Kitchen Set & Interior Design. ${project.category?.title || "Kitchen Set Custom"}.`,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: `${project.title} | BQ Kitchen Set`,
      description: `Proyek ${project.category?.title || "Interior"} di ${project.localizedLocation || "Tegal/Slawi"}`,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      type: "article",
    },
  };
}

import { PortableText } from '@portabletext/react';

// Using PortableText component from @portabletext/react directly in jsx later// ─── Project Detail Page ────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const waUrl = buildWhatsAppUrl();

  // JSON-LD: CreativeWork schema
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: `Proyek ${project.category?.title || "Interior"} di ${project.localizedLocation || "Tegal"} oleh BQ Kitchen Set.`,
    creator: {
      "@type": "Organization",
      name: "BQ Kitchen Set & Interior Design",
    },
    image: project.mainImage ? imagePresets.og(project.mainImage) : undefined,
    datePublished: project.completionDate,
    locationCreated: {
      "@type": "Place",
      name: project.localizedLocation || "Tegal, Jawa Tengah",
    },
    genre: project.category?.title,
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      {/* ── Project Hero ─────────────────────────────── */}
      <section className="project-hero">
        <div className="project-hero__bg">
          {project.mainImage ? (
            <Image
              src={imagePresets.hero(project.mainImage)}
              alt={project.mainImage.alt || project.title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="hero__bg-placeholder" />
          )}
          <div className="hero__overlay" />
        </div>

        <div className="container-site project-hero__content">
          <Link href="/portfolio" className="project-hero__back">
            ← Kembali ke Portfolio
          </Link>
          <h1 className="project-hero__title">{project.title}</h1>
          <div className="project-hero__meta">
            {project.localizedLocation && (
              <span className="project-hero__meta-item">📍 {project.localizedLocation}</span>
            )}
            {project.category && (
              <span className="project-hero__meta-item project-card__tag">{project.category.title}</span>
            )}
            {project.completionDate && (
              <span className="project-hero__meta-item">
                📅 {new Date(project.completionDate).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Project Content ──────────────────────────── */}
      <section className="section-py">
        <div className="container-site project-detail">
          {/* Left: Description */}
          <div className="project-detail__main">
            <div className="portable-text">
              {project.description ? <PortableText value={project.description as any} /> : null}
            </div>

            {/* Project Info Cards */}
            <div className="project-info-cards">
              {project.materialsUsed && (
                <div className="info-card">
                  <span className="info-card__icon">🪵</span>
                  <div>
                    <p className="info-card__label">Material</p>
                    <p className="info-card__value">{project.materialsUsed}</p>
                  </div>
                </div>
              )}
              {project.duration && (
                <div className="info-card">
                  <span className="info-card__icon">⏱️</span>
                  <div>
                    <p className="info-card__label">Durasi Pengerjaan</p>
                    <p className="info-card__value">{project.duration}</p>
                  </div>
                </div>
              )}
              {project.priceRange && (
                <div className="info-card">
                  <span className="info-card__icon">💰</span>
                  <div>
                    <p className="info-card__label">Estimasi Biaya</p>
                    <p className="info-card__value">{project.priceRange}</p>
                  </div>
                </div>
              )}
              {project.category && (
                <div className="info-card">
                  <span className="info-card__icon">{project.category.briefDescription ? "🛠️" : "📐"}</span>
                  <div>
                    <p className="info-card__label">Kategori</p>
                    <p className="info-card__value">{project.category.title}</p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="project-cta">
              <p>Tertarik dengan proyek serupa? Konsultasikan kebutuhan Anda secara <strong>GRATIS</strong>.</p>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 Chat WhatsApp Sekarang
              </a>
            </div>
          </div>

          {/* Right: Gallery */}
          <div className="project-detail__gallery">
            <h3 className="project-detail__gallery-title">Galeri Foto</h3>
            {project.gallery && project.gallery.length > 0 ? (
              <div className="gallery-grid">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="gallery-item">
                    <Image
                      src={imagePresets.gallery(img)}
                      alt={img.alt || `${project.title} - Foto ${idx + 1}`}
                      width={600}
                      height={450}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Galeri foto belum tersedia.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
