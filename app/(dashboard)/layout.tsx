'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/shared/navbar/Navbar';
import { PageTransition } from '@/components/shared/page-transition';
import {
  LayoutDashboard, Calendar, Send, Users, Trophy, Award, TrendingUp, Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const dashLinks = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/registrations', label: 'Registrations', icon: Calendar },
  { href: '/dashboard/submissions', label: 'Submissions', icon: Send },
  { href: '/dashboard/teams', label: 'Teams', icon: Users },
  { href: '/dashboard/rankings', label: 'Rankings', icon: Trophy },
  { href: '/dashboard/certificates', label: 'Certificates', icon: Award },
  { href: '/dashboard/progress', label: 'Progress', icon: TrendingUp },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden md:flex w-60 flex-col border-r border-white/10 bg-black/50 backdrop-blur-xl shrink-0">
          <div className="p-4 border-b border-white/10">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Participant</span>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {dashLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors',
                    active ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          <PageTransition>{children}</PageTransition>
        </main>
        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/90 backdrop-blur-xl z-40">
          <div className="flex justify-around py-2">
            {dashLinks.slice(0, 5).map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={cn('flex flex-col items-center gap-1 p-2 text-xs', active ? 'text-primary' : 'text-muted-foreground')}>
                  <Icon className="h-4 w-4" />
                  <span className="truncate max-w-[60px]">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
