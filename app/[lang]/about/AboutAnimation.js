"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutAnimation() {
  const container = useRef();

  useGSAP(() => {
    // Note: Hero elements (h1, heroCopy, heroBody) are animated via CSS keyframes
    // in page.module.css (heroAnimate2, heroAnimate3) with proper sequencing.
    // GSAP does NOT target these to avoid double-animation conflict.

    // 2. Philosophy Refractive Scroll: Staggered entry for glass cards
    const glassCards = document.querySelectorAll('[data-animate="glass-card"]');
    const philosophyList = document.querySelector('[data-animate="philosophy-list"]');
    if (glassCards.length && philosophyList) {
      gsap.fromTo(glassCards,
        { y: 50, opacity: 0, backdropFilter: 'blur(0px)' },
        {
          y: 0,
          opacity: 1,
          backdropFilter: 'blur(16px)',
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: philosophyList,
            start: 'top 75%',
          }
        }
      );
    }

    // 3. Stats: Scale effect on scroll
    const statItems = document.querySelectorAll('[data-animate="statItem"]');
    const statsSection = document.querySelector('[data-animate="stats"]');
    if (statItems.length && statsSection) {
      gsap.fromTo(statItems,
        { scale: 0.95, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: statsSection,
            start: 'top 75%',
          }
        }
      );
    }

    // 4. Narrative Sections: Fade in + slight move up
    const sections = document.querySelectorAll('[data-animate="narrative"]');
    sections.forEach(section => {
      gsap.fromTo(section,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // 5. CTA Button: Scale on enter (micro-interaction)
    const cta = document.querySelector('[data-animate="cta"]');
    if (cta) {
      gsap.fromTo(cta,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: cta,
            start: 'top 90%',
          }
        }
      );
    }

  }, { scope: container });

  return <div ref={container} className="animation-wrapper" style={{ display: 'contents' }} />;
}
