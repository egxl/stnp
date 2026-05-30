'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Link from 'next/link';
import styles from './TeamProfileDetail.module.css';

gsap.registerPlugin(ScrollTrigger);

// Mapping of English and Indonesian specializations to services.js keys
const specToServiceKey = {
  // English specializations
  'Commercial Litigation': 'commercialLitigation',
  'Bankruptcy & Insolvency': 'bankruptcy',
  'Mining & Energy': 'miningEnergy',
  'Plantation': 'plantationAgribusiness',
  'General Corporate': 'generalCorporate',
  'Plantation Law': 'plantationAgribusiness',
  'Industrial Relations': 'industrialRelations',
  'Corporate Restructuring': 'bankruptcy',
  'Capital Markets': 'generalCorporate',
  'Foreign Investment': 'generalCorporate',
  'Company Acquisitions': 'mergersAcquisitions',
  'Family Law': 'commercialLitigation',
  'Employment Law': 'industrialRelations',
  'Infrastructure': 'infrastructureRealEstate',

  // Indonesian specializations
  'Litigasi Komersial': 'commercialLitigation',
  'Kepailitan & Penundaan Kewajiban Pembayaran Utang': 'bankruptcy',
  'Pertambangan & Energi': 'miningEnergy',
  'Perkebunan': 'plantationAgribusiness',
  'Korporasi Umum': 'generalCorporate',
  'Hukum Perkebunan': 'plantationAgribusiness',
  'Hubungan Industrial': 'industrialRelations',
  'Restrukturisasi Korporasi': 'bankruptcy',
  'Pasar Modal': 'generalCorporate',
  'Penanaman Modal Asing': 'generalCorporate',
  'Akuisisi Perusahaan': 'mergersAcquisitions',
  'Hukum Keluarga': 'commercialLitigation',
  'Hukum Ketenagakerjaan': 'industrialRelations',
  'Infrastruktur': 'infrastructureRealEstate'
};

const getServiceKey = (specName) => {
  if (!specName) return null;
  const cleanSpec = specName.trim();
  
  // Direct match check
  if (specToServiceKey[cleanSpec]) return specToServiceKey[cleanSpec];

  // Case-insensitive check
  const lower = cleanSpec.toLowerCase();
  for (const [key, value] of Object.entries(specToServiceKey)) {
    if (key.toLowerCase() === lower) return value;
  }

  // Soft fallback matching based on keywords
  if (lower.includes('litigasi') || lower.includes('litigation') || lower.includes('keluarga') || lower.includes('family')) {
    return 'commercialLitigation';
  }
  if (lower.includes('kepailitan') || lower.includes('bankruptcy') || lower.includes('insolvensi') || lower.includes('restrukturisasi') || lower.includes('restructuring')) {
    return 'bankruptcy';
  }
  if (lower.includes('korporasi') || lower.includes('corporate') || lower.includes('investasi') || lower.includes('investment') || lower.includes('pasar modal') || lower.includes('capital market')) {
    return 'generalCorporate';
  }
  if (lower.includes('akuisisi') || lower.includes('acquisition') || lower.includes('merger')) {
    return 'mergersAcquisitions';
  }
  if (lower.includes('pertambangan') || lower.includes('mining') || lower.includes('energi') || lower.includes('energy')) {
    return 'miningEnergy';
  }
  if (lower.includes('perkebunan') || lower.includes('plantation')) {
    return 'plantationAgribusiness';
  }
  if (lower.includes('hubungan industrial') || lower.includes('industrial relation') || lower.includes('tenaga kerja') || lower.includes('employment') || lower.includes('labor')) {
    return 'industrialRelations';
  }
  if (lower.includes('infrastruktur') || lower.includes('infrastructure') || lower.includes('properti') || lower.includes('property') || lower.includes('real estate')) {
    return 'infrastructureRealEstate';
  }
  
  return null;
};

export default function TeamProfileDetail({ member, lang, dict }) {
  const containerRef = useRef(null);
  
  if (!member) return null;

  const isIndo = lang === 'id';

  // Helper to get multi-lang content
  const getContent = (en, id) => (isIndo ? id || en : en);
  const profileCopy = dict || {};
  const getTitle = (title) => {
    const value = Array.isArray(title) ? title[0] : title;
    const titleKeys = {
      'Managing Partner': 'managingPartner',
      Partner: 'partner',
      'Senior Associate': 'seniorAssociate',
      Associate: 'associate',
    };

    return profileCopy.titles?.[titleKeys[value]] || getContent(member.title, member.titleId);
  };

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
                    <span className={styles.metaLabel}>{profileCopy.profile?.education || (isIndo ? 'Pendidikan' : 'Education')}</span>
                    <p className={styles.metaValue}>{getContent(member.education, member.educationId)}</p>
                  </div>
                )}
                
                {member.credentials && member.credentials.length > 0 && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>{profileCopy.profile?.credentials || (isIndo ? 'Sertifikasi' : 'Credentials')}</span>
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
                  {getTitle(member.title)}
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
                {profileCopy.profile?.fullBiography || (isIndo ? 'Profil Lengkap' : 'Full Biography')}
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
                  {profileCopy.profile?.specialization || (isIndo ? 'Spesialisasi' : 'Specialization')}
                </div>
                <div className={styles.sectionContent}>
                  <div className={styles.specGrid}>
                    {(isIndo ? member.specializationId || member.specialization : member.specialization).map((spec, idx) => {
                      const svcKey = getServiceKey(spec);
                      if (svcKey) {
                        return (
                          <Link 
                            key={idx} 
                            href={`/${lang}/legal-services?service=${svcKey}#ledger`} 
                            className={styles.specTag}
                          >
                            {spec}
                          </Link>
                        );
                      }
                      return (
                        <div key={idx} className={styles.specTag}>
                          {spec}
                        </div>
                      );
                    })}
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
                  {profileCopy.profile?.trackRecord || (isIndo ? 'Rekam Jejak' : 'Track Record')}
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
