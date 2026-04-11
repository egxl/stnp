'use client';

import { useEffect, useRef, memo } from 'react';

/*
  ScrollReveal
  ─────────────
  Lightweight Intersection Observer wrapper.
  Adds class 'revealed' when the element enters the viewport,
  triggering the CSS transition defined in globals.css.

  Props:
    children  — rendered content
    delay     — ms delay before the transition fires (for stagger)
    threshold — how much of the element must be visible (0–1), default 0.12
    className — extra classes for the wrapper div
*/

function ScrollReveal({ children, delay = 0, threshold = 0.12, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip if user prefers reduced motion — CSS already handles this,
    // but we also avoid attaching the observer to keep things clean.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay via inline style so stagger works without extra CSS classes
          if (delay > 0) {
            el.style.transitionDelay = `${delay}ms`;
          }
          el.classList.add('revealed');
          observer.unobserve(el); // Fire once only
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}

export default memo(ScrollReveal);
