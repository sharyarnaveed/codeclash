'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/shared/navbar/Navbar';
import { PageTransition } from '@/components/shared/page-transition';
import { PublicBrowseShell } from '@/components/marketing/PublicBrowseShell';
import { Rocket, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const hackLinks = [
  { href: '/hackathons', label: 'Browse', icon: Rocket },
  { href: '/hackathons/innovate-2026', label: 'Innovate 2026', icon: Award },
];

export default function HackathonLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBrowsePage = pathname === '/hackathons';

  if (isBrowsePage) {
    return (
      <PublicBrowseShell>
        <PageTransition>{children}</PageTransition>
      </PublicBrowseShell>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col mesh-bg">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden lg:flex w-56 flex-col border-r border-white/10 bg-black/30 backdrop-blur-xl shrink-0">
          <div className="p-4 border-b border-white/10">
            <span className="text-xs font-mono text-lime uppercase tracking-wider">Hackathons</span>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {hackLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href || pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-2xl text-sm transition-colors',
                    active ? 'bg-lime/10 text-lime border border-lime/20' : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
