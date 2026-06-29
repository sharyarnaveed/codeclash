'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Swords, Users, Loader2 } from "lucide-react";

export default function Matchmaking() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const startSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      router.push("/battle");
    }, 3000);
  };

  if (isSearching) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 bg-primary/40 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          <div className="relative bg-background border border-primary p-8 rounded-full">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-mono font-bold">Searching for opponent...</h2>
        <p className="text-muted-foreground mt-2">Estimated wait: 0:15</p>
        <Button variant="ghost" className="mt-8" onClick={() => setIsSearching(false)}>
          Cancel Search
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold font-mono tracking-tight text-center mb-12">Matchmaking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4 w-fit">
              <Swords className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-mono">Ranked Match</CardTitle>
            <CardDescription>Compete against players of similar skill.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="text-center p-4 bg-background/50 rounded-lg w-full border border-border/50">
              <p className="text-sm text-muted-foreground">Current Rating</p>
              <p className="text-3xl font-bold font-mono text-primary mt-1">2840</p>
            </div>
            <Button size="lg" className="w-full font-mono text-lg h-14" onClick={startSearch} data-testid="button-play-ranked">
              FIND MATCH
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto bg-secondary p-4 rounded-full mb-4 w-fit">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-mono">Challenge Friend</CardTitle>
            <CardDescription>Create a private room or join one.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="room-code">Room Code</Label>
              <div className="flex gap-2">
                <Input id="room-code" placeholder="Enter code..." className="font-mono uppercase" />
                <Button variant="outline" onClick={() => router.push("/battle")}>Join</Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or</span></div>
            </div>
            <Button size="lg" variant="secondary" className="w-full font-mono" onClick={() => router.push("/battle")}>
              CREATE ROOM
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}