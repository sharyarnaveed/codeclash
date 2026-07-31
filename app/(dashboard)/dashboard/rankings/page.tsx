'use client';

import { CURRENT_USER } from '@/lib/mock/users';
import { MOCK_RATING_DATA } from '@/lib/mock/contests';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function RankingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold font-mono">Rankings</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="glass-card"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Current Rating</p><p className="text-3xl font-bold font-mono text-lime">{CURRENT_USER.rating}</p></CardContent></Card>
        <Card className="glass-card"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Max Rating</p><p className="text-3xl font-bold font-mono">{CURRENT_USER.maxRating}</p></CardContent></Card>
        <Card className="glass-card"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Global Rank</p><p className="text-3xl font-bold font-mono">#{CURRENT_USER.stats.globalRank}</p></CardContent></Card>
      </div>
      <Card className="glass-card">
        <CardHeader><CardTitle>Rating History</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_RATING_DATA}>
              <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
              <Line type="monotone" dataKey="rating" stroke="hsl(72 100% 60%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
