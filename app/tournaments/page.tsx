'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TOURNAMENTS } from '@/lib/tournamentData';
import type { Tournament, TournamentStatus } from '@/lib/tournamentData';
import {
  Trophy, Zap, Clock, Users, ChevronRight,
  Crown, Search, Filter, Sword, Lock, CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<TournamentStatus, { label: string; color: string; icon: React.ReactNode }> = {
  live:      { label: 'LIVE',      color: 'bg-red-500/15 text-red-400 border border-red-500/30',    icon: <Zap className="h-3 w-3" /> },
  upcoming:  { label: 'UPCOMING',  color: 'bg-primary/15 text-primary border border-primary/30',     icon: <Clock className="h-3 w-3" /> },
  completed: { label: 'COMPLETED', color: 'bg-muted/50 text-muted-foreground border border-border/50', icon: <CheckCircle2 className="h-3 w-3" /> },
};

const DIFF_COLOR: Record<string, string> = {
  Easy:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Medium: 'bg-amber-500/15   text-amber-400   border-amber-500/30',
  Hard:   'bg-orange-500/15  text-orange-400  border-orange-500/30',
  Expert: 'bg-purple-500/15  text-purple-400  border-purple-500/30',
};

function TournamentCard({ t }: { t: Tournament }) {
  const s = STATUS_CONFIG[t.status];
  const pct = Math.round((t.participants / t.maxParticipants) * 100);

  return (
    <Link href={`/tournaments/${t.id}`} className="group block">
      <div
        className={`relative rounded-2xl border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden
          ${t.status === 'live' ? 'border-red-500/30 hover:border-red-400/50' : 'border-border/60 hover:border-primary/40'}
          ${t.isJoined ? 'ring-1 ring-primary/30' : ''}`}
      >
        {/* Glow effect on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Live pulsing badge */}
        {t.status === 'live' && (
          <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            LIVE
          </span>
        )}

        {t.isJoined && (
          <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
            <Sword className="h-3 w-3" /> Joined
          </span>
        )}

        <div className="mb-4 flex items-start gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
            ${t.status === 'live' ? 'bg-red-500/15 text-red-400' : 'bg-primary/15 text-primary'}`}>
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
              {t.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground font-mono">{t.format}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {t.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {t.tags.slice(0, 3).map(tag => (
            <span key={tag} className="rounded-md border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="rounded-lg bg-background/60 p-2 text-center">
            <p className="font-bold text-sm text-primary font-mono">{t.prizePool}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Prize Pool</p>
          </div>
          <div className="rounded-lg bg-background/60 p-2 text-center">
            <p className="font-bold text-sm font-mono">{t.participants}/{t.maxParticipants}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Players</p>
          </div>
          <div className="rounded-lg bg-background/60 p-2 text-center">
            <p className={`font-bold text-sm font-mono ${DIFF_COLOR[t.difficulty].split(' ')[1]}`}>{t.difficulty}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Difficulty</p>
          </div>
        </div>

        {/* Participants fill bar */}
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>Participants</span>
            <span>{pct}% full</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted/50">
            <div
              className={`h-1.5 rounded-full transition-all ${pct >= 100 ? 'bg-red-500' : 'bg-primary'}`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
        </div>

        {/* Dates & CTA */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground font-mono">
            {new Date(t.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            {t.startDate !== t.endDate &&
              ` – ${new Date(t.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
            , {new Date(t.startDate).getFullYear()}
          </p>
          <span className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
            {t.status === 'upcoming' && !t.isJoined ? 'Join' :
             t.status === 'live'     && t.isJoined  ? 'Enter' :
             t.status === 'completed'               ? 'Results' : 'View'}
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Hero My-Match Banner ─────────────────────────────────────────────────────
function MyMatchBanner() {
  const joinedTournament = TOURNAMENTS.find(t => t.isJoined && t.status === 'live');
  if (!joinedTournament) return null;
  const activeMatch = joinedTournament.matches.find(m => m.status === 'live');
  if (!activeMatch) return null;

  return (
    <Link href={`/tournaments/${joinedTournament.id}`}>
      <div className="relative rounded-2xl overflow-hidden border border-red-500/30 bg-gradient-to-r from-red-950/40 via-background/60 to-primary/10 p-6 backdrop-blur-sm cursor-pointer group hover:border-red-400/50 transition-all">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(0_84%_39%_/_0.08),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(160_84%_39%_/_0.08),_transparent_60%)]" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/30">
              <Sword className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                  </span>
                  YOUR MATCH IS LIVE
                </span>
                <span className="text-xs text-muted-foreground font-mono">{joinedTournament.name}</span>
              </div>
              <h2 className="font-bold text-lg text-foreground">
                {activeMatch.player1?.name}
                <span className="mx-2 text-primary font-mono">vs</span>
                {activeMatch.player2?.name}
              </h2>
              <p className="text-sm text-muted-foreground font-mono mt-0.5">
                {activeMatch.roundName} · Problem: <span className="text-primary">{activeMatch.problem}</span>
              </p>
            </div>
          </div>
          <Button className="font-mono font-bold shrink-0 bg-red-500 hover:bg-red-400 text-white border-0 shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all">
            <Zap className="mr-2 h-4 w-4" /> Enter Match
          </Button>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
type FilterTab = 'all' | TournamentStatus;
const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all',       label: 'All' },
  { key: 'live',      label: 'Live' },
  { key: 'upcoming',  label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
];

export default function TournamentsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [search, setSearch]             = useState('');

  const filtered = TOURNAMENTS.filter(t => {
    const matchesFilter = activeFilter === 'all' || t.status === activeFilter;
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const liveCnt     = TOURNAMENTS.filter(t => t.status === 'live').length;
  const upcomingCnt = TOURNAMENTS.filter(t => t.status === 'upcoming').length;

  return (
    <div className="min-h-screen">
      {/* ── Page Header ── */}
      <div className="relative border-b border-border/40 bg-gradient-to-b from-background to-background/80 pb-8 pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,hsl(160_84%_39%_/_0.08),transparent)]" />
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-3xl font-bold font-mono tracking-tight">Tournaments</h1>
              </div>
              <p className="text-muted-foreground max-w-lg">
                Compete in structured brackets, climb the leaderboard, and claim prize pools.
              </p>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-red-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  {liveCnt} Live
                </span>
                <span className="text-muted-foreground">{upcomingCnt} Upcoming</span>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tournaments…"
                className="pl-9 bg-card/60 border-border/60 font-mono text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* My Live Match Banner */}
        <MyMatchBanner />

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium font-mono transition-all ${
                activeFilter === tab.key
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50'
              }`}
            >
              {tab.label}
              {tab.key === 'live' && liveCnt > 0 && (
                <span className="ml-1.5 rounded-full bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5">{liveCnt}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tournament Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Lock className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-mono">No tournaments found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(t => <TournamentCard key={t.id} t={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}
