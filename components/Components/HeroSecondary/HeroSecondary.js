'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './HeroSecondary.module.css';

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1] // Custom ease-out
    }
  }
};

export default function HeroSecondary({ lang, dict }) {
  return (
    <section className={styles.secondarySection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.secondaryGrid}>
          <motion.div 
            className={styles.secondaryCopy}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            <motion.span variants={revealVariants} className={styles.secondaryLabel}>
              {dict?.home?.secondaryLabel || "Jakarta's Premier Law Firm"}
            </motion.span>
            
            <motion.h2 variants={revealVariants} className={styles.secondaryTitle}>
              {dict?.home?.secondaryTitle || "Trusted Counsel for the Matters That Define Your Business"}
            </motion.h2>
            
            <motion.hr variants={revealVariants} className="divider divider--left" />
            
            <motion.p variants={revealVariants} className={styles.secondarySub}>
              {dict?.home?.secondarySub || "Since 2018, STNP has represented major corporations, banks, and international investors in Indonesia's most consequential legal proceedings."}
            </motion.p>
            
            <motion.div variants={revealVariants} className={styles.secondaryCta}>
              <Link href={`/${lang}/team-profile`} className="btn btn--primary">
                {dict?.home?.secondaryCta1 || "Meet Our Team"}
              </Link>
              <Link href={`/${lang}/legal-services`} className="btn btn--outline">
                {dict?.home?.secondaryCta2 || "Our Practice Areas"}
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className={styles.secondaryVisual}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          >
            <div className={styles.videoWrapper}>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className={styles.timelapseVideo}
              >
                <source src="/videos/hero-loop.mp4" type="video/mp4" />
              </video>
              <div className={styles.glassOverlay}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
