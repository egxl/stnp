'use client';
import styles from './HeroScrollButton.module.css';

export default function HeroScrollButton() {
  const scrollToNextSection = () => {
    // Find the next section after the hero
    const heroSection = document.querySelector('.hero');
    if (heroSection && heroSection.nextElementSibling) {
      heroSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <button 
      className={styles.heroScrollBtn} 
      onClick={scrollToNextSection}
      aria-label="Scroll to next section"
    >
      <span className={styles.scrollText}>Scroll</span>
      <svg 
        className={styles.scrollChevron} 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  );
}
