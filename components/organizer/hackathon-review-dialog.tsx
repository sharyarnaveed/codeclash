'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink } from 'lucide-react';
import type { HackathonSubmission, OrganizerHackathon } from '@/lib/mock/organizer';

interface HackathonReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hackathon: OrganizerHackathon | null;
  submissions: HackathonSubmission[];
  onScore?: (submissionId: string, score: number) => void;
}

export function HackathonReviewDialog({
  open,
  onOpenChange,
  hackathon,
  submissions,
  onScore,
}: HackathonReviewDialogProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState('');

  const selected = submissions.find((s) => s.id === selectedId);

  const handleScore = () => {
    if (selectedId && score) {
      onScore?.(selectedId, parseInt(score, 10));
      setScore('');
      setSelectedId(null);
    }
  };

  if (!hackathon) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Review Submissions</DialogTitle>
          <DialogDescription>{hackathon.title} — {submissions.length} submission(s)</DialogDescription>
        </DialogHeader>

        {selected ? (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedId(null)}>← Back to list</Button>
            <div>
              <p className="font-medium">{selected.team}</p>
              <p className="text-sm text-muted-foreground">{selected.project}</p>
            </div>
            <div className="space-y-2 text-sm">
              <a href={`https://${selected.repo}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                <ExternalLink className="h-3 w-3" /> {selected.repo}
              </a>
              <a href={selected.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                <ExternalLink className="h-3 w-3" /> Demo Link
              </a>
            </div>
            {selected.score !== null ? (
              <Badge className="badge-lime">Score: {selected.score}/100</Badge>
            ) : (
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Label htmlFor="review-score">Score (0–100)</Label>
                  <Input
                    id="review-score"
                    type="number"
                    min={0}
                    max={100}
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="bg-white/5 border-white/10 mt-1"
                  />
                </div>
                <Button onClick={handleScore} disabled={!score}>Submit Score</Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {submissions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No submissions to review.</p>
            ) : (
              submissions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedId(s.id)}
                  className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{s.team}</p>
                      <p className="text-xs text-muted-foreground">{s.project}</p>
                    </div>
                    <Badge variant="outline" className="capitalize text-xs">
                      {s.status.replace('_', ' ')}
                      {s.score !== null && ` · ${s.score}`}
                    </Badge>
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
