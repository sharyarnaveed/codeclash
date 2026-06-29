'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Zap, Target, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Result() {
  const isWin = true; // Hardcoded for demo

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="space-y-4">
          <h1 className={`text-6xl md:text-8xl font-black font-mono uppercase tracking-tighter ${isWin ? "text-primary" : "text-destructive"}`}>
            {isWin ? "VICTORY" : "DEFEAT"}
          </h1>
          <p className="text-xl text-muted-foreground font-mono">
            You solved Two Sum before bob_codes!
          </p>
        </div>

        <div className="flex justify-center items-center gap-8 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-widest">New Rating</p>
            <p className="text-5xl font-mono font-bold text-foreground">2855</p>
            <p className="text-primary font-mono font-bold">+15 points</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-card/50 border-border/50 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground uppercase">Time</p>
            <p className="text-lg font-mono font-bold">12:34</p>
          </Card>
          <Card className="p-4 bg-card/50 border-border/50 text-center">
            <Zap className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground uppercase">Runtime</p>
            <p className="text-lg font-mono font-bold">42ms</p>
          </Card>
          <Card className="p-4 bg-card/50 border-border/50 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground uppercase">Accuracy</p>
            <p className="text-lg font-mono font-bold">100%</p>
          </Card>
          <Card className="p-4 bg-card/50 border-border/50 text-center">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground uppercase">Rank</p>
            <p className="text-lg font-mono font-bold">#42</p>
          </Card>
        </div>

        <div className="flex justify-center gap-4 pt-8">
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="font-mono">
              RETURN HOME
            </Button>
          </Link>
          <Link href="/matchmaking">
            <Button size="lg" className="font-mono">
              PLAY AGAIN <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}