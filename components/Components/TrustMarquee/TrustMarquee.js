'use client';
import React, { useState } from 'react';
import InfiniteMarquee from '@/components/Animations/InfiniteMarquee/InfiniteMarquee';
import Link from 'next/link';
import styles from './TrustMarquee.module.css';

export default function TrustMarquee({ clients, dict, lang }) {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const industries = [...new Set(clients.map(c => c.industry))].filter(Boolean);
  
  const handlePillClick = (industry) => {
    if (selectedIndustry === industry) {
      setSelectedIndustry(null);
    } else {
      setSelectedIndustry(industry);
    }
  };

  const filteredClients = selectedIndustry 
    ? clients.filter(c => c.industry === selectedIndustry)
    : [];

  return (
    <>
      <div className={styles.introContainer}>
        <p className={styles.introText}>{dict.clientsIntro}</p>
      </div>

      <div className={styles.marqueeZone}>
        <InfiniteMarquee speed={45} direction="left" className={styles.marqueeRow} paused={selectedIndustry !== null}>
          {clients.slice(0, Math.ceil(clients.length / 2)).map((client, i) => (
            <div key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDiamond}>◆</span>
              <span className={styles.marqueeName}>{client.name}</span>
            </div>
          ))}
        </InfiniteMarquee>
        <InfiniteMarquee speed={50} direction="right" className={styles.marqueeRow} paused={selectedIndustry !== null}>
          {clients.slice(Math.ceil(clients.length / 2)).map((client, i) => (
            <div key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDiamond}>◆</span>
              <span className={styles.marqueeName}>{client.name}</span>
            </div>
          ))}
        </InfiniteMarquee>
        
        {/* Spotlight Panel overlays the marquee visually or appears below it smoothly */}
        <div className={`${styles.spotlightWrapper} ${selectedIndustry ? styles.spotlightActive : ''}`} aria-live="polite">
            {selectedIndustry && (
            <div className={styles.spotlightPanel} role="region" aria-label={`Clients in ${selectedIndustry}`}>
                <div className={styles.spotlightHeader}>
                    <span className={styles.spotlightTitle}>Filtered for: <strong>{selectedIndustry}</strong></span>
                    <button className={styles.spotlightClose} onClick={() => setSelectedIndustry(null)} aria-label="Clear filter">×</button>
                </div>
                <div className={styles.spotlightGrid}>
                    {filteredClients.map((client, i) => (
                        <div key={`${client.name}-${selectedIndustry}`} className={styles.spotlightCard} style={{ '--i': i }}>
                            <span className={styles.marqueeDiamond}>◆</span>
                            <span className={styles.spotlightCardName}>{client.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
      </div>

      <div className={styles.industryTagsContainer}>
        <div className={styles.industryTags}>
          {industries.map((industry, i) => {
            const isActive = selectedIndustry === industry;
            return (
              <button
                key={i}
                type="button"
                className={`${styles.industryTag} ${isActive ? styles.industryTagActive : ''}`}
                onClick={() => handlePillClick(industry)}
                aria-pressed={isActive}
                role="filter"
              >
                {industry}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.trustStats}>
        <div className={styles.trustStat}>
          <span className={styles.trustStatNumber}>{dict.clientsPrinciple1}</span>
        </div>
        <div className={styles.trustStat}>
          <span className={styles.trustStatNumber}>{dict.clientsPrinciple2}</span>
        </div>
        <div className={styles.trustStat}>
          <span className={styles.trustStatNumber}>{dict.clientsPrinciple3}</span>
        </div>
      </div>
      
      <div className={styles.principlesFooter}>
        <Link href={`/${lang}/about-us`} className={styles.aboutLink}>
          {dict.clientsLearnMore} →
        </Link>
      </div>
    </>
  );
}
