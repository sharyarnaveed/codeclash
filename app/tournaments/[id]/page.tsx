'use client';

import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { getTournamentById, MY_PARTICIPANT } from '@/lib/tournamentData';
import type { Match, Participant } from '@/lib/tournamentData';
import {
  Trophy, Zap, Clock, Users, ChevronLeft,
  Crown, Sword, CheckCircle2, Circle, Terminal,
  Calendar, DollarSign, Shield, Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function PlayerSlot({ player, isWinner, side }: { player: Participant | null; isWinner?: boolean; side?: 'left' | 'right' }) {
  if (!player) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20 border border-dashed border-border/40 min-w-[160px] ${side === 'right' ? 'flex-row-reverse' : ''}`}>
        <div className="h-6 w-6 rounded-full bg-muted/40 flex items-center justify-center shrink-0">
          <Circle className="h-3 w-3 text-muted-foreground/50" />
        </div>
        <span className="text-xs text-muted-foreground/50 font-mono">TBD</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all min-w-[160px]
      ${isWinner ? 'bg-primary/15 border border-primary/40' : 'bg-muted/30 border border-border/40'}
      ${side === 'right' ? 'flex-row-reverse' : ''}`}
    >
      <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold font-mono
        ${isWinner ? 'bg-primary/30 text-primary' : 'bg-muted/60 text-muted-foreground'}`}>
        {player.avatar}
      </div>
      <div className={side === 'right' ? 'text-right' : ''}>
        <p className={`text-xs font-semibold leading-none ${isWinner ? 'text-primary' : 'text-foreground'}`}>
          {player.name.split(' ')[0]} {player.name.split(' ')[1]?.[0]}.
        </p>
        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">#{player.rating}</p>
      </div>
      {isWinner && <Crown className="h-3 w-3 text-amber-400 shrink-0" />}
    </div>
  );
}

// ─── Match Card ───────────────────────────────────────────────────────────────
function MatchCard({ match, isMyMatch, onEnter }: { match: Match; isMyMatch?: boolean; onEnter?: () => void }) {
  const statusIcon =
    match.status === 'completed' ? <CheckCircle2 className="h-3 w-3 text-primary" /> :
    match.status === 'live'      ? <Zap className="h-3 w-3 text-red-400" /> :
                                   <Clock className="h-3 w-3 text-muted-foreground/60" />;

  return (
    <div className={`relative rounded-xl border p-4 backdrop-blur-sm transition-all
      ${match.status === 'live'      ? 'border-red-500/40 bg-red-950/20 shadow-lg shadow-red-500/10' :
        match.status === 'completed' ? 'border-primary/30 bg-card/60' :
                                       'border-border/40 bg-card/30'}
      ${isMyMatch ? 'ring-2 ring-primary/40' : ''}`}
    >
      {isMyMatch && (
        <div className="absolute -top-2.5 left-4">
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono bg-primary text-primary-foreground">
            YOUR MATCH
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          {statusIcon}
          <span className={`text-[10px] font-bold font-mono uppercase
            ${match.status === 'live' ? 'text-red-400' :
              match.status === 'completed' ? 'text-primary' : 'text-muted-foreground'}`}>
            {match.status}
          </span>
        </div>
        {match.scheduledAt && (
          <span className="text-[10px] text-muted-foreground font-mono">
            {new Date(match.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {/* Players */}
      <div className="space-y-1.5 mb-3">
        <PlayerSlot
          player={match.player1}
          isWinner={match.winner === match.player1?.id}
        />
        <div className="flex items-center gap-2 px-3">
          <div className="flex-1 h-px bg-border/30" />
          <span className="text-[10px] font-mono font-bold text-muted-foreground/60">VS</span>
          {match.score && (
            <span className="text-[10px] font-mono font-bold text-foreground">
              {match.score.p1} — {match.score.p2}
            </span>
          )}
          <div className="flex-1 h-px bg-border/30" />
        </div>
        <PlayerSlot
          player={match.player2}
          isWinner={match.winner === match.player2?.id}
        />
      </div>

      {/* Problem */}
      {match.problem && (
        <div className="rounded-lg bg-background/60 border border-border/40 px-3 py-2 flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-xs font-mono text-foreground/80">{match.problem}</span>
        </div>
      )}

      {/* Enter Button for live own match */}
      {isMyMatch && match.status === 'live' && (
        <Button
          size="sm"
          className="w-full mt-3 font-mono font-bold bg-red-500 hover:bg-red-400 text-white border-0 shadow-md shadow-red-500/20"
          onClick={onEnter}
        >
          <Play className="mr-2 h-3.5 w-3.5" /> Play Now
        </Button>
      )}
    </div>
  );
}

// ─── Bracket View ─────────────────────────────────────────────────────────────
function BracketView({ matches, myId }: { matches: Match[]; myId?: string }) {
  // Group by round
  const rounds = Array.from(new Set(matches.map(m => m.round))).sort();
  const grouped: Record<number, Match[]> = {};
  for (const r of rounds) grouped[r] = matches.filter(m => m.round === r);

  if (rounds.length === 0) return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Trophy className="h-12 w-12 text-muted-foreground/20 mb-3" />
      <p className="text-muted-foreground font-mono text-sm">Bracket will be revealed when the tournament starts</p>
    </div>
  );

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex items-start gap-8 min-w-max">
        {rounds.map((round, ri) => {
          const ms = grouped[round];
          const roundLabel = ms[0]?.roundName ?? `Round ${round}`;
          const isLastRound = ri === rounds.length - 1;
          return (
            <div key={round} className="flex flex-col">
              {/* Round label */}
              <div className="mb-4 text-center">
                <span className={`rounded-full px-3 py-1 text-xs font-mono font-bold
                  ${isLastRound ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-muted/50 text-muted-foreground border border-border/40'}`}>
                  {roundLabel}
                </span>
              </div>

              {/* Matches stacked with vertical centering relative to next round */}
              <div
                className="flex flex-col"
                style={{ gap: ri === 0 ? '1rem' : `${Math.pow(2, ri) * 1}rem` }}
              >
                {ms.map(m => {
                  const isMyMatch = !!(myId && (m.player1?.id === myId || m.player2?.id === myId));
                  return (
                    <MatchCard key={m.id} match={m} isMyMatch={isMyMatch} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Join Prompt ──────────────────────────────────────────────────────────────
function JoinPrompt({ isJoined, isFull, onJoin }: { isJoined: boolean; isFull: boolean; onJoin: () => void }) {
  if (isJoined) return (
    <div className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/30 px-4 py-3">
      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
      <span className="text-sm font-semibold text-primary">You are registered for this tournament</span>
    </div>
  );

  if (isFull) return (
    <div className="flex items-center gap-2 rounded-xl bg-muted/30 border border-border/40 px-4 py-3">
      <Users className="h-5 w-5 text-muted-foreground shrink-0" />
      <span className="text-sm font-semibold text-muted-foreground">Tournament is full</span>
    </div>
  );

  return (
    <Button
      onClick={onJoin}
      size="lg"
      className="font-mono font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
    >
      <Sword className="mr-2 h-5 w-5" /> Join Tournament
    </Button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TournamentDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const tournament = getTournamentById(id);
  if (!tournament) return notFound();

  const [isJoined, setIsJoined] = useState(tournament.isJoined ?? false);
  const [activeTab, setActiveTab] = useState<'bracket' | 'matches' | 'info'>('bracket');

  const isFull = tournament.participants >= tournament.maxParticipants;
  const pct    = Math.round((tournament.participants / tournament.maxParticipants) * 100);

  const statusColors: Record<string, string> = {
    live:      'text-red-400 bg-red-500/15 border-red-500/30',
    upcoming:  'text-primary bg-primary/15 border-primary/30',
    completed: 'text-muted-foreground bg-muted/30 border-border/40',
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero Banner ── */}
      <div className="relative border-b border-border/40 pb-8 pt-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(160_84%_39%_/_0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_80%_50%,hsl(270_80%_50%_/_0.04),transparent)]" />

        <div className="container mx-auto px-4">
          <Link href="/tournaments" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 font-mono">
            <ChevronLeft className="h-4 w-4" /> Tournaments
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="flex-1">
              {/* Status + name */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold font-mono border ${statusColors[tournament.status]}`}>
                  {tournament.status === 'live' && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                    </span>
                  )}
                  {tournament.status.toUpperCase()}
                </span>
                <span className="text-sm text-muted-foreground font-mono">{tournament.format}</span>
              </div>

              <h1 className="text-4xl font-bold font-mono tracking-tight mb-3">{tournament.name}</h1>
              <p className="text-muted-foreground max-w-2xl leading-relaxed">{tournament.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {tournament.tags.map(tag => (
                  <span key={tag} className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1 text-xs font-mono text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Side Info Card */}
            <div className="lg:w-80 shrink-0 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 space-y-4">
              {/* Prize */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30">
                  <DollarSign className="h-4.5 w-4.5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Prize Pool</p>
                  <p className="font-bold text-lg font-mono text-amber-400">{tournament.prizePool}</p>
                </div>
              </div>

              {/* Participants */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 border border-primary/30">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Participants</span>
                    <span className="font-mono">{tournament.participants}/{tournament.maxParticipants}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted/50">
                    <div className={`h-1.5 rounded-full ${pct >= 100 ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/40 border border-border/50">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-semibold font-mono text-sm">
                    {new Date(tournament.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {tournament.startDate !== tournament.endDate &&
                      ` – ${new Date(tournament.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                    {', '}{new Date(tournament.startDate).getFullYear()}
                  </p>
                </div>
              </div>

              {/* Difficulty */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/40 border border-border/50">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Difficulty</p>
                  <p className="font-semibold font-mono text-sm">{tournament.difficulty}</p>
                </div>
              </div>

              <div className="pt-2">
                {tournament.status === 'upcoming' && (
                  <JoinPrompt isJoined={isJoined} isFull={isFull} onJoin={() => setIsJoined(true)} />
                )}
                {tournament.status === 'live' && tournament.isJoined && (
                  <Button size="lg" className="w-full font-mono font-bold bg-red-500 hover:bg-red-400 text-white border-0 shadow-lg shadow-red-500/25">
                    <Zap className="mr-2 h-5 w-5" /> Enter Match
                  </Button>
                )}
                {tournament.status === 'live' && !tournament.isJoined && (
                  <div className="text-center text-sm text-muted-foreground font-mono">Tournament is in progress</div>
                )}
                {tournament.status === 'completed' && (
                  <div className="flex items-center gap-2 rounded-xl bg-muted/30 border border-border/40 px-4 py-3 justify-center">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono text-muted-foreground">Tournament Ended</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-0">
            {(['bracket', 'matches', 'info'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-sm font-medium font-mono capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'bracket' && (
          <BracketView matches={tournament.matches} myId={tournament.isJoined ? MY_PARTICIPANT.id : undefined} />
        )}

        {activeTab === 'matches' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tournament.matches.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground/20 mb-3" />
                <p className="text-muted-foreground font-mono text-sm">Matches will appear once the tournament begins</p>
              </div>
            ) : tournament.matches.map(m => (
              <MatchCard
                key={m.id}
                match={m}
                isMyMatch={!!(tournament.isJoined && (m.player1?.id === MY_PARTICIPANT.id || m.player2?.id === MY_PARTICIPANT.id))}
              />
            ))}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="max-w-2xl space-y-6">
            <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-4">
              <h2 className="font-bold font-mono text-lg">Tournament Rules</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Each match consists of 1–3 coding problems with a strict time limit.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Problems are revealed simultaneously for both players when the match starts.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Winner is determined by number of problems solved; tiebreaker is total time.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> No external resources — standard I/O only.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> All solutions must pass 100% of test cases to count as solved.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-4">
              <h2 className="font-bold font-mono text-lg">Prize Distribution</h2>
              <div className="space-y-2">
                {[
                  { place: '🥇 1st Place', prize: '50%' },
                  { place: '🥈 2nd Place', prize: '25%' },
                  { place: '🥉 3rd–4th',  prize: '12.5% each' },
                ].map(row => (
                  <div key={row.place} className="flex items-center justify-between rounded-lg bg-background/60 border border-border/40 px-4 py-2.5">
                    <span className="text-sm font-medium">{row.place}</span>
                    <span className="text-sm font-bold font-mono text-primary">{row.prize}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
