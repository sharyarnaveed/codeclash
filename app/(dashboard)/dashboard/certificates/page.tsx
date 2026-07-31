'use client';

import { MOCK_CERTIFICATES } from '@/lib/mock/users';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Download } from 'lucide-react';

export default function CertificatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-mono mb-6">Certificates</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {MOCK_CERTIFICATES.map((cert) => (
          <div key={cert.id} className="glass-card p-6 flex items-start justify-between">
            <div className="flex gap-4">
              <Award className="h-8 w-8 text-lime shrink-0" />
              <div>
                <p className="font-medium">{cert.title}</p>
                <p className="text-sm text-muted-foreground">{cert.event}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs capitalize">{cert.eventType}</Badge>
                  {cert.rank && <Badge className="badge-lime text-xs">#{cert.rank}</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Issued {new Date(cert.issuedAt).toLocaleDateString()}</p>
              </div>
            </div>
            <Button size="sm" variant="outline"><Download className="h-3 w-3" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}
