import Link from 'next/link';
import styles from './TeamProfileDetail.module.css';

export default function TeamProfileDetail({ member, lang }) {
  if (!member) return null;

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
                <Link href={`/${lang}`}>Home</Link>
                <span> / </span>
                <Link href={`/${lang}/team-profile`}>Team</Link>
                <span> / {member.slug}</span>
              </nav>
              
              <h1 className={styles.name}>{member.name}</h1>
              <span className={styles.title}>
                {Array.isArray(member.title) ? member.title[0] : member.title}
              </span>
              
              <hr className={styles.divider} />
              
              <div className={styles.shortBio}>
                {/* Optional short description could go here if available */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className={styles.bioSection}>
        <div className="container">
          <div className={styles.bioGrid}>
            <div className={styles.bioLabel}>
              Biography
            </div>
            <div className={styles.bioText}>
              {lang === 'id' ? member.bioId || member.bio : member.bio}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
