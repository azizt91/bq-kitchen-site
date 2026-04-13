import Link from "next/link";
import type { SiteSettings } from "@/types";

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

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

interface FooterProps {
  settings: SiteSettings | null;
}

// ─── Footer Component ────────────────────────────────────────
export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="footer">
      <div className="container-site">
        {/* ── Top Section ──────────────────────────────── */}
        <div className="footer__grid">
          {/* Column 1: Brand */}
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              <span className="footer__logo-icon">BQ</span>
              <span className="footer__logo-text">
                {settings?.companyName || "BQ Kitchen Set & Interior Design"}
              </span>
            </Link>
            <p className="footer__tagline">
              Wujudkan dapur impian dan interior premium Anda bersama kami. Melayani area Tegal, Slawi, dan sekitarnya.
            </p>
            <div className="footer__social">
              {settings?.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
                  <InstagramIcon />
                </a>
              )}
              {settings?.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
                  <FacebookIcon />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer__column">
            <h4 className="footer__heading">Menu</h4>
            <nav className="footer__links" aria-label="Footer navigation">
              <Link href="/portfolio" className="footer__link">Portfolio</Link>
              <Link href="/#layanan" className="footer__link">Layanan</Link>
              <Link href="/#tentang" className="footer__link">Tentang Kami</Link>
              <Link href="/#kontak" className="footer__link">Kontak</Link>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div className="footer__column">
            <h4 className="footer__heading">Layanan Kami</h4>
            <nav className="footer__links">
              <span className="footer__link-text">Kitchen Set Custom</span>
              <span className="footer__link-text">Wardrobe / Lemari</span>
              <span className="footer__link-text">Interior Rumah & Kantor</span>
              <span className="footer__link-text">Renovasi Dapur</span>
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div className="footer__column">
            <h4 className="footer__heading">Hubungi Kami</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <PhoneIcon />
                <span>{settings?.contactNumber || "0813-8520-3317"}</span>
              </div>
              <div className="footer__contact-item">
                <MailIcon />
                <a href={`mailto:${settings?.email || "bqkitchen12@gmail.com"}`} className="footer__contact-link">
                  {settings?.email || "bqkitchen12@gmail.com"}
                </a>
              </div>
              <div className="footer__contact-item">
                <MapPinIcon />
                <span>{settings?.contactAddress || "Dukuhdamu, Lebaksiu, Tegal, Jawa Tengah"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ─────────────────────────────── */}
        <div className="footer__divider" />

        {/* ── Bottom Bar ──────────────────────────────── */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {currentYear} {settings?.companyName || "BQ Kitchen Set & Interior Design"}. Hak cipta dilindungi.
          </p>
          <p className="footer__credit">
            Melayani seluruh area <strong>Tegal</strong>, <strong>Slawi</strong>, dan sekitarnya.
          </p>
        </div>
      </div>
    </footer>
  );
}
