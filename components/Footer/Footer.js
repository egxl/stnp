'use client';

import Link from 'next/link';
import { firmInfo } from '@/lib/data/team';
import { services } from '@/lib/data/services';
import { useLoading } from '@/components/LoadingScreen/LoadingProvider';

export default function Footer() {
  const { isReady } = useLoading();
  const currentYear = new Date().getFullYear();
  const address = firmInfo.address;

  if (!isReady) return null;

  return (
    <footer className="bg-primary text-white/75 pt-0">
      {/* Gold accent line */}
      <div className="h-[3px] bg-gradient-to-r from-accent-dark via-accent to-accent-light" />

      <div className="w-full max-w-[var(--max-width-default)] mx-auto px-8 max-md:px-4 grid grid-cols-[1.4fr_0.8fr_0.8fr_1fr] max-lg:grid-cols-2 max-sm:grid-cols-1 gap-16 max-sm:gap-12 py-24">
        {/* Column 1: About */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/images/logo.png"
              alt="Soaloan Tua Nababan & Partners Logo"
              className="h-12 w-auto opacity-95 object-contain"
            />
          </div>
          <p className="text-sm leading-[1.7] text-white/60 mb-4">
            {firmInfo.tagline}
          </p>
          <hr className="w-10 h-px bg-accent-dark border-none opacity-50 my-4" />
          <p className="font-[family-name:var(--font-heading)] italic text-sm text-white/45 leading-[1.6]">
            &ldquo;{firmInfo.quote}&rdquo;
            <span className="block not-italic font-[family-name:var(--font-body)] text-xs text-accent-dark mt-1">
              — {firmInfo.quoteAuthor}
            </span>
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-[family-name:var(--font-body)] text-sm font-semibold tracking-[0.1em] uppercase text-white mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-0.5 after:bg-accent">
            Quick Links
          </h4>
          <ul className="list-none flex flex-col gap-2.5">
            {[
              { href: '/about-us', label: 'About Us' },
              { href: '/legal-services', label: 'Legal Services' },
              { href: '/team-profile', label: 'Our Team' },
              { href: '/article', label: 'Articles' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/60 transition-all duration-150 inline-flex items-center gap-1.5 hover:text-accent hover:translate-x-1">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Practice Areas */}
        <div>
          <h4 className="font-[family-name:var(--font-body)] text-sm font-semibold tracking-[0.1em] uppercase text-white mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-0.5 after:bg-accent">
            Practice Areas
          </h4>
          <ul className="list-none flex flex-col gap-2.5">
            {services.map((s) => (
              <li key={s.id}>
                <Link href="/legal-services" className="text-sm text-white/60 transition-all duration-150 inline-flex items-center gap-1.5 hover:text-accent hover:translate-x-1">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h4 className="font-[family-name:var(--font-body)] text-sm font-semibold tracking-[0.1em] uppercase text-white mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-0.5 after:bg-accent">
            Contact Us
          </h4>
          <address className="not-italic flex flex-col gap-6">
            <div className="flex gap-2.5 text-sm leading-[1.7] text-white/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-[3px] text-accent">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>
                {address.line1}<br />
                {address.line2}<br />
                {address.city}, {address.postal}
              </span>
            </div>
            <div className="flex gap-2.5 text-sm leading-[1.7] text-white/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-[3px] text-accent">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>
                {firmInfo.phone[0]}<br />
                {firmInfo.phone[1]}
              </span>
            </div>
            <div className="flex gap-2.5 text-sm leading-[1.7] text-white/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-[3px] text-accent">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href={`mailto:${firmInfo.email}`} className="text-white/60 transition-colors duration-150 hover:text-accent">{firmInfo.email}</a>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08] py-6">
        <div className="w-full max-w-[var(--max-width-default)] mx-auto px-8 max-md:px-4">
          <p className="text-xs text-white/35 text-center">
            &copy; {currentYear} {firmInfo.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
