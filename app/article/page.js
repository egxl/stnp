import Link from 'next/link';
import { getPosts, getCategories } from '@/lib/api';
import { decodeHtmlEntities, stripHtml } from '@/lib/utils';

export const metadata = {
  title: 'Articles',
  description:
    'Read the latest legal insights, articles, and updates from Soaloan Tua Nababan & Partners.',
};

export default async function ArticlesPage() {
  const [postsResult, categories] = await Promise.all([
    getPosts({ perPage: 12 }),
    getCategories(),
  ]);

  const posts = postsResult.data || [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary" style={{ padding: `calc(var(--nav-height) + var(--space-3xl)) 0 var(--space-3xl)` }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(44,95,124,0.2),transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(196,163,90,0.08),transparent_50%)]" />
        <div className="container">
          <div className="relative z-[1]">
            <span className="text-xs text-accent tracking-[0.1em] uppercase block mb-4">Home / Articles</span>
            <h1 className="text-[var(--text-h1)] text-white mb-4">Articles & Insights</h1>
            <p className="text-lg text-white/60 max-w-[550px]">
              Stay informed with the latest legal perspectives from our team.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section">
        <div className="container">
          {/* Category Tabs */}
          {categories.length > 0 && (
            <div className="flex gap-2 mb-12 flex-wrap">
              <span className="px-5 py-2 text-sm font-medium bg-primary text-white border border-primary rounded-full cursor-pointer">All</span>
              {categories.filter(c => c.slug !== 'uncategorized').map((cat) => (
                <span key={cat.id} className="px-5 py-2 text-sm font-medium text-text-muted border border-border rounded-full cursor-pointer transition-all duration-150 hover:border-accent hover:text-accent">
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Post Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const featuredImg =
                  post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                const category =
                  post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Article';
                const date = new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <article key={post.id} className="group bg-surface rounded-[var(--radius-md)] overflow-hidden border border-border-light transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[16/10] overflow-hidden bg-bg-alt">
                      {featuredImg ? (
                        <img src={featuredImg} alt={post.title.rendered} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-light">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-[0.05em] text-primary bg-accent rounded-[var(--radius-sm)]">
                        {category}
                      </span>
                    </div>
                    <div className="p-6 pt-4">
                      <time className="text-xs text-text-light uppercase tracking-[0.05em]">{date}</time>
                      <h3 className="text-[1.15rem] my-2 text-primary leading-[1.3]">
                        <Link href={`/article/${post.slug}`} className="hover:text-accent-dark">
                          {decodeHtmlEntities(post.title.rendered)}
                        </Link>
                      </h3>
                      <p className="text-sm text-text-muted leading-[1.6] m-0 mb-4">
                        {stripHtml(post.excerpt.rendered).substring(0, 150)}…
                      </p>
                      <Link href={`/article/${post.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-[gap] duration-150 hover:gap-2.5">
                        Read More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 text-text-light italic">
              <p>No articles published yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
