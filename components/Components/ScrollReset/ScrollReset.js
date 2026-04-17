'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * ScrollReset component ensures that the window scroll position is reset to the top
 * whenever the pathname changes. This reinforces Next.js's default behavior,
 * which can sometimes be interfered with by View Transitions or Scroll Snapping.
 */
export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // We use an instant scroll for page changes to avoid seeing the previous page scroll.
    // The same-page smooth scroll is handled by the Navbar component itself.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
