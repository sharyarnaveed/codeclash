'use client';

import { MOCK_ANALYTICS } from '@/lib/mock/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function OrganizerAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold font-mono">Analytics</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(MOCK_ANALYTICS.completionRates).map(([key, value]) => (
          <Card key={key} className="glass-card">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold font-mono text-lime">{value}%</p>
              <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')} Completion</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle>Growth</CardTitle></CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_ANALYTICS.growth}>
                <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Line type="monotone" dataKey="users" stroke="hsl(262 83% 58%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="contests" stroke="hsl(72 100% 60%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle>Traffic</CardTitle></CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS.traffic}>
                <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="visits" fill="hsl(262 83% 58%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle>Registration Funnel</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_ANALYTICS.registrationFunnel.map((stage, i) => {
              const max = MOCK_ANALYTICS.registrationFunnel[0].count;
              const pct = (stage.count / max) * 100;
              return (
                <div key={stage.stage}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{stage.stage}</span>
                    <span className="font-mono">{stage.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
