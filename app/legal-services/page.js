import Link from 'next/link';
import { services } from '@/lib/data/services';
import styles from './page.module.css';

export const metadata = {
  title: 'Legal Services',
  description:
    'Explore STNP\'s six core practice areas: bankruptcy, commercial litigation, corporate law, project financing, infrastructure, and plantation law.',
};

const serviceIcons = {
  scale: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 6v36M8 16l16-6 16 6M8 16l-2 12h12L16 16M40 16l-2 12h12L48 16" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="24" cy="6" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  gavel: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="18" y="6" width="18" height="8" rx="2" transform="rotate(45 27 10)" strokeLinejoin="round" />
      <path d="M12 32l-6 6M6 38l12 4M42 42H6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 22L10 34" strokeLinecap="round" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="12" width="32" height="30" rx="1" strokeLinejoin="round" />
      <path d="M24 4v8M16 4h16" strokeLinecap="round" />
      <rect x="14" y="18" width="6" height="6" rx="0.5" />
      <rect x="28" y="18" width="6" height="6" rx="0.5" />
      <rect x="14" y="28" width="6" height="6" rx="0.5" />
      <rect x="28" y="28" width="6" height="6" rx="0.5" />
      <path d="M20 42v-6h8v6" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 42V10M6 42h36" strokeLinecap="round" />
      <path d="M12 34l8-10 6 6 10-14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="16" r="3" />
    </svg>
  ),
  landmark: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 4L4 16h40L24 4z" strokeLinejoin="round" />
      <path d="M8 16v22M16 16v22M24 16v22M32 16v22M40 16v22" strokeLinecap="round" />
      <rect x="4" y="38" width="40" height="4" rx="1" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 40C12 40 8 20 24 8c16 12 12 32 12 32" strokeLinejoin="round" />
      <path d="M24 8v32" strokeLinecap="round" />
      <path d="M18 20c3 2 6 2 6 2M30 20c-3 2-6 2-6 2M16 28c4 2 8 2 8 2M32 28c-4 2-8 2-8 2" strokeLinecap="round" />
    </svg>
  ),
};

export default function LegalServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.pageHero}>
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.breadcrumb}>Home / Legal Services</span>
            <h1 className={styles.heroTitle}>Legal Services</h1>
            <p className={styles.heroSubtitle}>
              Comprehensive legal solutions across six key practice areas, delivered with precision and unwavering dedication.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section">
        <div className="container">
          <div className={styles.servicesList}>
            {services.map((service, i) => (
              <div
                key={service.id}
                className={`${styles.serviceRow} ${i % 2 !== 0 ? styles.serviceRowReversed : ''}`}
              >
                <div className={styles.serviceIconBlock}>
                  <div className={styles.serviceIconLarge}>
                    {serviceIcons[service.icon]}
                  </div>
                  <div className={styles.serviceNumber}>0{i + 1}</div>
                </div>
                <div className={styles.serviceInfo}>
                  <h2 className={styles.serviceTitle}>{service.title}</h2>
                  <hr className="divider divider--left" />
                  <p className={styles.serviceDesc}>{service.description}</p>
                  <Link href="/contact" className={styles.serviceCta}>
                    Discuss This Matter
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section--dark ${styles.ctaSection}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Need Legal Assistance?</span>
          <h2 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-md)' }}>
            Let&apos;s Discuss Your Case
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto var(--space-xl)', fontSize: 'var(--text-lg)' }}>
            Our experienced attorneys are ready to provide the strategic counsel you need.
          </p>
          <Link href="/contact" className="btn btn--primary">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
