'use client';

import { createContext, useContext, useState, useRef } from 'react';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

// Context so Navbar/Footer know when the intro is done
export const LoadingContext = createContext({ isReady: true });
export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }) {
  // Only show the curtain on the very first mount — never on route changes
  const isFirstLoad = useRef(true);
  const [isReady, setIsReady] = useState(false);

  function handleComplete() {
    isFirstLoad.current = false;
    setIsReady(true);
  }

  return (
    <LoadingContext.Provider value={{ isReady }}>
      {/* Curtain only renders once, on first load */}
      {!isReady && <LoadingScreen onComplete={handleComplete} />}
      {children}
    </LoadingContext.Provider>
  );
}
