'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/shared/motion';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Users, Code2 } from 'lucide-react';
import { HeroBackground } from '@/components/marketing/HeroBackground';
import { CompanyLogoMark, LogoMarquee, TRUSTED_BY_LOGOS } from '@/components/marketing/company-logos';
import { ContestDetailModal } from '@/components/marketing/ContestDetailModal';
import { HackathonDetailModal } from '@/components/marketing/HackathonDetailModal';
import { MOCK_CONTESTS } from '@/lib/mock/contests';
import { MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import type { Contest } from '@/lib/types/contest';
import type { Hackathon } from '@/lib/types/hackathon';

const heroReveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <motion.h1
          {...heroReveal}
          className="hero-headline relative z-30 select-none text-center"
        >
          <span className="hero-headline-top block">Where Code Meets</span>
          <span className="hero-headline-accent mt-2 block sm:mt-3">
            <span className="text-gradient-animated">Competition</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-subcopy relative z-30 mt-6 max-w-md text-center sm:mt-7"
        >
          The premium platform for competitive programming and hackathons worldwide.
          Compete, build, and climb the global rankings.
        </motion.p>

        {/* Dual pill CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30 mt-9 flex w-full justify-center px-2 sm:mt-11 sm:px-0"
        >
          <div className="flex w-full max-w-[320px] flex-col items-stretch gap-1.5 rounded-2xl glass-pill p-1.5 shadow-[0_0_40px_rgba(var(--hero-accent-rgb),0.08)] sm:w-auto sm:max-w-none sm:flex-row sm:flex-nowrap sm:items-center sm:justify-center sm:gap-0.5 sm:rounded-full sm:p-1">
            <Link href="/contests" className="w-full sm:w-auto">
              <button className="w-full whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium tracking-tight landing-muted transition-colors hover:text-foreground sm:px-5 sm:py-2">
                Explore Contests
              </button>
            </Link>
            <Link href="/get-started" className="w-full sm:w-auto">
              <button className="btn-brand w-full whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold tracking-tight shadow-[0_0_30px_rgba(var(--hero-accent-rgb),0.35)] sm:px-6 sm:py-2">
                Get Started
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function LogoBarSection() {
  return (
    <section
      className="relative z-10 overflow-hidden border-y landing-border landing-section-bg py-4 sm:-mt-12 sm:py-5 md:-mt-16"
      aria-label="Trusted by engineers at leading companies"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--hero-fade-edge)] via-[color-mix(in_srgb,var(--hero-fade-edge)_80%,transparent)] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--hero-fade-edge)] via-[color-mix(in_srgb,var(--hero-fade-edge)_80%,transparent)] to-transparent sm:w-24" />

      <div className="motion-reduce:hidden">
        <LogoMarquee />
      </div>

      <div className="hidden motion-reduce:flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 sm:gap-x-10">
        <span className="w-full text-center text-xs font-mono uppercase tracking-[0.25em] landing-muted">
          Trusted by engineers at
        </span>
        {TRUSTED_BY_LOGOS.map((logo) => (
          <div key={logo.name} className="flex items-center landing-muted" aria-label={logo.name}>
            <CompanyLogoMark {...logo} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function SecondaryCTASection() {
  return (
    <section className="relative z-10 border-t landing-border px-4 py-10 sm:py-12">
      <ScrollReveal>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="max-w-md text-center text-sm landing-subtext sm:text-left md:text-base">
            Competing at the highest level with cutting-edge judging and real-time leaderboards.
          </p>
          <Link href="/contests" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="btn-brand-outline w-full rounded-full px-8 sm:w-auto"
            >
              Try a Contest
            </Button>
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

export function FeaturesSection() {
  const benefits = [
    {
      title: 'Live Contests & Real-time Rankings',
      desc: 'Compete in algorithmic challenges with global participants. Instant verdicts and Elo-based ratings keep every round thrilling.',
    },
    {
      title: 'Expertise & Community',
      desc: 'Join a thriving ecosystem of competitive programmers and hackathon builders. Learn, collaborate, and grow together.',
      featured: true,
    },
    {
      title: 'Hackathons & Team Collaboration',
      desc: 'Build innovative projects, form teams, get mentored, and showcase your work to judges and sponsors worldwide.',
    },
  ];

  return (
    <section className="border-t landing-border px-4 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal className="mb-10 text-center sm:mb-16">
          <h2 className="mb-3 text-2xl font-light text-foreground sm:text-3xl md:text-4xl">Our Benefits</h2>
          <p className="mx-auto max-w-md text-sm landing-muted">
            Everything you need to compete, build, and win — in one premium platform.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.1}>
              {b.featured ? (
                <div className="flex h-full flex-col items-center text-center">
                  <div className="relative mx-auto mb-6 aspect-square w-full max-w-[180px] overflow-hidden rounded-3xl bg-background sm:max-w-[220px]">
                    <div className="benefit-blob absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-3">{b.title}</h3>
                  <p className="text-sm landing-muted leading-relaxed">{b.desc}</p>
                </div>
              ) : (
                <div className="glass-card flex h-full flex-col justify-center p-6 sm:p-8">
                  <h3 className="mb-3 text-base font-medium text-foreground sm:mb-4 sm:text-lg">{b.title}</h3>
                  <p className="text-sm leading-relaxed landing-muted">{b.desc}</p>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CPShowcase() {
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [contestModalOpen, setContestModalOpen] = useState(false);
  const featuredContests = MOCK_CONTESTS.filter((c) => c.status === 'live' || c.status === 'upcoming').slice(0, 2);
  const liveContest = MOCK_CONTESTS.find((c) => c.slug === 'weekly-challenge-142') ?? MOCK_CONTESTS[0];

  const openContestModal = (contest: Contest) => {
    setSelectedContest(contest);
    setContestModalOpen(true);
  };

  return (
    <section className="grid-bg border-t landing-border px-4 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal>
            <span className="text-xs font-mono uppercase tracking-wider text-[#67BAF4] dark:text-[#67BAF4]">Competitive Programming</span>
            <h2 className="mt-2 mb-4 text-2xl font-light sm:text-3xl md:text-4xl">Structured. Analytical. Performance-driven.</h2>
            <p className="mb-6 text-sm landing-muted sm:text-base">Live contests, problem archives, real-time leaderboards, and rating systems inspired by the best competitive programming platforms.</p>
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              {featuredContests.map((contest) => (
                <button
                  key={contest.id}
                  type="button"
                  onClick={() => openContestModal(contest)}
                  className="glass-card-hover rounded-2xl p-4 text-left transition-all"
                >
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${contest.status === 'live' ? 'badge-lime' : 'badge-violet'}`}>
                    {contest.status === 'live' ? '● Live' : contest.status}
                  </span>
                  <h3 className="mt-2 text-sm font-medium text-foreground">{contest.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-[11px] landing-muted">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{contest.participants.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Code2 className="h-3 w-3" />{contest.problems.length} problems</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{contest.duration}m</span>
                  </div>
                </button>
              ))}
            </div>
            <Link href="/contests">
              <Button variant="outline" className="btn-brand-outline w-full rounded-full sm:w-auto">
                View Contests <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <button
              type="button"
              onClick={() => openContestModal(liveContest)}
              className="glass-card-hover w-full rounded-2xl p-4 text-left font-mono text-xs sm:p-6 sm:text-sm"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b landing-border">
                <span className="landing-muted">{liveContest.title}</span>
                <span className="badge-lime text-xs px-2 py-0.5 rounded-full">LIVE</span>
              </div>
              {['charliek', 'alicec', 'dianal', 'bob_codes'].map((u, i) => (
                <div key={u} className="flex items-center justify-between py-2 border-b border-[var(--hero-border)] last:border-0">
                  <span className="landing-muted w-6">#{i + 1}</span>
                  <span className="flex-1">{u}</span>
                  <span className="text-primary">{4 - i} solved</span>
                </div>
              ))}
              <p className="mt-4 text-[11px] landing-muted">Click to view contest details</p>
            </button>
          </ScrollReveal>
        </div>
      </div>

      <ContestDetailModal
        contest={selectedContest}
        open={contestModalOpen}
        onOpenChange={setContestModalOpen}
      />
    </section>
  );
}

const HACKATHON_PROJECTS = [
  { name: 'AI Code Reviewer', track: 'AI & ML' },
  { name: 'EcoTrack', track: 'Climate Tech' },
  { name: 'DeFi Dashboard', track: 'Web3' },
  { name: 'HealthBot', track: 'Health' },
] as const;

export function HackathonShowcase() {
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [hackathonModalOpen, setHackathonModalOpen] = useState(false);
  const innovateHackathon = MOCK_HACKATHONS.find((h) => h.slug === 'innovate-2026') ?? MOCK_HACKATHONS[0];

  const openHackathonModal = () => {
    setSelectedHackathon(innovateHackathon);
    setHackathonModalOpen(true);
  };

  return (
    <section className="mesh-bg border-t landing-border px-4 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal delay={0.2} className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {HACKATHON_PROJECTS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={openHackathonModal}
                  className="glass-card-hover rounded-3xl p-4 text-left transition-all"
                >
                  <div className="mb-3 h-20 rounded-2xl bg-gradient-to-br from-[#67BAF4]/20 to-[#1E466B]/10 sm:h-24" />
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="mt-1 text-xs landing-muted">Innovate 2026 · {p.track}</p>
                </button>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#1E466B] dark:text-[#67BAF4]">Hackathons</span>
            <h2 className="mt-2 mb-4 text-2xl font-light sm:text-3xl md:text-4xl">Creative. Collaborative. Innovation-focused.</h2>
            <p className="mb-6 text-sm landing-muted sm:text-base">Build projects, form teams, get mentored, and compete for prizes in a completely different experience.</p>
            <Link href="/hackathons">
              <Button className="btn-brand w-full rounded-full border-0 sm:w-auto">
                Browse Hackathons <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </div>

      <HackathonDetailModal
        hackathon={selectedHackathon}
        open={hackathonModalOpen}
        onOpenChange={setHackathonModalOpen}
      />
    </section>
  );
}

export function FAQSection() {
  const faqs = [
    { q: 'What is CodeClash?', a: 'CodeClash is a premium platform combining competitive programming contests and hackathons in one ecosystem.' },
    { q: 'Is it free to participate?', a: 'Yes! You can join public contests and hackathons for free.' },
    { q: 'How do ratings work?', a: 'We use an Elo-based rating system similar to major competitive programming platforms. Your rating changes based on contest performance.' },
    { q: 'Can I organize my own events?', a: 'Absolutely. Use the Organizer Dashboard to create and manage contests and hackathons.' },
  ];

  return (
    <section className="border-t landing-border px-4 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-2xl">
        <ScrollReveal className="mb-8 text-center sm:mb-12">
          <h2 className="mb-4 text-2xl font-light sm:text-3xl">Frequently asked questions</h2>
        </ScrollReveal>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq) => (
            <ScrollReveal key={faq.q}>
              <div className="glass-card p-4 sm:p-5">
                <h3 className="mb-2 text-sm font-medium sm:text-base">{faq.q}</h3>
                <p className="text-sm landing-muted">{faq.a}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    { name: 'Alice Chen', role: 'Grandmaster · MIT', quote: 'The best competitive programming platform I\'ve used. Clean UI, fast judging, great community.' },
    { name: 'Marcus Webb', role: 'Organizer · Stripe', quote: 'Organizing hackathons on CodeClash was seamless. The dashboard gives us everything we need.' },
    { name: 'Diana Li', role: 'Participant · Tsinghua', quote: 'Love the dual experience — I compete in contests and build projects in hackathons on the same platform.' },
  ];

  return (
    <section className="border-t landing-border px-4 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto">
        <ScrollReveal className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 text-2xl font-light sm:text-3xl">Trusted by developers worldwide</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <ScrollReveal key={t.name}>
              <div className="glass-card h-full p-5 sm:p-6">
                <p className="mb-4 text-sm landing-muted sm:text-base">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-medium sm:text-base">{t.name}</p>
                  <p className="text-xs landing-muted">{t.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SponsorsSection() {
  const sponsors = ['Vercel', 'Stripe', 'Linear', 'GitHub', 'Amazon', 'Google'];
  return (
    <section className="py-16 border-t landing-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm landing-muted mb-8">Trusted by leading companies</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {sponsors.map((s) => (
            <span key={s} className="text-lg font-mono landing-muted hover:text-foreground transition-colors cursor-default">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
