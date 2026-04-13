import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects, getAllServices, getSiteSettings } from "@/lib/queries";
import { imagePresets, urlFor } from "@/lib/sanity.image";
import { buildWhatsAppUrl } from "@/types";

// ─── Service Icons (fallback when Sanity icon is not set) ────
const defaultServiceIcons: Record<string, string> = {
  "Kitchen Set": "🍳",
  "Wardrobe Custom": "👔",
  "Interior Rumah/Kantor": "🏠",
};

// ─── Home Page ───────────────────────────────────────────────
export default async function HomePage() {
  // Fetch data from Sanity (server component — runs at build/request time)
  const [settings, featuredProjects, services] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getAllServices(),
  ]);

  const waUrl = buildWhatsAppUrl(settings?.whatsappNumber);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section id="hero" className="hero">
        {/* Background Image */}
        <div className="hero__bg">
          {settings?.mainHeroImage ? (
            <Image
              src={imagePresets.hero(settings.mainHeroImage)}
              alt={settings.mainHeroImage.alt || "Kitchen Set Premium BQ Kitchen Tegal Slawi"}
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

        {/* Hero Content */}
        <div className="container-site hero__content">
          <p className="hero__eyebrow">BQ Kitchen Set &amp; Interior Design</p>
          <h1 className="hero__title">
            Wujudkan <span className="gold-accent">Dapur Impian</span> di Tegal &amp; Slawi
          </h1>
          <p className="hero__subtitle">
            Spesialis Kitchen Set &amp; Interior Design Kustom — Pengerjaan Profesional, Material Premium, Hasil Elegan.
          </p>
          <div className="hero__actions">
            <Link href="/portfolio" className="btn-primary">
              Lihat Katalog Proyek
            </Link>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-outline--light">
              💬 Konsultasi Gratis
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED PROJECTS
          ═══════════════════════════════════════════════════════ */}
      <section id="portfolio" className="section-py">
        <div className="container-site">
          <div className="section-header">
            <p className="section-header__eyebrow gold-accent">Portfolio Terbaru</p>
            <h2 className="section-title">Proyek Pilihan Kami</h2>
            <p className="section-header__desc">
              Setiap proyek kami kerjakan dengan dedikasi tinggi dan perhatian terhadap detail.
            </p>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="projects-grid">
              {featuredProjects.map((project, idx) => (
                <Link
                  key={project._id}
                  href={`/portfolio/${project.slug?.current}`}
                  className={`project-card ${idx === 0 ? "project-card--featured" : ""}`}
                >
                  <div className="project-card__img">
                    {project.mainImage ? (
                      <Image
                        src={imagePresets.card(project.mainImage)}
                        alt={project.mainImage.alt || project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="project-card__placeholder">📷</div>
                    )}
                  </div>
                  <div className="project-card__info">
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__location">
                      📍 {project.localizedLocation || "Tegal / Slawi"}
                    </p>
                    {project.category && (
                      <span className="project-card__tag">{project.category.title}</span>
                    )}
                    {project.priceRange && (
                      <span className="project-card__price-tag">💰 {project.priceRange}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Belum ada proyek. Tambahkan proyek pertama di <strong>Sanity Studio</strong>.</p>
            </div>
          )}

          <div className="section-cta">
            <Link href="/portfolio" className="btn-outline">
              Lihat Semua Proyek →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES
          ═══════════════════════════════════════════════════════ */}
      <section id="layanan" className="section-py services-section">
        <div className="container-site">
          <div className="section-header">
            <p className="section-header__eyebrow gold-accent">Layanan Kami</p>
            <h2 className="section-title">Apa yang Kami Tawarkan</h2>
            <p className="section-header__desc">
              Dari kitchen set modern hingga interior kantor — kami hadir untuk mewujudkan ruang impian Anda.
            </p>
          </div>

          <div className="services-grid">
            {services.length > 0
              ? services.map((service) => (
                  <div key={service._id} className="service-card">
                    <span className="service-card__icon">
                      {service.icon || defaultServiceIcons[service.title] || "✨"}
                    </span>
                    <h3 className="service-card__title">{service.title}</h3>
                    <p className="service-card__desc">
                      {service.briefDescription || "Kustomisasi penuh sesuai kebutuhan dan selera Anda."}
                    </p>
                    {service.startingPrice && (
                      <p className="service-card__price">
                        Mulai dari <span>Rp {service.startingPrice.toLocaleString("id-ID")}</span>
                      </p>
                    )}
                  </div>
                ))
              : // Fallback when no services in CMS yet
                [
                  { title: "Kitchen Set", icon: "🍳", desc: "Desain & pembuatan kitchen set custom berkualitas tinggi, disesuaikan dengan ruang dan gaya Anda." },
                  { title: "Wardrobe Custom", icon: "👔", desc: "Lemari pakaian kustom dengan ruang penyimpanan optimal dan desain modern." },
                  { title: "Interior Rumah & Kantor", icon: "🏠", desc: "Solusi interior terpadu untuk hunian dan ruang kerja yang nyaman dan estetis." },
                ].map((s) => (
                  <div key={s.title} className="service-card">
                    <span className="service-card__icon">{s.icon}</span>
                    <h3 className="service-card__title">{s.title}</h3>
                    <p className="service-card__desc">{s.desc}</p>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT / TRUST BLOCK
          ═══════════════════════════════════════════════════════ */}
      <section id="tentang" className="section-py">
        <div className="container-site">
          <div className="trust-block">
            <div className="trust-block__content">
              <p className="section-header__eyebrow gold-accent">Mengapa Memilih Kami?</p>
              <h2 className="section-title">Pengalaman &amp; Kepercayaan</h2>
              <p className="trust-block__text">
                BQ Kitchen Set &amp; Interior Design telah dipercaya oleh puluhan klien di area
                <strong> Tegal</strong>, <strong>Slawi</strong>, dan sekitarnya.
                Kami mengutamakan kualitas material, ketepatan waktu, dan hasil yang memuaskan.
              </p>
              <ul className="trust-block__list">
                <li>✅ Material premium (HPL, Plywood, Engsel Blum)</li>
                <li>✅ Tim berpengalaman &amp; profesional</li>
                <li>✅ Garansi setiap proyek</li>
                <li>✅ Konsultasi &amp; pengukuran GRATIS</li>
              </ul>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 Hubungi Kami Sekarang
              </a>
            </div>

            {/* Google Maps Embed */}
            <div className="trust-block__map" id="kontak">
              {settings?.googleMapsEmbedUrl ? (
                <iframe
                  src={settings.googleMapsEmbedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi BQ Kitchen Set — Dukuhdamu, Lebaksiu, Tegal"
                />
              ) : (
                <div className="trust-block__map-placeholder">
                  <p>📍 Dukuhdamu, Lebaksiu, Tegal, Jawa Tengah</p>
                  <p className="trust-block__map-note">
                    Google Maps embed akan muncul setelah URL dikonfigurasi di Sanity CMS.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA BANNER
          ═══════════════════════════════════════════════════════ */}
      <section className="cta-banner">
        <div className="container-site cta-banner__inner">
          <h2 className="cta-banner__title">Siap Wujudkan Dapur Impian Anda?</h2>
          <p className="cta-banner__text">
            Konsultasikan kebutuhan Anda secara GRATIS. Tim kami siap membantu dari pengukuran hingga pemasangan.
          </p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary cta-banner__btn">
            💬 Chat via WhatsApp Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
