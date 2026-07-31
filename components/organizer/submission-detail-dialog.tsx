'use client';

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
import { ScrollArea } from '@/components/ui/scroll-area';
import type { SubmissionQueueItem } from '@/lib/mock/organizer';

interface SubmissionDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: SubmissionQueueItem | null;
  onRejudge?: () => void;
  onAccept?: () => void;
}

export function SubmissionDetailDialog({
  open,
  onOpenChange,
  submission,
  onRejudge,
  onAccept,
}: SubmissionDetailDialogProps) {
  if (!submission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
          <DialogDescription>
            @{submission.user} — {submission.problem}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{submission.language}</Badge>
            <Badge variant="outline" className="capitalize">{submission.status}</Badge>
            {submission.verdict && (
              <Badge className={submission.verdict === 'Accepted' ? 'badge-lime' : 'badge-violet'}>
                {submission.verdict}
              </Badge>
            )}
            <span className="text-xs text-muted-foreground ml-auto">{submission.time}</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">Source Code</p>
            <ScrollArea className="h-[200px] rounded-xl bg-black/50 border border-white/10 p-3">
              <pre className="text-xs font-mono text-lime/90 whitespace-pre-wrap">{submission.code}</pre>
            </ScrollArea>
          </div>
        </div>
        <DialogFooter>
          {submission.status !== 'completed' && (
            <>
              <Button variant="outline" onClick={onRejudge}>Rejudge</Button>
              <Button onClick={onAccept}>Mark Accepted</Button>
            </>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
