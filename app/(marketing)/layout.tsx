'use client';

import Navbar from '@/components/shared/navbar/Navbar';
import { Footer } from '@/components/shared/footer/Footer';
import { PageTransition } from '@/components/shared/page-transition';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar variant="glass" />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
