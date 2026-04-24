import React from 'react';
import styles from './AuthorityStrip.module.css';

/**
 * AuthorityStrip Component
 * Displays professional association logos in a monochromatic, premium style.
 * Handles non-transparent assets using CSS blend modes.
 */
const AuthorityStrip = ({ dict }) => {
  const associations = [
    { name: 'PERADI', slug: 'peradi' },
    { name: 'AKPI', slug: 'akpi' },
    { name: 'HKHSK', slug: 'hkhsk' },
  ];

  // Cache buster to force browser to reload assets
  const version = 'v=3';

  return (
    <section className={styles.authorityStrip} aria-label="Professional Affiliations">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.label}>
            {dict.home?.memberOf || 'Member of'}
          </span>
          <div className={styles.logoGrid}>
            {associations.map((org) => (
              <div 
                key={org.slug} 
                className={styles.logoItem}
                title={org.name}
              >
                <img 
                  src={`/images/logos/${org.slug}.png?${version}`}
                  alt={org.name}
                  className={styles.logoImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorityStrip;
