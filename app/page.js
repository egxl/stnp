import Link from 'next/link';
import { getPosts } from '@/lib/api';
import { firmInfo } from '@/lib/data/team';
import { services } from '@/lib/data/services';
import { decodeHtmlEntities, stripHtml } from '@/lib/utils';
import styles from './page.module.css';

export const metadata = {
  title: 'Soaloan Tua Nababan & Partners — Law Firm Jakarta',
  description:
    'STNP is a full-service Jakarta law firm specializing in bankruptcy, commercial litigation, corporate law, project financing, infrastructure, and plantation.',
};

/* SVG icons for each service */
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
      <path d="M14 20v14M22 26v8M30 22v12M38 18v16" strokeLinecap="round" opacity="0.3" />
    </svg>
  ),
  landmark: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 4L4 16h40L24 4z" strokeLinejoin="round" />
      <path d="M8 16v22M16 16v22M24 16v22M32 16v22M40 16v22" strokeLinecap="round" />
      <rect x="4" y="38" width="40" height="4" rx="1" />
      <rect x="2" y="42" width="44" height="3" rx="1" />
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

export default async function HomePage() {
  /* Fetch latest 3 articles from WordPress */
  let latestPosts = [];
  try {
    const result = await getPosts({ perPage: 3 });
    latestPosts = result.data || [];
  } catch (e) {
    console.error('Failed to fetch posts:', e);
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        {/* Background Video hosted on WordPress */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.heroVideo}
        >
          {/* H.265 (HEVC) for highly-compressed modern playback (Safari/newer devices) */}
          <source src="https://stnp.co.id/wp-content/uploads/2026/04/output_h265.mp4" type="video/mp4; codecs=hvc1" />
          {/* Default H.264 fallback for broader compatibility (Chrome, Firefox, older devices) */}
          <source src="https://stnp.co.id/wp-content/uploads/2026/04/output_h264.mp4" type="video/mp4" />
        </video>

        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>Soaloan Tua Nababan & Partners</span>
          <h1 className={styles.heroTitle}>
            Enforcing the Law<br />
            <span className={styles.heroTitleAccent}>of Truth & Justice</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A full-service Jakarta law firm providing strategic legal counsel
            across bankruptcy, litigation, corporate, and finance.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/contact" className="btn btn--primary">
              Free Consultation
            </Link>
            <Link href="/legal-services" className="btn btn--outline">
              Our Services
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ===== ABOUT SUMMARY ===== */}
      <section className={`section ${styles.aboutSection}`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutLeft}>
              <span className="section-label">About Our Firm</span>
              <h2 className="section-title">Trusted Legal Partners Since 2018</h2>
              <hr className="divider divider--left" />
              <p className={styles.aboutText}>
                Founded by {firmInfo.founder}, Soaloan Tua Nababan & Partners has
                established itself as a trusted legal practice in Jakarta. We combine
                deep legal expertise with a client-focused approach, guided by three
                core principles that define everything we do.
              </p>
            </div>
            <div className={styles.principlesGrid}>
              {firmInfo.principles.map((p, i) => (
                <div key={i} className={styles.principleCard}>
                  <div className={styles.principleNumber}>0{i + 1}</div>
                  <h4 className={styles.principleTitle}>{p.title}</h4>
                  <p className={styles.principleDesc}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEGAL SERVICES ===== */}
      <section className={`section section--alt ${styles.servicesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Practice Areas</span>
            <h2 className="section-title">Legal Services</h2>
            <hr className="divider" />
            <p className="section-subtitle">
              Comprehensive legal solutions across six key practice areas,
              delivered with precision and dedication.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, i) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  {serviceIcons[service.icon]}
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
                <Link href="/legal-services" className={styles.serviceLink}>
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUOTE BANNER ===== */}
      <section className={styles.quoteBanner}>
        <div className="container">
          <blockquote className={styles.blockquote}>
            <span className={styles.quoteOpen}>&ldquo;</span>
            {firmInfo.quote}
            <span className={styles.quoteClose}>&rdquo;</span>
          </blockquote>
          <cite className={styles.quoteCite}>— {firmInfo.quoteAuthor}</cite>
        </div>
      </section>

      {/* ===== LATEST ARTICLES ===== */}
      {latestPosts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Insights</span>
              <h2 className="section-title">Latest Articles</h2>
              <hr className="divider" />
            </div>
            <div className={styles.articlesGrid}>
              {latestPosts.map((post) => {
                const featuredImg =
                  post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                const category =
                  post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Article';
                const date = new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <article key={post.id} className={styles.articleCard}>
                    <div className={styles.articleImage}>
                      {featuredImg ? (
                        <img src={featuredImg} alt={post.title.rendered} />
                      ) : (
                        <div className={styles.articleImagePlaceholder}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                      <span className={styles.articleBadge}>{category}</span>
                    </div>
                    <div className={styles.articleBody}>
                      <time className={styles.articleDate}>{date}</time>
                      <h3 className={styles.articleTitle}>
                        <Link href={`/article/${post.slug}`}>
                          {decodeHtmlEntities(post.title.rendered)}
                        </Link>
                      </h3>
                      <p className={styles.articleExcerpt}>
                        {stripHtml(post.excerpt.rendered).substring(0, 120)}…
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className={styles.articlesMore}>
              <Link href="/article" className="btn btn--dark">
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== CONTACT CTA ===== */}
      <section className={`section--dark ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaContent}>
            <span className="section-label">Get in Touch</span>
            <h2 className={styles.ctaTitle}>
              Ready to Discuss<br />Your Legal Needs?
            </h2>
            <p className={styles.ctaText}>
              Schedule a consultation with our experienced legal team.
              We&rsquo;re here to help navigate your most complex legal challenges.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn--primary">
                Schedule Consultation
              </Link>
              <a href={`mailto:${firmInfo.email}`} className={styles.ctaEmail}>
                or email us at <span>{firmInfo.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
