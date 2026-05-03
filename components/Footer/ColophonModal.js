'use client';

import { useEffect, useRef } from 'react';
import styles from './ColophonModal.module.css';

export default function ColophonModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      if (modalRef.current) modalRef.current.focus();
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
        aria-labelledby="colophon-title"
        tabIndex={-1}
      >
        <div className={styles.topBar}>
          <span className={styles.label}>STNP — 2026</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            CLOSE
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.titleSection}>
            <h2 id="colophon-title" className={styles.title}>Colophon</h2>
            <p className={styles.intro}>
              This digital home for Soaloan Tua Nababan & Partners was designed and engineered with a focus on editorial rhythm, institutional authority, and fluid interactivity.
            </p>
          </div>
          
          <div className={styles.ledger}>
            <div className={styles.ledgerRow}>
              <div className={styles.ledgerLabel}>Design & Engineering</div>
              <div className={styles.ledgerValue}>
                <a href="https://www.linkedin.com/in/havergal/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Havergal
                </a>
              </div>
            </div>

            <div className={styles.ledgerRow}>
              <div className={styles.ledgerLabel}>Technology</div>
              <div className={styles.ledgerValue}>
                Built with Next.js, GSAP for motion, and Custom WebGL for atmospheric backgrounds.
              </div>
            </div>

            <div className={styles.ledgerRow}>
              <div className={styles.ledgerLabel}>Typography</div>
              <div className={styles.ledgerValue}>
                Set in Cal Sans and curated serif typefaces to maintain an authoritative yet modern legal aesthetic.
              </div>
            </div>
            
            <div className={styles.ledgerRow}>
              <div className={styles.ledgerLabel}>System</div>
              <div className={styles.ledgerValue}>
                STNP Digital Identity v1.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
