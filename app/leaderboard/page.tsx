'use client';
import { MOCK_USERS } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Leaderboard() {
  const sortedUsers = [...MOCK_USERS].sort((a, b) => b.rating - a.rating);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold font-mono tracking-tight mb-8">Global Leaderboard</h1>
      
      <div className="rounded-xl border border-border/50 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader className="bg-card/50">
            <TableRow className="border-border/50">
              <TableHead className="w-16 font-mono text-center">Rank</TableHead>
              <TableHead>Developer</TableHead>
              <TableHead className="font-mono text-right">Rating</TableHead>
              <TableHead className="hidden md:table-cell text-right">Win Rate</TableHead>
              <TableHead className="hidden sm:table-cell text-right">Language</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;
              const isCurrentUser = user.username === 'alicec';

              return (
                <TableRow 
                  key={user.id}
                  className={`
                    border-border/50 hover:bg-muted/50 transition-colors
                    ${isCurrentUser ? 'bg-primary/5 border-l-2 border-l-primary' : ''}
                  `}
                >
                  <TableCell className="text-center font-mono font-bold text-muted-foreground">
                    {isTop3 ? (
                      <span className={`
                        ${rank === 1 ? 'text-yellow-500' : ''}
                        ${rank === 2 ? 'text-gray-400' : ''}
                        ${rank === 3 ? 'text-amber-700' : ''}
                      `}>#{rank}</span>
                    ) : (
                      `#${rank}`
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs font-mono">{user.username.slice(0,2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          {user.username}
                          {isCurrentUser && <Badge variant="secondary" className="text-[10px] px-1.5 h-4">YOU</Badge>}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] px-1 h-4">{user.country}</Badge>
                          <span className="hidden sm:inline">{user.university}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-primary text-lg">
                    {user.rating}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right font-mono">
                    {user.winRate}%
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right text-muted-foreground">
                    {user.favoriteLanguage}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}