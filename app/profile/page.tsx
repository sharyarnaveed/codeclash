'use client';
import { useState } from "react";
import { MOCK_RATING_DATA, MOCK_HISTORY } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MapPin, GraduationCap, Code2, Trophy, Medal, Star, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-shrink-0 flex flex-col items-center">
          <Avatar className="h-32 w-32 border-4 border-primary/20">
            <AvatarFallback className="text-4xl bg-primary/10 text-primary font-mono font-bold">AC</AvatarFallback>
          </Avatar>
          <Badge className="mt-4 bg-primary text-primary-foreground font-mono text-lg px-4 py-1">
            2840
          </Badge>
          <p className="text-sm text-muted-foreground mt-2 font-mono">Grandmaster</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold font-mono">Alice Chen</h1>
              <p className="text-xl text-muted-foreground font-mono">@alicec</p>
            </div>
            <Badge variant="outline" className="font-mono text-sm px-3 py-1">Rank #42</Badge>
          </div>

          <p className="text-lg max-w-2xl">Competitive programmer & open source contributor. Specializing in graph algorithms and dynamic programming. Always looking for a good challenge.</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> US</div>
            <div className="flex items-center gap-1.5"><GraduationCap className="h-4 w-4" /> MIT</div>
            <div className="flex items-center gap-1.5"><Code2 className="h-4 w-4" /> Python</div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50">
          <TabsTrigger value="overview" className="font-mono">Overview</TabsTrigger>
          <TabsTrigger value="matches" className="font-mono">Match History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" /> Rating Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_RATING_DATA}>
                    <defs>
                      <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" hide />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                      labelStyle={{ display: 'none' }}
                    />
                    <Area type="monotone" dataKey="rating" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRating)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" /> Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-mono">
                    <span>Python</span>
                    <span className="text-muted-foreground">Level 99</span>
                  </div>
                  <Progress value={99} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-mono">
                    <span>C++</span>
                    <span className="text-muted-foreground">Level 75</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-mono">
                    <span>JavaScript</span>
                    <span className="text-muted-foreground">Level 60</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Medal className="h-5 w-5 text-primary" /> Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: "First Blood", desc: "Win your first match", icon: Star, unlocked: true },
                    { title: "Streak Master", desc: "Win 10 in a row", icon: Trophy, unlocked: true },
                    { title: "Speed Demon", desc: "Solve under 3 mins", icon: Clock, unlocked: true },
                    { title: "Grandmaster", desc: "Reach 2800 rating", icon: Medal, unlocked: true },
                  ].map((ach, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${ach.unlocked ? 'border-primary/50 bg-primary/5' : 'border-border/50 bg-card/30 opacity-50'}`}>
                      <ach.icon className={`h-8 w-8 mb-3 ${ach.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                      <h4 className="font-bold text-sm mb-1">{ach.title}</h4>
                      <p className="text-xs text-muted-foreground">{ach.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          {MOCK_HISTORY.map((match) => (
            <Card key={match.id} className="bg-card/50 border-border/50 hover:border-border transition-colors">
              <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-1.5 h-12 rounded-full ${match.result === 'win' ? 'bg-primary' : 'bg-destructive'}`} />
                  <div>
                    <h4 className="font-bold font-mono">{match.problem}</h4>
                    <p className="text-sm text-muted-foreground">vs {match.opponent} • {match.language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase">Time</p>
                    <p className="font-mono font-bold">{match.duration}</p>
                  </div>
                  <div className="text-center min-w-[80px]">
                    <p className="text-xs text-muted-foreground uppercase">Rating</p>
                    <p className={`font-mono font-bold ${match.result === 'win' ? 'text-primary' : 'text-destructive'}`}>
                      {match.ratingChange}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}