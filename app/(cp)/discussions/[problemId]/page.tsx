'use client';

import { MOCK_DISCUSSIONS } from '@/lib/mock/contests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/motion';

export default function DiscussionsPage({ params }: { params: Promise<{ problemId: string }> }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <ScrollReveal>
        <h1 className="text-2xl font-bold font-mono mb-6">Discussions</h1>
      </ScrollReveal>

      <div className="glass-card p-4 mb-6">
        <Textarea placeholder="Start a new discussion..." className="bg-transparent border-white/10 mb-3" />
        <Button size="sm">Post</Button>
      </div>

      <div className="space-y-4">
        {MOCK_DISCUSSIONS.map((thread) => (
          <ScrollReveal key={thread.id}>
            <div className="glass-card p-5">
              <h3 className="font-medium mb-1">{thread.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">by @{thread.author} · {new Date(thread.createdAt).toLocaleDateString()}</p>
              <p className="text-sm mb-4">{thread.content}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {thread.votes}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {thread.replies} replies</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
