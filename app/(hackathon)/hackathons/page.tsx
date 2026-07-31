'use client';

import { useMemo, useState } from 'react';
import { MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import type { Hackathon, HackathonStatus } from '@/lib/types/hackathon';
import { Input } from '@/components/ui/input';
import { ScrollReveal } from '@/components/shared/motion';
import { HackathonDetailModal } from '@/components/marketing/HackathonDetailModal';
import { Calendar, MapPin, Users, Search, Rocket, Gift, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusFilter = HackathonStatus | 'registration_open' | 'all';

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'registration_open', label: 'Open' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
];

const statusBadge: Record<string, string> = {
  registration_open: 'badge-lime',
  live: 'badge-lime',
  upcoming: 'badge-violet',
  past: 'bg-white/10 text-white/50',
};

const statusLabel: Record<string, string> = {
  registration_open: 'Open',
  live: 'Live',
  upcoming: 'Upcoming',
  past: 'Past',
};

function HackathonCard({ hackathon, onClick }: { hackathon: Hackathon; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-lime/30 hover:shadow-[0_0_40px_rgba(190,242,100,0.08)] hover:-translate-y-1"
    >
      <div className="h-36 bg-gradient-to-br from-[#FF8C42]/25 via-purple-900/15 to-lime/10 relative">
        <Rocket className="absolute bottom-3 right-4 h-7 w-7 text-white/15 group-hover:text-white/25 transition-colors" />
        {hackathon.prizes[0] && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70">
            <Gift className="h-3 w-3 text-[#FF8C42]" />
            {hackathon.prizes[0].amount}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${statusBadge[hackathon.status]}`}>
            {statusLabel[hackathon.status]}
          </span>
        </div>
        <h3 className="text-lg font-medium text-white group-hover:text-lime transition-colors mb-1">{hackathon.title}</h3>
        <p className="text-sm text-white/40 line-clamp-2 mb-4">{hackathon.tagline}</p>
        <div className="flex flex-wrap gap-3 text-xs text-white/40 mb-3">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(hackathon.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{hackathon.location}</span>
          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{hackathon.participants.toLocaleString()}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {hackathon.tracks.slice(0, 2).map((t) => (
            <span key={t.id} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40">
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function HackathonsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [selected, setSelected] = useState<Hackathon | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_HACKATHONS.filter((h) => {
      const matchesSearch =
        !search ||
        h.title.toLowerCase().includes(search.toLowerCase()) ||
        h.tagline.toLowerCase().includes(search.toLowerCase()) ||
        h.tracks.some((t) => t.name.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = status === 'all' || h.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const openCount = MOCK_HACKATHONS.filter((h) => h.status === 'registration_open').length;

  const openModal = (hackathon: Hackathon) => {
    setSelected(hackathon);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-lime uppercase tracking-widest">Hackathons</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mt-3 mb-4">Build & Innovate</h1>
          <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
            Discover hackathons worldwide. Click any card to explore tracks, prizes, and details.
          </p>
          {openCount > 0 && (
            <div className="inline-flex items-center gap-2 mt-5 rounded-full border border-lime/20 bg-lime/5 px-4 py-1.5">
              <Rocket className="h-3.5 w-3.5 text-lime" />
              <span className="text-xs text-lime">{openCount} hackathon{openCount !== 1 ? 's' : ''} open for registration</span>
            </div>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              placeholder="Search hackathons, tracks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-12 rounded-full bg-white/[0.04] border-white/10 backdrop-blur-xl text-white placeholder:text-white/30 focus:border-lime/40"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setStatus(f.value)}
                className={cn(
                  'rounded-full px-5 py-2.5 text-sm whitespace-nowrap transition-all border',
                  status === f.value
                    ? 'bg-lime text-black border-lime font-medium'
                    : 'bg-white/[0.04] text-white/60 border-white/10 hover:border-white/20 hover:text-white'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <p className="text-xs text-white/30 font-mono mb-6">
        {filtered.length} hackathon{filtered.length !== 1 ? 's' : ''} found
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <Trophy className="h-10 w-10 text-white/20 mx-auto mb-4" />
          <p className="text-white/40">No hackathons match your search.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((h, i) => (
            <ScrollReveal key={h.id} delay={i * 0.05}>
              <HackathonCard hackathon={h} onClick={() => openModal(h)} />
            </ScrollReveal>
          ))}
        </div>
      )}

      <HackathonDetailModal
        hackathon={selected}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
