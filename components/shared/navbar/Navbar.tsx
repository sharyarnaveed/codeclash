'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Terminal, User, LayoutDashboard, Settings, LogOut,
  Bell, Search, Crown,
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
import { FuturisticMobileNav } from '@/components/shared/navbar/FuturisticMobileNav';
import { account } from '@/lib/Appwrite';
import { useEffect, useState } from 'react';
import { CommandPalette } from '@/components/shared/command-palette';
import { useCommandPalette } from '@/lib/hooks/use-command-palette';
import { cn } from '@/lib/utils';

interface NavbarProps {
  variant?: 'default' | 'minimal' | 'glass';
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/contests', label: 'Contests' },
  { href: '/hackathons', label: 'Hackathons' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/about', label: 'About' },
] as const;

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

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname?.startsWith(href + '/');

  if (variant === 'glass') {
    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4 pointer-events-none">
          <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-3 py-2 shadow-[0_0_40px_rgba(0,0,0,0.5)] md:w-auto md:max-w-none md:justify-center md:px-2 md:py-1.5">
            <Link href="/" className="flex shrink-0 items-center gap-2 px-2 py-1 font-mono font-bold text-sm text-white transition-colors hover:text-[#FF8C42] sm:px-3 sm:py-1.5">
              <Terminal className="h-4 w-4 text-[#FF8C42]" />
              <span>CodeClash</span>
            </Link>

            <div className="hidden md:flex items-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm transition-colors hover:text-white',
                    isActive(link.href) ? 'text-white' : 'text-white/50',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2 sm:pl-2">
              <div className="hidden sm:block">
                {authenticated ? (
                  <Link href="/dashboard">
                    <Button size="sm" className="h-8 rounded-full bg-white px-4 text-xs font-medium text-black hover:bg-white/90 sm:px-5">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/get-started">
                    <Button size="sm" className="h-8 rounded-full bg-white px-4 text-xs font-medium text-black hover:bg-white/90 sm:px-5">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
              <div className="md:hidden">
                <FuturisticMobileNav links={NAV_LINKS} authenticated={authenticated} glass />
              </div>
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
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:h-16">
          <div className="flex min-w-0 items-center gap-4 sm:gap-8">
            <Link href="/" className="flex shrink-0 items-center gap-2 font-mono text-lg font-bold text-white transition-colors hover:text-primary sm:text-xl">
              <Terminal className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
              <span className="truncate">CodeClash</span>
            </Link>

            {variant === 'default' && (
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  {NAV_LINKS.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <Link href={link.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            'px-4 py-2 text-sm font-medium transition-colors hover:text-white',
                            isActive(link.href) ? 'text-white' : 'text-muted-foreground',
                          )}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="sm" className="hidden gap-2 text-muted-foreground md:flex" onClick={() => setOpen(true)}>
              <Search className="h-4 w-4" />
              <span className="text-xs">Search</span>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                ⌘K
              </kbd>
            </Button>

            <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" onClick={() => setOpen(true)} aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>

            {variant === 'default' && (
              <div className="lg:hidden">
                <FuturisticMobileNav
                  links={NAV_LINKS}
                  authenticated={authenticated}
                  onSearch={() => setOpen(true)}
                />
              </div>
            )}

            {authenticated ? (
              <>
                <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-lime" />
                </Button>
                <Link href="/dashboard" className="hidden md:block">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 font-mono font-bold text-primary">
                          {userdata?.name?.charAt(0) ?? 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{userdata?.name ?? 'User'}</p>
                        <p className="font-mono text-xs text-muted-foreground">Rating: 2840</p>
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
              <Link href="/get-started" className="hidden sm:block">
                <Button size="sm" className="glow-violet font-mono font-semibold sm:h-10 sm:px-4">
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
