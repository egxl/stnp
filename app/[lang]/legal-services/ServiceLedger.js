'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceLedger({ services, lang }) {
  // Flatten services list
  const categories = Object.entries(services.categories);
  const allServices = categories.flatMap(([catKey, cat]) =>
    Object.entries(cat.services).map(([svcKey, svc]) => ({
      ...svc, catKey, catTitle: cat.title, catNumber: cat.number, svcKey
    }))
  );

  const [activeId, setActiveId] = useState(`${categories[0][0]}.${Object.keys(categories[0][1].services)[0]}`);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const detailRef = useRef(null);
  const containerRef = useRef(null);

  const activeService = allServices.find(s => `${s.catKey}.${s.svcKey}` === activeId) || allServices[0];
  const activeCat = services.categories[activeService.catKey];

  function handleSelect(catKey, svcKey) {
    if (`${catKey}.${svcKey}` === activeId) return;
    
    setIsTransitioning(true);
    // Short timeout to allow fade out, then swap content and fade in
    setTimeout(() => {
      setActiveId(`${catKey}.${svcKey}`);
      setIsTransitioning(false);
    }, 200);
  }

  // Initial load animation for index
  useGSAP(() => {
    const indexGroups = document.querySelectorAll(`.${styles.indexGroup}`);
    if (indexGroups.length > 0) {
      gsap.fromTo(indexGroups, 
        { opacity: 0, x: -20 },
        { 
          opacity: 1, x: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%'
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section className={styles.ledgerSection} ref={containerRef}>
      <div className="container">
        <div className={styles.ledgerContainer}>
          {/* LEFT — Sticky Index */}
          <nav className={styles.ledgerIndex}>
            {categories.map(([catKey, cat]) => (
              <div key={catKey} className={styles.indexGroup}>
                <span className={styles.indexCategory}>{cat.title}</span>
                {Object.entries(cat.services).map(([svcKey, svc]) => (
                  <button
                    key={svcKey}
                    className={`${styles.indexItem} ${activeId === `${catKey}.${svcKey}` ? styles.indexItemActive : ''}`}
                    onClick={() => handleSelect(catKey, svcKey)}
                  >
                    <span className={styles.indexMarker} />
                    {svc.title}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {/* RIGHT — Detail Panel */}
          <div className={styles.ledgerDetailWrapper}>
            <article 
              ref={detailRef} 
              className={`${styles.ledgerDetail} ${isTransitioning ? styles.transitioningOut : styles.transitioningIn}`}
              key={activeId}
            >
              <span className={styles.detailCategory}>
                {activeCat.number} — {activeCat.title}
              </span>
              <h2 className={styles.detailTitle}>{activeService.title}</h2>
              <p className={styles.detailTagline}>{activeService.tagline}</p>
              
              <div className={styles.detailTextWrapper}>
                <p className={styles.detailText}>{activeService.p1}</p>
                {activeService.p2 && <p className={styles.detailText}>{activeService.p2}</p>}
              </div>

              {activeService.proofPoints?.length > 0 && (
                <ul className={styles.proofList}>
                  {activeService.proofPoints.map((pp, i) => (
                    <li key={i} className={styles.proofItem}>{pp}</li>
                  ))}
                </ul>
              )}
              
              <div className={styles.detailCtaWrapper}>
                <Link href={`/${lang}/contact`} className="btn btn--outline">
                  Discuss this matter
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
