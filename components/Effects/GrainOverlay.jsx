'use client';

import { memo } from 'react';

/*
  GrainOverlay
  ─────────────
  Fixed, full-viewport film grain texture rendered via an inline SVG
  <feTurbulence> filter. Zero image requests, zero layout impact.

  The SVG acts as a canvas for the filter — a <rect> fills the viewport
  with the turbulence pattern. The whole thing sits at z-index 9998
  (under the TargetCursor at 9999, over everything else).

  Opacity is kept very low (~3.5%) so it's subliminal on most monitors
  but breaks the "digital flatness" of pure white/navy backgrounds.
*/

function GrainOverlay() {
  return (
    <div
      className="grain-overlay"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <filter id="stnp-grain" x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="grayNoise"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#stnp-grain)"
          opacity="1"
        />
      </svg>
    </div>
  );
}

export default memo(GrainOverlay);
