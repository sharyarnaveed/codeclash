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
import type { OrganizerHackathon } from '@/lib/mock/organizer';

interface HackathonFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hackathon?: OrganizerHackathon | null;
  onSave: (data: Partial<OrganizerHackathon>) => void;
}

export function HackathonFormDialog({ open, onOpenChange, hackathon, onSave }: HackathonFormDialogProps) {
  const isEdit = !!hackathon;
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('draft');
  const [startDate, setStartDate] = useState('');
  const [maxTeamSize, setMaxTeamSize] = useState('4');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (hackathon) {
      setTitle(hackathon.title);
      setStatus(hackathon.status);
      setStartDate(hackathon.startDate);
      setDescription('');
    } else {
      setTitle('');
      setStatus('draft');
      setStartDate('');
      setMaxTeamSize('4');
      setDescription('');
    }
  }, [hackathon, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      status: status as OrganizerHackathon['status'],
      startDate,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Hackathon' : 'Create Hackathon'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update hackathon details and settings.' : 'Set up a new hackathon event.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="hack-title">Title</Label>
            <Input
              id="hack-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Innovate 2027"
              className="bg-white/5 border-white/10 mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="hack-desc">Description</Label>
            <Textarea
              id="hack-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Theme, tracks, prizes..."
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
                  <SelectItem value="registration_open">Registration Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="hack-team-size">Max Team Size</Label>
              <Input
                id="hack-team-size"
                type="number"
                min={1}
                max={10}
                value={maxTeamSize}
                onChange={(e) => setMaxTeamSize(e.target.value)}
                className="bg-white/5 border-white/10 mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="hack-start">Start Date</Label>
            <Input
              id="hack-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white/5 border-white/10 mt-1"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-lime text-black hover:bg-lime/90">
              {isEdit ? 'Save Changes' : 'Create Hackathon'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
