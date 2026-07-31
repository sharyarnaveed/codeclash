'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeTransition } from '@/lib/hooks/use-theme-transition';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  glass?: boolean;
}

export function ThemeToggle({ className, glass }: ThemeToggleProps) {
  const { theme, resolvedTheme, toggleTheme } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8 rounded-full', className)}
        aria-label="Toggle theme"
        disabled
      />
    );
  }

  const isDark = (theme === 'system' ? resolvedTheme : theme) === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'relative h-8 w-8 overflow-hidden rounded-full transition-colors duration-300',
        glass
          ? 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -40, scale: 0.65 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 40, scale: 0.65 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
