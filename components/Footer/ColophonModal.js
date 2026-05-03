'use client';

import { useEffect, useRef } from 'react';
import { IdentificationCard, X, Code, Palette, Globe } from '@phosphor-icons/react';
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div
        className={styles.modal}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="colophon-title"
        tabIndex={-1}
      >
        <button className={styles.closeIcon} onClick={onClose} aria-label="Close">
          <X size={18} weight="bold" />
        </button>

        <div className={styles.header}>
          <IdentificationCard size={44} className={styles.icon} weight="light" />
          <h2 id="colophon-title" className={styles.title}>Colophon</h2>
        </div>

        <div className={styles.content}>
          <p className={styles.intro}>
            This digital home for Soaloan Tua Nababan & Partners was designed and engineered with a focus on editorial rhythm, institutional authority, and fluid interactivity.
          </p>
          
          <div className={styles.grid}>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <Palette size={20} className={styles.itemIcon} />
                <h3>Design & Engineering</h3>
              </div>
              <p>
                Crafted by <a href="https://www.linkedin.com/in/havergal/" target="_blank" rel="noopener noreferrer" className={styles.link}>Havergal</a>.
              </p>
            </div>

            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <Code size={20} className={styles.itemIcon} />
                <h3>Technology</h3>
              </div>
              <p>
                Built with Next.js, GSAP for motion, and Custom WebGL for atmospheric backgrounds.
              </p>
            </div>

            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <Globe size={20} className={styles.itemIcon} />
                <h3>Typography</h3>
              </div>
              <p>
                Set in Cal Sans and curated serif typefaces to maintain an authoritative yet modern legal aesthetic.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.closeBtn} onClick={onClose}>
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
}
