'use client';

import { PageWrapper } from '@/components/shared/motion';

export function PageTransition({ children }: { children: React.ReactNode }) {
  return <PageWrapper>{children}</PageWrapper>;
}
