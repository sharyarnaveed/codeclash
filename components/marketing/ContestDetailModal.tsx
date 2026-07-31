'use client';

import Link from 'next/link';
import type { Contest } from '@/lib/types/contest';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Code2, Calendar, ArrowRight } from 'lucide-react';

const statusColors = {
  live: 'badge-lime',
  upcoming: 'badge-violet',
  past: 'bg-white/10 text-muted-foreground',
};

interface ContestDetailModalProps {
  contest: Contest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export function ContestDetailModal({ contest, open, onOpenChange }: ContestDetailModalProps) {
  if (!contest) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-black/95 border-white/10 backdrop-blur-xl text-white p-0 overflow-hidden gap-0">
        <div className="h-32 bg-gradient-to-br from-[#FF8C42]/20 via-primary/10 to-transparent relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,140,66,0.15),transparent_60%)]" />
          {contest.status === 'live' && (
            <span className="absolute top-4 left-4 badge-lime text-xs px-2.5 py-1 rounded-full animate-pulse">
              LIVE NOW
            </span>
          )}
        </div>

        <div className="p-6 space-y-5">
          <DialogHeader className="text-left space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[contest.status]}`}>
                {contest.status.toUpperCase()}
              </span>
              {contest.frozen && <Badge variant="outline" className="border-white/20">Frozen</Badge>}
            </div>
            <DialogTitle className="text-2xl font-light tracking-tight">{contest.title}</DialogTitle>
            <DialogDescription className="text-white/50 text-sm leading-relaxed">
              {contest.description}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Clock, label: 'Duration', value: `${contest.duration} min` },
              { icon: Users, label: 'Participants', value: contest.participants.toLocaleString() },
              { icon: Code2, label: 'Problems', value: String(contest.problems.length) },
              { icon: Calendar, label: 'Starts', value: formatDate(contest.startTime) },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <item.icon className="h-3.5 w-3.5 text-[#FF8C42] mb-1.5" />
                <p className="text-[10px] text-white/40 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-medium mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-3">Problems</p>
            <div className="space-y-2">
              {contest.problems.map((p, i) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-white/30 text-sm">{String.fromCharCode(65 + i)}</span>
                    <span className="text-sm font-medium">{p.title}</span>
                  </div>
                  <Badge variant="outline" className={
                    p.difficulty === 'Easy' ? 'border-lime/30 text-lime' :
                    p.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-500' :
                    'border-red-500/30 text-red-500'
                  }>{p.difficulty}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link href={`/contests/${contest.slug}`} className="flex-1" onClick={() => onOpenChange(false)}>
              <Button className="w-full rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FFB088] text-black hover:opacity-90 border-0 gap-2">
                {contest.status === 'live' ? 'Enter Contest' : contest.status === 'upcoming' ? 'View Full Page' : 'View Results'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="rounded-full border-white/20" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
