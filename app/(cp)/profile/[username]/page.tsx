'use client';

import { use } from 'react';
import { CURRENT_USER, MOCK_USERS, MOCK_WEEKLY_ACTIVITY } from '@/lib/mock/users';
import { MOCK_RATING_DATA } from '@/lib/mock/contests';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Trophy, Target, Code2, Award } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ScrollReveal } from '@/components/shared/motion';

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const user = MOCK_USERS.find((u) => u.username === username) ?? MOCK_USERS[0];
  if (!user) notFound();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold font-mono text-primary">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground font-mono">@{user.username} · {user.country}</p>
            {user.bio && <p className="text-sm text-muted-foreground mt-2">{user.bio}</p>}
          </div>
          <div className="md:ml-auto text-right">
            <p className="text-4xl font-bold font-mono text-lime">{user.rating}</p>
            <p className="text-sm text-muted-foreground">Max: {user.maxRating}</p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Global Rank', value: `#${user.stats.globalRank}`, icon: Trophy },
          { label: 'Problems Solved', value: user.stats.problemsSolved, icon: Code2 },
          { label: 'Contests', value: user.stats.contestsParticipated, icon: Target },
          { label: 'Win Rate', value: `${user.stats.winRate}%`, icon: Award },
        ].map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="pt-6">
              <s.icon className="h-4 w-4 text-muted-foreground mb-2" />
              <p className="text-2xl font-bold font-mono">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
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
          <CardHeader><CardTitle>Weekly Activity</CardTitle></CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_WEEKLY_ACTIVITY}>
                <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Bar dataKey="count" fill="hsl(72 100% 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Achievements</h2>
        <div className="flex flex-wrap gap-3">
          {user.achievements.map((a) => (
            <Badge key={a.id} variant="outline" className={`px-4 py-2 ${a.unlockedAt ? 'border-lime/30 text-lime' : 'opacity-40'}`}>
              {a.title}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
