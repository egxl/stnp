import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { firmInfo } from '@/lib/data/team';
import GrainientDynamic from '@/components/Grainient/GrainientDynamic';
import ServiceLedger from './ServiceLedger';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.services?.meta?.title || 'Legal Services — STNP',
    description: dict.services?.meta?.description || 'Our core practice areas',
    openGraph: {
      title: dict.services?.meta?.title,
      description: dict.services?.meta?.description,
      url: `https://stnp.co.id/${lang}/legal-services`,
      siteName: 'Soaloan Tua Nababan & Partners',
      locale: lang === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LegalServicesPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  // Fallback if services dictionary is somehow missing
  const s = dict.services;
  if (!s) return <div className={styles.main}><div className="container">Loading...</div></div>;

  return (
    <main className={styles.main}>
      <GrainientDynamic 
        timeSpeed={0.15}
        warpSpeed={1.5}
        noiseScale={2.5}
        blendSoftness={0.1}
        opacity={0.3} 
      />
      <div className={styles.noiseOverlay} />

      {/* ACT 1 — HERO */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroLayout}>
            <span className={styles.sectionLabel}>{s.hero.label}</span>
            <h1 className={styles.heroTitle}>{s.hero.title}</h1>
            <p className={styles.heroSubtitle}>{s.hero.subtitle}</p>
            <p className={styles.heroBody}>{s.hero.body}</p>
          </div>
        </div>
      </section>

      {/* ACT 2 & 3 — LEDGER (Index + Detail) */}
      <ServiceLedger services={s} lang={lang} />

      {/* ACT 4 — PRO BONO */}
      <section className={styles.proBonoSection}>
        <div className="container">
          <div className={styles.proBonoLayout}>
            <div className={styles.proBonoHeader}>
              <span className={styles.sectionLabel}>{s.proBono.label}</span>
              <h2 className={styles.proBonoTitle}>{s.proBono.title}</h2>
              <p className={styles.proBonoText}>{s.proBono.body}</p>
            </div>
            <blockquote className={styles.quoteBlock}>
              <p>"{s.proBono.quote}"</p>
              <cite>— {s.proBono.quoteAuthor}</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ACT 5 — CTA & SPRINGBOARDS */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaLayout}>
            <div className={styles.ctaContent}>
              <span className={styles.sectionLabel}>{s.cta.label}</span>
              <h2 className={styles.ctaTitle}>{s.cta.title}</h2>
              <p className={styles.ctaBody}>{s.cta.body}</p>
              
              <div className={styles.ctaActions}>
                <Link href={`/${lang}/contact`} className="btn btn--primary">
                  {s.cta.button}
                </Link>
              </div>
              
              <address className={styles.addressBlock}>
                <strong>{firmInfo.name}</strong><br />
                {firmInfo.address.line1}<br />
                {firmInfo.address.line2}<br />
                {firmInfo.address.city}, {firmInfo.address.postal}<br />
                {firmInfo.address.country}
              </address>
            </div>
            
            <div className={styles.springboards}>
              <Link href={`/${lang}/team`} className={styles.springboardLink}>
                {s.springboards.team} <span>→</span>
              </Link>
              <Link href={`/${lang}/about`} className={styles.springboardLink}>
                {s.springboards.about} <span>→</span>
              </Link>
              <Link href={`/${lang}/insights`} className={styles.springboardLink}>
                {s.springboards.insights} <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
