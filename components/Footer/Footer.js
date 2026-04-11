import Link from 'next/link';
import { firmInfo } from '@/lib/data/team';
import { services } from '@/lib/data/services';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const address = firmInfo.address;

  return (
    <footer className={styles.footer}>
      {/* Gold accent line */}
      <div className={styles.accentLine} />

      <div className={`container ${styles.grid}`}>
        {/* Column 1: About */}
        <div className={styles.col}>
          <div className={styles.footerLogo}>
            <img 
              src="/images/logo.png" 
              alt="Soaloan Tua Nababan & Partners Logo"
              className={styles.logoImage}
            />
          </div>
          <p className={styles.about}>
            {firmInfo.tagline}
          </p>
          <hr className={styles.divider} />
          <p className={styles.quote}>
            &ldquo;{firmInfo.quote}&rdquo;
            <span className={styles.quoteAuthor}>— {firmInfo.quoteAuthor}</span>
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/legal-services">Legal Services</Link></li>
            <li><Link href="/team-profile">Our Team</Link></li>
            <li><Link href="/article">Articles</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Practice Areas */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Practice Areas</h4>
          <ul className={styles.linkList}>
            {services.map((s) => (
              <li key={s.id}>
                <Link href="/legal-services">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact Us</h4>
          <address className={styles.address}>
            <div className={styles.addressItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>
                {address.line1}<br />
                {address.line2}<br />
                {address.city}, {address.postal}
              </span>
            </div>
            <div className={styles.addressItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>
                {firmInfo.phone[0]}<br />
                {firmInfo.phone[1]}
              </span>
            </div>
            <div className={styles.addressItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href={`mailto:${firmInfo.email}`}>{firmInfo.email}</a>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copyright}>
            &copy; {currentYear} {firmInfo.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
