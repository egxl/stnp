import Link from 'next/link';
import { getPosts, getCategories } from '@/lib/api';
import { decodeHtmlEntities } from '@/lib/utils';
import GrainientDynamic from '@/components/Grainient/GrainientDynamic';
import styles from './page.module.css';

export const metadata = {
  title: 'Insights',
  description: 'A curated ledger of legal perspectives and institutional knowledge from Soaloan Tua Nababan & Partners.',
};

export default async function ArticlesPage() {
  const [postsResult, categories] = await Promise.all([
    getPosts({ perPage: 24 }),
    getCategories(),
  ]);

  const posts = postsResult.data || [];

  return (
    <div className={styles.insightsWrapper}>
      {/* Hero */}
      <header className={styles.heroSection}>
        <GrainientDynamic 
          timeSpeed={0.15}
          warpSpeed={1.5}
          noiseScale={2.5}
          blendSoftness={0.1}
          opacity={0.6}
        />
        <div className="container">
          <div className={styles.heroLayout}>
            <div className={styles.heroHeader}>
              <h1 className={styles.heroTitle}>
                Legal<br/>
                <span className={styles.textAccent}>Perspectives.</span>
              </h1>
            </div>
            <div className={styles.heroContent}>
              <div className={styles.goldDivider}></div>
              <p className={styles.heroDescription}>
                Analysis, regulatory shifts, and strategic precedents shaping the Indonesian commercial landscape.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Ledger Area */}
      <section className={styles.ledgerSection}>
        <div className="container">
          <div className={styles.ledgerLayout}>
            {/* Sidebar / Categories */}
            <aside className={styles.ledgerSidebar}>
              <h2 className={styles.sidebarTitle}>Index</h2>
              <ul className={styles.categoryList}>
                <li className={styles.categoryActive}>All Perspectives</li>
                {categories.filter(c => c.slug !== 'uncategorized').map((cat) => (
                  <li key={cat.id}>{cat.name}</li>
                ))}
              </ul>
            </aside>

            {/* Articles List */}
            <main className={styles.ledgerMain}>
              {posts.length > 0 ? (
                <div className={styles.articlesLedger}>
                  {posts.map((post) => {
                    const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Article';
                    const date = new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });

                    return (
                      <Link 
                        key={post.id} 
                        href={`/insights/${post.slug}`}
                        className={styles.articleRow}
                      >
                        <div className={styles.articleMeta}>
                          <span className={styles.articleDate}>{date}</span>
                          <span className={styles.articleCategory}>{category}</span>
                        </div>
                        
                        <div className={styles.articleContent}>
                          <h3 className={styles.articleTitle}>
                            {decodeHtmlEntities(post.title.rendered)}
                          </h3>
                        </div>

                        <div className={styles.articleAction}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>No insights published yet.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
