'use client';

import { useEffect, useState, useRef } from 'react';

// Each "line" in the fake code block
const CODE_LINES = [
  { content: 'const developer = await matchmaking.find();', color: 'text-sky-400', delay: 0 },
  { content: '', color: '', delay: 0 },
  { content: 'if (developer.isReady) {', color: 'text-violet-400', delay: 0 },
  { content: '  // CHALLENGE DEVELOPERS.', color: 'text-emerald-400 font-bold', delay: 0 },
  { content: '  // CLIMB THE RANKINGS.', color: 'text-emerald-400 font-bold', delay: 0 },
  { content: '  developer.battle({ mode: "real-time" });', color: 'text-sky-400', delay: 0 },
  { content: '}', color: 'text-violet-400', delay: 0 },
];

const TYPING_SPEED = 38; // ms per character
const LINE_PAUSE = 260;  // ms between finishing one line and starting next

interface TypedLine {
  content: string;
  color: string;
  done: boolean;
}

export default function HeroTypewriter() {
  const [lines, setLines] = useState<TypedLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typewriter engine
  useEffect(() => {
    if (currentLineIndex >= CODE_LINES.length) {
      setDone(true);
      return;
    }

    const line = CODE_LINES[currentLineIndex];

    if (currentCharIndex === 0) {
      // Start a new line
      setLines(prev => [
        ...prev,
        { content: '', color: line.color, done: false },
      ]);
    }

    if (currentCharIndex < line.content.length) {
      // Still typing current line
      timeoutRef.current = setTimeout(() => {
        setLines(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: line.content.slice(0, currentCharIndex + 1),
          };
          return updated;
        });
        setCurrentCharIndex(i => i + 1);
      }, TYPING_SPEED);
    } else {
      // Line done — pause then move to next line
      timeoutRef.current = setTimeout(() => {
        setLines(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], done: true };
          return updated;
        });
        setCurrentLineIndex(i => i + 1);
        setCurrentCharIndex(0);
      }, LINE_PAUSE);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentLineIndex, currentCharIndex]);

  // Highlight code tokens with simple pattern matching
  function renderLine(content: string, color: string) {
    if (!content) return <span>&nbsp;</span>;

    // Comment lines
    if (content.trim().startsWith('//')) {
      return <span className="text-emerald-400 italic">{content}</span>;
    }

    // Simple token colorizer
    const tokens = content
      .replace(/(const|if|await|return)\b/g, '§keyword§$1§end§')
      .replace(/(".*?"|'.*?')/g, '§string§$1§end§')
      .replace(/(\w+)\s*\(/g, '§fn§$1§end§(')
      .split('§');

    return (
      <>
        {tokens.map((tok, i) => {
          if (tok === 'keyword') return null;
          if (tok === 'string') return null;
          if (tok === 'fn') return null;
          if (tok === 'end') return null;
          if (tokens[i - 1] === 'keyword') return <span key={i} className="text-violet-400">{tok}</span>;
          if (tokens[i - 1] === 'string') return <span key={i} className="text-amber-300">{tok}</span>;
          if (tokens[i - 1] === 'fn') return <span key={i} className="text-sky-300">{tok}</span>;
          return <span key={i} className="text-slate-300">{tok}</span>;
        })}
      </>
    );
  }

  return (
    <div className="hero-code-block">
      {/* Terminal chrome */}
      <div className="terminal-bar">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
        <span className="terminal-title">codeclash — main.ts</span>
      </div>

      {/* Code body */}
      <div className="terminal-body">
        {lines.map((line, idx) => (
          <div key={idx} className="code-line">
            {/* Line number */}
            <span className="line-number">{idx + 1}</span>
            {/* Content */}
            <span className="line-content">
              {renderLine(line.content, line.color)}
              {/* Blinking cursor only on last active line */}
              {idx === lines.length - 1 && !done && (
                <span
                  className="cursor-block"
                  style={{ opacity: showCursor ? 1 : 0 }}
                />
              )}
            </span>
          </div>
        ))}
        {/* Trailing cursor when done */}
        {done && (
          <div className="code-line">
            <span className="line-number">{lines.length + 1}</span>
            <span className="line-content">
              <span
                className="cursor-block"
                style={{ opacity: showCursor ? 1 : 0 }}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
