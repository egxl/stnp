'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { useLoading } from '@/components/LoadingScreen/LoadingProvider';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About' },
  { href: '/legal-services', label: 'Services' },
  { href: '/team-profile', label: 'Team' },
  { href: '/article', label: 'Articles' },
  { href: '/contact', label: 'Contact' },
];

// Hierarchy order: links after index 0 are "forward" from Home
// and "back" when navigating back to Home.
function getTransitionType(fromPath, toHref) {
  if (toHref === '/') return ['nav-back'];
  return ['nav-forward'];
}

export default function Navbar() {
  const { isReady } = useLoading();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hooks must always run — never conditionally
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Hide until the loading curtain finishes
  if (!isReady) return null;

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${styles.ready}`}
      style={{ viewTransitionName: 'site-header' }}
    >
      <nav className={styles.nav}>
        {/* Logo — going to Home is always nav-back */}
        <Link
          href="/"
          className={styles.logo}
          aria-label="Home"
          transitionTypes={['nav-back']}
        >
          <img
            src="/images/logo.png"
            alt="Soaloan Tua Nababan & Partners Logo"
            className={styles.logoImage}
          />
        </Link>

        {/* Desktop Nav */}
        <ul className={styles.desktopLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.navLink}
                transitionTypes={getTransitionType(pathname, link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link href="/contact" className={styles.ctaButton} transitionTypes={['nav-forward']}>
          Consultation
        </Link>

        {/* Mobile Toggle */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.active : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <ul className={styles.mobileLinks}>
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ animationDelay: `${i * 0.05}s` }}>
              <Link
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
                transitionTypes={getTransitionType(pathname, link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className={`btn btn--primary ${styles.mobileCta}`}
          onClick={() => setMobileOpen(false)}
          transitionTypes={['nav-forward']}
        >
          Free Consultation
        </Link>
      </div>
    </header>
  );
}
