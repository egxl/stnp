import Link from 'next/link';
import { getPosts, getCategories } from '@/lib/api';
import { getDictionary } from '@/lib/dictionaries';
import { decodeHtmlEntities } from '@/lib/utils';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.insights?.meta?.title || 'Insights',
    description:
      dict.insights?.meta?.description ||
      'A curated ledger of legal perspectives and institutional knowledge from Soaloan Tua Nababan & Partners.',
  };
}

export default async function ArticlesPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const i = dict.insights;
  const [postsResult, categories] = await Promise.all([
    getPosts({ perPage: 24 }),
    getCategories(),
  ]);

  const posts = postsResult.data || [];
  const getCategoryLabel = (category) => {
    if (!category) return i?.articleFallback || 'Article';
    return i?.categories?.[category.slug] || i?.categories?.[category.name] || category.name;
  };

  return (
    <div className={styles.insightsWrapper}>
      {/* Hero */}
      <header className={styles.heroSection}>

        <div className="container">
          <div className={styles.heroLayout}>
            <div className={styles.heroHeader}>
              <h1 className={styles.heroTitle}>
                {i?.hero?.titleLine1 || 'Legal'}<br/>
                <span className={styles.textAccent}>{i?.hero?.titleLine2 || 'Perspectives.'}</span>
              </h1>
            </div>
            <div className={styles.heroContent}>
              <div className={styles.goldDivider}></div>
              <p className={styles.heroDescription}>
                {i?.hero?.description || 'Analysis, regulatory shifts, and strategic precedents shaping the Indonesian commercial landscape.'}
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
              <h2 className={styles.sidebarTitle}>{i?.indexTitle || 'Index'}</h2>
              <ul className={styles.categoryList}>
                <li className={styles.categoryActive}>{i?.allPerspectives || 'All Perspectives'}</li>
                {categories.filter(c => c.slug !== 'uncategorized').map((cat) => (
                  <li key={cat.id}>{getCategoryLabel(cat)}</li>
                ))}
              </ul>
            </aside>

            {/* Articles List */}
            <main className={styles.ledgerMain}>
              {posts.length > 0 ? (
                <div className={styles.articlesLedger}>
                  {posts.map((post) => {
                    const category = getCategoryLabel(post._embedded?.['wp:term']?.[0]?.[0]);
                    const date = new Date(post.date).toLocaleDateString(lang === 'id' ? 'id-ID' : lang === 'zh' ? 'zh-CN' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });

                    return (
                      <Link 
                        key={post.id} 
                        href={`/${lang}/insights/${post.slug}`}
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
                  <p>{i?.emptyState || 'No insights published yet.'}</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
