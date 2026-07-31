'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Terminal, User, Trophy, LayoutDashboard, Settings, LogOut,
  ChevronDown, Bell, Search, Crown,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { account } from '@/lib/Appwrite';
import { useEffect, useState } from 'react';
import { CommandPalette } from '@/components/shared/command-palette';
import { useCommandPalette } from '@/lib/hooks/use-command-palette';
import { cn } from '@/lib/utils';

interface NavbarProps {
  variant?: 'default' | 'minimal' | 'glass';
}

export default function Navbar({ variant = 'default' }: NavbarProps) {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [userdata, setUserdata] = useState<{ name?: string } | null>(null);
  const { open, setOpen } = useCommandPalette();

  useEffect(() => {
    async function verify() {
      try {
        const user = await account.get();
        setAuthenticated(!!user);
        setUserdata(user);
      } catch {
        setAuthenticated(false);
      }
    }
    verify();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      window.location.href = '/get-started';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  if (variant === 'glass') {
    return (
      <>
        <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-2 py-1.5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <Link href="/" className="flex items-center gap-2 px-3 py-1.5 font-mono font-bold text-sm text-white hover:text-[#FF8C42] transition-colors">
              <Terminal className="h-4 w-4 text-[#FF8C42]" />
              <span className="hidden sm:inline">CodeClash</span>
            </Link>
            <div className="hidden md:flex items-center">
              <Link href="/contests" className={cn('px-4 py-2 text-sm transition-colors hover:text-white rounded-full', isActive('/contests') ? 'text-white' : 'text-white/50')}>
                Contests
              </Link>
              <Link href="/hackathons" className={cn('px-4 py-2 text-sm transition-colors hover:text-white rounded-full', isActive('/hackathons') ? 'text-white' : 'text-white/50')}>
                Hackathons
              </Link>
              <Link href="/leaderboard" className={cn('px-4 py-2 text-sm transition-colors hover:text-white rounded-full', isActive('/leaderboard') ? 'text-white' : 'text-white/50')}>
                Leaderboard
              </Link>
              <Link href="/about" className={cn('px-4 py-2 text-sm transition-colors hover:text-white rounded-full', isActive('/about') ? 'text-white' : 'text-white/50')}>
                About
              </Link>
            </div>
            <div className="flex items-center gap-2 pl-2">
              {authenticated ? (
                <Link href="/dashboard">
                  <Button size="sm" className="rounded-full bg-white text-black hover:bg-white/90 font-medium h-8 px-5 text-xs">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/get-started">
                  <Button size="sm" className="rounded-full bg-white text-black hover:bg-white/90 font-medium h-8 px-5 text-xs">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
        <CommandPalette open={open} onOpenChange={setOpen} />
      </>
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-mono font-bold text-xl text-white hover:text-primary transition-colors">
              <Terminal className="h-6 w-6 text-primary" />
              <span>CodeClash</span>
            </Link>

            {variant === 'default' && (
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/contests" legacyBehavior passHref>
                      <NavigationMenuLink className={cn('px-4 py-2 text-sm font-medium transition-colors hover:text-white', isActive('/contests') ? 'text-white' : 'text-muted-foreground')}>
                        Contests
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/hackathons" legacyBehavior passHref>
                      <NavigationMenuLink className={cn('px-4 py-2 text-sm font-medium transition-colors hover:text-white', isActive('/hackathons') ? 'text-white' : 'text-muted-foreground')}>
                        Hackathons
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/leaderboard" legacyBehavior passHref>
                      <NavigationMenuLink className={cn('px-4 py-2 text-sm font-medium transition-colors hover:text-white', isActive('/leaderboard') ? 'text-white' : 'text-muted-foreground')}>
                        Leaderboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className={cn('px-4 py-2 text-sm font-medium transition-colors hover:text-white', isActive('/about') ? 'text-white' : 'text-muted-foreground')}>
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden md:flex text-muted-foreground gap-2" onClick={() => setOpen(true)}>
              <Search className="h-4 w-4" />
              <span className="text-xs">Search</span>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                ⌘K
              </kbd>
            </Button>

            {authenticated ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-lime" />
                </Button>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary font-mono font-bold">
                          {userdata?.name?.charAt(0) ?? 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{userdata?.name ?? 'User'}</p>
                        <p className="text-xs text-muted-foreground font-mono">Rating: 2840</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile/alicec" className="cursor-pointer"><User className="mr-2 h-4 w-4" /> Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/organizer" className="cursor-pointer"><Crown className="mr-2 h-4 w-4" /> Organizer</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/get-started">
                <Button className="font-mono font-semibold glow-violet">
                  <Terminal className="mr-2 h-4 w-4" /> Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
}
