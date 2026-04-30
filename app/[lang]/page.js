import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { getPosts } from '@/lib/api';
import { firmInfo } from '@/lib/data/team';
import { serviceCategories } from '@/lib/data/services';
import { pastClients } from '@/lib/data/clients';
import { decodeHtmlEntities, stripHtml } from '@/lib/utils';



import HeroParallax from '@/components/Animations/HeroParallax/HeroParallax';
import TrustMarquee from '@/components/Components/TrustMarquee/TrustMarquee';
import HeroVideo from '@/components/Components/HeroVideo/HeroVideo';
import FloatingLines from '@/components/Animations/FloatingLines/FloatingLines';
import AuthorityStrip from '@/components/Components/AuthorityStrip/AuthorityStrip';
import ExperienceHighlights from '@/components/Components/ExperienceHighlights/ExperienceHighlights';
import ConsolidatedPhilosophy from '@/components/Components/ConsolidatedPhilosophy/ConsolidatedPhilosophy';
import PracticeAccordion from '@/components/Components/PracticeAccordion/PracticeAccordion';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import styles from './page.module.css';



export const metadata = {
  title: 'Soaloan Tua Nababan & Partners — Law Firm Jakarta',
  description:
    'STNP is a full-service Jakarta law firm specializing in bankruptcy, commercial litigation, corporate law, project financing, infrastructure, and plantation.',
};

const heroTitleLayouts = {
  en: [
    { text: 'Trusted Counsel', accent: true, nowrap: true },
    { text: 'for the Matters', nowrap: true },
    { 
      text: [
        { text: 'that ' },
        { text: 'Define', accent: true }
      ], 
      nowrap: true 
    },
    { text: 'Your Business', accent: true, nowrap: true },
  ],
  id: [
    { text: 'Penasihat Terpercaya', accent: true, nowrap: true },
    { text: 'untuk Perkara yang', nowrap: true },
    { text: 'Menentukan Bisnis Anda', accent: true, nowrap: true },
  ],
  zh: [
    { text: '值得信赖的法律顾问', accent: true, nowrap: true },
    { text: '为您业务的', nowrap: true },
    { text: '关键事务', accent: true, nowrap: true },
  ],
};

function renderHeroTitle(title, lang, styles) {
  const lines = heroTitleLayouts[lang];

  if (!lines?.length) {
    return <span className={styles.heroTitleLine}>{title}</span>;
  }

  return lines.map((line, index) => {
    const isArray = Array.isArray(line.text);
    
    return (
      <span
        key={`${lang}-${index}`}
        className={[
          styles.heroTitleLine,
          !isArray && line.accent ? styles.heroTitleAccent : '',
          line.nowrap ? styles.heroTitleLineNoWrap : '',
        ].filter(Boolean).join(' ')}
      >
        {isArray ? (
          line.text.map((part, pIdx) => (
            <span 
              key={pIdx} 
              className={part.accent ? styles.heroTitleAccent : ''}
            >
              {part.text}
            </span>
          ))
        ) : (
          line.text
        )}
      </span>
    );
  });
}

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
      {/* ===== HERO ===== */}
      <section className={`${styles.hero} ${styles.snapSection}`}>
        {/* Background Video Component - BACKUP */}
        {/* <HeroVideo 
          className={styles.heroVideo} 
          visibleClass={styles.videoVisible} 
        /> */}

        <FloatingLines 
          className={`${styles.heroVideo} ${styles.videoVisible}`} 
          linesGradient={['#C4A35A', '#2C5F7C', '#051020']}
          mixBlendMode="screen"
        />

        <div className={styles.heroSticky}>
          <HeroParallax className={styles.heroShell}>
            <div className={styles.heroNarrative}>
              <span className={styles.heroLabel}>{dict.home.heroLabel}</span>
              <h1 className={styles.heroTitle}>
                {renderHeroTitle(dict.home.secondaryTitle, lang, styles)}
              </h1>
              <hr className={styles.heroDivider} />
              <p className={styles.heroSubtitle}>
                {dict.home.secondarySub}
              </p>
              <div className={styles.heroCta}>
                <Link href={`/${lang}/team-profile`} className="btn btn--primary">
                  {dict.home.secondaryCta1}
                </Link>
                <Link href={`/${lang}/legal-services`} className="btn btn--outline">
                  {dict.home.secondaryCta2}
                </Link>
              </div>
            </div>
          </HeroParallax>
          

          
          <AuthorityStrip dict={dict} />
        </div>
      </section>

      {/* ===== EXPERIENCE HIGHLIGHTS ===== */}
      <ExperienceHighlights dict={dict} lang={lang} />

      {/* ===== FEATURED CLIENTS (NEW TRUST MARQUEE) ===== */}
      <section className={`section ${styles.trustSection} ${styles.snapSection}`}>
        <div className="container">
          <div className={styles.trustHeader}>
            <span className={`section-label ${styles.trustLabel}`}>{dict.home.clientsLabel}</span>
            <h2 className={`section-title ${styles.trustTitle}`}>{dict.home.clientsTitle}</h2>
            <hr className={`divider divider--left ${styles.trustDivider}`} />
          </div>

          <TrustMarquee clients={pastClients} dict={dict.home} lang={lang} />
        </div>
      </section>


      {/* ===== WHAT WE DO (ACCORDION) ===== */}
      <section className={`section ${styles.snapSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">{dict.home.servicesLabel}</span>
            <h2 className="section-title">{dict.home.servicesTitle}</h2>
            <hr className="divider" />
            <p className="section-subtitle">
              {dict.home.servicesSubtitle}
            </p>
          </div>
          
          <PracticeAccordion 
            serviceCategories={serviceCategories} 
            dict={dict.home} 
            lang={lang} 
          />
        </div>
      </section>

      {/* ===== NEW CONSOLIDATED PHILOSOPHY ===== */}
      <ConsolidatedPhilosophy dict={dict.home} lang={lang} />

      {/* ===== LATEST ARTICLES ===== */}
      {latestPosts.length > 0 && (
        <section className={`section ${styles.snapSection}`}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">{dict.home.insightsLabel}</span>
              <h2 className="section-title">{dict.home.articlesTitle}</h2>
              <hr className="divider" />
              <p className="section-subtitle">
                {dict.home.articlesSubtitle}
              </p>
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
                  <div key={post.id} className={styles.articleCard}>
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
                        <Link href={`/${lang}/insights/${post.slug}`}>
                          {decodeHtmlEntities(post.title.rendered)}
                        </Link>
                      </h3>
                      <p className={styles.articleExcerpt}>
                        {stripHtml(post.excerpt.rendered).substring(0, 120)}…
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.articlesMore}>
              <Link href={`/${lang}/insights`} className="btn btn--outline">
                {dict.home.viewAll}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== CONTACT CTA ===== */}
      <section className={`section--dark ${styles.ctaSection} ${styles.snapSection}`}>

        <div className="container">
          <div className={styles.ctaContent}>
            <span className="section-label">{dict.home.ctaLabel}</span>
            <hr className="divider" />
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
