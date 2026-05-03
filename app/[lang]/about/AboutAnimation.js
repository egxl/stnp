"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutAnimation() {
  const container = useRef();

  useGSAP(() => {
    // 1. Hero Reveal: Target via data-animate attribute
    const heroElements = document.querySelectorAll('[data-animate="hero"]');
    if (heroElements.length) {
      gsap.fromTo(heroElements,
        { y: 30, opacity: 0, filter: 'blur(4px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );
    }

    // 2. Philosophy Grid: Staggered entry via data attributes
    const philosophyItems = document.querySelectorAll('[data-animate="item"]');
    const philosophyGrid = document.querySelector('[data-animate="grid"]');
    if (philosophyItems.length && philosophyGrid) {
      gsap.fromTo(philosophyItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: philosophyGrid,
            start: 'top 80%',
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
