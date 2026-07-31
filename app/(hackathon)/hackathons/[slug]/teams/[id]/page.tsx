'use client';

import { use } from 'react';
import Link from 'next/link';
import { MOCK_TEAMS, MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function TeamDashboardPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = use(params);
  const hackathon = MOCK_HACKATHONS.find((h) => h.slug === slug);
  const team = MOCK_TEAMS.find((t) => t.id === id) ?? MOCK_TEAMS[0];
  if (!hackathon) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{team.name}</h1>
          <p className="text-muted-foreground">{hackathon.title}</p>
        </div>
        <Badge className={team.status === 'approved' ? 'badge-lime' : 'badge-violet'}>{team.status}</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-semibold mb-4">Members</h3>
          <div className="space-y-3">
            {team.members.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">{m.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-semibold mb-4">Project Submission</h3>
          {team.project ? (
            <div>
              <p className="font-medium">{team.project.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{team.project.description}</p>
              <div className="flex gap-2 mt-4">
                <Badge className="badge-lime">{team.project.status}</Badge>
                {team.project.score && <Badge variant="outline">Score: {team.project.score}</Badge>}
              </div>
              <div className="flex gap-2 mt-4">
                <a href={team.project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline"><ExternalLink className="h-3 w-3 mr-1" /> GitHub</Button>
                </a>
                {team.project.demoUrl && (
                  <a href={team.project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline"><ExternalLink className="h-3 w-3 mr-1" /> Demo</Button>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <Link href={`/hackathons/${slug}/submit`}>
              <Button className="bg-lime text-black hover:bg-lime/90"><Send className="h-3 w-3 mr-1" /> Submit Project</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
