import Link from 'next/link';
import { getPosts } from '@/lib/api';
import { firmInfo } from '@/lib/data/team';
import { services } from '@/lib/data/services';
import { decodeHtmlEntities, stripHtml } from '@/lib/utils';
import BorderGlow from '@/components/Components/BorderGlow/BorderGlow';
import HeroMask from '@/components/Hero/HeroMask';

export const metadata = {
  title: 'Soaloan Tua Nababan & Partners — Law Firm Jakarta',
  description:
    'STNP is a full-service Jakarta law firm specializing in bankruptcy, commercial litigation, corporate law, project financing, infrastructure, and plantation.',
};

/* SVG icons for each service */
const serviceIcons = {
  scale: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 6v36M8 16l16-6 16 6M8 16l-2 12h12L16 16M40 16l-2 12h12L48 16" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="24" cy="6" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  gavel: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="18" y="6" width="18" height="8" rx="2" transform="rotate(45 27 10)" strokeLinejoin="round" />
      <path d="M12 32l-6 6M6 38l12 4M42 42H6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 22L10 34" strokeLinecap="round" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="12" width="32" height="30" rx="1" strokeLinejoin="round" />
      <path d="M24 4v8M16 4h16" strokeLinecap="round" />
      <rect x="14" y="18" width="6" height="6" rx="0.5" />
      <rect x="28" y="18" width="6" height="6" rx="0.5" />
      <rect x="14" y="28" width="6" height="6" rx="0.5" />
      <rect x="28" y="28" width="6" height="6" rx="0.5" />
      <path d="M20 42v-6h8v6" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 42V10M6 42h36" strokeLinecap="round" />
      <path d="M12 34l8-10 6 6 10-14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="16" r="3" />
    </svg>
  ),
  landmark: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 4L4 16h40L24 4z" strokeLinejoin="round" />
      <path d="M8 16v22M16 16v22M24 16v22M32 16v22M40 16v22" strokeLinecap="round" />
      <rect x="4" y="38" width="40" height="4" rx="1" />
      <rect x="2" y="42" width="44" height="3" rx="1" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 40C12 40 8 20 24 8c16 12 12 32 12 32" strokeLinejoin="round" />
      <path d="M24 8v32" strokeLinecap="round" />
      <path d="M18 20c3 2 6 2 6 2M30 20c-3 2-6 2-6 2M16 28c4 2 8 2 8 2M32 28c-4 2-8 2-8 2" strokeLinecap="round" />
    </svg>
  ),
};

export default async function HomePage() {
  let latestPosts = [];
  try {
    const result = await getPosts({ perPage: 3 });
    latestPosts = result.data || [];
  } catch (e) {
    console.error('Failed to fetch posts:', e);
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <HeroMask />

      {/* ===== ABOUT SUMMARY ===== */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 max-lg:gap-12 items-start">
            <div className="lg:pr-8">
              <span className="section-label">About Our Firm</span>
              <h2 className="section-title">
                Trusted Legal Partners<br />Since 2018
              </h2>
              <hr className="divider divider--left" />
              <p className="text-lg leading-[1.8] text-text-muted mt-6" style={{ maxWidth: '52ch' }}>
                Founded by {firmInfo.founder}, Soaloan Tua Nababan &amp; Partners has
                established itself as a trusted legal practice in Jakarta. We combine
                deep legal expertise with a client-focused approach, guided by three
                core principles that define everything we do.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {firmInfo.principles.map((p, i) => (
                <BorderGlow
                  key={i}
                  className="group grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-x-6 gap-y-1 p-8 bg-surface rounded-[2rem] border border-black/5 ring-1 ring-black/5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent hover:shadow-xl active:scale-[0.98] max-sm:grid-cols-1 max-sm:text-center"
                  glowColor="40 80 80"
                  colors={['#C4A35A', '#E8C97A', '#A6883D']}
                  backgroundColor="transparent"
                  borderRadius={32}
                >
                  <div className="row-span-2 font-[family-name:var(--font-heading)] text-[2.5rem] font-light text-accent leading-none self-center opacity-50 transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-1 max-sm:row-span-1 max-sm:justify-self-center">
                    0{i + 1}
                  </div>
                  <h4 className="font-[family-name:var(--font-heading)] text-[1.15rem] font-medium text-primary m-0 tracking-[-0.01em]">
                    {p.title}
                  </h4>
                  <p className="text-sm text-text-muted leading-[1.7] m-0" style={{ maxWidth: 'none' }}>{p.description}</p>
                </BorderGlow>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEGAL SERVICES — ZIG-ZAG ===== */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Practice Areas</span>
            <h2 className="section-title">Legal Services</h2>
            <hr className="divider" />
            <p className="section-subtitle" style={{ maxWidth: '52ch' }}>
              Comprehensive legal solutions across six key practice areas,
              delivered with precision and dedication.
            </p>
          </div>

          {/* Zig-zag editorial layout */}
          <div className="flex flex-col" style={{ gap: 'clamp(4rem, 8vw, 6rem)' }}>
            {services.map((service, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={service.id}
                  className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 max-lg:gap-10"
                >
                  {/* Icon column — flips side on even/odd */}
                  <div
                    className={`flex flex-col items-center justify-center gap-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    {/* Large index number */}
                    <span
                      className="font-[family-name:var(--font-heading)] font-light text-accent/5 leading-none select-none"
                      style={{ fontSize: 'clamp(6rem, 14vw, 10rem)', letterSpacing: '-0.04em' }}
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    {/* Icon disc */}
                    <div className="
                      w-28 h-28 max-lg:w-20 max-lg:h-20
                      flex items-center justify-center
                      text-accent bg-[rgba(196,163,90,0.06)]
                      border border-[rgba(196,163,90,0.15)]
                      rounded-[var(--radius-xl)] p-6
                      transition-all duration-500
                      [&_svg]:w-full [&_svg]:h-full
                    ">
                      {serviceIcons[service.icon]}
                    </div>
                  </div>

                  {/* Content column */}
                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    <h3
                      className="text-[var(--text-h3)] text-primary mb-3"
                    >
                      {service.title}
                    </h3>
                    <hr className="divider divider--left" />
                    <p className="text-lg leading-[1.85] text-text-muted mt-6" style={{ maxWidth: '52ch' }}>
                      {service.description}
                    </p>
                    <Link
                      href="/legal-services"
                      className="group inline-flex items-center gap-2 mt-8 text-sm font-semibold text-accent uppercase tracking-[0.08em]"
                    >
                      Learn More
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 ease-[var(--ease-out-custom)] group-hover:translate-x-1">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== QUOTE BANNER ===== */}
      <section className="relative bg-primary py-28 text-center overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,rgba(196,163,90,0.05)_0%,transparent_70%)]">
        <div className="container">
          <div className="relative z-[1] max-w-[760px] mx-auto">
            <span
              className="absolute -top-12 -left-8 font-[family-name:var(--font-heading)] text-[8rem] text-accent/20 leading-none select-none max-md:-top-8 max-md:-left-4"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote
              className="relative font-[family-name:var(--font-heading)] font-light italic text-white/85 mx-auto leading-[1.45]"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.01em' }}
            >
              {firmInfo.quote}
            </blockquote>
            <cite className="block relative font-[family-name:var(--font-body)] text-xs not-italic font-medium text-accent tracking-[0.15em] uppercase mt-8">
              — {firmInfo.quoteAuthor}
            </cite>
          </div>
        </div>
      </section>

      {/* ===== LATEST ARTICLES ===== */}
      {latestPosts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Insights</span>
              <h2 className="section-title">Latest Articles</h2>
              <hr className="divider" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {latestPosts.map((post, index) => {
                const isFeatured = index === 0;
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
                  <div
                    key={post.id}
                    className={`group relative p-1.5 bg-black/5 ring-1 ring-black/5 rounded-[2.5rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] active:scale-[0.98] ${isFeatured ? 'lg:col-span-8' : 'lg:col-span-4'}`}
                  >
                    <BorderGlow
                      className="bg-surface rounded-[calc(2.5rem-0.375rem)] overflow-hidden h-full flex flex-col"
                      glowColor="40 80 80"
                      colors={['#C4A35A', '#E8C97A', '#A6883D']}
                      backgroundColor="transparent"
                      borderRadius={34}
                    >
                      <div className={`relative w-full overflow-hidden bg-bg-alt ${isFeatured ? 'aspect-[21/9] max-md:aspect-[16/10]' : 'aspect-[16/10]'}`}>
                        {featuredImg ? (
                          <img
                            src={featuredImg}
                            alt={post.title.rendered}
                            className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[rgba(10,22,40,0.02)] border border-[rgba(10,22,40,0.05)] relative overflow-hidden group-hover:border-[rgba(196,163,90,0.15)] transition-colors duration-500">
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,163,90,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent/40 scale-[1] group-hover:scale-110 transition-transform duration-700">
                               <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                               <polyline points="14 2 14 8 20 8" />
                               <path d="M2 15h10" />
                               <path d="M9 18l3-3-3-3" />
                             </svg>
                          </div>
                        )}
                        <span className="absolute top-4 left-4 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-primary bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                          {category}
                        </span>
                      </div>
                      <div className="p-8 pt-6 flex-1 flex flex-col justify-start">
                        <time className="text-xs font-semibold text-text-light uppercase tracking-[0.08em]">{date}</time>
                        <h3 className={`text-primary leading-[1.2] tracking-[-0.02em] mt-3 mb-4 ${isFeatured ? 'text-[2rem]' : 'text-[1.4rem]'}`}>
                          <Link href={`/article/${post.slug}`} className="hover:text-accent-dark transition-colors duration-300 before:absolute before:inset-0">
                            {decodeHtmlEntities(post.title.rendered)}
                          </Link>
                        </h3>
                        <p className={`text-text-muted leading-[1.65] m-0 ${isFeatured ? 'text-lg max-w-[60ch]' : 'text-sm'}`}>
                          {stripHtml(post.excerpt.rendered).substring(0, isFeatured ? 200 : 120)}…
                        </p>
                        
                        {/* Interactive Island Button CTA */}
                        {isFeatured && (
                          <div className="mt-8 pt-6 border-t border-border-light/50 flex items-center justify-between pointer-events-none">
                            <span className="text-sm font-semibold text-accent uppercase tracking-[0.1em]">Read Full Story</span>
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:bg-accent group-hover:text-white">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </BorderGlow>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-16">
              <Link href="/article" className="btn btn--dark">
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== CONTACT CTA — animated mesh gradient ===== */}
      <section className="cta-mesh relative py-28 text-center overflow-hidden">
        {/* Subtle gold & steel radial accents */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(44,95,124,0.12) 0%, transparent 55%), ' +
              'radial-gradient(ellipse at 80% 50%, rgba(196,163,90,0.07) 0%, transparent 55%)',
          }}
        />
        <div className="container relative z-[1]">
          <span className="section-label" style={{ color: 'rgba(196,163,90,0.9)' }}>
            Get in Touch
          </span>
          <h2
            className="text-white mb-6"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            Ready to Discuss<br />Your Legal Needs?
          </h2>
          <p
            className="text-white/55 mx-auto mb-12 leading-[1.75]"
            style={{ fontSize: '1.05rem', maxWidth: '44ch' }}
          >
            Schedule a consultation with our experienced legal team.
            We&rsquo;re here to help navigate your most complex legal challenges.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link href="/contact" className="btn btn--primary">
              Schedule Consultation
            </Link>
            <a
              href={`mailto:${firmInfo.email}`}
              className="text-sm text-white/40 transition-colors duration-150 hover:text-white/70"
            >
              or email us at{' '}
              <span className="text-accent font-medium">{firmInfo.email}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
