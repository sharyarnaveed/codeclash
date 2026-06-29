'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal, Zap, Trophy } from "lucide-react";

// Lines to type — first line plain, second line gets gradient
const LINES = [
  { text: 'CHALLENGE DEVELOPERS.', gradient: false },
  { text: 'CLIMB THE RANKINGS.', gradient: true },
];

const TYPING_SPEED = 60;   // ms per char
const LINE_DELAY   = 380;  // pause before starting next line

function useTypewriter(lines: { text: string; gradient: boolean }[]) {
  const [displayed, setDisplayed] = useState<{ text: string; gradient: boolean; done: boolean }[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [allDone, setAllDone] = useState(false);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Type engine
  useEffect(() => {
    if (lineIdx >= lines.length) { setAllDone(true); return; }

    const line = lines[lineIdx];

    if (charIdx === 0) {
      setDisplayed(prev => [...prev, { text: '', gradient: line.gradient, done: false }]);
    }

    if (charIdx < line.text.length) {
      const id = setTimeout(() => {
        setDisplayed(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...copy[copy.length - 1], text: line.text.slice(0, charIdx + 1) };
          return copy;
        });
        setCharIdx(c => c + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => {
        setDisplayed(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...copy[copy.length - 1], done: true };
          return copy;
        });
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, LINE_DELAY);
      return () => clearTimeout(id);
    }
  }, [lineIdx, charIdx, lines]);

  return { displayed, showCursor, allDone };
}

export default function Landing() {
  const { displayed, showCursor, allDone } = useTypewriter(LINES);

  return (
    <div className="flex flex-col flex-1">
      {/* Hero — max 80vh */}
      <section
        className="relative flex flex-col items-center justify-center px-4 overflow-hidden"
        style={{ minHeight: '80vh', maxHeight: '80vh' }}
      >
        {/* Background radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />



        {/* Content — centred */}
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-8">

          {/* Typewriter heading — cursor always inline after last char */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight font-mono leading-tight">
            {/* Line 1 — plain foreground */}
            <span className="text-foreground">
              {displayed[0]?.text ?? ''}
            </span>
            {/* Cursor on line 1 while typing it */}
            {displayed.length <= 1 && !allDone && (
              <span
                className="inline-block w-[3px] ml-[2px] rounded-sm bg-primary"
                style={{
                  height: '0.8em',
                  verticalAlign: 'middle',
                  opacity: showCursor ? 1 : 0,
                  transition: 'opacity 0.05s',
                  boxShadow: '0 0 10px hsl(160 84% 39% / 0.9)',
                }}
              />
            )}

            {/* Line 2 — gradient, only rendered once line 1 is done */}
            {displayed.length >= 2 && (
              <>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  {displayed[1].text}
                </span>
                {/* Cursor on line 2 while typing it, or blinking after all done */}
                <span
                  className="inline-block w-[3px] ml-[2px] rounded-sm bg-primary"
                  style={{
                    height: '0.8em',
                    verticalAlign: 'middle',
                    opacity: showCursor ? 1 : 0,
                    transition: 'opacity 0.05s',
                    boxShadow: '0 0 10px hsl(160 84% 39% / 0.9)',
                  }}
                />
              </>
            )}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The premium competitive coding platform for serious developers.
            Face off in real-time battles, solve algorithms, and prove your skills.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/matchmaking">
              <Button
                size="lg"
                className="w-full sm:w-auto font-mono text-base h-12 px-8 shadow-[0_0_24px_hsl(160_84%_39%/0.35)] hover:shadow-[0_0_36px_hsl(160_84%_39%/0.55)] transition-shadow"
                data-testid="hero-start"
              >
                <Terminal className="mr-2 h-4 w-4" />
                START CODING
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-mono text-base h-12 px-8 hover:border-primary/60 transition-colors"
                data-testid="hero-leaderboard"
              >
                <Trophy className="mr-2 h-4 w-4" />
                LEADERBOARD
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/40 transition-colors">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-time Battles</h3>
              <p className="text-muted-foreground">
                Compete head-to-head with developers around the world in synchronized algorithmic races.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/40 transition-colors">
              <Terminal className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Pro Environment</h3>
              <p className="text-muted-foreground">
                Write code in a fully featured Monaco editor with custom keybindings and themes.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/40 transition-colors">
              <Trophy className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Global Rankings</h3>
              <p className="text-muted-foreground">
                Climb the Elo ladder from Bronze to Grandmaster and showcase your skills to the world.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}