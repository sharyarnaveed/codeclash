'use client';

import { CURRENT_USER, MOCK_LANGUAGE_USAGE, MOCK_WEEKLY_ACTIVITY } from '@/lib/mock/users';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(262 83% 58%)', 'hsl(72 100% 60%)', 'hsl(0 0% 100%)', 'hsl(262 50% 40%)', 'hsl(72 60% 40%)'];

export default function ProgressPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold font-mono">Progress</h1>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Contests', value: CURRENT_USER.stats.contestsParticipated },
          { label: 'Problems Solved', value: CURRENT_USER.stats.problemsSolved },
          { label: 'Hackathons', value: CURRENT_USER.stats.hackathonsJoined },
          { label: 'Teams Created', value: CURRENT_USER.stats.teamsCreated },
        ].map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="pt-6">
              <p className="text-2xl font-bold font-mono">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle>Weekly Activity</CardTitle></CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_WEEKLY_ACTIVITY}>
                <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Bar dataKey="count" fill="hsl(262 83% 58%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader><CardTitle>Language Usage</CardTitle></CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_LANGUAGE_USAGE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                  {MOCK_LANGUAGE_USAGE.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Skill Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['Arrays', 'Dynamic Programming', 'Graphs', 'Trees', 'Greedy', 'Binary Search'].map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
