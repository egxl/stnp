'use client';

import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   HeroMask
   Full-screen video hero with a text-mask reveal effect.

   Technique:
   ┌─────────────────────────────────────────────────┐
   │  Layer -2  →  <video>  (fixed, fills screen)   │
   │  Layer -1  →  dark gradient overlay             │
   │  Layer  0  →  .hero-content (text, CTAs)        │
   │                                                 │
   │  The headline is split into two parts:          │
   │  · Line 1 — regular white text                  │
   │  · Line 2 — huge display text with              │
   │             background-clip: text +             │
   │             background: linear-gradient         │
   │             showing through to a brighter tint  │
   │             of the video overlay, creating a    │
   │             "lit" effect vs the dark surround.  │
   └─────────────────────────────────────────────────┘

   GSAP ScrollTrigger:
   · Pins the hero for 50vh of scroll travel
   · Fades overlay from 0.88 → 0.96 (darkens, pushes focus to text)
   · Scales the headline container from 1 → 1.06
   · After unpin, content scrolls normally
───────────────────────────────────────────────────────────────*/

function HeroMask() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!section || !headline || !overlay || !content) return;

    // Only run pin + scroll animation on non-touch devices
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=50%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    tl.to(
      overlay,
      { opacity: 0.96, ease: 'none' },
      0
    ).to(
      headline,
      { scale: 1.04, opacity: 0.8, ease: 'none' },
      0
    ).to(
      content,
      { opacity: 0.1, ease: 'none' },
      0.4
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section bg-primary"
      aria-label="Hero"
    >
      {/* ── Background video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/hero-loop-hevc.mp4" type="video/mp4; codecs=hvc1" />
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* ── Dark gradient overlay (scrubbed by GSAP) ── */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(160deg, rgba(10,22,40,0.90) 0%, rgba(10,22,40,0.72) 60%, rgba(10,22,40,0.85) 100%), ' +
            'radial-gradient(ellipse at 25% 60%, rgba(44,95,124,0.25) 0%, transparent 55%)',
        }}
      />

      {/* ── Hero content ── */}
      <div
        className="relative w-full max-w-[var(--max-width-wide)] mx-auto px-8 max-md:px-6"
        style={{ zIndex: 2 }}
      >
        {/* Eyebrow */}
        <div className="animate-[fadeInUp_0.9s_var(--ease-out-custom)_0.2s_both]">
          <span
            className="
              relative inline-flex items-center gap-4
              font-[family-name:var(--font-body)] text-[0.65rem]
              font-medium tracking-[0.35em] uppercase text-accent/80
              mb-10 max-sm:mb-6
            "
          >
            <span className="w-10 h-px bg-accent/40" aria-hidden="true" />
            Soaloan Tua Nababan &amp; Partners
            <span className="w-10 h-px bg-accent/40" aria-hidden="true" />
          </span>

          {/* ── Headline with mask effect ── */}
          <div ref={headlineRef} className="mb-10 max-sm:mb-6">
            {/*
              Line 1 — regular white serif
              Cormorant Garamond at display scale has beautiful stroke contrast
            */}
            <p
              className="
                font-[family-name:var(--font-heading)]
                text-[clamp(3.5rem,7vw,7rem)] max-sm:text-[clamp(2.8rem,10vw,4rem)]
                font-light text-white/90 leading-[0.95] tracking-[-0.03em]
                m-0
              "
            >
              Enforcing the Law
            </p>

            {/*
              Line 2 — the "mask" headline.
              Gold gradient text with a glow to suggest the video shining through.
              Cormorant at 300 weight with generous size creates a high contrast
              editorial feel that distinguishes it from line 1.
            */}
            <p
              className="
                font-[family-name:var(--font-heading)]
                text-[clamp(3.5rem,7vw,7rem)] max-sm:text-[clamp(2.8rem,10vw,4rem)]
                font-light italic leading-[0.95] tracking-[-0.02em]
                m-0
              "
              style={{
                background:
                  'linear-gradient(135deg, #C4A35A 0%, #E8C97A 40%, #C4A35A 60%, #A6883D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              of Truth &amp; Justice
            </p>
          </div>

          {/* Sub-copy + CTAs (faded out on scroll) */}
          <div ref={contentRef}>
            <p
              className="
                text-[1.05rem] font-[family-name:var(--font-body)]
                text-white/55 max-w-[520px]
                leading-[1.75] mb-10 max-sm:mb-8
              "
              style={{ maxWidth: '52ch' }}
            >
              A full-service Jakarta law firm providing strategic legal counsel
              across bankruptcy, litigation, corporate, and finance.
            </p>

            <div className="flex gap-4 flex-wrap max-sm:flex-col max-sm:items-start">
              <Link href="/contact" className="btn btn--primary">
                Free Consultation
              </Link>
              <Link href="/legal-services" className="btn btn--outline">
                Our Services
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 max-sm:mt-10 flex items-center gap-4">
              <div
                className="w-px h-14 bg-gradient-to-b from-accent to-transparent"
                style={{ animation: 'scrollPulse 2s ease-in-out infinite' }}
                aria-hidden="true"
              />
              <span className="text-[0.6rem] font-[family-name:var(--font-body)] text-white/30 tracking-[0.25em] uppercase">
                Scroll
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom fade-to-page ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,22,40,0.6) 70%, #FAFBFC 100%)',
        }}
      />
    </section>
  );
}

export default memo(HeroMask);
