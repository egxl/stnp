import { team } from '@/lib/data/team';

export const metadata = {
  title: 'Our Team',
  description:
    'Meet the experienced legal professionals at Soaloan Tua Nababan & Partners.',
};

export default function TeamPage() {
  const partners = team.filter((m) => m.role === 'partner');
  const allAssociates = team.filter((m) => m.role === 'senior_associate' || m.role === 'associate');

  const renderCard = (member) => (
    <div key={member.id} className="group bg-surface border border-border-light rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent">
      <div className="aspect-[3/4] bg-bg-alt flex items-center justify-center overflow-hidden">
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-text-light">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-8">
        <h3 className="text-[1.3rem] text-primary mb-1">{member.name}</h3>
        <span className="text-sm font-semibold text-accent uppercase tracking-[0.05em]">{member.title}</span>
        <hr className="divider divider--left" />
        <p className="text-sm text-text-muted leading-[1.7] mt-4 whitespace-pre-line">{member.bio}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary" style={{ padding: `calc(var(--nav-height) + var(--space-3xl)) 0 var(--space-3xl)` }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(44,95,124,0.2),transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(196,163,90,0.08),transparent_50%)]" />
        <div className="absolute inset-0" />
        <div className="container">
          <div className="relative z-[1]">
            <span className="text-xs text-accent tracking-[0.1em] uppercase block mb-4">Home / Our Team</span>
            <h1 className="text-[var(--text-h1)] text-white mb-4">Our Team</h1>
            <p className="text-lg text-white/60 max-w-[550px]">
              Experienced legal professionals dedicated to achieving the best outcomes for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Partners</h2>
            <hr className="divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {partners.map(renderCard)}
          </div>
        </div>
      </section>

      {/* Associates */}
      <section className="section bg-bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Associates</h2>
            <hr className="divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {allAssociates.map(renderCard)}
          </div>
        </div>
      </section>
    </>
  );
}
