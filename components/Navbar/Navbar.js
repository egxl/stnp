'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
      className={`
        fixed top-0 left-0 right-0 z-[1000] px-8 max-md:px-4
        transition-[background-color,box-shadow,backdrop-filter] duration-200 ease-[var(--ease-out-custom)]
        animate-[navFadeIn_0.5s_var(--ease-out-custom)_both]
        ${scrolled
          ? 'bg-[rgba(10,22,40,0.95)] backdrop-blur-[12px] shadow-[0_2px_20px_rgba(0,0,0,0.15)]'
          : 'bg-transparent'
        }
      `}
      style={{ viewTransitionName: 'site-header' }}
    >
      <nav className="flex items-center justify-between mx-auto h-[var(--nav-height)] max-w-[var(--max-width-wide)] px-4 lg:px-8">
        {/* Logo — going to Home is always nav-back */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline z-10 group"
          aria-label="Home"
          transitionTypes={['nav-back']}
        >
          <img
            src="/images/logo.png"
            alt="Soaloan Tua Nababan & Partners Logo"
            className="transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex list-none gap-4">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    relative block px-4 py-2 text-sm font-medium
                    tracking-[0.02em] rounded-[var(--radius-sm)]
                    transition-colors duration-[125ms] ease-[var(--ease-out-custom)]
                    after:content-[''] after:absolute after:bottom-0.5 after:left-4 after:right-4
                    after:h-px after:bg-accent after:origin-left
                    after:transition-transform after:duration-200
                    ${isActive
                      ? 'after:scale-x-100'
                      : 'after:scale-x-0 hover:after:scale-x-100'
                    }
                  `}
                  style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.75)' }}
                  transitionTypes={getTransitionType(pathname, link.href)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex btn btn--primary px-6 py-2.5 text-xs"
          transitionTypes={['nav-forward']}
        >
          Consultation
        </Link>

        {/* Mobile Toggle */}
        <button
          className="flex lg:hidden flex-col gap-[5px] p-2 z-10 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block w-6 h-0.5 bg-white rounded-sm transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white rounded-sm transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white rounded-sm transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 flex flex-col items-center justify-center gap-12
          transition-opacity duration-300 z-5
          ${mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}
        `}
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <ul className="list-none text-center flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ animationDelay: `${i * 0.05}s` }}
              className={mobileOpen ? 'animate-[fadeInUp_0.4s_var(--ease-out-custom)_both]' : ''}
            >
              <Link
                href={link.href}
                className="
                  font-[family-name:var(--font-heading)] text-[var(--text-h3)] font-medium
                  text-white transition-colors duration-150 block py-2
                  hover:text-accent
                "
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
          className="inline-flex btn btn--primary px-8 py-3.5 mt-4"
          onClick={() => setMobileOpen(false)}
          transitionTypes={['nav-forward']}
        >
          Free Consultation
        </Link>
      </div>
    </header>
  );
}
