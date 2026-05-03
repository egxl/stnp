import { team } from '@/lib/data/team';
import styles from './page.module.css';
import TeamRoster from './TeamRoster';

export const metadata = {
  title: 'Our Team',
  description:
    'Meet the experienced legal professionals at Soaloan Tua Nababan & Partners.',
};

export default async function TeamPage({ params }) {
  const { lang } = await params;


  return (
    <>
      {/* Editorial Hero */}
      <section className={styles.editorialHero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroMain}>
              <div className={styles.heroAnimate1}>
                <span className={styles.eyebrowBadge}>STNP Professionals</span>
              </div>
              <h1 className={`${styles.editorialTitle} ${styles.heroAnimate2}`}>
                The legal minds behind complex disputes and strategic counsel.
              </h1>
              <p className={`${styles.heroCopy} ${styles.heroAnimate3}`}>
                A collective of seasoned legal minds dedicated to strategic resolution and principled efficiency. Our practice is senior-led, commercially grounded, and built on disciplined execution.
              </p>
            </div>
            
            <div className={styles.heroSide}>
              {/* Double-Bezel Authority Panel */}
              <div className={`${styles.authorityShell} ${styles.heroAnimate4}`}>
                <div className={styles.authorityCore}>
                  <h3 className={styles.panelLabel}>Practice Areas</h3>
                  <ul className={styles.panelList}>
                    <li>Commercial Litigation</li>
                    <li>Corporate & Transactional</li>
                    <li>Bankruptcy & Restructuring</li>
                    <li>Energy, Mining & Plantation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Roster Section */}
      <section className="section">
        <div className="container container--wide">
          <TeamRoster team={team} lang={lang} />
        </div>
      </section>
    </>
  );
}
