'use client';

import Navbar from '@/components/shared/navbar/Navbar';
import { Footer } from '@/components/shared/footer/Footer';

export function PublicBrowseShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(262_83%_58%/0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,140,66,0.06),transparent_40%)]" />
      <Navbar variant="glass" />
      {/* pt accounts for fixed glass nav (top-4 + pill height) */}
      <main className="flex-1 relative z-10 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
