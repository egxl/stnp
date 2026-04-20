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
      {/* Hero */}
      <section className={styles.pageHero}>
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.breadcrumb}>Home / Our Team</span>
            <h1 className={styles.heroTitle}>Our Team</h1>
            <p className={styles.heroSubtitle}>
              Experienced legal professionals dedicated to achieving the best outcomes for our clients.
            </p>
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
