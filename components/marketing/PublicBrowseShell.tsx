'use client';

import Navbar from '@/components/shared/navbar/Navbar';
import { Footer } from '@/components/shared/footer/Footer';

export function PublicBrowseShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mesh-bg" />
      <Navbar variant="glass" />
      <main className="flex-1 relative z-10 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
