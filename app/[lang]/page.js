import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { getPosts } from '@/lib/api';
import { firmInfo } from '@/lib/data/team';
import { serviceCategories } from '@/lib/data/services';
import { pastClients } from '@/lib/data/clients';
import { decodeHtmlEntities, stripHtml } from '@/lib/utils';
import BorderGlow from '@/components/Components/BorderGlow/BorderGlow';
import ScrollHijack from '@/components/Animations/ScrollHijack/ScrollHijack';
import CardSwap, { Card } from '@/components/Animations/CardSwap/CardSwap';
import Prism from '@/components/Animations/Prism/Prism';
import MagicRings from '@/components/Animations/MagicRings/MagicRings';
import HeroScrollButton from '@/components/Components/HeroScrollButton/HeroScrollButton';
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
  briefcase: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="16" width="32" height="24" rx="2" strokeLinejoin="round" />
      <path d="M16 16v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4M8 24h32" strokeLinecap="round" />
    </svg>
  ),
  flow: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="32" width="12" height="8" rx="1" />
      <rect x="28" y="32" width="12" height="8" rx="1" />
      <rect x="18" y="8" width="12" height="8" rx="1" />
      <path d="M14 32v-8h20v8M24 24v-8" strokeLinejoin="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 4L6 12v14c0 14 18 20 18 20s18-6 18-20V12L24 4z" strokeLinejoin="round" />
      <path d="M24 16v16M18 24l6 6 6-12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M26 4L10 26h14l-4 18 18-22H24l6-18z" strokeLinejoin="round" />
    </svg>
  ),
  crane: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 42h36M12 42L24 8M36 42L24 8M24 8l16-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 28h16M20 18h8M40 4v16" strokeLinecap="round" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="18" />
      <path d="M16 16l6 16 10-6-6-16z" strokeLinejoin="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 42l-2-2C10 28 6 22 6 15c0-6 5-11 11-11 4 0 8 3 10 7 2-4 6-7 10-7 6 0 11 5 11 11 0 7-4 13-16 25l-2 2z" strokeLinejoin="round" />
    </svg>
  ),
};

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);



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
      <ScrollHijack />
      {/* ===== HERO ===== */}
      <section className={`${styles.hero} ${styles.snapSection}`}>
        {/* Background Video hosted on WordPress */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.heroVideo}
        >
          {/* H.265 (HEVC) for highly-compressed modern playback (Safari/newer devices) */}
          <source src="/videos/hero-loop-hevc.mp4" type="video/mp4; codecs=hvc1" />
          {/* Default H.264 fallback for broader compatibility */}
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>

        <div className={styles.heroOverlay} />
        <div className={styles.heroShell}>
          <div className={styles.heroNarrative}>
            <hr className={styles.heroDivider} />
            <h1 className={styles.heroTitle}>
              {dict.home.heroTitle1}<br />
              <span className={styles.heroTitleAccent}>{dict.home.heroTitle2}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {dict.home.heroSubtitle}
            </p>
          </div>
          <div className={styles.heroBrandPanel}>
            <div className={styles.heroBrandFrame}>
              <img 
                src="/images/logo.png" 
                alt="Soaloan Tua Nababan & Partners Logo" 
                className={styles.heroLogo} 
              />
            </div>
          </div>
        </div>
        
        <HeroScrollButton />
      </section>

      {/* ===== ABOUT SUMMARY ===== */}
      <section className={`${styles.aboutSection} card-swap-section`}>
        <div className={styles.aboutSticky}>
          <Prism 
            animationType="3drotate" 
            glow={0.5} 
            colorFrequency={0.2} 
            bloom={0.5} 
            timeScale={0.3} 
          />
          <div className="container">
            <div className={styles.aboutGrid}>
              <div className={styles.aboutLeft}>
                <span className="section-label">{dict.home.aboutLabel}</span>
                <h2 className="section-title">{dict.home.aboutTitle}</h2>
                <hr className="divider divider--left" />
                <p className={styles.aboutText}>
                  {dict.home.aboutText.replace('{founder}', firmInfo.founder)}
                </p>
              </div>
              <div className={styles.aboutRight}>
                <CardSwap width="100%" height="auto">
                  {firmInfo.principles.map((p, i) => (
                    <Card key={i} className={styles.principleCardWrapper}>
                      <div className={styles.principleHeader}>
                        <div className={styles.principleNumber}>0{i + 1}</div>
                        <h4 className={styles.principleTitle}>{p.title}</h4>
                      </div>
                      <p className={styles.principleDesc}>{p.description}</p>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.aboutSnapTrack}>
          {firmInfo.principles.map((_, i) => (
            <div key={i} className={styles.snapPoint} />
          ))}
        </div>
      </section>

      {/* ===== PAST CLIENTS ===== */}
      <section className={`section ${styles.clientsSection} ${styles.snapSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">{dict.home.clientsLabel}</span>
            <h2 className="section-title">{dict.home.clientsTitle}</h2>
            <hr className="divider" />
          </div>
          <div className={styles.clientsGrid}>
            {pastClients.map((client, i) => (
              <BorderGlow 
                key={i} 
                className={styles.clientCard}
                style={{ '--index': i }}
                glowColor="40 10% 50%" 
                borderRadius={8} 
                fillOpacity={0.05} 
                glowIntensity={0.3}
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className={styles.clientLogo} 
                />
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEGAL SERVICES ===== */}
      <section className={`section section--alt ${styles.servicesSection} ${styles.snapSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">{dict.home.servicesLabel}</span>
            <h2 className="section-title">{dict.home.servicesTitle}</h2>
            <hr className="divider" />
            <p className="section-subtitle">
              {dict.home.servicesSubtitle}
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {serviceCategories.map((category, catIndex) => (
              <BorderGlow
                key={category.id}
                className={styles.categoryPillar}
                style={{ '--index': catIndex }}
                glowColor="40 80 80"
                borderRadius={8}
                fillOpacity={0.8}
              >
                <div className={styles.pillarIcon}>
                  {serviceIcons[category.services[0].icon]}
                </div>
                <h3 className={styles.pillarTitle}>
                  {category.title[lang] || category.title.en}
                </h3>
                <div className={styles.pillarTags}>
                  {category.services.map(s => (
                    <span key={s.id} className={styles.pillarTag}>
                      {s.title[lang] || s.title.en}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${lang}/legal-services#${category.id}`}
                  className={styles.pillarCta}
                >
                  {dict.home.learnMore}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUOTE BANNER ===== */}
      <section className={`${styles.quoteBanner} ${styles.snapSection}`}>
        <div className={styles.quotePortrait}>
          <img src="/images/quotes/portrait.webp" alt="Thomas Jefferson Portrait" />
        </div>
        <div className="container">
          <div className={styles.quoteContent}>
            <blockquote className={styles.blockquote}>
              <span className={styles.quoteOpen}>&ldquo;</span>
              {firmInfo.quote}
              <span className={styles.quoteClose}>&rdquo;</span>
            </blockquote>
            <div className={styles.quoteAuthorInfo}>
              <cite className={styles.quoteCite}>{firmInfo.quoteAuthor}</cite>
              <div className={styles.quoteSignature}>
                <img src="/images/quotes/signature.svg" alt="Thomas Jefferson Signature" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LATEST ARTICLES ===== */}
      {latestPosts.length > 0 && (
        <section className={`section ${styles.snapSection}`}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">{dict.home.insightsLabel}</span>
              <h2 className="section-title">{dict.home.articlesTitle}</h2>
              <hr className="divider" />
            </div>
            <div className={styles.articlesGrid}>
              {latestPosts.map((post) => {
                const featuredImg =
                  post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                const category =
                  post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Article';
                const date = new Date(post.date).toLocaleDateString(lang === 'id' ? 'id-ID' : lang === 'zh' ? 'zh-CN' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                 });

                return (
                  <BorderGlow key={post.id} className={styles.articleCard} glowColor="40 80 80" borderRadius={12}>
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
                        <Link href={`/${lang}/article/${post.slug}`}>
                          {decodeHtmlEntities(post.title.rendered)}
                        </Link>
                      </h3>
                      <p className={styles.articleExcerpt}>
                        {stripHtml(post.excerpt.rendered).substring(0, 120)}…
                      </p>
                    </div>
                  </BorderGlow>
                );
              })}
            </div>
            <div className={styles.articlesMore}>
              <Link href={`/${lang}/article`} className="btn btn--dark">
                {dict.home.viewAll}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== CONTACT CTA ===== */}
      <section className={`section--dark ${styles.ctaSection} ${styles.snapSection}`}>
        <div className={styles.magicRingsWrapper}>
          <MagicRings
            color="#2c5f7c"
            colorTwo="#c4a35a"
            ringCount={5}
            speed={0.8}
            attenuation={12}
            lineThickness={1.5}
            baseRadius={0.25}
            radiusStep={0.15}
            opacity={0.6}
            followMouse={true}
            mouseInfluence={0.05}
            hoverScale={1.1}
            parallax={0.03}
          />
        </div>
        <div className="container">
          <div className={styles.ctaContent}>
            <span className="section-label">{dict.home.ctaLabel}</span>
            <h2 className={styles.ctaTitle}>
              {dict.home.ctaTitle}
            </h2>
            <p className={styles.ctaText}>
              {dict.home.ctaText}
            </p>
            <div className={styles.ctaActions}>
              <Link href={`/${lang}/contact`} className="btn btn--primary">
                {dict.home.schedule}
              </Link>
              <a href={`mailto:${firmInfo.email}`} className={styles.ctaEmail}>
                {dict.home.orEmail} <span>{firmInfo.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
