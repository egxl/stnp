'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './NotFound.module.css';

export default function NotFound({ showNav = false, lang = 'en' }) {
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

  return (
    <div className={styles.container}>
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

      <main className={styles.content}>
        <div className={styles.errorCode}>ERROR 404</div>
        <div className={styles.quoteBlock}>
          {/* Full Reference: 
              “I find the great thing in this world is not so much where we stand, as in what direction we are moving—we must sail sometimes with the wind and sometimes against it—but we must sail, and not drift, nor lie at anchor.”
              ― Oliver Wendell Holmes Sr., Autocrat of the Breakfast Table
          */}
          <h1 className={styles.quote}>
            “I find the great thing in this world is not so much where we stand, as in what direction we are moving”
          </h1>
          <div className={styles.author}>— Oliver Wendell Holmes Sr.</div>
        </div>
        
        <hr className={styles.divider} />

        <div className={styles.directionSection}>
          <p className={styles.direction}>
            You’ve reached a dead end, but your journey doesn't have to stop here. Redirect your course:
          </p>

          <div className={styles.waypoints}>
            <Link href={`/${lang}`} className={styles.waypointCard}>
              <div className={styles.waypointIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                </svg>
              </div>
              <h3 className={styles.waypointLabel}>Home</h3>
              <p className={styles.waypointDesc}>Return to the main deck</p>
            </Link>

            <Link href={`/${lang}/legal-services`} className={styles.waypointCard}>
              <div className={styles.waypointIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="5" r="3"></circle>
                  <line x1="12" y1="22" x2="12" y2="8"></line>
                  <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
                </svg>
              </div>
              <h3 className={styles.waypointLabel}>Our Services</h3>
              <p className={styles.waypointDesc}>Chart your legal course</p>
            </Link>

            <Link href={`/${lang}/contact`} className={styles.waypointCard}>
              <div className={styles.waypointIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className={styles.waypointLabel}>Contact Us</h3>
              <p className={styles.waypointDesc}>Send us a bearing</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
