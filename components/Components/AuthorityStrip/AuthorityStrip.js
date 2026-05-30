import React from 'react';
import styles from './AuthorityStrip.module.css';

/**
 * AuthorityStrip Component
 * Displays professional association logos in a monochromatic, premium style.
 * Handles non-transparent assets using CSS blend modes.
 */
const AuthorityStrip = ({ dict }) => {
  const photoCredit = dict.home?.photoCredit || {};
  const associations = [
    { name: 'PERADI', slug: 'peradi', url: 'https://www.peradi.or.id/' },
    { name: 'AKPI', slug: 'akpi', url: 'https://www.akpi.or.id/' },
  ];

  // Cache buster to force browser to reload assets
  const version = 'v=3';

  return (
    <section className={styles.authorityStrip} aria-label={dict.home?.professionalAffiliations || 'Professional Affiliations'}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.credit}>
            {photoCredit.prefix || 'Photo by'} <a href="https://unsplash.com/@javaistan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Afif Ramdhasuma</a> {photoCredit.connector || 'on'} <a href="https://unsplash.com/photos/vehicle-beside-concrete-building-during-daytime-XYQPyn4KkiY?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Unsplash</a>
          </div>
          <div className={styles.rightSide}>
            <span className={styles.label}>
              {dict.home?.memberOf || 'Member of'}
            </span>
            <div className={styles.logoGrid}>
            {associations.map((org) => (
              <a 
                key={org.slug} 
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.logoItem}
                title={org.name}
              >
                <img 
                  src={`/images/logos/${org.slug}.png?${version}`}
                  alt={org.name}
                  className={styles.logoImage}
                />
              </a>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorityStrip;
