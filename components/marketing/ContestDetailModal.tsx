'use client';

import Link from 'next/link';
import type { Contest } from '@/lib/types/contest';
import {
  Dialog, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { DetailModalBody, DetailModalContent, DetailModalInner } from '@/components/marketing/detail-modal-content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Code2, Calendar, ArrowRight } from 'lucide-react';

const statusColors = {
  live: 'badge-lime',
  upcoming: 'badge-violet',
  past: 'bg-muted text-muted-foreground',
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
      <DetailModalContent>
        <div className="relative h-28 shrink-0 bg-gradient-to-br from-[#67BAF4]/20 via-primary/10 to-transparent sm:h-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(var(--hero-accent-rgb),0.15),transparent_60%)]" />
          {contest.status === 'live' && (
            <span className="absolute top-4 left-4 badge-lime text-xs px-2.5 py-1 rounded-full animate-pulse">
              LIVE NOW
            </span>
          )}
        </div>

        <DetailModalBody>
          <DetailModalInner>
            <DialogHeader className="text-left space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[contest.status]}`}>
                  {contest.status.toUpperCase()}
                </span>
                {contest.frozen && <Badge variant="outline">Frozen</Badge>}
              </div>
              <DialogTitle className="text-2xl font-light tracking-tight">{contest.title}</DialogTitle>
              <DialogDescription className="landing-subtext text-sm leading-relaxed">
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
                <div key={item.label} className="glass-card p-3">
                  <item.icon className="h-3.5 w-3.5 text-primary mb-1.5" />
                  <p className="text-[10px] landing-muted uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-medium mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-mono landing-muted uppercase tracking-wider mb-3">Problems</p>
              <div className="space-y-2">
                {contest.problems.map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between glass-card px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono landing-muted text-sm">{String.fromCharCode(65 + i)}</span>
                      <span className="text-sm font-medium">{p.title}</span>
                    </div>
                    <Badge variant="outline" className={
                      p.difficulty === 'Easy' ? 'border-primary/30 text-primary' :
                      p.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-600 dark:text-yellow-500' :
                      'border-red-500/30 text-red-500'
                    }>{p.difficulty}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link href={`/contests/${contest.slug}`} className="flex-1" onClick={() => onOpenChange(false)}>
                <Button className="btn-brand w-full rounded-full border-0 gap-2">
                  {contest.status === 'live' ? 'Enter Contest' : contest.status === 'upcoming' ? 'View Full Page' : 'View Results'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" className="btn-brand-outline rounded-full" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </DetailModalInner>
        </DetailModalBody>
      </DetailModalContent>
    </Dialog>
  );
}
