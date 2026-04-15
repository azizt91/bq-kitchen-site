"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { buildWhatsAppUrl } from "@/types";
import type { SiteSettings } from "@/types";

// ─── Nav Links ───────────────────────────────────────────────
const navLinks = [
  { label: "Proyek", href: "/proyek" },
  { label: "Layanan", href: "/#layanan" },
  { label: "Tentang Kami", href: "/#tentang" },
  { label: "Kontak", href: "/#kontak" },
];

// ─── Social Icons ────────────────────────────────────────────
function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

interface HeaderProps {
  settings: SiteSettings | null;
}

// ─── Header Component ────────────────────────────────────────
export default function Header({ settings }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when navigating
  const handleLinkClick = () => setIsOpen(false);

  const waUrl = buildWhatsAppUrl(settings?.whatsappNumber);

  return (
    <header
      id="site-header"
      className={`header ${scrolled ? "header--scrolled" : ""}`}
    >
      <div className="container-site header__inner">
        {/* ── Logo ─────────────────────────────────────── */}
        <Link href="/" className="header__logo" onClick={handleLinkClick}>
          <Image
            src="/bq-logo.png"
            alt={settings?.companyName || "BQ Kitchen Set & Interior Design"}
            width={56}
            height={56}
            className="header__logo-img"
            priority
          />
          <span className="header__logo-text">
            {settings?.companyName || "BQ Kitchen Set & Interior Design"}
          </span>
        </Link>

        {/* ── Desktop Nav ──────────────────────────────── */}
        <nav className="header__nav" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="header__link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop Actions ──────────────────────────── */}
        <div className="header__actions">
          <div className="header__social">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="header__social-link">
                <InstagramIcon />
              </a>
            )}
            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="header__social-link">
                <FacebookIcon />
              </a>
            )}
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary header__cta">
            Konsultasi Gratis
          </a>
        </div>

        {/* ── Mobile Hamburger ─────────────────────────── */}
        <button
          className="header__burger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* ── Mobile Overlay ─────────────────────────────── */}
      <div className={`header__mobile ${isOpen ? "header__mobile--open" : ""}`}>
        {/* Dedicated close button inside the overlay */}
        <button
          className="header__mobile-close"
          onClick={() => setIsOpen(false)}
          aria-label="Tutup menu"
        >
          <CloseIcon />
        </button>

        <nav className="header__mobile-nav" aria-label="Navigasi mobile">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="header__mobile-link" onClick={handleLinkClick}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header__mobile-social">
          {settings?.instagramUrl && (
            <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="header__social-link">
              <InstagramIcon />
            </a>
          )}
          {settings?.facebookUrl && (
            <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="header__social-link">
              <FacebookIcon />
            </a>
          )}
        </div>

        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary header__mobile-cta">
          💬 Konsultasi Gratis via WhatsApp
        </a>
      </div>
    </header>
  );
}
