'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import styles from './TeamProfileDetail.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function TeamProfileDetail({ member, lang }) {
  const containerRef = useRef(null);
  
  if (!member) return null;

  const isIndo = lang === 'id';

  // Helper to get multi-lang content
  const getContent = (en, id) => (isIndo ? id || en : en);

  useGSAP(() => {
    // Fade in sections on scroll
    const sections = gsap.utils.toArray(`.${styles.detailSection}`);
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          }
        }
      );
    });

    // Hero animations
    gsap.fromTo(`.${styles.imageWrapper}`, 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }
    );
    
    gsap.fromTo([`.${styles.name}`, `.${styles.title}`, `.${styles.divider}`],
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  return (
    <article className={styles.profilePage} ref={containerRef}>
      {/* Hero Section */}
      <section className={styles.profileHero}>
        <div className={styles.heroBackground}>
          <div className="noise-overlay" />
        </div>
        
        <div className="container">
          <div className={styles.heroGrid}>
            {/* Left: Metadata & Portrait */}
            <aside className={styles.heroSidebar}>
              <div className={styles.imageWrapper}>
                {member.photo ? (
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className={styles.image} 
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>

              <div className={styles.dossierMeta}>
                {member.education && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>{isIndo ? 'Pendidikan' : 'Education'}</span>
                    <p className={styles.metaValue}>{getContent(member.education, member.educationId)}</p>
                  </div>
                )}
                
                {member.credentials && member.credentials.length > 0 && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>{isIndo ? 'Sertifikasi' : 'Credentials'}</span>
                    <ul className={styles.metaList}>
                      {(isIndo ? member.credentialsId || member.credentials : member.credentials).map((cred, idx) => (
                        <li key={idx}>{cred}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>

            {/* Right: Primary Info */}
            <div className={styles.heroMain}>
              <div className={styles.nameHeader}>
                <h1 className={styles.name}>{member.name}</h1>
                <span className={styles.title}>
                  {getContent(member.title, member.titleId)}
                </span>
                <div className={styles.divider} />
              </div>
              
              <div className={styles.introBio}>
                <p className={styles.bioTextLarge}>
                  {getContent(member.bio, member.bioId).split('\n\n')[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className={styles.mainContent}>
        {/* Full Biography */}
        <section className={styles.detailSection}>
          <div className="container">
            <div className={styles.detailGrid}>
              <div className={styles.sectionLabel}>
                {isIndo ? 'Profil Lengkap' : 'Full Biography'}
              </div>
              <div className={styles.sectionContent}>
                <p className={styles.bioText}>
                  {getContent(member.bio, member.bioId).split('\n\n').slice(1).join('\n\n')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Specialization Section */}
        {member.specialization && (
          <section className={styles.detailSection}>
            <div className="container">
              <div className={styles.detailGrid}>
                <div className={styles.sectionLabel}>
                  {isIndo ? 'Spesialisasi' : 'Specialization'}
                </div>
                <div className={styles.sectionContent}>
                  <div className={styles.specGrid}>
                    {(isIndo ? member.specializationId || member.specialization : member.specialization).map((spec, idx) => (
                      <div key={idx} className={styles.specTag}>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Track Record Section */}
        {member.trackRecord && member.trackRecord.length > 0 && (
          <section className={styles.detailSection}>
            <div className="container">
              <div className={styles.detailGrid}>
                <div className={styles.sectionLabel}>
                  {isIndo ? 'Rekam Jejak' : 'Track Record'}
                </div>
                <div className={styles.sectionContent}>
                  <div className={styles.ledgerContainer}>
                    {member.trackRecord.map((cat, idx) => (
                      <div key={idx} className={styles.ledgerCategory}>
                        <h3 className={styles.categoryTitle}>
                          {getContent(cat.category, cat.categoryId)}
                        </h3>
                        <div className={styles.ledgerList}>
                          {cat.items.map((item, itemIdx) => (
                            <div key={itemIdx} className={styles.ledgerItem}>
                              <span className={styles.ledgerIndex}>
                                {(itemIdx + 1).toString().padStart(2, '0')}
                              </span>
                              <div className={styles.ledgerContent}>
                                {getContent(item.en, item.id)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
