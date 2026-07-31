'use client';

import { use } from 'react';
import { useState } from 'react';
import { MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Users } from 'lucide-react';
import { notFound } from 'next/navigation';
import { toast } from 'sonner';

export default function CreateTeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hackathon = MOCK_HACKATHONS.find((h) => h.slug === slug);
  const [teamName, setTeamName] = useState('');
  const [created, setCreated] = useState(false);
  const inviteCode = 'CC2026-X7K9';
  if (!hackathon) notFound();

  const handleCreate = () => {
    if (!teamName.trim()) return;
    setCreated(true);
    toast.success('Team created!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-2">Create Team</h1>
      <p className="text-muted-foreground mb-8">{hackathon.title} · Max {hackathon.maxTeamSize} members</p>

      {!created ? (
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div>
            <Label htmlFor="teamName">Team Name</Label>
            <Input id="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="bg-white/5 border-white/10 mt-1" placeholder="Code Crushers" />
          </div>
          <Button onClick={handleCreate} className="w-full bg-lime text-black hover:bg-lime/90">Create Team</Button>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-lime" />
            <div>
              <p className="font-semibold">{teamName}</p>
              <p className="text-sm text-muted-foreground">Team created successfully</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Invite Code</p>
              <p className="font-mono font-bold">{inviteCode}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(inviteCode); toast.success('Copied!'); }}>
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Share this code with teammates. 1/{hackathon.maxTeamSize} members.</p>
        </div>
      )}
    </div>
  );
}
