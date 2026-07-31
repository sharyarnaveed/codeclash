'use client';

import { use } from 'react';
import { MOCK_PROJECTS, MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function WinnersPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hackathon = MOCK_HACKATHONS.find((h) => h.slug === slug);
  if (!hackathon) notFound();

  const winners = MOCK_PROJECTS.filter((p) => p.status === 'winner' || p.score);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Winners — {hackathon.title}</h1>

      <div className="flex justify-center items-end gap-4 mb-12">
        {[1, 0, 2].map((idx) => {
          const p = winners[idx];
          if (!p) return null;
          const heights = ['h-32', 'h-44', 'h-24'];
          const labels = ['2nd', '1st', '3rd'];
          return (
            <div key={p.id} className="text-center">
              <div className={`${heights[idx]} w-36 glass-card rounded-t-3xl flex flex-col items-center justify-end pb-4 ${idx === 0 ? 'border-lime/30 glow-lime' : ''}`}>
                <Trophy className={`h-6 w-6 mb-2 ${idx === 0 ? 'text-lime' : 'text-muted-foreground'}`} />
                <p className="font-semibold text-sm">{p.title}</p>
                <Badge variant="outline" className="mt-1 text-xs">{labels[idx]}</Badge>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {winners.map((p) => (
          <div key={p.id} className="glass-card rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </div>
            {p.score && <span className="font-mono text-lime font-bold">{p.score}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
