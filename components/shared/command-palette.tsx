'use client';

import { useRouter } from 'next/navigation';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Code2, Trophy, Rocket, LayoutDashboard, Search, User } from 'lucide-react';

const pages = [
  { label: 'Contests', href: '/contests', icon: Code2, group: 'Competitive Programming' },
  { label: 'Practice Problems', href: '/practice', icon: Code2, group: 'Competitive Programming' },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy, group: 'Competitive Programming' },
  { label: 'Hackathons', href: '/hackathons', icon: Rocket, group: 'Hackathons' },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, group: 'Account' },
  { label: 'Profile', href: '/profile/alicec', icon: User, group: 'Account' },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  const run = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const groups = [...new Set(pages.map((p) => p.group))];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search contests, hackathons, pages..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((group) => (
          <CommandGroup key={group} heading={group}>
            {pages.filter((p) => p.group === group).map((page) => {
              const Icon = page.icon;
              return (
                <CommandItem key={page.href} onSelect={() => run(page.href)}>
                  <Icon className="mr-2 h-4 w-4" />
                  {page.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => run('/contests')}>
            <Search className="mr-2 h-4 w-4" />
            Browse Live Contests
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
