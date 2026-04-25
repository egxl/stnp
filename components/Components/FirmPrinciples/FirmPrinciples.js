import React from 'react';
import styles from './FirmPrinciples.module.css';

export default function FirmPrinciples({ dict }) {
  return (
    <section className={styles.principlesSection}>
      <div className="container">
        <div className={styles.principlesRow}>
          <div className={styles.principle}>
            <span className={styles.principleLabel}>{dict.clientsPrinciple1}</span>
          </div>
          <div className={styles.principleRule} aria-hidden="true" />
          <div className={styles.principle}>
            <span className={styles.principleLabel}>{dict.clientsPrinciple2}</span>
          </div>
          <div className={styles.principleRule} aria-hidden="true" />
          <div className={styles.principle}>
            <span className={styles.principleLabel}>{dict.clientsPrinciple3}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
