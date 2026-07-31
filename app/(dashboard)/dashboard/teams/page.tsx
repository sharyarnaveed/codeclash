'use client';

import Link from 'next/link';
import { MOCK_TEAMS } from '@/lib/mock/hackathons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus } from 'lucide-react';

export default function TeamsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-mono">Teams</h1>
        <Link href="/hackathons/innovate-2026/teams/create">
          <Button size="sm"><Plus className="h-3 w-3 mr-1" /> Create Team</Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {MOCK_TEAMS.map((team) => (
          <Link key={team.id} href={`/hackathons/innovate-2026/teams/${team.id}`}>
            <div className="glass-card p-5 hover:border-white/15 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-lime" />
                  <span className="font-semibold">{team.name}</span>
                </div>
                <Badge className={team.status === 'approved' ? 'badge-lime' : 'badge-violet'}>{team.status}</Badge>
              </div>
              <div className="flex -space-x-2">
                {team.members.map((m) => (
                  <Avatar key={m.id} className="h-7 w-7 border-2 border-black">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">{m.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">{team.members.length} members · Code: {team.inviteCode}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
