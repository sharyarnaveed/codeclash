'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
  Terminal,
  Search,
  X,
  Home,
  Trophy,
  Rocket,
  BarChart3,
  Info,
  ArrowUpRight,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LINK_META: Record<string, { icon: LucideIcon; tagline: string }> = {
  '/': { icon: Home, tagline: 'Back to the homepage' },
  '/contests': { icon: Trophy, tagline: 'Live & upcoming rounds' },
  '/hackathons': { icon: Rocket, tagline: 'Build and compete' },
  '/leaderboard': { icon: BarChart3, tagline: 'Global rankings' },
  '/about': { icon: Info, tagline: 'Our story & mission' },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function MobileHamburger({
  open,
  onClick,
  glass,
}: {
  open: boolean;
  onClick: () => void;
  glass?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      className={cn(
        'relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300',
        glass
          ? 'border border-white/10 bg-black/60 text-white hover:border-white/20 hover:bg-black/80'
          : 'border border-white/[0.08] bg-white/[0.06] text-white/80 hover:bg-white/10 hover:text-white',
        open && 'border-[#67BAF4]/50 bg-[#67BAF4]/10 text-[#67BAF4] shadow-[0_0_20px_rgba(103,186,244,0.2)]',
      )}
    >
      <span className="relative flex h-3.5 w-4 flex-col items-center justify-center">
        <motion.span
          animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
          className="absolute block h-[1.5px] w-4 origin-center rounded-full bg-current"
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          className="absolute block h-[1.5px] w-4 rounded-full bg-current"
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
          className="absolute block h-[1.5px] w-4 origin-center rounded-full bg-current"
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </button>
  );
}

export function FuturisticMobileNav({
  links,
  authenticated,
  onSearch,
  glass = false,
}: {
  links: readonly { href: string; label: string }[];
  authenticated: boolean;
  onSearch?: () => void;
  glass?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname?.startsWith(href + '/');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleSearch = () => {
    setOpen(false);
    onSearch?.();
  };

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          className="mobile-nav-overlay fixed inset-0 z-[200] flex flex-col"
        >
          <motion.div
            variants={panelVariants}
            className="relative flex min-h-[100dvh] flex-col overflow-hidden"
            style={{ background: 'var(--hero-bg)' }}
          >
            {/* Solid base + subtle ambient glow */}
            <div className="pointer-events-none absolute inset-0" style={{ background: 'var(--hero-bg)' }} />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#67BAF4]/8 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-[#1E466B]/6 blur-[90px]" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-5 pb-2 pt-5 sm:px-6 sm:pt-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#67BAF4]/30 bg-[#67BAF4]/10">
                  <Terminal className="h-3.5 w-3.5 text-[#67BAF4]" />
                </div>
                <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
                  CodeClash
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            {onSearch && (
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                className="relative z-10 px-5 py-3 sm:px-6"
              >
                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-left backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <Search className="h-4 w-4 shrink-0 text-white/40" />
                  <span className="flex-1 text-sm text-white/40">Search contests, pages...</span>
                  <kbd className="rounded-md border border-white/10 bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-white/35">
                    ⌘K
                  </kbd>
                </button>
              </motion.div>
            )}

            {/* Nav links */}
            <nav className="relative z-10 flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-6">
              <p className="mb-5 px-1 text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
                Menu
              </p>
              <ul className="space-y-1">
                {links.map((link, i) => {
                  const active = isActive(link.href);
                  const meta = LINK_META[link.href] ?? { icon: ArrowUpRight, tagline: 'Explore' };
                  const Icon = meta.icon;

                  return (
                    <motion.li
                      key={link.href}
                      custom={i + (onSearch ? 1 : 0)}
                      initial="hidden"
                      animate="visible"
                      variants={linkVariants}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'group relative flex items-center gap-4 overflow-hidden rounded-2xl px-3 py-3.5 transition-all duration-300 sm:py-4',
                          active
                            ? 'bg-[var(--hero-glass-bg)] ring-1 ring-[#67BAF4]/40'
                            : 'bg-[var(--hero-glass-bg)] hover:bg-[color-mix(in_srgb,var(--hero-glass-bg)_60%,var(--hero-accent)_40%)]',
                        )}
                      >
                        {active && (
                          <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-[#67BAF4] shadow-[0_0_8px_rgba(103,186,244,0.6)]" />
                        )}
                        <div
                          className={cn(
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300',
                            active
                              ? 'border-[#67BAF4]/30 bg-[#67BAF4]/15 text-[#67BAF4]'
                              : 'border-[var(--hero-glass-border)] bg-[var(--hero-glass-bg)] text-foreground/50 group-hover:text-foreground/80',
                          )}
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              'text-lg font-medium tracking-tight transition-colors sm:text-xl',
                              active ? 'text-foreground' : 'text-foreground/90 group-hover:text-foreground',
                            )}
                          >
                            {link.label}
                          </p>
                          <p className="truncate text-xs landing-muted">{meta.tagline}</p>
                        </div>
                        <ArrowUpRight
                          className={cn(
                            'h-4 w-4 shrink-0 transition-all duration-300',
                            active
                              ? 'text-[#67BAF4] opacity-100'
                              : 'text-foreground/20 opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60',
                          )}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer CTA */}
            <motion.div
              custom={links.length + (onSearch ? 1 : 0)}
              initial="hidden"
              animate="visible"
              variants={linkVariants}
              className="relative z-10 shrink-0 border-t border-white/[0.06] px-5 py-5 sm:px-6 sm:py-6"
            >
              {authenticated ? (
                <div className="grid grid-cols-2 gap-2.5">
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="col-span-2">
                    <Button className="mobile-nav-cta h-12 w-full rounded-full text-sm font-semibold text-black">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/settings" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className="h-11 w-full rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </Link>
                  <Link href="/organizer" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className="h-11 w-full rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                    >
                      Organizer
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-center text-xs text-white/40">
                    Join the arena — compete, build, and climb the ranks.
                  </p>
                  <Link href="/get-started" onClick={() => setOpen(false)}>
                    <Button className="mobile-nav-cta h-12 w-full rounded-full text-sm font-semibold text-black">
                      Get Started
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <MobileHamburger open={open} onClick={() => setOpen((v) => !v)} glass={glass} />
      {mounted && createPortal(menu, document.body)}
    </>
  );
}
