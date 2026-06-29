'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Terminal, User, Trophy, LayoutDashboard, Target, Users, Settings, Crown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard",    label: "Dashboard",   icon: LayoutDashboard },
    { href: "/challenges",   label: "Challenges",  icon: Target },
    { href: "/leaderboard",  label: "Leaderboard", icon: Trophy },
    { href: "/tournaments",  label: "Tournaments", icon: Crown },
    { href: "/friends",      label: "Friends",     icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-mono font-bold text-xl text-primary hover:text-primary/80 transition-colors">
            <Terminal className="h-6 w-6" />
            <span>CodeClash</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary border-b-2 border-primary py-5 -mb-[2px]" : "text-muted-foreground py-5"}`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/matchmaking">
            <Button variant="default" className="font-mono font-semibold" data-testid="button-battle">
              <Terminal className="mr-2 h-4 w-4" /> BATTLE
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="button-user-menu">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary font-mono font-bold">AC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Alice Chen</p>
                  <p className="text-xs leading-none text-muted-foreground font-mono">Rating: 2840</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer w-full flex items-center">
                  <User className="mr-2 h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer w-full flex items-center">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}