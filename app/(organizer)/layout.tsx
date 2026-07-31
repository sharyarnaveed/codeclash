'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/shared/navbar/Navbar';
import { PageTransition } from '@/components/shared/page-transition';
import {
  LayoutDashboard, Code2, Rocket, Users, BarChart3, Settings, ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const orgLinks = [
  { href: '/organizer', label: 'Overview', icon: LayoutDashboard },
  { href: '/organizer/contests', label: 'Contests', icon: Code2 },
  { href: '/organizer/hackathons', label: 'Hackathons', icon: Rocket },
  { href: '/organizer/users', label: 'Users', icon: Users },
  { href: '/organizer/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/organizer/settings', label: 'Settings', icon: Settings },
];

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar variant="minimal" />
      <div className="flex flex-1">
        <aside className={cn(
          'flex flex-col border-r border-white/10 bg-black/50 backdrop-blur-xl shrink-0 transition-all duration-300',
          collapsed ? 'w-16' : 'w-60'
        )}>
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            {!collapsed && <span className="text-xs font-mono text-primary uppercase tracking-wider">Organizer</span>}
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCollapsed(!collapsed)}>
              <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
            </Button>
          </div>
          <nav className="flex-1 p-2 space-y-1">
            {orgLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href || (link.href !== '/organizer' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  title={link.label}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors',
                    active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-white hover:bg-white/5',
                    collapsed && 'justify-center px-2'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && link.label}
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
