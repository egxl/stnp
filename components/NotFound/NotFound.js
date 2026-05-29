'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './NotFound.module.css';

export default function NotFound({ showNav = false, lang = 'en' }) {
  const [hoveredIdx, setHoveredIdx] = useState(null); // null, 0, 1, 2

  useEffect(() => {
    document.body.classList.add('hide-footer');

    // Force navbar font to black in light mode on the 404 page
    const style = document.createElement('style');
    style.id = 'notfound-navbar-override';
    style.textContent = `
      .light #site-header nav a,
      .light #site-header nav button,
      .light #site-header nav span,
      .light #site-header [class*="desktopControls"],
      .light #site-header [class*="switcherToggle"] {
        color: #020617 !important;
        text-shadow: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.classList.remove('hide-footer');
      document.getElementById('notfound-navbar-override')?.remove();
    };
  }, []);

  // Map hovered link index to compass needle rotation degree
  // 0 (Home) -> pointing up (0 deg)
  // 1 (Services) -> pointing right-down (120 deg)
  // 2 (Contact) -> pointing left-down (240 deg)
  const getNeedleRotation = () => {
    if (hoveredIdx === 0) return 'rotate(0deg)';
    if (hoveredIdx === 1) return 'rotate(120deg)';
    if (hoveredIdx === 2) return 'rotate(240deg)';
    return 'rotate(45deg)'; // Default idle direction
  };

  return (
    <div className={styles.container}>
      {/* Background Images */}
      <div className={styles.background}>
        <Image 
          src="/images/404-bg.png"
          alt="Atmospheric Sky"
          fill
          priority
          quality={100}
          className={`${styles.backgroundImage} ${styles.backgroundImageDark}`}
        />
        <Image 
          src="/images/404-bg-light.png"
          alt="Bright Daytime Sky"
          fill
          priority
          quality={100}
          className={`${styles.backgroundImage} ${styles.backgroundImageLight}`}
        />
        <div className={styles.overlay}></div>
        <div className={styles.overlayDark}></div>
      </div>

      {/* Main Grid Content */}
      <main className={styles.content}>
        {/* Top Section: Error description & Quote */}
        <div className={styles.headerBlock}>
          <span className={styles.eyebrow}>ROUTE UNRESOLVED // ERROR 404</span>
          
          <div className={styles.quoteBlock}>
            <h1 className={styles.quote}>
              “I find the great thing in this world is not so much where we stand, as in what direction we are moving”
            </h1>
            <div className={styles.author}>— OLIVER WENDELL HOLMES SR.</div>
          </div>
        </div>

        {/* Center Interactive HUD (Compass + Waypoints) */}
        <div className={styles.navHud}>
          {/* Compass Graphic */}
          <div className={styles.compassContainer}>
            <svg className={styles.compassSvg} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer dial ring */}
              <circle cx="100" cy="100" r="90" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="2 4" className={styles.dialRing} />
              <circle cx="100" cy="100" r="82" stroke="var(--color-accent)" strokeWidth="0.75" className={styles.dialRingSub} />
              
              {/* Crosshairs */}
              <line x1="100" y1="5" x2="100" y2="195" stroke="var(--color-accent)" strokeWidth="0.5" className={styles.crosshair} />
              <line x1="5" y1="100" x2="195" y2="100" stroke="var(--color-accent)" strokeWidth="0.5" className={styles.crosshair} />
              
              {/* Cardinal markings */}
              <text x="100" y="25" fill="var(--color-accent)" fontSize="8" fontFamily="var(--font-body-family)" textAnchor="middle" fontWeight="600" className={styles.cardinalMarkNorth}>N</text>
              <text x="100" y="185" fill="var(--color-accent)" fontSize="8" fontFamily="var(--font-body-family)" textAnchor="middle" className={styles.cardinalMark}>S</text>
              <text x="178" y="103" fill="var(--color-accent)" fontSize="8" fontFamily="var(--font-body-family)" textAnchor="middle" className={styles.cardinalMark}>E</text>
              <text x="22" y="103" fill="var(--color-accent)" fontSize="8" fontFamily="var(--font-body-family)" textAnchor="middle" className={styles.cardinalMark}>W</text>
              
              {/* Compass Needle (dynamically rotating) */}
              <g style={{ transform: getNeedleRotation(), transformOrigin: '100px 100px', transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }}>
                {/* Pointer top */}
                <polygon points="100,35 107,100 93,100" fill="var(--color-accent)" className={styles.needlePointer} />
                {/* Pointer shadow/bottom */}
                <polygon points="100,165 107,100 93,100" fill="var(--color-text-muted)" opacity="0.4" />
                <circle cx="100" cy="100" r="6" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.5" className={styles.needleCap} />
              </g>
            </svg>
          </div>

          {/* Swiss layout navigation grid */}
          <div className={styles.waypointsList}>
            <Link 
              href={`/${lang}`} 
              className={styles.waypointItem}
              onMouseEnter={() => setHoveredIdx(0)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span className={styles.coordinate}>[ 000° N ]</span>
              <div className={styles.labelBlock}>
                <span className={styles.waypointNum}>01</span>
                <span className={styles.waypointLabel}>Home Deck</span>
              </div>
            </Link>

            <Link 
              href={`/${lang}/legal-services`} 
              className={styles.waypointItem}
              onMouseEnter={() => setHoveredIdx(1)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span className={styles.coordinate}>[ 120° ESE ]</span>
              <div className={styles.labelBlock}>
                <span className={styles.waypointNum}>02</span>
                <span className={styles.waypointLabel}>Our Services</span>
              </div>
            </Link>

            <Link 
              href={`/${lang}/contact`} 
              className={styles.waypointItem}
              onMouseEnter={() => setHoveredIdx(2)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span className={styles.coordinate}>[ 240° WSW ]</span>
              <div className={styles.labelBlock}>
                <span className={styles.waypointNum}>03</span>
                <span className={styles.waypointLabel}>Contact Us</span>
              </div>
            </Link>
          </div>
        </div>

        <p className={styles.statusMsg}>
          SYSTEM STATUS: COURSE LOST. PILOT MANUALLY OVERRIDE.
        </p>
      </main>
    </div>
  );
}
