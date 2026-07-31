'use client';

import { use } from 'react';
import Link from 'next/link';
import { MOCK_SUBMISSIONS } from '@/lib/mock/contests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function SubmissionResultPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = use(params);
  const submission = MOCK_SUBMISSIONS.find((s) => s.id === id);
  if (!submission) notFound();

  const isAC = submission.verdict === 'AC';

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link href={`/contests/${slug}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to contest
      </Link>

      <div className={`glass-card p-8 text-center ${isAC ? 'border-lime/30 glow-lime' : 'border-red-500/30'}`}>
        {isAC ? <CheckCircle className="h-16 w-16 text-lime mx-auto mb-4" /> : <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />}
        <h1 className={`text-3xl font-bold font-mono mb-2 ${isAC ? 'text-lime' : 'text-red-500'}`}>{submission.verdict}</h1>
        <p className="text-muted-foreground mb-6">{submission.problemTitle} · {submission.language}</p>

        {isAC && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-xs text-muted-foreground">Runtime</p>
              <p className="text-xl font-mono font-bold">{submission.runtime}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-xs text-muted-foreground">Memory</p>
              <p className="text-xl font-mono font-bold">{submission.memory}</p>
            </div>
          </div>
        )}

        {submission.testCases && (
          <div className="text-left space-y-2 mb-6">
            <p className="text-sm font-medium mb-2">Test Cases</p>
            {submission.testCases.map((tc) => (
              <div key={tc.id} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2 text-sm">
                <span>Test #{tc.id}</span>
                <Badge className={tc.status === 'AC' ? 'badge-lime' : 'bg-red-500/20 text-red-500'}>{tc.status}</Badge>
                <span className="font-mono text-muted-foreground">{tc.time}</span>
              </div>
            ))}
          </div>
        )}

        <Link href={`/contests/${slug}/problems/two-sum`}>
          <Button variant="outline">Try Again</Button>
        </Link>
      </div>
    </div>
  );
}
