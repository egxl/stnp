'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * HeroVideo Component
 * 
 * Renders the background timelapse video and manages its playback
 * and visibility based on the hero section's viewport presence.
 * 
 * @param {Object} props
 * @param {string} props.className - Base class for the video element
 * @param {string} props.visibleClass - Class to apply when video should be visible
 */
export default function HeroVideo({ className, visibleClass }) {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Define the observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyVisible = entry.isIntersecting;
        setIsVisible(isCurrentlyVisible);
        
        if (isCurrentlyVisible) {
          video.play().catch(err => {
            console.warn('Hero video play failed:', err);
          });
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.01, // Small threshold to avoid edge cases
        rootMargin: '200px 0px 200px 0px' // Slightly larger margin for better performance
      }
    );

    // Target the closest section (conceptual parent) or the first section
    const heroSection = video.closest('section') || document.querySelector('section');
    
    if (heroSection) {
      observer.observe(heroSection);
      
      // If the section is already in view (e.g., initial load at top), trigger visibility
      const rect = heroSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
        video.play().catch(() => {}); // Attempt play
      }
    } else {
      setIsVisible(true);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video 
      ref={videoRef}
      autoPlay 
      loop 
      muted 
      playsInline 
      className={`${className} ${isVisible ? visibleClass : ''}`}
    >
      {/* Default H.264 source — more stable across drivers */}
      <source src="/videos/hero-loop.mp4" type="video/mp4" />
      Your browser does not support the timelapse background video.
    </video>
  );
}
