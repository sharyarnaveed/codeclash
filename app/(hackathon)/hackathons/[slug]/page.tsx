'use client';

import { use } from 'react';
import Link from 'next/link';
import { MOCK_HACKATHONS, MOCK_TIMELINE, MOCK_MENTORS, MOCK_JUDGES } from '@/lib/mock/hackathons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Trophy, CheckCircle } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ScrollReveal } from '@/components/shared/motion';

export default function HackathonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hackathon = MOCK_HACKATHONS.find((h) => h.slug === slug);
  if (!hackathon) notFound();

  return (
    <div>
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/40 via-purple-900/30 to-lime/10 flex items-end">
        <div className="container mx-auto px-4 pb-8">
          <Badge className="badge-lime mb-3">{hackathon.status.replace('_', ' ').toUpperCase()}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{hackathon.title}</h1>
          <p className="text-lg text-white/70">{hackathon.tagline}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/60">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(hackathon.startDate).toLocaleDateString()} — {new Date(hackathon.endDate).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {hackathon.location}</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {hackathon.participants.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href={`/hackathons/${slug}/register`}><Button className="bg-lime text-black hover:bg-lime/90">Register</Button></Link>
          <Link href={`/hackathons/${slug}/teams/create`}><Button variant="outline">Create Team</Button></Link>
          <Link href={`/hackathons/${slug}/gallery`}><Button variant="outline">Gallery</Button></Link>
          <Link href={`/hackathons/${slug}/winners`}><Button variant="outline">Winners</Button></Link>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="bg-white/5 border border-white/10 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tracks">Tracks</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="prizes">Prizes</TabsTrigger>
            <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal>
                <div className="glass-card rounded-3xl p-6">
                  <h3 className="font-semibold mb-4">About</h3>
                  <p className="text-muted-foreground text-sm">Join {hackathon.participants.toLocaleString()} developers building the future. Teams of up to {hackathon.maxTeamSize} members.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="glass-card rounded-3xl p-6">
                  <h3 className="font-semibold mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link href={`/hackathons/${slug}/mentors`} className="block text-sm text-primary hover:underline">Mentors & Schedule</Link>
                    <Link href={`/hackathons/${slug}/judges`} className="block text-sm text-primary hover:underline">Judges & Criteria</Link>
                    <Link href={`/hackathons/${slug}/submit`} className="block text-sm text-primary hover:underline">Submit Project</Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="tracks">
            <div className="grid md:grid-cols-3 gap-4">
              {hackathon.tracks.map((track) => (
                <div key={track.id} className="glass-card rounded-3xl p-5">
                  <Trophy className="h-5 w-5 text-lime mb-2" />
                  <h4 className="font-semibold">{track.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{track.description}</p>
                  <p className="text-sm font-mono text-lime mt-2">{track.prize}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <div className="space-y-4 max-w-lg">
              {MOCK_TIMELINE.map((event) => (
                <div key={event.id} className="flex gap-4">
                  <div className={`mt-1 ${event.completed ? 'text-lime' : 'text-muted-foreground'}`}>
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date} · {event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prizes">
            <div className="grid md:grid-cols-3 gap-4">
              {hackathon.prizes.map((prize) => (
                <div key={prize.place} className="glass-card rounded-3xl p-6 text-center">
                  <p className="text-sm text-muted-foreground">{prize.place} Place</p>
                  <p className="text-2xl font-bold font-mono text-lime mt-1">{prize.amount}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sponsors">
            <div className="flex flex-wrap gap-4">
              {hackathon.sponsors.map((s) => (
                <div key={s.id} className="glass-card rounded-2xl px-6 py-4">
                  <p className="font-mono font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{s.tier}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <div className="space-y-4 max-w-2xl">
              {[
                { q: 'Who can participate?', a: 'Anyone with a passion for building! All skill levels welcome.' },
                { q: 'Team size?', a: `Up to ${hackathon.maxTeamSize} members per team.` },
                { q: 'What can I build?', a: 'Anything! Choose a track or build in the open category.' },
              ].map((faq) => (
                <div key={faq.q} className="glass-card rounded-2xl p-5">
                  <h4 className="font-medium mb-1">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
