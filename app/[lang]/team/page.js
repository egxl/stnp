import { team } from '@/lib/data/team';
import styles from './page.module.css';
import TeamRoster from './TeamRoster';
import Aurora from '@/components/Aurora/Aurora';

export const metadata = {
  title: 'Our Team',
  description:
    'Meet the experienced legal professionals at Soaloan Tua Nababan & Partners.',
};

export default async function TeamPage({ params }) {
  const { lang } = await params;


  return (
    <>
      <section className={styles.splitSurface}>
        <Aurora 
          colorStops={['#0A1628', '#1E4A63', '#060E1A']}
          amplitude={1.2}
          speed={0.3}
          blend={0.5}
        />
        <div className="container container--wide">
          <div className={styles.splitGrid}>
            {/* Left: Sticky Narrative */}
            <div className={styles.splitLeft}>
              <div className={styles.stickyContent}>
                <h1 className={`${styles.editorialTitle} ${styles.heroAnimate2}`}>
                  The legal minds behind complex disputes and strategic counsel.
                </h1>
                <p className={`${styles.heroCopy} ${styles.heroAnimate3}`}>
                  A collective of seasoned legal minds dedicated to strategic resolution and principled efficiency. Our practice is senior-led, commercially grounded, and built on disciplined execution.
                </p>
              </div>
            </div>
            
            {/* Right: Roster & Filters */}
            <div className={styles.splitRight}>
              <div className={styles.heroAnimate4}>
                <TeamRoster team={team} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
