'use client';

const PARTICLES = [
  { className: 'hero-particle hero-particle-1', style: { top: '18%', left: '22%' } },
  { className: 'hero-particle hero-particle-2', style: { top: '32%', right: '20%' } },
  { className: 'hero-particle hero-particle-3', style: { top: '55%', left: '12%' } },
  { className: 'hero-particle hero-particle-4', style: { top: '70%', right: '28%' } },
  { className: 'hero-particle hero-particle-5 hidden sm:block', style: { top: '42%', left: '35%' } },
  { className: 'hero-particle hero-particle-6 hidden sm:block', style: { top: '28%', right: '38%' } },
] as const;

const BEAMS = [
  { className: 'hero-beam hero-beam-1', style: { top: '25%' } },
  { className: 'hero-beam hero-beam-2', style: { top: '58%' } },
  { className: 'hero-beam hero-beam-3 hidden md:block', style: { top: '78%' } },
] as const;

const ORBS = [
  { className: 'hero-orb hero-orb-1', style: { top: '12%', left: '6%' } },
  { className: 'hero-orb hero-orb-2', style: { top: '48%', right: '4%' } },
  { className: 'hero-orb hero-orb-3', style: { top: '6%', right: '18%' } },
  { className: 'hero-orb hero-orb-4', style: { bottom: '18%', left: '14%' } },
] as const;

const GLYPHS = [
  { text: '{ }', className: 'hero-glyph hero-glyph-1', style: { top: '14%', left: '10%' } },
  { text: '</>', className: 'hero-glyph hero-glyph-2', style: { top: '22%', right: '12%' } },
  { text: 'O(n)', className: 'hero-glyph hero-glyph-3', style: { top: '62%', left: '8%' } },
  { text: '=>', className: 'hero-glyph hero-glyph-4', style: { top: '38%', right: '9%' } },
  { text: '[ ]', className: 'hero-glyph hero-glyph-5 hidden md:block', style: { bottom: '32%', right: '16%' } },
  { text: '//', className: 'hero-glyph hero-glyph-6 hidden md:block', style: { bottom: '28%', left: '20%' } },
] as const;

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="hero-bg-base absolute inset-0" style={{ background: 'var(--hero-bg)' }} />

      {/* Slow-shifting aurora wash */}
      <div className="hero-aurora absolute inset-0" />

      {/* Pulsing orbital rings */}
      <div className="hero-ring hero-ring-1 absolute left-1/2 top-[38%]" />
      <div className="hero-ring hero-ring-2 absolute left-1/2 top-[38%]" />

      {/* Rotating conic spotlight */}
      <div className="hero-halo absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2" />

      {/* Gradient mesh orbs */}
      {ORBS.map((orb, i) => (
        <div key={i} className={orb.className} style={orb.style} />
      ))}

      {/* Floating particles */}
      {PARTICLES.map((particle, i) => (
        <div key={`p-${i}`} className={particle.className} style={particle.style} />
      ))}

      {/* Drifting light beams */}
      {BEAMS.map((beam, i) => (
        <div key={`b-${i}`} className={beam.className} style={beam.style} />
      ))}

      {/* Perspective grid floor — scrolls forward */}
      <div className="hero-perspective-wrap absolute inset-x-0 bottom-0 h-[55%]">
        <div className="hero-perspective-grid" />
      </div>

      {/* Subtle vertical scan line */}
      <div className="hero-scanline absolute inset-x-0 top-0 h-full" />

      {/* Floating code glyphs */}
      {GLYPHS.map((glyph, i) => (
        <span key={i} className={glyph.className} style={glyph.style}>
          {glyph.text}
        </span>
      ))}

      {/* Corner bracket frame — competition arena motif */}
      <div className="hero-bracket hero-bracket-tl" />
      <div className="hero-bracket hero-bracket-tr" />
      <div className="hero-bracket hero-bracket-bl" />
      <div className="hero-bracket hero-bracket-br" />

      {/* Depth overlays */}
      <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-[var(--hero-overlay-from)] via-transparent to-[var(--hero-overlay-to)]" />
      <div className="hero-overlay absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,color-mix(in_srgb,var(--hero-bg)_55%,transparent)_100%)]" />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
