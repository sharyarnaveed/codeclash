'use client';

import { use } from 'react';
import { MOCK_MENTORS, MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function MentorsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hackathon = MOCK_HACKATHONS.find((h) => h.slug === slug);
  if (!hackathon) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Mentors</h1>
      <p className="text-muted-foreground mb-8">{hackathon.title}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_MENTORS.map((mentor) => (
          <div key={mentor.id} className="glass-card rounded-3xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/20 text-primary">{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{mentor.name}</p>
                <p className="text-sm text-muted-foreground">{mentor.title} · {mentor.company}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {mentor.expertise.map((e) => <Badge key={e} variant="outline" className="text-xs">{e}</Badge>)}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> Available Slots</p>
              {mentor.availableSlots.map((slot) => (
                <div key={slot.time} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 text-sm">
                  <span>{new Date(slot.time).toLocaleString()}</span>
                  {slot.booked ? <Badge variant="outline" className="text-xs">Booked</Badge> : <Button size="sm" variant="outline" className="h-7 text-xs">Book</Button>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
