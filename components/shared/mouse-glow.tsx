'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useCallback } from 'react';

export function MouseGlow({ className }: { className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, hsl(262 83% 58% / 0.08), transparent 80%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.div
      className={`absolute inset-0 ${className ?? ''}`}
      style={{ background }}
      onMouseMove={handleMouseMove}
    />
  );
}
