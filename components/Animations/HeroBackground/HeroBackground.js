'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroBackground.module.css';

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

    // --- 2. GSAP Scroll Parallax & Fade ---
    let scrollCtx = gsap.context(() => {
      // Setup the timeline triggered by scrolling the window
      // Since the wrapper is fixed, we use the body/html scroll to drive the animation
      gsap.to(imageContainer, {
        yPercent: 8, // Move image down slightly as user scrolls down
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '150% top', // Effect ends when scrolled 1.5x viewport height
          scrub: true,
        },
      });

      // Fade to background color to blend seamlessly into the next section
      gsap.to(fadeOverlay, {
        opacity: 0.95, // Almost fully opaque to match background
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: '10% top', // Start fading slightly after scroll begins
          end: '100% top',
          scrub: true,
        },
      });
    }, wrapper);

    // --- 3. Mouse Tracking Parallax ---
    const handleMouseMove = (e) => {
      // Only apply mouse parallax if we are near the top of the page
      // otherwise it's wasted computation
      if (window.scrollY > window.innerHeight) return;

      const { innerWidth, innerHeight } = window;
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Calculate relative position (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      // Subtle movement (e.g., max 1.5% shift in opposite direction)
      gsap.to(imageContainer, {
        x: `${-xPos * 1.5}%`,
        y: `${-yPos * 1.5}%`,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto', // Allow smooth overriding of continuous movement
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
