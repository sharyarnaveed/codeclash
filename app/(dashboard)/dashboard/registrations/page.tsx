'use client';

import { MOCK_REGISTRATIONS } from '@/lib/mock/users';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function RegistrationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-mono mb-6">Registrations</h1>
      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>Event</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Start Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_REGISTRATIONS.map((r) => (
              <TableRow key={r.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="font-medium">{r.eventTitle}</TableCell>
                <TableCell><Badge variant="outline" className="capitalize">{r.eventType}</Badge></TableCell>
                <TableCell><Badge className={r.status === 'registered' ? 'badge-lime' : 'badge-violet'}>{r.status}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{r.registeredAt}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(r.startDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
