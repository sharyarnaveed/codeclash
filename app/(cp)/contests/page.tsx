'use client';

import { useMemo, useState } from 'react';
import { MOCK_CONTESTS } from '@/lib/mock/contests';
import type { Contest, ContestStatus } from '@/lib/types/contest';
import { Input } from '@/components/ui/input';
import { ScrollReveal } from '@/components/shared/motion';
import { ContestDetailModal } from '@/components/marketing/ContestDetailModal';
import { Clock, Users, Code2, Search, Zap, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusFilters: { value: ContestStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'live', label: 'Live' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
];

const statusBadge: Record<ContestStatus, string> = {
  live: 'badge-lime',
  upcoming: 'badge-violet',
  past: 'bg-muted text-muted-foreground',
};

function ContestCard({ contest, onClick }: { contest: Contest; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left glass-card-hover p-5 rounded-2xl hover:shadow-[0_0_40px_rgba(var(--hero-accent-rgb),0.08)]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${statusBadge[contest.status]}`}>
          {contest.status === 'live' ? '● Live' : contest.status}
        </span>
        <span className="text-[10px] landing-muted font-mono">{contest.duration}m</span>
      </div>
      <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors mb-1.5">
        {contest.title}
      </h3>
      <p className="text-sm landing-muted line-clamp-2 mb-4 leading-relaxed">{contest.description}</p>
      <div className="flex items-center gap-4 text-xs landing-muted">
        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{contest.participants.toLocaleString()}</span>
        <span className="flex items-center gap-1"><Code2 className="h-3 w-3" />{contest.problems.length} problems</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(contest.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
    </button>
  );
}

export default function ContestsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ContestStatus | 'all'>('all');
  const [selected, setSelected] = useState<Contest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_CONTESTS.filter((c) => {
      const matchesSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'all' || c.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const liveCount = MOCK_CONTESTS.filter((c) => c.status === 'live').length;

  const openModal = (contest: Contest) => {
    setSelected(contest);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="browse-page-hero-label">Competitive Programming</span>
          <h1 className="browse-page-title">Contests</h1>
          <p className="landing-subtext max-w-lg mx-auto text-sm md:text-base">
            Browse live and upcoming programming contests. Click any card for details.
          </p>
          {liveCount > 0 && (
            <div className="inline-flex items-center gap-2 mt-5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-primary">{liveCount} contest live right now</span>
            </div>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 landing-muted" />
            <Input
              placeholder="Search contests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="browse-input pl-11"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setStatus(f.value)}
                className={cn('filter-chip', status === f.value && 'filter-chip-active')}
              >
                {f.label}
                {f.value !== 'all' && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    ({MOCK_CONTESTS.filter((c) => c.status === f.value).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <p className="text-xs landing-muted font-mono mb-6">
        {filtered.length} contest{filtered.length !== 1 ? 's' : ''} found
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <Trophy className="h-10 w-10 landing-muted mx-auto mb-4 opacity-50" />
          <p className="landing-muted">No contests match your search.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((contest, i) => (
            <ScrollReveal key={contest.id} delay={i * 0.05}>
              <ContestCard contest={contest} onClick={() => openModal(contest)} />
            </ScrollReveal>
          ))}
        </div>
      )}

      <ContestDetailModal
        contest={selected}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
