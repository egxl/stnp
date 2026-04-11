'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

export default function LoadingProvider({ children }) {
  const pathname = usePathname();
  const [done, setDone] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    // Reveal loading screen on route change
    if (pathname !== currentPath) {
      setDone(false);
      setCurrentPath(pathname);
    }
  }, [pathname, currentPath]);

  return (
    <>
      {!done && <LoadingScreen onComplete={() => setDone(true)} />}
      {/* Content is no longer waiting to fade in; it sits underneath the curtains ready to be revealed */}
      <div style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </>
  );
}
