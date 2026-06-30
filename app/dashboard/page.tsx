'use client';
import { MOCK_RATING_DATA, MOCK_HISTORY } from "@/lib/mockData";
import { StatCard } from "@/components/StatCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Trophy, Swords, Target, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { account } from "@/lib/Appwrite";

export default function Dashboard() {
   useEffect(() => {
 async function verify() {
        const user = await account.get();

        console.log(user);

 }


    verify();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-mono tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Rating" value="2840" icon={<Trophy className="h-4 w-4" />} trend={{ value: 12, label: "this month", positive: true }} />
        <StatCard title="Global Rank" value="#42" icon={<Target className="h-4 w-4" />} description="Top 0.1%" />
        <StatCard title="Matches Played" value="1,248" icon={<Swords className="h-4 w-4" />} />
        <StatCard title="Win Rate" value="72.4%" icon={<Activity className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-card/50">
          <CardHeader>
            <CardTitle>Rating History</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_RATING_DATA}>
                <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `\${value}`} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Line type="monotone" dataKey="rating" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_HISTORY.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50">
                  <div>
                    <p className="font-medium text-sm">{match.problem}</p>
                    <p className="text-xs text-muted-foreground font-mono">vs {match.opponent}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={match.result === 'win' ? 'default' : 'destructive'} className="mb-1">
                      {match.result.toUpperCase()}
                    </Badge>
                    <p className="text-xs font-mono">{match.ratingChange}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}