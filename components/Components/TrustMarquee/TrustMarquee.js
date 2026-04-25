'use client';
import React, { useState } from 'react';
import InfiniteMarquee from '@/components/Animations/InfiniteMarquee/InfiniteMarquee';
import styles from './TrustMarquee.module.css';

export default function TrustMarquee({ clients, dict, lang }) {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const industries = [...new Set(clients.map(c => c.industry))].filter(Boolean);

  const handlePillClick = (industry) => {
    setSelectedIndustry(prev => prev === industry ? null : industry);
  };

  const filteredClients = selectedIndustry
    ? clients.filter(c => c.industry === selectedIndustry)
    : [];

  return (
    <>
      {/* Intro paragraph — tight, purposeful, max 65ch */}
      <p className={styles.introText}>{dict.clientsIntro}</p>

      {/* Industry filter pills */}
      <div className={styles.industryTags} role="group" aria-label="Filter clients by industry">
        {industries.map((industry, i) => {
          const isActive = selectedIndustry === industry;
          return (
            <button
              key={i}
              type="button"
              className={`${styles.industryTag} ${isActive ? styles.industryTagActive : ''}`}
              onClick={() => handlePillClick(industry)}
              aria-pressed={isActive}
            >
              {industry}
            </button>
          );
        })}
      </div>

      {/* Marquee zone — untouched content per spec */}
      <div className={styles.marqueeZone}>
        <InfiniteMarquee speed={45} direction="left" className={styles.marqueeRow} paused={selectedIndustry !== null}>
          {clients.slice(0, Math.ceil(clients.length / 2)).map((client, i) => (
            <div key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDiamond} aria-hidden="true">◆</span>
              <span className={styles.marqueeName}>{client.name}</span>
            </div>
          ))}
        </InfiniteMarquee>
        <InfiniteMarquee speed={50} direction="right" className={styles.marqueeRow} paused={selectedIndustry !== null}>
          {clients.slice(Math.ceil(clients.length / 2)).map((client, i) => (
            <div key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDiamond} aria-hidden="true">◆</span>
              <span className={styles.marqueeName}>{client.name}</span>
            </div>
          ))}
        </InfiniteMarquee>

        {/* Spotlight — inline, no overlay */}
        {selectedIndustry && (
          <div
            className={styles.spotlightPanel}
            role="region"
            aria-label={`Clients in ${selectedIndustry}`}
            aria-live="polite"
          >
            <div className={styles.spotlightHeader}>
              <span className={styles.spotlightTitle}>
                {selectedIndustry}
              </span>
              <button
                className={styles.spotlightClose}
                onClick={() => setSelectedIndustry(null)}
                aria-label="Clear filter"
              >
                ×
              </button>
            </div>
            <div className={styles.spotlightGrid}>
              {filteredClients.map((client, i) => (
                <div
                  key={`${client.name}-${selectedIndustry}`}
                  className={styles.spotlightCard}
                  style={{ '--i': i }}
                >
                  <span className={styles.marqueeDiamond} aria-hidden="true">◆</span>
                  <span className={styles.spotlightCardName}>{client.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </>
  );
}
