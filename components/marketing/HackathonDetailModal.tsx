'use client';

import Link from 'next/link';
import type { Hackathon } from '@/lib/types/hackathon';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Gift, ArrowRight, Rocket } from 'lucide-react';

const statusStyle: Record<string, string> = {
  registration_open: 'badge-lime',
  live: 'badge-lime',
  upcoming: 'badge-violet',
  past: 'bg-white/10 text-muted-foreground',
};

const statusLabel: Record<string, string> = {
  registration_open: 'Registration Open',
  live: 'Live',
  upcoming: 'Upcoming',
  past: 'Past',
};

interface HackathonDetailModalProps {
  hackathon: Hackathon | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HackathonDetailModal({ hackathon, open, onOpenChange }: HackathonDetailModalProps) {
  if (!hackathon) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-black/95 border-white/10 backdrop-blur-xl text-white p-0 overflow-hidden gap-0 max-h-[90vh] overflow-y-auto">
        <div className="h-36 bg-gradient-to-br from-lime/20 via-[#FF8C42]/10 to-primary/10 relative">
          <Rocket className="absolute bottom-4 right-6 h-10 w-10 text-white/10" />
          <span className={`absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full ${statusStyle[hackathon.status]}`}>
            {statusLabel[hackathon.status]}
          </span>
        </div>

        <div className="p-6 space-y-5">
          <DialogHeader className="text-left space-y-2">
            <DialogTitle className="text-2xl font-light tracking-tight">{hackathon.title}</DialogTitle>
            <DialogDescription className="text-white/50 text-sm">{hackathon.tagline}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Calendar, label: 'Dates', value: `${new Date(hackathon.startDate).toLocaleDateString()} – ${new Date(hackathon.endDate).toLocaleDateString()}` },
              { icon: MapPin, label: 'Location', value: hackathon.location },
              { icon: Users, label: 'Participants', value: `${hackathon.participants.toLocaleString()} · max ${hackathon.maxTeamSize}/team` },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <item.icon className="h-3.5 w-3.5 text-lime mb-1.5" />
                <p className="text-[10px] text-white/40 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-medium mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-3">Tracks</p>
            <div className="space-y-2">
              {hackathon.tracks.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{t.description}</p>
                  </div>
                  <span className="text-xs text-lime font-mono shrink-0 ml-4">{t.prize}</span>
                </div>
              ))}
            </div>
          </div>

          {hackathon.prizes.length > 0 && (
            <div>
              <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-3">Prizes</p>
              <div className="flex flex-wrap gap-2">
                {hackathon.prizes.map((p) => (
                  <span key={p.place} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm">
                    <Gift className="h-3.5 w-3.5 text-[#FF8C42]" />
                    {p.place}: <strong>{p.amount}</strong>
                  </span>
                ))}
              </div>
            </div>
          )}

          {hackathon.sponsors.length > 0 && (
            <div>
              <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Sponsors</p>
              <div className="flex flex-wrap gap-2">
                {hackathon.sponsors.map((s) => (
                  <span key={s.id} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Link href={`/hackathons/${hackathon.slug}`} className="flex-1" onClick={() => onOpenChange(false)}>
              <Button className="w-full rounded-full bg-lime text-black hover:bg-lime/90 gap-2">
                {hackathon.status === 'registration_open' ? 'Register Now' : 'View Full Page'}
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
