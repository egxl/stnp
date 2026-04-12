'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from '@phosphor-icons/react';
import styles from './Navbar.module.css';
import { useLoading } from '@/components/LoadingScreen/LoadingProvider';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

// Hierarchy order: links after index 0 are "forward" from Home
// and "back" when navigating back to Home.
function getTransitionType(fromPath, toHref) {
  if (toHref === '/' || toHref.endsWith('/')) return ['nav-back'];
  return ['nav-forward'];
}

export default function Navbar({ navDict, lang = 'en' }) {
  const { isReady } = useLoading();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const fallbackKeys = {
    home: 'Home', about: 'About', services: 'Services',
    team: 'Team', articles: 'Articles', contact: 'Contact',
    consultation: 'Consultation', freeConsultation: 'Free Consultation'
  };
  const d = navDict || fallbackKeys;

  const navLinks = [
    { href: `/${lang}`, label: d.home },
    { href: `/${lang}/about-us`, label: d.about },
    { href: `/${lang}/legal-services`, label: d.services },
    { href: `/${lang}/team-profile`, label: d.team },
    { href: `/${lang}/article`, label: d.articles },
    { href: `/${lang}/contact`, label: d.contact },
  ];

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
          href={`/${lang}`}
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

        {/* CTA Button, Language Switcher, and Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'rgba(255,255,255,0.8)' }}>
          <LanguageSwitcher lang={lang} pathname={pathname} router={router} />
          <ThemeToggle />
          <Link href={`/${lang}/contact`} className={styles.ctaButton} transitionTypes={['nav-forward']}>
            {d.consultation}
          </Link>
        </div>

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem', alignItems: 'flex-start', padding: '0 2rem', color: 'rgba(255,255,255,0.8)' }}>
          <div style={{ transform: 'translateX(-8px)' }}>
            <LanguageSwitcher lang={lang} pathname={pathname} router={router} />
          </div>
          <ThemeToggle />
          <Link
            href={`/${lang}/contact`}
            className={`btn btn--primary ${styles.mobileCta}`}
            onClick={() => setMobileOpen(false)}
            transitionTypes={['nav-forward']}
          >
            {d.freeConsultation}
          </Link>
        </div>
      </div>
    </header>
  );
}
