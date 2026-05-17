'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Feature Flags ────────────────────────────────────────────────────────────
// Set to `true` to re-enable scroll-driven parallax on the hero narrative block.
const PARALLAX_ENABLED = false;
// ─────────────────────────────────────────────────────────────────────────────

/**
 * HeroParallax component
 *
 * Provides scroll-driven parallax and fade effects for Hero content.
 * It expects to be placed inside a container that defines the scroll height.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to animate
 * @param {string} props.className - Additional classes
 */
export default function HeroParallax({ children, className }) {
  const { scrollYProgress } = useScroll();

  // Narrative moves slightly faster/slower for parallax feel
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -60]);

  // Fade out as we approach the snap point
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Scale down slightly for a "receding" feel
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  if (!PARALLAX_ENABLED) {
    // Parallax disabled — render as a plain div with no motion transforms
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
