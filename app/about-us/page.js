import { firmInfo } from '@/lib/data/team';

export const metadata = {
  title: 'About Us',
  description:
    'Learn about Soaloan Tua Nababan & Partners — a full-service Jakarta law firm founded in 2018, dedicated to truth, justice, and excellence.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-primary" style={{ padding: `calc(var(--nav-height) + var(--space-3xl)) 0 var(--space-3xl)` }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(44,95,124,0.2),transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(196,163,90,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Cdefs%3E%3Cpattern%20id=%22g%22%20width=%2210%22%20height=%2210%22%20patternUnits=%22userSpaceOnUse%22%3E%3Cpath%20d=%22M0%2010L10%200%22%20stroke=%22rgba(196,163,90,0.04)%22%20stroke-width=%220.5%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20fill=%22url(%23g)%22%20width=%22100%22%20height=%22100%22/%3E%3C/svg%3E')]" />
        <div className="container">
          <div className="relative z-[1]">
            <span className="text-xs text-accent tracking-[0.1em] uppercase block mb-4">Home / About Us</span>
            <h1 className="text-[var(--text-h1)] text-white mb-4">About Our Firm</h1>
            <p className="text-lg text-white/60 max-w-[500px]">
              A legacy of excellence in legal services since 2018
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-24 max-lg:gap-12 items-start">
            <div>
              <span className="section-label">Our Story</span>
              <h2 className="section-title">
                Building Trust Through<br />Legal Excellence
              </h2>
              <hr className="divider divider--left" />
              <p className="text-lg leading-[1.8] text-text-muted mt-6">
                Soaloan Tua Nababan & Partners was established in 2018 by{' '}
                <strong className="text-text-body">{firmInfo.founder}</strong> with a clear vision: to provide
                international-caliber legal services rooted in integrity and
                Indonesian expertise. Based in the prestigious Prudential Tower
                in South Jakarta, our firm has quickly earned recognition for
                delivering strategic counsel across a wide spectrum of legal disciplines.
              </p>
              <p className="text-lg leading-[1.8] text-text-muted mt-4">
                Our team combines deep knowledge of Indonesian law with practical
                business acumen, allowing us to serve both domestic and international
                clients with equal proficiency. We believe that the best legal
                outcomes are achieved through thorough preparation, creative
                strategy, and unwavering commitment to our clients&apos; interests.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 max-sm:gap-4">
              {[
                { num: '2018', label: 'Established' },
                { num: '6', label: 'Practice Areas' },
                { num: '100+', label: 'Cases Handled' },
                { num: 'Jakarta', label: 'Headquarters' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-surface border border-border-light rounded-[var(--radius-md)] p-8 text-center transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="font-[family-name:var(--font-heading)] text-[2rem] font-bold text-accent leading-none mb-1">
                    {stat.num}
                  </div>
                  <div className="text-sm text-text-muted font-medium uppercase tracking-[0.05em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles (Z-Axis Cascade) */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Foundation</span>
            <h2 className="section-title">Guiding Principles</h2>
            <hr className="divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 pb-24 md:pb-48">
            {firmInfo.principles.map((p, i) => {
              const staggeredLayouts = [
                "md:col-span-5 md:mt-0 lg:ml-0",
                "md:col-span-4 md:mt-32 lg:mt-48",
                "md:col-span-3 md:mt-16 lg:mt-24"
              ];
              return (
                <div key={i} className={`relative p-1.5 bg-white/5 ring-1 ring-white/10 rounded-[2.5rem] transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] active:scale-[0.98] ${staggeredLayouts[i] || 'md:col-span-4'}`}>
                  <div className="group h-full p-10 max-lg:p-8 bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-[calc(2.5rem-0.375rem)] relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-full bg-[rgba(196,163,90,0.1)] border border-[rgba(196,163,90,0.2)] flex items-center justify-center mb-10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110">
                        <span className="font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-accent">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="text-[1.4rem] text-white tracking-tight mb-4">{p.title}</h3>
                      <p className="text-[0.95rem] text-white/50 leading-[1.8]">{p.description}</p>
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-accent to-transparent mt-12 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] translate-x-[-100%] group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 max-lg:gap-12 items-start">
            <div>
              <span className="section-label">Our Location</span>
              <h2 className="section-title">Visit Our Office</h2>
              <hr className="divider divider--left" />
              <address className="not-italic text-lg text-text-muted leading-[1.8] mt-6">
                <p>
                  <strong className="text-text-body">{firmInfo.address.line1}</strong><br />
                  {firmInfo.address.line2}<br />
                  {firmInfo.address.city}, {firmInfo.address.postal}<br />
                  {firmInfo.address.country}
                </p>
              </address>
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex gap-3 items-start text-text-muted">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 text-accent">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <div>
                    {firmInfo.phone.map((p, i) => (
                      <span key={i}>{p}<br /></span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 items-start text-text-muted">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 text-accent">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href={`mailto:${firmInfo.email}`} className="text-steel font-medium hover:text-accent">{firmInfo.email}</a>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden bg-bg-alt border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1234!2d106.8!3d-6.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPrudential+Tower!5e0!3m2!1sid!2sid!4v1234"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="STNP Office Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
