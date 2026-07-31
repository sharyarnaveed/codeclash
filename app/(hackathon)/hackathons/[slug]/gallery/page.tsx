'use client';

import { use } from 'react';
import { MOCK_PROJECTS, MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ScrollReveal } from '@/components/shared/motion';

export default function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hackathon = MOCK_HACKATHONS.find((h) => h.slug === slug);
  if (!hackathon) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Project Gallery</h1>
      <p className="text-muted-foreground mb-8">{hackathon.title}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 0.08}>
            <div className="glass-card rounded-3xl overflow-hidden hover:border-lime/20 transition-colors">
              <div className="h-40 bg-gradient-to-br from-primary/20 to-lime/10" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{p.title}</h3>
                  {p.status === 'winner' && <Badge className="badge-lime">Winner</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                {p.score && <p className="text-sm font-mono text-lime mb-3">Score: {p.score}</p>}
                <div className="flex gap-2">
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-white flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> GitHub
                  </a>
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-white flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
