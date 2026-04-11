import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div
      className="cta-mesh relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{ paddingTop: 'var(--nav-height)' }}
    >
      {/* Radial accents */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(44,95,124,0.15) 0%, transparent 55%), ' +
            'radial-gradient(ellipse at 80% 50%, rgba(196,163,90,0.08) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-[1] px-8">
        {/* Giant 404 */}
        <p
          className="font-[family-name:var(--font-heading)] font-light text-white/[0.06] leading-none select-none"
          style={{ fontSize: 'clamp(10rem, 30vw, 22rem)', letterSpacing: '-0.05em' }}
          aria-hidden="true"
        >
          404
        </p>

        <div style={{ marginTop: '-4rem' }}>
          <span
            className="font-[family-name:var(--font-body)] text-[0.65rem] font-medium tracking-[0.3em] uppercase text-accent/70 block mb-4"
          >
            Soaloan Tua Nababan &amp; Partners
          </span>
          <h1
            className="font-[family-name:var(--font-heading)] font-light text-white leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Page Not Found
          </h1>
          <p
            className="font-[family-name:var(--font-body)] text-white/50 leading-[1.75] mb-12 mx-auto"
            style={{ fontSize: '1rem', maxWidth: '38ch' }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on the right track.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/" className="btn btn--primary">
              Back to Home
            </Link>
            <Link href="/contact" className="btn btn--outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
