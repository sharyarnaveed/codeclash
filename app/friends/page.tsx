'use client';
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Swords, UserPlus, MoreVertical, MessageSquare } from "lucide-react";
import { MOCK_USERS } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

export default function Friends() {
  const [search, setSearch] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(MOCK_USERS[1]); // bob_codes

  const friendsList = MOCK_USERS.filter(u => u.id !== 1).slice(0, 8); // Exclude self, take 8

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold font-mono tracking-tight mb-8">Friends</h1>
      
      <div className="flex flex-col md:flex-row gap-6 h-[calc(100%-4rem)]">
        {/* Left Column: List */}
        <div className="w-full md:w-1/3 flex flex-col gap-4 h-full border border-border/50 rounded-xl bg-card/30 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search friends..." 
              className="pl-9 bg-background/50 border-border/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 mt-4">Online (3)</div>
            {friendsList.slice(0, 3).map(friend => (
              <div 
                key={friend.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedFriend.id === friend.id ? 'bg-primary/10 border border-primary/30' : 'bg-background/50 border border-border/50 hover:border-border'}`}
                onClick={() => setSelectedFriend(friend)}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-xs">{friend.username.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold font-mono text-sm truncate">{friend.username}</p>
                  <p className="text-xs text-muted-foreground truncate">Rating: {friend.rating}</p>
                </div>
              </div>
            ))}

            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 mt-6">Offline</div>
            {friendsList.slice(3).map(friend => (
              <div 
                key={friend.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedFriend.id === friend.id ? 'bg-primary/10 border border-primary/30' : 'bg-background/50 border border-border/50 hover:border-border'}`}
                onClick={() => setSelectedFriend(friend)}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 opacity-50">
                    <AvatarFallback className="text-xs">{friend.username.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-muted border-2 border-background" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold font-mono text-sm truncate">{friend.username}</p>
                  <p className="text-xs text-muted-foreground truncate">Rating: {friend.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="flex-1 h-full rounded-xl border border-border/50 bg-card/30 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent" />
          
          <Avatar className="h-24 w-24 border-2 border-primary/30 mb-4 relative z-10">
            <AvatarFallback className="text-2xl bg-background font-mono">{selectedFriend.username.slice(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <h2 className="text-3xl font-bold font-mono relative z-10">{selectedFriend.name}</h2>
          <p className="text-muted-foreground font-mono mb-6 relative z-10">@{selectedFriend.username}</p>

          <div className="flex gap-4 mb-8 relative z-10">
            <Badge variant="outline" className="px-3 py-1 font-mono text-sm">{selectedFriend.country}</Badge>
            <Badge variant="outline" className="px-3 py-1 font-mono text-sm">Rating: {selectedFriend.rating}</Badge>
            <Badge variant="outline" className="px-3 py-1 font-mono text-sm">{selectedFriend.winRate}% WR</Badge>
          </div>

          <p className="text-center max-w-md text-muted-foreground mb-12 relative z-10">
            {selectedFriend.bio || "No bio provided."}
          </p>

          <div className="flex gap-4 relative z-10">
            <Link href="/matchmaking">
              <Button size="lg" className="font-mono w-40">
                <Swords className="mr-2 h-4 w-4" /> Challenge
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="font-mono w-40">
              <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}