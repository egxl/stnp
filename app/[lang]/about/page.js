import { getDictionary } from '@/lib/dictionaries';
import { firmInfo } from '@/lib/data/team';
import styles from './page.module.css';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const a = dict.about;
  return {
    title: a.meta.title,
    description: a.meta.description,
  };
}

import AboutAnimation from './AboutAnimation';

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const a = dict.about;
  const { address, phone, email } = firmInfo;

  const philosophyPrinciples = [a.philosophy.p01, a.philosophy.p02, a.philosophy.p03];

  return (
    <main className={styles.main}>
      <AboutAnimation />

      {/* ── Hero & Origin Story: Editorial Split ─────────────────────────── */}
      <section className={styles.splitSurface}>
        <div className="container">
          <div className={styles.splitGrid}>

            {/* Left: Sticky narrative anchor */}
            <div className={styles.splitLeft}>
              <div className={styles.stickyContent}>
                <h1 className={styles.editorialTitle} data-animate="hero">
                  {a.hero.title}
                </h1>
                <p className={styles.heroCopy} data-animate="hero">
                  {a.hero.subtitle}
                </p>
                <p className={styles.heroBody} data-animate="hero">
                  {a.hero.body}
                </p>
              </div>
            </div>

            {/* Right: Content flow */}
            <div className={styles.splitRight}>
              <div className={styles.flowContent}>
                <section className={styles.narrativeSection} data-animate="narrative">
                  <div className={styles.sectionLabel}>{a.story.label}</div>
                  <h2 className={styles.narrativeTitle}>{a.story.title}</h2>
                  <p className={styles.narrativeText}>{a.story.p1}</p>
                  <p className={styles.narrativeText}>{a.story.p2}</p>

                  <div className={`${styles.expansionBlock} ${styles.glassCard}`}>
                    <h3 className={styles.expansionTitle}>{a.story.expansion.label}</h3>
                    <p className={styles.narrativeText}>{a.story.expansion.body}</p>
                    <ul className={styles.partnerList}>
                      <li>
                        <strong>{a.story.expansion.partner1Name}</strong>
                        {' '}—{' '}{a.story.expansion.partner1Role}
                        {' '}—{' '}{a.story.expansion.partner1Bio}
                      </li>
                      <li>
                        <strong>{a.story.expansion.partner2Name}</strong>
                        {' '}—{' '}{a.story.expansion.partner2Role}
                        {' '}—{' '}{a.story.expansion.partner2Bio}
                      </li>
                    </ul>
                    <p className={styles.almaMater}>{a.story.expansion.almaMater}</p>
                  </div>
                </section>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────────────────────── */}
      <section className={styles.sectionBlock}>
        <div className="container">
          <div className={styles.philosophyHeader}>
            <span className={styles.sectionLabel}>{a.philosophy.label}</span>
            <p className={styles.philosophyIntro}>{a.philosophy.intro}</p>
          </div>
          <div className={styles.philosophyGrid} data-animate="grid">
            {philosophyPrinciples.map((p) => (
              <div key={p.number} className={`${styles.philosophyItem} ${styles.glassCard}`} data-animate="item">
                <span className={styles.philoNumber}>{p.number}</span>
                <h3 className={styles.philoTitle}>{p.title}</h3>
                <p className={styles.philoDesc}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones ───────────────────────────────────────────────────── */}
      <section className={styles.sectionBlock}>
        <div className="container">
          <div className={styles.milestonesHeader}>
            <span className={styles.sectionLabel}>{a.milestones.label}</span>
          </div>
          <div className={styles.statsSection} data-animate="stats">
            {a.milestones.items.map((item) => (
              <div key={item.stat} className={styles.statCard} data-animate="statItem">
                <span className={styles.statNumber}>{item.stat}</span>
                <span className={styles.statLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why STNP: Split ──────────────────────────────────────────────── */}
      <section className={styles.sectionBlock}>
        <div className="container">
          <div className={styles.splitGrid}>
            <div className={styles.splitLeft}>
              <div className={styles.stickyContent}>
                <div className={styles.sectionLabel}>{a.why.label}</div>
                <h2 className={styles.narrativeTitle}>{a.why.title}</h2>
              </div>
            </div>
            <div className={styles.splitRight}>
              <div className={styles.flowContent}>
                <section className={styles.narrativeSection} data-animate="narrative">
                  <h3 className={styles.unfairSubtitle}>{a.why.subtitle}</h3>
                  <p className={styles.narrativeText}>{a.why.p1}</p>
                  <p className={styles.narrativeText}>{a.why.p2}</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Commitment ───────────────────────────────────────────────────── */}
      <section className={styles.sectionBlock}>
        <div className="container">
          <div className={styles.proBonoSection}>
            <span className={styles.sectionLabel}>{a.commitment.label}</span>
            <h2 className={styles.narrativeTitle}>{a.commitment.title}</h2>
            <p className={styles.narrativeText}>{a.commitment.body}</p>
          </div>
        </div>
      </section>

      {/* ── Visit Us & CTA ───────────────────────────────────────────────── */}
      <section className={styles.sectionBlock}>
        <div className="container">
          <div className={styles.splitGrid}>
            <div className={styles.splitLeft}>
              <div className={styles.stickyContent}>
                <div className={styles.sectionLabel}>{a.visit.label}</div>
                <h2 className={styles.narrativeTitle}>{a.visit.title}</h2>
                <div className={styles.ctaWrap}>
                  <Link href={`/${lang}/contact`} className={styles.ctaButton} data-animate="cta">
                    {a.visit.cta}
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.splitRight}>
              <div className={styles.flowContent}>
                <section className={styles.narrativeSection} data-animate="narrative">
                  <h3 className={styles.unfairSubtitle}>{a.visit.subtitle}</h3>
                  <p className={styles.narrativeText}>{a.visit.body}</p>

                  <address className={styles.addressBlock}>
                    <p className={styles.addressName}>{a.visit.addressLabel}</p>
                    <p>{address.line1}</p>
                    <p>{address.line2}</p>
                    <p>{address.city}, {address.postal}</p>
                    <p>{address.country}</p>
                    <p className={styles.addressContact}>{phone[0]}</p>
                    <p className={styles.addressContact}>{email}</p>
                  </address>
                </section>

                {/* Springboards */}
                <section className={styles.springboards}>
                  <Link href={`/${lang}/team`} className={styles.springboardLink}>
                    {a.springboards.team} &rarr;
                  </Link>
                  <Link href={`/${lang}/legal-services`} className={styles.springboardLink}>
                    {a.springboards.services} &rarr;
                  </Link>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
