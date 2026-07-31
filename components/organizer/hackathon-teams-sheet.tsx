'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, ExternalLink } from 'lucide-react';
import type { HackathonTeam, OrganizerHackathon } from '@/lib/mock/organizer';

interface HackathonTeamsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hackathon: OrganizerHackathon | null;
  teams: HackathonTeam[];
  onRemoveTeam?: (teamId: string) => void;
}

export function HackathonTeamsSheet({
  open,
  onOpenChange,
  hackathon,
  teams,
  onRemoveTeam,
}: HackathonTeamsSheetProps) {
  if (!hackathon) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="glass-card border-white/10 sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Teams — {hackathon.title}
          </SheetTitle>
          <SheetDescription>
            {teams.length} team{teams.length !== 1 ? 's' : ''} registered
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-3">
          {teams.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No teams yet.</p>
          ) : (
            teams.map((team) => (
              <div key={team.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{team.name}</p>
                  <Badge variant="outline" className="capitalize text-xs">
                    {team.status.replace('_', ' ')}
                  </Badge>
                </div>
                {team.project && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> {team.project}
                  </p>
                )}
                <div className="flex flex-wrap gap-1">
                  {team.members.map((m) => (
                    <Badge key={m} variant="secondary" className="text-xs font-mono">@{m}</Badge>
                  ))}
                </div>
                {onRemoveTeam && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-destructive hover:text-destructive"
                    onClick={() => onRemoveTeam(team.id)}
                  >
                    Remove Team
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
