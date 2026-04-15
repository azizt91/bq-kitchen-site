"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCard {
  _id: string;
  title: string;
  slug: string;
  mainImageUrl: string | null;
  mainImageAlt: string;
  localizedLocation: string;
  categoryTitle: string;
  priceRange: string | null;
}

interface ProyekFilterProps {
  projects: ProjectCard[];
  categories: string[];
  locations: string[];
}

export default function ProyekFilter({
  projects,
  categories,
  locations,
}: ProyekFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [activeLocation, setActiveLocation] = useState<string>("Semua");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat =
        activeCategory === "Semua" || p.categoryTitle === activeCategory;
      const matchLoc =
        activeLocation === "Semua" || p.localizedLocation === activeLocation;
      return matchCat && matchLoc;
    });
  }, [projects, activeCategory, activeLocation]);

  return (
    <>
      {/* ── Filter Bar ───────────────────────────────── */}
      <div className="filter-bar">
        {/* Category Filter */}
        <div className="filter-group">
          <label className="filter-label">Kategori:</label>
          <div className="filter-pills">
            {["Semua", ...categories].map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? "filter-pill--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        {locations.length > 0 && (
          <div className="filter-group">
            <label className="filter-label">Lokasi:</label>
            <div className="filter-pills">
              {["Semua", ...locations].map((loc) => (
                <button
                  key={loc}
                  className={`filter-pill ${activeLocation === loc ? "filter-pill--active" : ""}`}
                  onClick={() => setActiveLocation(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Results ──────────────────────────────────── */}
      <p className="filter-count">
        Menampilkan <strong>{filteredProjects.length}</strong> dari {projects.length} proyek
      </p>

      {filteredProjects.length > 0 ? (
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <Link
              key={project._id}
              href={`/proyek/${project.slug}`}
              className="project-card"
            >
              <div className="project-card__img">
                {project.mainImageUrl ? (
                  <Image
                    src={project.mainImageUrl}
                    alt={project.mainImageAlt}
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
                {project.categoryTitle && (
                  <span className="project-card__tag">{project.categoryTitle}</span>
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
          <p>Tidak ada proyek yang cocok dengan filter.</p>
          <button
            className="btn-outline"
            onClick={() => {
              setActiveCategory("Semua");
              setActiveLocation("Semua");
            }}
          >
            Reset Filter
          </button>
        </div>
      )}
    </>
  );
}
