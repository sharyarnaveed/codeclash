'use client';

import { MOCK_SUBMISSIONS } from '@/lib/mock/contests';
import { MOCK_PROJECTS } from '@/lib/mock/hackathons';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SubmissionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-mono mb-6">Submissions</h1>
      <Tabs defaultValue="contests">
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger value="contests">Contest Submissions</TabsTrigger>
          <TabsTrigger value="hackathons">Hackathon Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="contests">
          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Problem</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Verdict</TableHead>
                  <TableHead>Runtime</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_SUBMISSIONS.map((s) => (
                  <TableRow key={s.id} className="border-white/10 hover:bg-white/5">
                    <TableCell>{s.problemTitle}</TableCell>
                    <TableCell className="font-mono text-sm">{s.language}</TableCell>
                    <TableCell><Badge className={s.verdict === 'AC' ? 'badge-lime' : 'bg-red-500/20 text-red-500'}>{s.verdict}</Badge></TableCell>
                    <TableCell className="font-mono">{s.runtime}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(s.submittedAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="hackathons">
          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_PROJECTS.map((p) => (
                  <TableRow key={p.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{p.status}</Badge></TableCell>
                    <TableCell className="font-mono text-lime">{p.score ?? '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
