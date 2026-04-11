import Link from 'next/link';
import { getPosts } from '@/lib/api';
import { firmInfo } from '@/lib/data/team';
import { services } from '@/lib/data/services';
import { decodeHtmlEntities, stripHtml } from '@/lib/utils';
import BorderGlow from '@/components/Components/BorderGlow/BorderGlow';

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
      <path d="M14 20v14M22 26v8M30 22v12M38 18v16" strokeLinecap="round" opacity="0.3" />
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
  /* Fetch latest 3 articles from WordPress */
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
      <section className="relative min-h-screen flex items-center justify-center bg-transparent">
        {/* Background Video */}
        <video
          autoPlay loop muted playsInline
          className="fixed top-0 left-0 w-full h-screen object-cover -z-20"
        >
          <source src="/videos/hero-loop-hevc.mp4" type="video/mp4; codecs=hvc1" />
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>

        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(135deg,rgba(10,22,40,0.88),rgba(10,22,40,0.70)),radial-gradient(ellipse_at_30%_50%,rgba(44,95,124,0.22)_0%,transparent_60%)]" />

        <div className="relative z-[1] text-center max-w-[800px] px-8 pt-[calc(var(--nav-height)+4rem)] pb-16 animate-[fadeInUp_1s_var(--ease-out-custom)_both]">
          <span className="
            relative inline-block font-[family-name:var(--font-body)]
            text-xs font-medium tracking-[0.3em] uppercase text-accent mb-8
            before:content-[''] before:absolute before:top-1/2 before:right-[calc(100%+16px)] before:w-10 before:h-px before:bg-accent before:opacity-40
            after:content-[''] after:absolute after:top-1/2 after:left-[calc(100%+16px)] after:w-10 after:h-px after:bg-accent after:opacity-40
            max-sm:before:hidden max-sm:after:hidden
          ">
            Soaloan Tua Nababan & Partners
          </span>
          <h1 className="text-[clamp(2.8rem,6vw,5rem)] max-sm:text-[clamp(2rem,8vw,3rem)] font-bold text-white leading-[1.1] mb-8 tracking-[-0.01em]">
            Enforcing the Law<br />
            <span className="text-accent italic font-medium">of Truth & Justice</span>
          </h1>
          <p className="text-lg text-white/60 max-w-[580px] mx-auto mb-12 leading-[1.7]">
            A full-service Jakarta law firm providing strategic legal counsel
            across bankruptcy, litigation, corporate, and finance.
          </p>
          <div className="flex gap-4 justify-center flex-wrap max-sm:flex-col max-sm:items-center">
            <Link href="/contact" className="btn btn--primary">
              Free Consultation
            </Link>
            <Link href="/legal-services" className="btn btn--outline">
              Our Services
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2]">
          <div className="w-px h-[60px] bg-gradient-to-b from-accent to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ===== ABOUT SUMMARY ===== */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 max-lg:gap-12 items-start">
            <div className="lg:pr-8">
              <span className="section-label">About Our Firm</span>
              <h2 className="section-title">Trusted Legal Partners Since 2018</h2>
              <hr className="divider divider--left" />
              <p className="text-lg leading-[1.8] text-text-muted mt-6">
                Founded by {firmInfo.founder}, Soaloan Tua Nababan & Partners has
                established itself as a trusted legal practice in Jakarta. We combine
                deep legal expertise with a client-focused approach, guided by three
                core principles that define everything we do.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {firmInfo.principles.map((p, i) => (
                <BorderGlow key={i} className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-x-6 gap-y-1 p-8 bg-surface rounded-[var(--radius-md)] border border-border-light transition-all duration-300 hover:border-accent hover:shadow-md hover:translate-x-1 max-sm:grid-cols-1 max-sm:text-center" glowColor="40 80 80" borderRadius={8}>
                  <div className="row-span-2 font-[family-name:var(--font-heading)] text-[2rem] font-bold text-accent leading-none self-center opacity-70 max-sm:row-span-1 max-sm:justify-self-center">
                    0{i + 1}
                  </div>
                  <h4 className="font-[family-name:var(--font-heading)] text-[1.1rem] text-primary m-0">
                    {p.title}
                  </h4>
                  <p className="text-sm text-text-muted leading-[1.6] m-0">{p.description}</p>
                </BorderGlow>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEGAL SERVICES ===== */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Practice Areas</span>
            <h2 className="section-title">Legal Services</h2>
            <hr className="divider" />
            <p className="section-subtitle">
              Comprehensive legal solutions across six key practice areas,
              delivered with precision and dedication.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <BorderGlow
                key={service.id}
                className="group relative overflow-hidden bg-surface p-10 rounded-[var(--radius-md)] border border-border-light transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-transparent before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-accent before:to-accent-light before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                glowColor="40 80 80"
                borderRadius={8}
                fillOpacity={0.8}
              >
                <div className="w-14 h-14 flex items-center justify-center mb-6 text-accent bg-[rgba(196,163,90,0.08)] rounded-[var(--radius-md)] p-3 [&_svg]:w-full [&_svg]:h-full">
                  {serviceIcons[service.icon]}
                </div>
                <h3 className="text-[1.2rem] mb-2 text-primary">{service.title}</h3>
                <p className="text-sm leading-[1.7] text-text-muted mb-6">{service.description}</p>
                <Link href="/legal-services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-[gap] duration-150 hover:gap-2.5">
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUOTE BANNER ===== */}
      <section className="relative bg-primary py-24 text-center overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,rgba(196,163,90,0.06)_0%,transparent_70%)]">
        <div className="container">
          <blockquote className="relative font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.2rem)] font-normal italic text-white/85 max-w-[700px] mx-auto leading-[1.5]">
            <span className="text-[1.5em] text-accent not-italic">&ldquo;</span>
            {firmInfo.quote}
            <span className="text-[1.5em] text-accent not-italic">&rdquo;</span>
          </blockquote>
          <cite className="block font-[family-name:var(--font-body)] text-sm not-italic font-medium text-accent tracking-[0.05em] mt-6">
            — {firmInfo.quoteAuthor}
          </cite>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => {
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
                  <BorderGlow key={post.id} className="group bg-surface rounded-[var(--radius-md)] overflow-hidden border border-border-light transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" glowColor="40 80 80" borderRadius={12}>
                    <div className="relative aspect-[16/10] overflow-hidden bg-bg-alt">
                      {featuredImg ? (
                        <img src={featuredImg} alt={post.title.rendered} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-light">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
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
                      <p className="text-sm text-text-muted leading-[1.6] m-0">
                        {stripHtml(post.excerpt.rendered).substring(0, 120)}…
                      </p>
                    </div>
                  </BorderGlow>
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

      {/* ===== CONTACT CTA ===== */}
      <section className="section--dark relative py-24 text-center overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_20%_50%,rgba(44,95,124,0.15),transparent_50%),radial-gradient(ellipse_at_80%_50%,rgba(196,163,90,0.08),transparent_50%)]">
        <div className="container">
          <div className="relative z-[1]">
            <span className="section-label">Get in Touch</span>
            <h2 className="text-[var(--text-h2)] text-white mb-6">
              Ready to Discuss<br />Your Legal Needs?
            </h2>
            <p className="text-lg text-white/60 max-w-[500px] mx-auto mb-12 leading-[1.7]">
              Schedule a consultation with our experienced legal team.
              We&rsquo;re here to help navigate your most complex legal challenges.
            </p>
            <div className="flex flex-col items-center gap-6">
              <Link href="/contact" className="btn btn--primary">
                Schedule Consultation
              </Link>
              <a href={`mailto:${firmInfo.email}`} className="text-sm text-white/50 hover:[&_span]:underline">
                or email us at <span className="text-accent font-medium">{firmInfo.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
