'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroBackground.module.css';

// ─── Feature Flags ────────────────────────────────────────────────────────────
// Set to `true` to re-enable the scroll + mouse parallax on the background.
const PARALLAX_ENABLED = false;
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroBackground() {
  const wrapperRef = useRef(null);
  const imageContainerRef = useRef(null);
  const fadeOverlayRef = useRef(null);

  useEffect(() => {
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const imageContainer = imageContainerRef.current;
    const fadeOverlay = fadeOverlayRef.current;

    let scrollCtx;

    scrollCtx = gsap.context(() => {
      const triggerEl = wrapper.closest('section') || wrapper.parentElement || document.body;

      if (PARALLAX_ENABLED) {
        // Move image down slightly as user scrolls down
        gsap.to(imageContainer, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      const mm = gsap.matchMedia();

      // Mobile/Tablet: Smooth opacity fade-out to prevent sharp lines
      mm.add("(max-width: 768px)", () => {
        gsap.to(wrapper, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Desktop: Keep the original clip-path mask reveal
      mm.add("(min-width: 769px)", () => {
        gsap.to(wrapper, {
          clipPath: 'inset(0% 0% 100% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, wrapper);

    // --- Mouse Tracking Parallax ---
    const handleMouseMove = (e) => {
      if (!PARALLAX_ENABLED) return;
      if (window.scrollY > window.innerHeight) return;

      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(imageContainer, {
        x: `${-xPos * 1.5}%`,
        y: `${-yPos * 1.5}%`,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      scrollCtx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* Container that handles the interactive mouse movement and GSAP scroll */}
      <div ref={imageContainerRef} className={styles.heroImageContainer}>
        {/* 1. Cinematic Gradient Breathing Overlay */}
        <div className={styles.gradientOverlay} />

        {/* Static Background Images */}
        <img
          src="/images/nightshot.webp"
          alt="STNP Night Shot"
          className={`${styles.heroImage} ${styles.visible} ${styles.heroBgDark}`}
        />
        <img
          src="/images/dayshot.webp"
          alt="STNP Day Shot"
          className={`${styles.heroImage} ${styles.visible} ${styles.heroBgLight}`}
        />
      </div>

      {/* GSAP Scroll Fade Overlay to smoothly transition into the page */}
      <div ref={fadeOverlayRef} className={styles.fadeOverlay} />
    </div>
  );
}
