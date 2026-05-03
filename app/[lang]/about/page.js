import { getDictionary } from '@/lib/dictionaries';
import { firmInfo } from '@/lib/data/team';
import styles from './page.module.css';
import Link from 'next/link';
import GrainientDynamic from '@/components/Grainient/GrainientDynamic';

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
      <GrainientDynamic 
        timeSpeed={0.15}
        warpSpeed={1.5}
        noiseScale={2.5}
        blendSoftness={0.1}
        opacity={0.3} 
      />
      <div className={styles.noiseOverlay} aria-hidden="true" />
      <AboutAnimation />

      {/* ── Hero & Origin Story: Editorial Split ─────────────────────────── */}
      <section className={styles.splitSurface}>
        <div className="container">
          <div className={styles.editorialSplit}>
            {/* Left: Sticky narrative anchor */}
            <aside className={styles.splitLeft}>
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
            </aside>

            {/* Right: Content flow */}
            <div className={styles.splitRight}>
              <div className={styles.flowContent}>
                <section className={styles.narrativeSection} data-animate="narrative">
                  <div className={styles.sectionLabel}>{a.story.label}</div>
                  <h2 className={styles.narrativeTitle}>{a.story.title}</h2>
                  <p className={styles.narrativeText}>{a.story.p1}</p>
                  <p className={styles.narrativeText}>{a.story.p2}</p>

                  <div className={styles.expansionBlock}>
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

      {/* ── Philosophy: Refractive Scroll ────────────────────────────────── */}
      <section className={styles.philosophySection}>
        <div className="container">
          <div className={styles.editorialSplit}>
            {/* Left: Sticky Anchor with Motto */}
            <div className={styles.splitLeft}>
              <div className={styles.stickyContent}>
                <span className={styles.sectionLabel}>{a.philosophy.label}</span>
                <h2 className={styles.philosophyMotto}>
                  "Enforcing the Law of Truth and Justice Indiscriminately."
                </h2>
                <p className={styles.philosophyIntro}>{a.philosophy.intro}</p>
              </div>
            </div>

            {/* Right: Glassmorphism Cards */}
            <div className={styles.splitRight}>
              <div className={styles.philosophyList} role="list" data-animate="philosophy-list">
                {philosophyPrinciples.map((p) => (
                  <div key={p.number} className={styles.philosophyCard} data-animate="glass-card">
                    <div className={styles.cardHeader}>
                      <span className={styles.cardNumber}>{p.number}</span>
                      <h3 className={styles.cardTitle}>{p.title}</h3>
                    </div>
                    <p className={styles.cardBody}>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Why STNP: Editorial Typography (Huashu Design) ───────────────── */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.whyEditorial} data-animate="narrative">
            <div className={styles.whyHeader}>
              <span className={styles.whyLabel}>{a.why.label}</span>
              <h2 className={styles.whyTitle}>{a.why.title}</h2>
              <h3 className={styles.whySubtitle}>{a.why.subtitle}</h3>
            </div>
            <div className={styles.whyBody}>
              <p className={styles.whyTextLead}>{a.why.p1}</p>
              <p className={styles.whyText}>{a.why.p2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Commitment (Huashu Design) ─────────────────────────────────────── */}
      <section className={styles.commitmentSection}>
        <div className="container">
          <div className={styles.editorialSplit}>
            <div className={styles.splitLeft}>
              <div className={styles.commitmentHeader}>
                <span className={styles.commitmentLabel}>{a.commitment.label}</span>
                <h2 className={styles.commitmentTitle}>{a.commitment.title}</h2>
              </div>
            </div>
            <div className={styles.splitRight}>
              <div className={styles.commitmentBody}>
                <p className={styles.commitmentText}>{a.commitment.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visit Us & CTA (Kenya Hara Minimalism) ───────────────────────── */}
      <section className={styles.visitMinimalistSection}>
        <div className="container">
          <div className={styles.visitMinimalistLayout} data-animate="narrative">
            <div className={styles.visitMinimalistHeader}>
              <div className={styles.sectionLabel}>{a.visit.label}</div>
              <h2 className={styles.minimalistTitle}>{a.visit.title}</h2>
              <p className={styles.minimalistBody}>{a.visit.body}</p>
              
              <Link href={`/${lang}/contact`} className={styles.minimalistCta} data-animate="cta">
                {a.visit.cta} <span className={styles.ctaArrow}>&rarr;</span>
              </Link>
            </div>

            <div className={styles.visitMinimalistFooter}>
              <address className={styles.minimalistAddress}>
                <div className={styles.addressCol}>
                  <p className={styles.addressName}>{a.visit.addressLabel}</p>
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>{address.city}, {address.postal}</p>
                  <p>{address.country}</p>
                </div>
                <div className={styles.addressCol}>
                  <p className={styles.addressName}>Contact</p>
                  {phone?.[0] && <p>{phone[0]}</p>}
                  {email && <p>{email}</p>}
                </div>
              </address>

              <div className={styles.minimalistSpringboards}>
                <Link href={`/${lang}/team`} className={styles.minSpringboard}>
                  {a.springboards.team}
                </Link>
                <Link href={`/${lang}/legal-services`} className={styles.minSpringboard}>
                  {a.springboards.services}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
