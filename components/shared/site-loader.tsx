'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValueEvent } from 'framer-motion';

type SiteLoaderProps = {
  visible: boolean;
  progress: number;
};

function AnimatedPercent({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 55, damping: 22, mass: 0.8 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useMotionValueEvent(spring, 'change', (latest) => {
    setDisplay(Math.round(latest));
  });

  return (
    <span className="tabular-nums tracking-tight">
      {display}%
    </span>
  );
}

export function SiteLoader({ visible, progress }: SiteLoaderProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="site-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="select-none text-[clamp(4rem,14vw,9rem)] font-medium leading-none text-white"
          >
            <AnimatedPercent value={clampedProgress} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute bottom-6 left-6 text-[11px] font-medium tracking-wide text-white/45"
          >
            Processing request...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
