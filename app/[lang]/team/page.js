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
          <div className={styles.editorialContent}>
            <span className={styles.breadcrumb}>Home / Our Team</span>
            <h1 className={styles.editorialTitle}>Our Team</h1>
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
