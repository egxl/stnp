'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

export default function LoadingProvider({ children }) {
  const [isReady, setIsReady] = useState(() => {
    // Check if we've already booted in this session
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('stnp-site-ready') === 'true' || false;
    }
    return false;
  });

  const handleComplete = () => {
    setIsReady(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('stnp-site-ready', 'true');
    }
  };

  return (
    <>
      {!isReady && <LoadingScreen onComplete={handleComplete} />}
      {children}
    </>
  );
}
