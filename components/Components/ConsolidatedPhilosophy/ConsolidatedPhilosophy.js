import React from 'react';
import Link from 'next/link';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import styles from './ConsolidatedPhilosophy.module.css';
import { firmInfo } from '@/lib/data/team';

export default function ConsolidatedPhilosophy({ dict, lang }) {
  return (
    <section className={`${styles.philosophySection} section--dark`}>
      {/* Background Atmosphere */}
      <div className={styles.lightLeak} aria-hidden="true" />
      
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Principles (Asymmetric Layout) */}
          <div className={styles.principlesColumn}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Our Philosophy</span>
              <h2 className={styles.title}>The Standard of Practice</h2>
            </div>
            
            <div className={styles.principlesList}>
              <div className={styles.principleItem}>
                <span className={styles.principleNumber}>01</span>
                <p className={styles.principleText}>{dict.clientsPrinciple1 || "Uncompromising Authority"}</p>
              </div>
              <div className={styles.principleItem}>
                <span className={styles.principleNumber}>02</span>
                <p className={styles.principleText}>{dict.clientsPrinciple2 || "Strategic Discretion"}</p>
              </div>
              <div className={styles.principleItem}>
                <span className={styles.principleNumber}>03</span>
                <p className={styles.principleText}>{dict.clientsPrinciple3 || "Jakarta Excellence"}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Banner (Typographic Emphasis) */}
          <div className={styles.quoteColumn}>
            <div className={styles.quoteWrapper}>
              <blockquote className={styles.blockquote}>
                <span className={`${styles.quoteMark} ${styles.quoteMarkOpen}`}>&ldquo;</span>
                <p>{firmInfo.quote}</p>
                <span className={`${styles.quoteMark} ${styles.quoteMarkClose}`}>&rdquo;</span>
              </blockquote>
              
              <div className={styles.authorMeta}>
                <div className={styles.portraitWrapper}>
                  <img src="/images/quotes/portrait.webp" alt={`${firmInfo.quoteAuthor} Portrait`} className={styles.portrait} />
                </div>
                <div className={styles.authorInfo}>
                  <cite className={styles.authorName}>{firmInfo.quoteAuthor}</cite>
                  <div className={styles.signature} aria-label={`${firmInfo.quoteAuthor} Signature`} />
                </div>
              </div>
              
              <div className={styles.ctaWrapper}>
                <Link href={`/${lang}/about-us`} className={styles.ctaLink}>
                  <span>{dict.clientsLearnMore || "Learn more"}</span>
                  <div className={styles.iconCircle}>
                    <CaretRight size={14} weight="bold" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
