'use client';

import Link from 'next/link';
import { StatCard } from '@/components/dashboard/StatCard';
import { CURRENT_USER, MOCK_REGISTRATIONS } from '@/lib/mock/users';
import { MOCK_RATING_DATA } from '@/lib/mock/contests';
import { MOCK_CONTESTS } from '@/lib/mock/contests';
import { MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Code2, Rocket, Target, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollReveal } from '@/components/shared/motion';

export default function DashboardPage() {
  const liveContests = MOCK_CONTESTS.filter((c) => c.status === 'live');
  const upcomingHackathons = MOCK_HACKATHONS.filter((h) => h.status === 'registration_open' || h.status === 'upcoming');

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <ScrollReveal>
        <h1 className="text-3xl font-bold font-mono">Welcome back, {CURRENT_USER.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground">Here&apos;s your activity overview.</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Rating" value={CURRENT_USER.rating} icon={<Trophy className="h-4 w-4" />} trend={{ value: 12, label: 'this month', positive: true }} variant="lime" />
        <StatCard title="Global Rank" value={`#${CURRENT_USER.stats.globalRank}`} icon={<Target className="h-4 w-4" />} description="Top 0.1%" />
        <StatCard title="Problems Solved" value={CURRENT_USER.stats.problemsSolved} icon={<Code2 className="h-4 w-4" />} />
        <StatCard title="Win Rate" value={`${CURRENT_USER.stats.winRate}%`} icon={<Activity className="h-4 w-4" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="glass-card">
          <CardHeader><CardTitle>Rating History</CardTitle></CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_RATING_DATA}>
                <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Line type="monotone" dataKey="rating" stroke="hsl(262 83% 58%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle>Upcoming Events</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {liveContests.map((c) => (
              <Link key={c.id} href={`/contests/${c.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{c.title}</span>
                </div>
                <Badge className="badge-lime text-xs">LIVE</Badge>
              </Link>
            ))}
            {upcomingHackathons.slice(0, 2).map((h) => (
              <Link key={h.id} href={`/hackathons/${h.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Rocket className="h-4 w-4 text-lime" />
                  <span className="text-sm font-medium">{h.title}</span>
                </div>
                <Badge variant="outline" className="text-xs">Open</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle>Recent Registrations</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {MOCK_REGISTRATIONS.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm">{r.eventTitle}</span>
                <Badge variant="outline" className="text-xs capitalize">{r.eventType}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
