'use client';

import { use } from 'react';
import { MOCK_JUDGES, MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Scale } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function JudgesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hackathon = MOCK_HACKATHONS.find((h) => h.slug === slug);
  if (!hackathon) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Judges</h1>
      <p className="text-muted-foreground mb-8">{hackathon.title}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_JUDGES.map((judge) => (
          <div key={judge.id} className="glass-card rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/20 text-primary">{judge.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{judge.name}</p>
                <p className="text-sm text-muted-foreground">{judge.title} · {judge.company}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-2"><Scale className="h-3 w-3" /> Scoring Criteria</p>
              <div className="flex flex-wrap gap-1">
                {judge.criteria.map((c) => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
