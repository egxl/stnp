'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

export default function LoadingProvider({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('stnp-site-ready') === 'true') {
      setIsReady(true);
    }
  }, []);

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
