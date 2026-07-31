'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { OrganizerContest } from '@/lib/mock/organizer';

interface ContestFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contest?: OrganizerContest | null;
  onSave: (data: Partial<OrganizerContest>) => void;
}

export function ContestFormDialog({ open, onOpenChange, contest, onSave }: ContestFormDialogProps) {
  const isEdit = !!contest;
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('draft');
  const [problems, setProblems] = useState('3');
  const [startTime, setStartTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (contest) {
      setTitle(contest.title);
      setStatus(contest.status);
      setProblems(String(contest.problems));
      setStartTime(contest.startTime.slice(0, 16));
      setDescription('');
    } else {
      setTitle('');
      setStatus('draft');
      setProblems('3');
      setStartTime('');
      setDescription('');
    }
  }, [contest, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      status: status as OrganizerContest['status'],
      problems: parseInt(problems, 10) || 0,
      startTime: startTime ? new Date(startTime).toISOString() : new Date().toISOString(),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Contest' : 'Create Contest'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update contest details and settings.' : 'Set up a new competitive programming contest.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="contest-title">Title</Label>
            <Input
              id="contest-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Weekly Challenge #143"
              className="bg-white/5 border-white/10 mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="contest-desc">Description</Label>
            <Textarea
              id="contest-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contest rules, prizes, etc."
              className="bg-white/5 border-white/10 mt-1"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-white/5 border-white/10 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contest-problems">Problems</Label>
              <Input
                id="contest-problems"
                type="number"
                min={1}
                max={20}
                value={problems}
                onChange={(e) => setProblems(e.target.value)}
                className="bg-white/5 border-white/10 mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="contest-start">Start Time</Label>
            <Input
              id="contest-start"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-white/5 border-white/10 mt-1"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{isEdit ? 'Save Changes' : 'Create Contest'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
