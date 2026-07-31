'use client';

import { useState } from 'react';
import { MOCK_ORGANIZER_CONTESTS, MOCK_SUBMISSION_QUEUE } from '@/lib/mock/organizer';
import type { OrganizerContest, SubmissionQueueItem } from '@/lib/mock/organizer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pause, Play, Snowflake } from 'lucide-react';
import { ContestFormDialog } from '@/components/organizer/contest-form-dialog';
import { ConfirmDialog } from '@/components/organizer/confirm-dialog';
import { SubmissionDetailDialog } from '@/components/organizer/submission-detail-dialog';
import { toast } from 'sonner';

type ContestAction = 'pause' | 'freeze' | 'resume' | null;

export default function OrganizerContestsPage() {
  const [contests, setContests] = useState(MOCK_ORGANIZER_CONTESTS);
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSION_QUEUE);
  const [activeTab, setActiveTab] = useState('all');

  const [formOpen, setFormOpen] = useState(false);
  const [editingContest, setEditingContest] = useState<OrganizerContest | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ContestAction>(null);
  const [actionTarget, setActionTarget] = useState<OrganizerContest | null>(null);

  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionQueueItem | null>(null);

  const openCreate = () => {
    setEditingContest(null);
    setFormOpen(true);
  };

  const openEdit = (contest: OrganizerContest) => {
    setEditingContest(contest);
    setFormOpen(true);
  };

  const openConfirm = (action: ContestAction, contest: OrganizerContest) => {
    setConfirmAction(action);
    setActionTarget(contest);
    setConfirmOpen(true);
  };

  const handleSaveContest = (data: Partial<OrganizerContest>) => {
    if (editingContest) {
      setContests((prev) =>
        prev.map((c) => (c.id === editingContest.id ? { ...c, ...data } : c))
      );
      toast.success('Contest updated', { description: data.title });
    } else {
      const newContest: OrganizerContest = {
        id: `oc${Date.now()}`,
        title: data.title || 'Untitled Contest',
        status: data.status || 'draft',
        participants: 0,
        problems: data.problems || 3,
        startTime: data.startTime || new Date().toISOString(),
      };
      setContests((prev) => [...prev, newContest]);
      toast.success('Contest created', { description: newContest.title });
    }
  };

  const handleConfirmAction = () => {
    if (!actionTarget || !confirmAction) return;
    if (confirmAction === 'pause') {
      setContests((prev) =>
        prev.map((c) => (c.id === actionTarget.id ? { ...c, status: 'scheduled' as const } : c))
      );
      toast.success('Contest paused', { description: actionTarget.title });
    } else if (confirmAction === 'freeze') {
      toast.success('Scoreboard frozen', { description: actionTarget.title });
    } else if (confirmAction === 'resume') {
      setContests((prev) =>
        prev.map((c) => (c.id === actionTarget.id ? { ...c, status: 'live' as const } : c))
      );
      toast.success('Contest resumed', { description: actionTarget.title });
    }
    setConfirmOpen(false);
    setConfirmAction(null);
    setActionTarget(null);
  };

  const confirmConfig = {
    pause: { title: 'Pause Contest', description: `Pause "${actionTarget?.title}"? Participants won't be able to submit until resumed.`, confirmLabel: 'Pause' },
    freeze: { title: 'Freeze Scoreboard', description: `Freeze the scoreboard for "${actionTarget?.title}"? Rankings will be hidden from participants.`, confirmLabel: 'Freeze' },
    resume: { title: 'Resume Contest', description: `Resume "${actionTarget?.title}" and allow submissions again?`, confirmLabel: 'Resume' },
  };

  const renderContestTable = (items: OrganizerContest[]) => (
    <div className="glass-card overflow-hidden mb-8">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead>Contest</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Problems</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                No contests in this category.
              </TableCell>
            </TableRow>
          ) : (
            items.map((c) => (
              <TableRow key={c.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="font-medium">{c.title}</TableCell>
                <TableCell>
                  <Badge className={c.status === 'live' ? 'badge-lime' : 'badge-violet'}>{c.status}</Badge>
                </TableCell>
                <TableCell className="font-mono">{c.participants.toLocaleString()}</TableCell>
                <TableCell className="font-mono">{c.problems}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(c.startTime).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {c.status === 'live' && (
                      <>
                        <Button size="sm" variant="outline" className="h-7" title="Pause" onClick={() => openConfirm('pause', c)}>
                          <Pause className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-7" title="Freeze scoreboard" onClick={() => openConfirm('freeze', c)}>
                          <Snowflake className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    {c.status === 'scheduled' && (
                      <Button size="sm" variant="outline" className="h-7" title="Resume" onClick={() => openConfirm('resume', c)}>
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="h-7" onClick={() => openEdit(c)}>Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-mono">Contest Management</h1>
        <Button onClick={openCreate}><Plus className="h-4 w-4 mr-1" /> Create Contest</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>

        {(['all', 'live', 'scheduled', 'draft'] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            {renderContestTable(tab === 'all' ? contests : contests.filter((c) => c.status === tab))}
          </TabsContent>
        ))}
      </Tabs>

      <h2 className="text-lg font-semibold mb-4">Submission Queue</h2>
      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>User</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((s) => (
              <TableRow
                key={s.id}
                className="border-white/10 hover:bg-white/5 cursor-pointer"
                onClick={() => { setSelectedSubmission(s); setSubmissionOpen(true); }}
              >
                <TableCell className="font-mono">@{s.user}</TableCell>
                <TableCell>{s.problem}</TableCell>
                <TableCell>{s.language}</TableCell>
                <TableCell className="text-muted-foreground">{s.time}</TableCell>
                <TableCell><Badge variant="outline" className="capitalize">{s.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ContestFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        contest={editingContest}
        onSave={handleSaveContest}
      />

      {confirmAction && actionTarget && (
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title={confirmConfig[confirmAction].title}
          description={confirmConfig[confirmAction].description}
          confirmLabel={confirmConfig[confirmAction].confirmLabel}
          onConfirm={handleConfirmAction}
        />
      )}

      <SubmissionDetailDialog
        open={submissionOpen}
        onOpenChange={setSubmissionOpen}
        submission={selectedSubmission}
        onRejudge={() => {
          toast.info('Rejudging submission...');
          setSubmissionOpen(false);
        }}
        onAccept={() => {
          if (selectedSubmission) {
            setSubmissions((prev) =>
              prev.map((s) =>
                s.id === selectedSubmission.id
                  ? { ...s, status: 'completed' as const, verdict: 'Accepted' }
                  : s
              )
            );
            toast.success('Submission marked as Accepted');
          }
          setSubmissionOpen(false);
        }}
      />
    </div>
  );
}
