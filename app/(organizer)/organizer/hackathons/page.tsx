'use client';

import { useState } from 'react';
import {
  MOCK_ORGANIZER_HACKATHONS,
  MOCK_HACKATHON_TEAMS,
  MOCK_HACKATHON_SUBMISSIONS,
} from '@/lib/mock/organizer';
import type { OrganizerHackathon } from '@/lib/mock/organizer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Users, CheckCircle } from 'lucide-react';
import { HackathonFormDialog } from '@/components/organizer/hackathon-form-dialog';
import { HackathonTeamsSheet } from '@/components/organizer/hackathon-teams-sheet';
import { HackathonReviewDialog } from '@/components/organizer/hackathon-review-dialog';
import { ConfirmDialog } from '@/components/organizer/confirm-dialog';
import { toast } from 'sonner';

export default function OrganizerHackathonsPage() {
  const [hackathons, setHackathons] = useState(MOCK_ORGANIZER_HACKATHONS);
  const [teams, setTeams] = useState(MOCK_HACKATHON_TEAMS);
  const [submissions, setSubmissions] = useState(MOCK_HACKATHON_SUBMISSIONS);

  const [formOpen, setFormOpen] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState<OrganizerHackathon | null>(null);

  const [teamsOpen, setTeamsOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState<OrganizerHackathon | null>(null);

  const [removeTeamOpen, setRemoveTeamOpen] = useState(false);
  const [teamToRemove, setTeamToRemove] = useState<string | null>(null);

  const openCreate = () => {
    setEditingHackathon(null);
    setFormOpen(true);
  };

  const openEdit = (hackathon: OrganizerHackathon) => {
    setEditingHackathon(hackathon);
    setFormOpen(true);
  };

  const openTeams = (hackathon: OrganizerHackathon) => {
    setSelectedHackathon(hackathon);
    setTeamsOpen(true);
  };

  const openReview = (hackathon: OrganizerHackathon) => {
    setSelectedHackathon(hackathon);
    setReviewOpen(true);
  };

  const handleSaveHackathon = (data: Partial<OrganizerHackathon>) => {
    if (editingHackathon) {
      setHackathons((prev) =>
        prev.map((h) => (h.id === editingHackathon.id ? { ...h, ...data } : h))
      );
      toast.success('Hackathon updated', { description: data.title });
    } else {
      const newHackathon: OrganizerHackathon = {
        id: `oh${Date.now()}`,
        title: data.title || 'Untitled Hackathon',
        status: data.status || 'draft',
        participants: 0,
        teams: 0,
        startDate: data.startDate || new Date().toISOString().slice(0, 10),
      };
      setHackathons((prev) => [...prev, newHackathon]);
      toast.success('Hackathon created', { description: newHackathon.title });
    }
  };

  const handleRemoveTeam = (teamId: string) => {
    setTeamToRemove(teamId);
    setRemoveTeamOpen(true);
  };

  const confirmRemoveTeam = () => {
    if (teamToRemove) {
      const team = teams.find((t) => t.id === teamToRemove);
      setTeams((prev) => prev.filter((t) => t.id !== teamToRemove));
      toast.success('Team removed', { description: team?.name });
    }
    setRemoveTeamOpen(false);
    setTeamToRemove(null);
  };

  const handleScore = (submissionId: string, score: number) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId ? { ...s, score, status: 'reviewed' as const } : s
      )
    );
    toast.success('Score submitted', { description: `${score}/100` });
  };

  const hackathonTeams = selectedHackathon
    ? teams.filter((t) => t.hackathonId === selectedHackathon.id)
    : [];

  const hackathonSubmissions = selectedHackathon
    ? submissions.filter((s) => s.hackathonId === selectedHackathon.id)
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-mono">Hackathon Management</h1>
        <Button className="bg-lime text-black hover:bg-lime/90" onClick={openCreate}>
          <Plus className="h-4 w-4 mr-1" /> Create Hackathon
        </Button>
      </div>

      <div className="glass-card overflow-hidden mb-8">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>Hackathon</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hackathons.map((h) => (
              <TableRow key={h.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="font-medium">{h.title}</TableCell>
                <TableCell>
                  <Badge className={h.status === 'registration_open' ? 'badge-lime' : 'badge-violet'}>
                    {h.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{h.participants.toLocaleString()}</TableCell>
                <TableCell className="font-mono">{h.teams}</TableCell>
                <TableCell className="text-muted-foreground">{h.startDate}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-7" onClick={() => openTeams(h)}>
                      <Users className="h-3 w-3 mr-1" /> Teams
                    </Button>
                    <Button size="sm" variant="outline" className="h-7" onClick={() => openReview(h)}>
                      <CheckCircle className="h-3 w-3 mr-1" /> Review
                    </Button>
                    <Button size="sm" variant="outline" className="h-7" onClick={() => openEdit(h)}>Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <HackathonFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        hackathon={editingHackathon}
        onSave={handleSaveHackathon}
      />

      <HackathonTeamsSheet
        open={teamsOpen}
        onOpenChange={setTeamsOpen}
        hackathon={selectedHackathon}
        teams={hackathonTeams}
        onRemoveTeam={handleRemoveTeam}
      />

      <HackathonReviewDialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        hackathon={selectedHackathon}
        submissions={hackathonSubmissions}
        onScore={handleScore}
      />

      <ConfirmDialog
        open={removeTeamOpen}
        onOpenChange={setRemoveTeamOpen}
        title="Remove Team"
        description="Are you sure you want to remove this team? This action cannot be undone."
        confirmLabel="Remove"
        variant="destructive"
        onConfirm={confirmRemoveTeam}
      />
    </div>
  );
}
