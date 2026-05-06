import Link from 'next/link';
import styles from './TeamProfileDetail.module.css';

export default function TeamProfileDetail({ member, lang }) {
  if (!member) return null;

  const isIndo = lang === 'id';

  // Helper to get multi-lang content
  const getContent = (en, id) => (isIndo ? id || en : en);

  return (
    <article className={styles.profilePage}>
      {/* Hero Section */}
      <section className={styles.profileHero}>
        <div className={styles.heroBackground}>
          <div className="noise-overlay" />
        </div>
        
        <div className="container">
          <div className={styles.heroContent}>
            {/* Image side */}
            <div className={styles.imageWrapper}>
              {member.photo ? (
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className={styles.image} 
                />
              ) : (
                <div className={styles.placeholderImage}>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
            </div>

            {/* Info side */}
            <div className={styles.infoContent}>
              <nav className={styles.breadcrumb}>
                <Link href={`/${lang}`}>{isIndo ? 'Beranda' : 'Home'}</Link>
                <span> / </span>
                <Link href={`/${lang}/team`}>{isIndo ? 'Tim' : 'Team'}</Link>
                <span> / {member.slug}</span>
              </nav>
              
              <h1 className={styles.name}>{member.name}</h1>
              <span className={styles.title}>
                {getContent(member.title, member.titleId)}
              </span>
              
              <hr className={styles.divider} />
              
              <div className={styles.metaInfo}>
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
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className={styles.mainContent}>
        {/* Bio Section */}
        <section className={styles.detailSection}>
          <div className="container">
            <div className={styles.detailGrid}>
              <div className={styles.sectionLabel}>
                {isIndo ? 'Biografi' : 'Biography'}
              </div>
              <div className={styles.sectionContent}>
                <p className={styles.bioText}>
                  {getContent(member.bio, member.bioId)}
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
                  <div className={styles.trackRecordContainer}>
                    {member.trackRecord.map((cat, idx) => (
                      <div key={idx} className={styles.trackCategory}>
                        <h3 className={styles.categoryTitle}>
                          {getContent(cat.category, cat.categoryId)}
                        </h3>
                        <ul className={styles.trackList}>
                          {cat.items.map((item, itemIdx) => (
                            <li key={itemIdx} className={styles.trackItem}>
                              {getContent(item.en, item.id)}
                            </li>
                          ))}
                        </ul>
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
