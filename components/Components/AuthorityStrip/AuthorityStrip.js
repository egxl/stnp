import React from 'react';
import styles from './AuthorityStrip.module.css';

/**
 * AuthorityStrip Component
 * Displays professional association logos in a monochromatic, premium style.
 * Handles non-transparent assets using CSS blend modes.
 */
const AuthorityStrip = ({ dict }) => {
  const associations = [
    { name: 'PERADI', slug: 'peradi', url: 'https://www.peradi.or.id/' },
    { name: 'AKPI', slug: 'akpi', url: 'https://www.akpi.or.id/' },
    { name: 'HKHSK', slug: 'hkhsk', url: 'https://hkhsk.id/' },
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
    </section>
  );
};

export default AuthorityStrip;
