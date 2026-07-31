'use client';

import Link from 'next/link';
import type { Hackathon } from '@/lib/types/hackathon';
import {
  Dialog, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { DetailModalBody, DetailModalContent, DetailModalInner } from '@/components/marketing/detail-modal-content';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Gift, ArrowRight, Rocket } from 'lucide-react';

const statusStyle: Record<string, string> = {
  registration_open: 'badge-lime',
  live: 'badge-lime',
  upcoming: 'badge-violet',
  past: 'bg-muted text-muted-foreground',
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
      <DetailModalContent>
        <div className="relative h-28 shrink-0 bg-gradient-to-br from-primary/20 via-[#67BAF4]/10 to-[#1E466B]/10 sm:h-36">
          <Rocket className="absolute bottom-4 right-6 h-10 w-10 text-foreground/10" />
          <span className={`absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full ${statusStyle[hackathon.status]}`}>
            {statusLabel[hackathon.status]}
          </span>
        </div>

        <DetailModalBody>
          <DetailModalInner>
            <DialogHeader className="text-left space-y-2">
              <DialogTitle className="text-2xl font-light tracking-tight">{hackathon.title}</DialogTitle>
              <DialogDescription className="landing-subtext text-sm">{hackathon.tagline}</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Calendar, label: 'Dates', value: `${new Date(hackathon.startDate).toLocaleDateString()} – ${new Date(hackathon.endDate).toLocaleDateString()}` },
                { icon: MapPin, label: 'Location', value: hackathon.location },
                { icon: Users, label: 'Participants', value: `${hackathon.participants.toLocaleString()} · max ${hackathon.maxTeamSize}/team` },
              ].map((item) => (
                <div key={item.label} className="glass-card p-3">
                  <item.icon className="h-3.5 w-3.5 text-primary mb-1.5" />
                  <p className="text-[10px] landing-muted uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-medium mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-mono landing-muted uppercase tracking-wider mb-3">Tracks</p>
              <div className="space-y-2">
                {hackathon.tracks.map((t) => (
                  <div key={t.id} className="flex items-center justify-between glass-card px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs landing-muted mt-0.5">{t.description}</p>
                    </div>
                    <span className="text-xs text-primary font-mono shrink-0 ml-4">{t.prize}</span>
                  </div>
                ))}
              </div>
            </div>

            {hackathon.prizes.length > 0 && (
              <div>
                <p className="text-xs font-mono landing-muted uppercase tracking-wider mb-3">Prizes</p>
                <div className="flex flex-wrap gap-2">
                  {hackathon.prizes.map((p) => (
                    <span key={p.place} className="inline-flex items-center gap-1.5 rounded-full glass-card px-3 py-1.5 text-sm">
                      <Gift className="h-3.5 w-3.5 text-primary" />
                      {p.place}: <strong>{p.amount}</strong>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hackathon.sponsors.length > 0 && (
              <div>
                <p className="text-xs font-mono landing-muted uppercase tracking-wider mb-2">Sponsors</p>
                <div className="flex flex-wrap gap-2">
                  {hackathon.sponsors.map((s) => (
                    <span key={s.id} className="text-xs px-3 py-1 rounded-full bg-[var(--hero-glass-bg)] border landing-border landing-muted">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Link href={`/hackathons/${hackathon.slug}`} className="flex-1" onClick={() => onOpenChange(false)}>
                <Button className="btn-brand w-full rounded-full border-0 gap-2">
                  {hackathon.status === 'registration_open' ? 'Register Now' : 'View Full Page'}
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
