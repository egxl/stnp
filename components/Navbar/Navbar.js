'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { useLoading } from '@/components/LoadingScreen/LoadingProvider';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import StaggeredMenu from './StaggeredMenu';

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

  // Scroll detection for glassmorphism header
  useEffect(() => {
    const header = document.getElementById('site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle(styles.scrolled, window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide until the loading curtain finishes
  if (!isReady) return null;

  return (
    <header
      id="site-header"
      className={`${styles.header} ${styles.ready}`}
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

        {/* Desktop: CTA Button, Language Switcher, and Theme Toggle */}
        <div className={styles.desktopControls}>
          <LanguageSwitcher lang={lang} pathname={pathname} router={router} />
          <ThemeToggle />
          <Link href={`/${lang}/contact`} className={styles.ctaButton} transitionTypes={['nav-forward']}>
            {d.consultation}
          </Link>
        </div>

        {/* Mobile/Tablet: StaggeredMenu — replaces the bugged hamburger */}
        <StaggeredMenu
          navLinks={navLinks}
          lang={lang}
          pathname={pathname}
          router={router}
          navDict={d}
          getTransitionType={getTransitionType}
        />
      </nav>
    </header>
  );
}
