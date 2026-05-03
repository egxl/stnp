'use client';

import { useEffect, useRef } from 'react';
import styles from './DisclaimerModal.module.css';

export default function DisclaimerModal({ isOpen, onClose, dict }) {
  const modalRef = useRef(null);
  const d = dict?.footer?.disclaimerFull || {};

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      if (modalRef.current) {
        modalRef.current.focus();
      }
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.masthead}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
        tabIndex={-1}
      >
        <div className={styles.topBar}>
          <span className={styles.label}>LEGAL — STNP</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            CLOSE
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.titleSection}>
            <h2 id="disclaimer-title" className={styles.title}>{d.title}</h2>
          </div>
          
          <div className={styles.documentBody}>
            <p className={styles.paragraph}>{d.p1}</p>
            <p className={styles.paragraph}>{d.p2}</p>
            
            <div className={styles.callout}>
              <strong className={styles.calloutTitle}>
                {d.confidentialityTitle}
              </strong>
              <p className={styles.paragraph}>{d.confidentiality}</p>
            </div>

            <p className={styles.paragraph}>{d.p3}</p>
            <p className={styles.paragraph}>{d.p4}</p>
          </div>
          
          <div className={styles.signatureRow}>
            <button className={styles.acceptBtn} onClick={onClose}>
              {d.closeButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
