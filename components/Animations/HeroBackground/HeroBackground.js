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

    if (PARALLAX_ENABLED) {
      // --- GSAP Scroll Parallax ---
      scrollCtx = gsap.context(() => {
        // Move image down slightly as user scrolls down
        gsap.to(imageContainer, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '150% top',
            scrub: true,
          },
        });

        // Fade out the entire hero background VERY slowly to reveal the Grainient
        gsap.to(wrapper, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '250vh top',
            scrub: true,
          },
        });
      }, wrapper);
    } else {
      // Parallax disabled — still run the slow scroll fade for clean blending
      scrollCtx = gsap.context(() => {
        gsap.to(wrapper, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '250vh top',
            scrub: true,
          },
        });
      }, wrapper);
    }

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
