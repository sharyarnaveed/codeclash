'use client';
import Link from "next/link";
import { Terminal, ArrowLeft, Zap, Trophy, Users, Target, Code2, Globe, Heart, Shield, Cpu, GitBranch } from "lucide-react";

const stats = [
  { label: "Active Developers", value: "12,000+", icon: Users },
  { label: "Battles Fought", value: "340K+", icon: Zap },
  { label: "Challenges Available", value: "800+", icon: Target },
  { label: "Countries Represented", value: "60+", icon: Globe },
];

const values = [
  {
    icon: Code2,
    title: "Code-First Philosophy",
    description:
      "We believe the best way to grow as a developer is by writing real code under real pressure. Every feature we build puts the editor and the problem front and center.",
  },
  {
    icon: Trophy,
    title: "Meritocratic Rankings",
    description:
      "Our Elo-based rating system is transparent and fair. Rank up by winning battles — not by grinding tutorials or paying for premium tiers.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description:
      "From challenge submissions to tournament organisation, our community shapes the platform. We listen, iterate, and ship fast.",
  },
  {
    icon: Shield,
    title: "Privacy & Fairness",
    description:
      "We do not sell your data, show intrusive ads, or use dark patterns. CodeClash will always respect the developer who trusts us with their time.",
  },
];

const team = [
  {
    initials: "SC",
    name: "Sharyar Chen",
    role: "Founder & Lead Engineer",
    bio: "Full-stack developer obsessed with competitive programming and great developer tooling.",
  },
  {
    initials: "AM",
    name: "Asel Maksat",
    role: "Backend & Infrastructure",
    bio: "Distributed systems engineer. Keeps the match servers running at sub-100ms latency.",
  },
  {
    initials: "LR",
    name: "Luis Ramos",
    role: "Product & Design",
    bio: "Turns rough ideas into polished interfaces. Advocates for accessibility in every PR.",
  },
  {
    initials: "NK",
    name: "Nadia Kim",
    role: "Community & Content",
    bio: "Writes the problems you love to hate. Former competitive programmer, ICPC finalist.",
  },
];

const timeline = [
  { year: "2024", event: "CodeClash founded — MVP launched with 50 beta testers." },
  { year: "Q1 2025", event: "Public launch. 1,000 developers sign up in the first week." },
  { year: "Q2 2025", event: "Tournament system ships. First prize pool: $500." },
  { year: "Q3 2025", event: "10,000 users milestone. Elo leaderboard goes global." },
  { year: "2026", event: "Tournaments, friends system, and team battles — building the future." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(160 84% 39% / 0.10), transparent)",
        }}
      />



      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 mb-6">
          <Cpu className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-mono text-primary font-semibold tracking-wider uppercase">
            About CodeClash
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black font-mono tracking-tight mb-4">
          Built by Developers,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
            for Developers
          </span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm max-w-xl mx-auto leading-relaxed">
          CodeClash is a real-time competitive coding arena where skill is the only currency.
          No ads. No paywalls. Just clean code and fierce competition.
        </p>
      </section>

      <main className="mx-auto max-w-4xl px-6 pb-20 space-y-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-border/50 p-5 flex flex-col items-center text-center hover:border-primary/40 transition-colors"
              style={{ background: "hsl(222 47% 13%)" }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-3">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-2xl font-black font-mono text-foreground">{value}</span>
              <span className="text-xs text-muted-foreground font-mono mt-1">{label}</span>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div
          className="rounded-xl border border-primary/20 p-6"
          style={{ background: "hsl(160 84% 39% / 0.06)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-black font-mono tracking-tight text-lg">Our Mission</h2>
          </div>
          <p className="text-sm font-mono text-foreground/80 leading-relaxed">
            <span className="text-primary font-semibold">We exist to make competitive programming accessible and exciting.</span>{" "}
            Most platforms bury great problems behind paywalls or drown developers in tutorial content.
            CodeClash cuts straight to what matters — write the best solution, win the battle, climb the ladder.
          </p>
        </div>

        {/* Values */}
        <div className="rounded-xl border border-border/50 overflow-hidden" style={{ background: "hsl(222 47% 13%)" }}>
          <div
            className="flex items-center gap-3 px-6 py-4 border-b border-border/40"
            style={{ background: "hsl(222 47% 10%)" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <GitBranch className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-black font-mono tracking-tight text-lg">Our Values</h2>
          </div>
          <div className="divide-y divide-border/30">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="px-6 py-5 flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0 mt-0.5">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold font-mono text-primary mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-xl border border-border/50 overflow-hidden" style={{ background: "hsl(222 47% 13%)" }}>
          <div
            className="flex items-center gap-3 px-6 py-4 border-b border-border/40"
            style={{ background: "hsl(222 47% 10%)" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-black font-mono tracking-tight text-lg">Our Story</h2>
          </div>
          <div className="px-6 py-5 space-y-0">
            {timeline.map(({ year, event }, i) => (
              <div key={year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1 shrink-0 shadow-[0_0_8px_hsl(160_84%_39%/0.6)]" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-border/40 mt-1" style={{ minHeight: "32px" }} />
                  )}
                </div>
                <div className="pb-6 last:pb-0">
                  <span className="text-xs font-mono text-primary font-semibold">{year}</span>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="rounded-xl border border-border/50 overflow-hidden" style={{ background: "hsl(222 47% 13%)" }}>
          <div
            className="flex items-center gap-3 px-6 py-4 border-b border-border/40"
            style={{ background: "hsl(222 47% 10%)" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-black font-mono tracking-tight text-lg">The Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/30">
            {team.map(({ initials, name, role, bio }) => (
              <div key={name} className="px-6 py-5 flex gap-4 border-b border-border/30 last:border-b-0 even:sm:border-b-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 border border-primary/30 shrink-0 font-black font-mono text-primary text-sm">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-bold font-mono">{name}</p>
                  <p className="text-xs text-primary font-mono mb-1">{role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-xl border border-border/50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ background: "hsl(222 47% 13%)" }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold font-mono tracking-tight mb-1">Ready to prove your skills?</h2>
            <p className="text-sm text-muted-foreground">
              Join thousands of developers competing right now.{" "}
              <Link
                href="/get-started"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors font-mono"
              >
                Create your free account →
              </Link>
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground font-mono">
            Have questions?{" "}
            <Link href="/contact" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Contact us
            </Link>
            {" "}·{" "}
            <Link href="/privacy" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
            {" "}·{" "}
            <Link href="/terms" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
