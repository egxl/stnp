'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'reveal' | 'exit' | 'done'
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    // Animate progress from 0 → 100 over ~0.8 s with easing
    const duration = 800;

    const tick = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const raw = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - raw, 3);
      const pct = Math.round(eased * 100);
      setProgress(pct);

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Hold briefly, then transition
        setTimeout(() => setPhase('reveal'), 50);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (phase === 'reveal') {
      // After the curtain panels start splitting, trigger the full exit
      const t = setTimeout(() => setPhase('exit'), 900);
      return () => clearTimeout(t);
    }
    if (phase === 'exit') {
      const t = setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 700);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  const isRevealing = phase === 'reveal' || phase === 'exit';

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden ${phase === 'exit' ? 'pointer-events-none' : 'pointer-events-auto'}`}
      aria-hidden="true"
    >
      {/* Left curtain panel */}
      <div
        className={`
          absolute top-0 bottom-0 left-0 w-1/2 bg-[#0A1628] z-[2]
          transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform
          ${isRevealing ? '-translate-x-full' : 'translate-x-0'}
        `}
      />
      {/* Right curtain panel */}
      <div
        className={`
          absolute top-0 bottom-0 right-0 w-1/2 bg-[#0A1628] z-[2]
          transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform
          ${isRevealing ? 'translate-x-full' : 'translate-x-0'}
        `}
      />

      {/* Content (fades out on reveal) */}
      <div
        className={`
          absolute inset-0 z-[3] grid p-10 max-sm:p-6
          transition-opacity duration-400 ease-linear
          ${isRevealing ? 'opacity-0' : ''}
        `}
        style={{
          gridTemplateAreas: `"tl . tr" ". c ." "bl . br"`,
          gridTemplateRows: 'auto 1fr auto',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        {/* Top-left logo mark */}
        <div style={{ gridArea: 'tl' }} className="flex items-start" />

        {/* Centre: large decorative logo */}
        <div style={{ gridArea: 'c' }} className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 animate-[logoReveal_0.9s_cubic-bezier(0.25,0.46,0.45,0.94)_both]">
            <Image
              src="/images/logo-dark.png"
              alt="Soaloan Tua Nababan & Partners"
              width={360}
              height={120}
              priority
              className="object-contain brightness-0 invert h-auto w-[clamp(200px,30vw,360px)]"
            />
            {/* Gold shimmer line beneath logo */}
            <div className="w-[clamp(200px,30vw,360px)] h-px bg-[rgba(196,163,90,0.2)] rounded-full overflow-hidden relative">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent via-accent-light to-accent rounded-full shadow-[0_0_8px_rgba(196,163,90,0.6)]"
                style={{ width: `${progress}%`, transition: 'width 0.08s linear' }}
              />
            </div>
          </div>
        </div>

        {/* Bottom-right: loading percentage */}
        <div
          style={{ gridArea: 'br' }}
          className="flex flex-col items-end justify-end gap-0.5 animate-[fadeUp_0.8s_0.2s_cubic-bezier(0.25,0.46,0.45,0.94)_both]"
        >
          <span className="font-[family-name:var(--font-body)] text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[rgba(196,163,90,0.6)]">
            Loading
          </span>
          <span className="font-[family-name:var(--font-body)] text-[0.9rem] font-semibold tracking-[0.1em] text-white/75 tabular-nums min-w-[3ch] text-right">
            {progress}%
          </span>
        </div>

        {/* Bottom-left: firm name */}
        <div
          style={{ gridArea: 'bl' }}
          className="flex items-end pb-1 animate-[fadeUp_0.8s_0.3s_cubic-bezier(0.25,0.46,0.45,0.94)_both]"
        >
          <span className="font-[family-name:var(--font-body)] text-[0.65rem] font-medium tracking-[0.15em] uppercase text-white/40">
            Soaloan Tua Nababan &amp; Partners
          </span>
        </div>
      </div>
    </div>
  );
}
