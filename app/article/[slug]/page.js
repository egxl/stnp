import Link from 'next/link';
import { getPosts, getPostBySlug } from '@/lib/api';
import { decodeHtmlEntities, stripHtml } from '@/lib/utils';

export async function generateStaticParams() {
  const result = await getPosts({ perPage: 50 });
  const posts = result.data || [];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  const yoast = post.yoast_head_json;
  return {
    title: yoast?.title || decodeHtmlEntities(post.title.rendered),
    description: yoast?.description || stripHtml(post.excerpt.rendered).substring(0, 160),
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="text-center" style={{ padding: `calc(var(--nav-height) + var(--space-3xl)) 0 var(--space-3xl)` }}>
        <div className="container">
          <h1 className="mb-4">Article Not Found</h1>
          <p className="mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/article" className="btn btn--dark">Back to Articles</Link>
        </div>
      </div>
    );
  }

  const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Article';
  const author = post._embedded?.['author']?.[0]?.name || 'STNP';
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Article Hero */}
      <section className="relative overflow-hidden bg-primary" style={{ padding: `calc(var(--nav-height) + var(--space-3xl)) 0 var(--space-2xl)` }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(44,95,124,0.15),transparent_60%)]" />
        <div className="container">
          <div className="relative z-[1] max-w-[var(--max-width-narrow)]">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.05em] text-primary bg-accent rounded-[var(--radius-sm)]">
                {category}
              </span>
              <time className="text-sm text-white/50">{date}</time>
            </div>
            <h1
              className="text-[var(--text-h2)] text-white leading-[1.2] mb-6"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 font-medium">By {author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="section">
        <div className="container container--narrow">
          {featuredImg && (
            <div className="w-full rounded-[var(--radius-md)] overflow-hidden mb-12 shadow-lg">
              <img src={featuredImg} alt={post.title.rendered.replace(/<[^>]+>/g, '')} className="w-full h-auto" />
            </div>
          )}
          <div
            className="
              text-lg leading-[1.9] text-text-body
              [&_h2]:text-[var(--text-h3)] [&_h2]:mt-12 [&_h2]:mb-6
              [&_h3]:text-[var(--text-h4)] [&_h3]:mt-8 [&_h3]:mb-4
              [&_p]:mb-6 [&_p]:text-text-muted
              [&_a]:text-steel [&_a]:underline [&_a]:decoration-accent [&_a]:underline-offset-[3px] [&_a:hover]:text-accent
              [&_blockquote]:border-l-[3px] [&_blockquote]:border-accent [&_blockquote]:pl-8 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-text-muted
              [&_ul]:my-6 [&_ul]:pl-8 [&_ol]:my-6 [&_ol]:pl-8
              [&_li]:mb-2 [&_li]:text-text-muted
              [&_img]:rounded-[var(--radius-md)] [&_img]:my-8
            "
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-border">
            <Link href="/article" className="inline-flex items-center gap-2 text-sm font-semibold text-steel uppercase tracking-[0.05em] transition-all duration-150 hover:text-accent hover:gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
