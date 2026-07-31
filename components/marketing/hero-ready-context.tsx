'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SiteLoader } from '@/components/shared/site-loader';

type HeroReadyContextValue = {
  reportProgress: (value: number) => void;
  reportReady: () => void;
  isReady: boolean;
};

const HeroReadyContext = createContext<HeroReadyContextValue | null>(null);

const MIN_LOADER_MS = 900;

export function HeroReadyProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(8);
  const [sceneReady, setSceneReady] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const mountTimeRef = useRef(Date.now());
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reportProgress = useCallback((value: number) => {
    setProgress((prev) => Math.max(prev, Math.min(99, value)));
  }, []);

  const reportReady = useCallback(() => {
    setSceneReady(true);
    setProgress(100);
  }, []);

  useEffect(() => {
    if (sceneReady) return;

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 48 ? prev + 1 : prev));
    }, 140);

    return () => clearInterval(interval);
  }, [sceneReady]);

  useEffect(() => {
    if (!sceneReady) return;

    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, MIN_LOADER_MS - elapsed);

    hideTimeoutRef.current = setTimeout(() => {
      setLoaderVisible(false);
      setIsReady(true);
    }, remaining);

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [sceneReady]);

  useEffect(() => {
    const fallback = setTimeout(() => {
      setSceneReady(true);
      setProgress(100);
    }, 12000);

    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (!loaderVisible) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loaderVisible]);

  const value = useMemo(
    () => ({ reportProgress, reportReady, isReady }),
    [reportProgress, reportReady, isReady],
  );

  return (
    <HeroReadyContext.Provider value={value}>
      <SiteLoader visible={loaderVisible} progress={progress} />
      {children}
    </HeroReadyContext.Provider>
  );
}

export function useHeroReady() {
  const ctx = useContext(HeroReadyContext);
  if (!ctx) {
    throw new Error('useHeroReady must be used within HeroReadyProvider');
  }
  return ctx;
}
