'use client';

import { useEffect } from 'react';

export default function ScrollHijack() {
  useEffect(() => {
    // Mount: Enable strict scroll snapping and smooth behavior
    document.documentElement.style.scrollSnapType = 'y mandatory';
    document.documentElement.style.scrollBehavior = 'smooth';

    // Unmount: Revert back to default
    return () => {
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return null;
}
