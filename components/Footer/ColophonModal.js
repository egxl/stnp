'use client';

import { useEffect, useRef } from 'react';
import styles from './ColophonModal.module.css';

export default function ColophonModal({ isOpen, onClose, dict }) {
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

  const c = dict?.footer?.colophon || {
    title: "Colophon",
    intro: "This digital home for Soaloan Tua Nababan & Partners was designed and engineered with a focus on editorial rhythm, institutional authority, and fluid interactivity.",
    close: "CLOSE",
    designEngineering: "Design & Engineering",
    technology: "Technology",
    technologyValue: "Built with Next.js, GSAP for motion, and Custom WebGL for atmospheric backgrounds.",
    typography: "Typography",
    typographyValue: "Set in Cal Sans and curated serif typefaces to maintain an authoritative yet modern legal aesthetic.",
    system: "System",
    systemValue: "STNP Digital Identity v1.0"
  };

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
          <button className={styles.closeBtn} onClick={onClose} aria-label={c.close}>
            {c.close}
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.titleSection}>
            <h2 id="colophon-title" className={styles.title}>{c.title}</h2>
            <p className={styles.intro}>
              {c.intro}
            </p>
          </div>
          
          <div className={styles.ledger}>
            <div className={styles.ledgerRow}>
              <div className={styles.ledgerLabel}>{c.designEngineering}</div>
              <div className={styles.ledgerValue}>
                <a href="https://www.linkedin.com/in/havergal/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Havergal Samosir ↗
                </a>
              </div>
            </div>

            <div className={styles.ledgerRow}>
              <div className={styles.ledgerLabel}>{c.technology}</div>
              <div className={styles.ledgerValue}>
                {c.technologyValue}
              </div>
            </div>

            <div className={styles.ledgerRow}>
              <div className={styles.ledgerLabel}>{c.typography}</div>
              <div className={styles.ledgerValue}>
                {c.typographyValue}
              </div>
            </div>
            
            <div className={styles.ledgerRow}>
              <div className={styles.ledgerLabel}>{c.system}</div>
              <div className={styles.ledgerValue}>
                {c.systemValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
