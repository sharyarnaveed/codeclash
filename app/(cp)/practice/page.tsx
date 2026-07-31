'use client';

import Link from 'next/link';
import { MOCK_PROBLEMS } from '@/lib/mock/contests';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollReveal } from '@/components/shared/motion';

export default function PracticePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ScrollReveal>
        <h1 className="text-3xl font-bold font-mono mb-2">Practice Problems</h1>
        <p className="text-muted-foreground mb-8">Sharpen your skills with our problem archive.</p>
      </ScrollReveal>

      <div className="flex flex-wrap gap-4 mb-6">
        <Input placeholder="Search problems..." className="max-w-xs bg-white/5 border-white/10" />
        <Select defaultValue="all">
          <SelectTrigger className="w-36 bg-white/5 border-white/10"><SelectValue placeholder="Difficulty" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>Problem</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Acceptance</TableHead>
              <TableHead>Solved By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_PROBLEMS.map((p) => (
              <TableRow key={p.id} className="border-white/10 hover:bg-white/5">
                <TableCell>
                  <Link href={`/practice/${p.slug}`} className="hover:text-primary font-medium">{p.title}</Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    p.difficulty === 'Easy' ? 'border-lime/30 text-lime' :
                    p.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-500' : 'border-red-500/30 text-red-500'
                  }>{p.difficulty}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">{p.tags.map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}</div>
                </TableCell>
                <TableCell className="font-mono">{p.acceptance}%</TableCell>
                <TableCell className="font-mono text-muted-foreground">{p.solvedBy.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
