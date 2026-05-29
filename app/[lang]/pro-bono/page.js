import { getDictionary } from '@/lib/dictionaries';
import styles from './page.module.css';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const pb = dict.proBono;
  return {
    title: pb.meta.title,
    description: pb.meta.description,
  };
}

export default async function ProBonoPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const pb = dict.proBono;

  return (
    <main className={styles.main}>

      {/* ── Section 1: Hero ────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>{pb.hero.label}</span>
            <h1 className={styles.heroTitle}>{pb.hero.title}</h1>
            <p className={styles.heroSubtitle}>{pb.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* ── Section 2: The Belief ────────────────────────────────────── */}
      <section className={styles.beliefSection}>
        <div className="container">
          <div className={styles.editorialSplit}>
            <div className={styles.splitLeft}>
              <figure className={styles.quoteFigure}>
                <blockquote className={styles.quoteText}>
                  "{pb.belief.quote}"
                </blockquote>
                <figcaption className={styles.quoteAuthor}>
                  — {pb.belief.quoteAuthor}
                </figcaption>
              </figure>
            </div>
            <div className={styles.splitRight}>
              <div className={styles.beliefBody}>
                <p className={styles.beliefText}>{pb.belief.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: What We Provide ───────────────────────────────── */}
      <section className={styles.practiceSection}>
        <div className="container">
          <div className={styles.editorialSplit}>
            <div className={styles.splitLeft}>
              {/* Empty left column for spacing/alignment with belief section */}
            </div>
            <div className={styles.splitRight}>
              <div className={styles.practiceList}>
                <div className={styles.practiceItem}>
                  <span className={styles.itemNumber}>01</span>
                  <p className={styles.itemText}>{pb.practice.item1}</p>
                </div>
                <div className={styles.practiceItem}>
                  <span className={styles.itemNumber}>02</span>
                  <p className={styles.itemText}>{pb.practice.item2}</p>
                </div>
                <div className={styles.practiceItem}>
                  <span className={styles.itemNumber}>03</span>
                  <p className={styles.itemText}>{pb.practice.item3}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: CTA ───────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <span className={styles.ctaLabel}>{pb.cta.label}</span>
            <p className={styles.ctaBody}>{pb.cta.body}</p>
            <Link href={`/${lang}/contact`} className={styles.ctaButton}>
              {pb.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
