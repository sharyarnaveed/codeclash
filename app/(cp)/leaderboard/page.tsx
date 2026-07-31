'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MOCK_GLOBAL_LEADERBOARD, COUNTRY_NAMES } from '@/lib/mock/contests';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ScrollReveal } from '@/components/shared/motion';
import { Trophy, Medal, Search } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const podiumColors = ['text-yellow-500', 'text-muted-foreground', 'text-amber-600'];

export default function LeaderboardPage() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('all');

  const countries = useMemo(() => {
    const codes = [...new Set(MOCK_GLOBAL_LEADERBOARD.map((e) => e.country))].sort();
    return codes.map((code) => ({ code, name: COUNTRY_NAMES[code] ?? code }));
  }, []);

  const filtered = useMemo(() => {
    return MOCK_GLOBAL_LEADERBOARD.filter((entry) => {
      const matchesSearch =
        !search ||
        entry.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.username.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = country === 'all' || entry.country === country;
      return matchesSearch && matchesCountry;
    });
  }, [search, country]);

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="browse-page-hero-label">Rankings</span>
          <h1 className="browse-page-title">Leaderboard</h1>
          <p className="landing-subtext max-w-lg mx-auto text-sm md:text-base">
            Top rated competitive programmers worldwide. Browse profiles without an account.
          </p>
        </div>
      </ScrollReveal>

      {top3.length > 0 && (
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
            {[1, 0, 2].map((idx) => {
              const entry = top3[idx];
              if (!entry) return null;
              const isFirst = idx === 0;
              return (
                <div
                  key={entry.username}
                  className={cn(
                    'browse-surface p-4 text-center transition-all',
                    isFirst && 'md:-mt-4 border-yellow-500/20 bg-yellow-500/[0.03]',
                  )}
                >
                  <Medal className={cn('h-5 w-5 mx-auto mb-2', podiumColors[idx])} />
                  <Avatar className={cn('mx-auto mb-2', isFirst ? 'h-14 w-14' : 'h-10 w-10')}>
                    <AvatarFallback className="bg-primary/20 text-primary font-mono font-bold">
                      {entry.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Link href={`/profile/${entry.username}`} className="font-medium hover:text-primary block truncate text-sm">
                    {entry.name}
                  </Link>
                  <p className="text-[10px] landing-muted">@{entry.username}</p>
                  <p className="font-mono font-bold text-primary mt-2">{entry.rating}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.15}>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 landing-muted" />
            <Input
              placeholder="Search by name or username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="browse-input pl-11"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setCountry('all')}
              className={cn('filter-chip px-4 py-2.5', country === 'all' && 'filter-chip-active')}
            >
              All
            </button>
            {countries.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setCountry(c.code)}
                className={cn('filter-chip px-4 py-2.5', country === c.code && 'filter-chip-active')}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <p className="text-xs landing-muted font-mono mb-4">{filtered.length} players found</p>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <Trophy className="h-10 w-10 landing-muted mx-auto mb-4 opacity-50" />
          <p className="landing-muted">No players match your search.</p>
        </div>
      ) : (
        <div className="browse-surface overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="landing-border hover:bg-transparent">
                <TableHead className="w-14 landing-muted">#</TableHead>
                <TableHead className="landing-muted">Player</TableHead>
                <TableHead className="landing-muted hidden sm:table-cell">Country</TableHead>
                <TableHead className="text-right landing-muted hidden sm:table-cell">Solved</TableHead>
                <TableHead className="text-right landing-muted">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rest.map((entry) => (
                <TableRow key={entry.username} className="landing-border hover:bg-[var(--hero-glass-bg)]">
                  <TableCell className="font-mono landing-muted">{entry.rank}</TableCell>
                  <TableCell>
                    <Link href={`/profile/${entry.username}`} className="hover:text-primary font-medium">{entry.name}</Link>
                    <span className="text-xs landing-muted ml-2">@{entry.username}</span>
                  </TableCell>
                  <TableCell className="landing-muted hidden sm:table-cell">{COUNTRY_NAMES[entry.country] ?? entry.country}</TableCell>
                  <TableCell className="text-right font-mono landing-muted hidden sm:table-cell">{entry.solved}</TableCell>
                  <TableCell className="text-right font-mono font-bold text-primary">{entry.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
