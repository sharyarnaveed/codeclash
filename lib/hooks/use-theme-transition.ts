'use client';

import { useTheme } from 'next-themes';
import { useCallback } from 'react';

const TRANSITION_MS = 520;

export function useThemeTransition() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const setThemeWithTransition = useCallback(
    (nextTheme: 'light' | 'dark') => {
      const root = document.documentElement;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!reducedMotion) {
        root.classList.add('theme-transition');
      }

      setTheme(nextTheme);

      if (!reducedMotion) {
        window.setTimeout(() => {
          root.classList.remove('theme-transition');
        }, TRANSITION_MS);
      }
    },
    [setTheme],
  );

  const toggleTheme = useCallback(() => {
    const current = theme === 'system' ? resolvedTheme : theme;
    setThemeWithTransition(current === 'dark' ? 'light' : 'dark');
  }, [theme, resolvedTheme, setThemeWithTransition]);

  return { theme, resolvedTheme, setThemeWithTransition, toggleTheme };
}
