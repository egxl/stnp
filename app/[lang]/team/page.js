import { team } from '@/lib/data/team';
import { getDictionary } from '@/lib/dictionaries';
import styles from './page.module.css';
import TeamRoster from './TeamRoster';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.team?.meta?.title || 'Our Team',
    description:
      dict.team?.meta?.description ||
      'Meet the experienced legal professionals at Soaloan Tua Nababan & Partners.',
  };
}

export default async function TeamPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.team;

  return (
    <>
      <section className={styles.splitSurface}>
        <div className="container container--wide">
          <div className={styles.splitGrid}>
            {/* Left: Sticky Narrative */}
            <div className={styles.splitLeft}>
              <div className={styles.stickyContent}>
                <h1 className={`${styles.editorialTitle} ${styles.heroAnimate2}`}>
                  {t?.hero?.title || 'The legal minds behind complex disputes and strategic counsel.'}
                </h1>
                <p className={`${styles.heroCopy} ${styles.heroAnimate3}`}>
                  {t?.hero?.body || 'A collective of seasoned legal minds dedicated to strategic resolution and principled efficiency. Our practice is senior-led, commercially grounded, and built on disciplined execution.'}
                </p>
              </div>
            </div>
            
            {/* Right: Roster & Filters */}
            <div className={styles.splitRight}>
              <div className={styles.heroAnimate4}>
                <TeamRoster team={team} lang={lang} dict={t} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
