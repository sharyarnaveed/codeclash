'use client';

import { use } from 'react';
import Link from 'next/link';
import { MOCK_CONTESTS, MOCK_LEADERBOARD } from '@/lib/mock/contests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Users, ArrowUp, ArrowDown } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function ContestDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const contest = MOCK_CONTESTS.find((c) => c.slug === slug);
  if (!contest) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold font-mono">{contest.title}</h1>
            <Badge className={contest.status === 'live' ? 'badge-lime' : 'badge-violet'}>
              {contest.status.toUpperCase()}
            </Badge>
            {contest.frozen && <Badge variant="outline">Frozen</Badge>}
          </div>
          <p className="text-muted-foreground mb-4">{contest.description}</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {contest.duration} min</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {contest.participants.toLocaleString()} participants</span>
          </div>
        </div>
        {contest.status === 'live' && (
          <Link href={`/contests/${slug}/problems/two-sum`}>
            <Button size="lg" className="glow-violet">Enter Contest</Button>
          </Link>
        )}
      </div>

      <Tabs defaultValue="problems">
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="standings">Standings</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="problems">
          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Problem</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Solved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contest.problems.map((p, i) => (
                  <TableRow key={p.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-mono text-muted-foreground">{String.fromCharCode(65 + i)}</TableCell>
                    <TableCell>
                      <Link href={`/contests/${slug}/problems/${p.slug}`} className="hover:text-primary transition-colors font-medium">
                        {p.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        p.difficulty === 'Easy' ? 'border-lime/30 text-lime' :
                        p.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-500' :
                        'border-red-500/30 text-red-500'
                      }>{p.difficulty}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{p.points}</TableCell>
                    <TableCell className="font-mono text-muted-foreground">{p.solvedBy.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="standings">
          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Solved</TableHead>
                  <TableHead>Penalty</TableHead>
                  <TableHead>Rating Δ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_LEADERBOARD.map((entry) => (
                  <TableRow key={entry.username} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-mono">
                      <span className="flex items-center gap-1">
                        #{entry.rank}
                        {entry.previousRank && entry.previousRank > entry.rank && <ArrowUp className="h-3 w-3 text-lime" />}
                        {entry.previousRank && entry.previousRank < entry.rank && <ArrowDown className="h-3 w-3 text-red-500" />}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link href={`/profile/${entry.username}`} className="hover:text-primary">{entry.name}</Link>
                    </TableCell>
                    <TableCell className="font-mono text-lime">{entry.solved}</TableCell>
                    <TableCell className="font-mono">{entry.penalty}</TableCell>
                    <TableCell className={`font-mono ${(entry.ratingChange ?? 0) >= 0 ? 'text-lime' : 'text-red-500'}`}>
                      {(entry.ratingChange ?? 0) >= 0 ? '+' : ''}{entry.ratingChange}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="announcements">
          <div className="glass-card p-6">
            <p className="text-muted-foreground text-sm">No announcements yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
