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

const podiumColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600'];

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
          <span className="text-xs font-mono text-lime uppercase tracking-widest">Rankings</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mt-3 mb-4">Leaderboard</h1>
          <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
            Top rated competitive programmers worldwide. Browse profiles without an account.
          </p>
        </div>
      </ScrollReveal>

      {/* Top 3 podium */}
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
                    'rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 text-center transition-all',
                    isFirst && 'md:-mt-4 border-yellow-500/20 bg-yellow-500/[0.03]'
                  )}
                >
                  <Medal className={cn('h-5 w-5 mx-auto mb-2', podiumColors[idx])} />
                  <Avatar className={cn('mx-auto mb-2', isFirst ? 'h-14 w-14' : 'h-10 w-10')}>
                    <AvatarFallback className="bg-primary/20 text-primary font-mono font-bold">
                      {entry.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Link href={`/profile/${entry.username}`} className="font-medium hover:text-[#FF8C42] block truncate text-sm">
                    {entry.name}
                  </Link>
                  <p className="text-[10px] text-white/40">@{entry.username}</p>
                  <p className="font-mono font-bold text-lime mt-2">{entry.rating}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.15}>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              placeholder="Search by name or username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-12 rounded-full bg-white/[0.04] border-white/10 backdrop-blur-xl text-white placeholder:text-white/30"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setCountry('all')}
              className={cn(
                'rounded-full px-4 py-2.5 text-sm whitespace-nowrap border transition-all',
                country === 'all' ? 'bg-white text-black border-white font-medium' : 'bg-white/[0.04] text-white/60 border-white/10'
              )}
            >
              All
            </button>
            {countries.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setCountry(c.code)}
                className={cn(
                  'rounded-full px-4 py-2.5 text-sm whitespace-nowrap border transition-all',
                  country === c.code ? 'bg-white text-black border-white font-medium' : 'bg-white/[0.04] text-white/60 border-white/10'
                )}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <p className="text-xs text-white/30 font-mono mb-4">{filtered.length} players found</p>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <Trophy className="h-10 w-10 text-white/20 mx-auto mb-4" />
          <p className="text-white/40">No players match your search.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="w-14 text-white/40">#</TableHead>
                <TableHead className="text-white/40">Player</TableHead>
                <TableHead className="text-white/40 hidden sm:table-cell">Country</TableHead>
                <TableHead className="text-right text-white/40 hidden sm:table-cell">Solved</TableHead>
                <TableHead className="text-right text-white/40">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rest.map((entry) => (
                <TableRow key={entry.username} className="border-white/10 hover:bg-white/[0.03]">
                  <TableCell className="font-mono text-white/30">{entry.rank}</TableCell>
                  <TableCell>
                    <Link href={`/profile/${entry.username}`} className="hover:text-[#FF8C42] font-medium">{entry.name}</Link>
                    <span className="text-xs text-white/30 ml-2">@{entry.username}</span>
                  </TableCell>
                  <TableCell className="text-white/40 hidden sm:table-cell">{COUNTRY_NAMES[entry.country] ?? entry.country}</TableCell>
                  <TableCell className="text-right font-mono text-white/40 hidden sm:table-cell">{entry.solved}</TableCell>
                  <TableCell className="text-right font-mono font-bold text-lime">{entry.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
