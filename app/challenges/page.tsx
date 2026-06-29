'use client';
import { MOCK_PROBLEMS } from "@/lib/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Challenges() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-mono tracking-tight">Challenges</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROBLEMS.map((problem) => (
          <Card key={problem.id} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge className={
                  problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' :
                  'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                }>{problem.difficulty}</Badge>
                <span className="text-xs text-muted-foreground font-mono">{problem.points} pts</span>
              </div>
              <CardTitle className="text-xl">{problem.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <div className="flex flex-wrap gap-2 mb-6">
                {problem.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                <div className="text-xs text-muted-foreground font-mono">
                  Acc: {problem.acceptance}%
                </div>
                <Button size="sm" className="font-mono">SOLVE</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}