'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/shared/motion';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useHeroReady } from '@/components/marketing/hero-ready-context';
import { CompanyLogoMark, LogoMarquee, TRUSTED_BY_LOGOS } from '@/components/marketing/company-logos';

function HeroBubblesMount(props: { onProgress?: (p: number) => void; onReady?: () => void }) {
  const { reportProgress } = useHeroReady();

  useEffect(() => {
    reportProgress(32);
  }, [reportProgress]);

  return <HeroBubbles {...props} />;
}

const HeroBubbles = dynamic(
  () => import('@/components/marketing/HeroBubbles').then((m) => ({ default: m.HeroBubbles })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-black" /> },
);

function FloatingStat({ label, className }: { label: string; className?: string }) {
  const [value, ...rest] = label.split(' ');
  const description = rest.join(' ');

  return (
    <div className={className}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-md px-3 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">{value}</span>
        <span className="text-[11px] md:text-xs text-white/80 whitespace-nowrap">{description}</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { isReady, reportProgress, reportReady } = useHeroReady();

  useEffect(() => {
    reportProgress(18);
  }, [reportProgress]);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden">
      <HeroBubblesMount onProgress={reportProgress} onReady={reportReady} />

      {/* Corner stats — pinned to viewport edges, outside headline area */}
      <FloatingStat
        label="+2.4k active competitors"
        className={`pointer-events-none absolute top-20 left-3 z-10 hidden sm:block md:top-24 md:left-8 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      />
      <FloatingStat
        label="+150 contests hosted"
        className={`pointer-events-none absolute top-20 right-3 z-10 hidden sm:block md:top-24 md:right-8 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      />
      <FloatingStat
        label="+50k submissions judged"
        className={`pointer-events-none absolute bottom-24 left-3 z-10 hidden md:block md:bottom-28 md:left-8 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Side copy — bottom-right corner, clear of headline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-28 right-4 md:right-8 max-w-[220px] hidden lg:block z-10 pointer-events-none"
      >
        <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md px-4 py-3 space-y-2">
          <p className="text-xs md:text-sm text-white/85 leading-relaxed">
            The premium platform for competitive programming and hackathons worldwide.
          </p>
          <p className="text-xs md:text-sm text-white/85 leading-relaxed">
            Compete, build, and climb the global rankings.
          </p>
        </div>
      </motion.div>

      <div className="relative z-20 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col items-center justify-center px-4 pt-20 pb-16 sm:pt-24 sm:pb-24">
        {/* Headline — isolated layer, nothing overlaps it */}
        <div className="relative w-full py-8 sm:py-12 md:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 select-none font-hero text-[clamp(3rem,13vw,8.5rem)] font-black leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]"
          >
            <span className="block text-left">Where</span>
            <span className="block pr-2 text-right sm:pr-4 md:pr-16">Code</span>
            <span className="mt-1 block pl-4 text-left sm:mt-2 sm:pl-8 md:pl-24">Meets</span>
            <span className="mt-1 block text-center sm:mt-2">Competition</span>
          </motion.h1>
        </div>

        {/* Dual pill CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30 mt-2 flex w-full justify-center px-2 sm:px-0"
        >
          <div className="flex w-full max-w-sm flex-col items-stretch gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_0_40px_rgba(255,140,66,0.08)] backdrop-blur-xl sm:max-w-none sm:flex-row sm:items-center sm:rounded-full">
            <Link href="/contests" className="w-full sm:w-auto">
              <button className="w-full rounded-full px-5 py-3 text-sm text-white/70 transition-colors hover:text-white sm:px-6">
                Explore Contests
              </button>
            </Link>
            <Link href="/get-started" className="w-full sm:w-auto">
              <button className="w-full rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FFB088] px-6 py-3 text-sm font-medium text-black shadow-[0_0_30px_rgba(255,140,66,0.35)] transition-all hover:from-[#FF7043] hover:to-[#FF9A6C] sm:px-8">
                Get Started
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Mobile stats row */}
        <div className={`flex flex-wrap justify-center gap-3 mt-10 sm:hidden relative z-30 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
          {['+2.4k competitors', '+150 contests', '+50k submissions'].map((s) => (
            <span key={s} className="text-xs text-white/90 rounded-full border border-white/15 bg-black/60 backdrop-blur-md px-3 py-1.5">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LogoBarSection() {
  return (
    <section
      className="relative z-10 overflow-hidden border-y border-white/[0.06] bg-white/[0.02] py-4 sm:-mt-12 sm:py-5 md:-mt-16"
      aria-label="Trusted by engineers at leading companies"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-24" />

      <div className="motion-reduce:hidden">
        <LogoMarquee />
      </div>

      <div className="hidden motion-reduce:flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 sm:gap-x-10">
        <span className="w-full text-center text-xs font-mono uppercase tracking-[0.25em] text-white/40">
          Trusted by engineers at
        </span>
        {TRUSTED_BY_LOGOS.map((logo) => (
          <div key={logo.name} className="flex items-center text-white/35" aria-label={logo.name}>
            <CompanyLogoMark {...logo} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function SecondaryCTASection() {
  return (
    <section className="relative z-10 border-t border-white/[0.06] px-4 py-10 sm:py-12">
      <ScrollReveal>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="max-w-md text-center text-sm text-white/50 sm:text-left md:text-base">
            Competing at the highest level with cutting-edge judging and real-time leaderboards.
          </p>
          <Link href="/contests" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full rounded-full border-[#FF8C42]/40 px-8 text-white shadow-[0_0_20px_rgba(255,140,66,0.1)] hover:border-[#FF8C42] hover:bg-[#FF8C42]/10 sm:w-auto"
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
    <section className="border-t border-white/[0.06] px-4 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal className="mb-10 text-center sm:mb-16">
          <h2 className="mb-3 text-2xl font-light text-white sm:text-3xl md:text-4xl">Our Benefits</h2>
          <p className="mx-auto max-w-md text-sm text-white/40">
            Everything you need to compete, build, and win — in one premium platform.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.1}>
              {b.featured ? (
                <div className="flex h-full flex-col items-center text-center">
                  <div className="relative mx-auto mb-6 aspect-square w-full max-w-[180px] overflow-hidden rounded-3xl bg-black sm:max-w-[220px]">
                    <div className="benefit-blob absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">{b.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{b.desc}</p>
                </div>
              ) : (
                <div className="glass-card flex h-full flex-col justify-center p-6 sm:p-8">
                  <h3 className="mb-3 text-base font-medium text-white sm:mb-4 sm:text-lg">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-white/40">{b.desc}</p>
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
  return (
    <section className="grid-bg border-t border-white/10 px-4 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal>
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF8C42]">Competitive Programming</span>
            <h2 className="mt-2 mb-4 text-2xl font-light sm:text-3xl md:text-4xl">Structured. Analytical. Performance-driven.</h2>
            <p className="mb-6 text-sm text-white/40 sm:text-base">Live contests, problem archives, real-time leaderboards, and rating systems inspired by the best competitive programming platforms.</p>
            <Link href="/contests">
              <Button variant="outline" className="w-full rounded-full border-white/20 hover:border-[#FF8C42]/50 sm:w-auto">
                View Contests <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="glass-card p-4 font-mono text-xs sm:p-6 sm:text-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <span className="text-white/40">Weekly Challenge #142</span>
                <span className="badge-lime text-xs px-2 py-0.5 rounded-full">LIVE</span>
              </div>
              {['charliek', 'alicec', 'dianal', 'bob_codes'].map((u, i) => (
                <div key={u} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/40 w-6">#{i + 1}</span>
                  <span className="flex-1">{u}</span>
                  <span className="text-lime">{4 - i} solved</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export function HackathonShowcase() {
  return (
    <section className="mesh-bg border-t border-white/10 px-4 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal delay={0.2} className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {['AI Code Reviewer', 'EcoTrack', 'DeFi Dashboard', 'HealthBot'].map((p) => (
                <div key={p} className="glass-card rounded-3xl p-4">
                  <div className="mb-3 h-20 rounded-2xl bg-gradient-to-br from-[#FF8C42]/20 to-[#4A90D9]/10 sm:h-24" />
                  <p className="text-sm font-medium">{p}</p>
                  <p className="mt-1 text-xs text-white/40">Innovate 2026</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-wider text-lime">Hackathons</span>
            <h2 className="mt-2 mb-4 text-2xl font-light sm:text-3xl md:text-4xl">Creative. Collaborative. Innovation-focused.</h2>
            <p className="mb-6 text-sm text-white/40 sm:text-base">Build projects, form teams, get mentored, and compete for prizes in a completely different experience.</p>
            <Link href="/hackathons">
              <Button className="w-full rounded-full border-0 bg-gradient-to-r from-[#FF8C42] to-[#FFB088] text-black hover:opacity-90 sm:w-auto">
                Browse Hackathons <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </div>
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
    <section className="border-t border-white/10 px-4 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-2xl">
        <ScrollReveal className="mb-8 text-center sm:mb-12">
          <h2 className="mb-4 text-2xl font-light sm:text-3xl">Frequently asked questions</h2>
        </ScrollReveal>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq) => (
            <ScrollReveal key={faq.q}>
              <div className="glass-card p-4 sm:p-5">
                <h3 className="mb-2 text-sm font-medium sm:text-base">{faq.q}</h3>
                <p className="text-sm text-white/40">{faq.a}</p>
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
    <section className="border-t border-white/10 px-4 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto">
        <ScrollReveal className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 text-2xl font-light sm:text-3xl">Trusted by developers worldwide</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <ScrollReveal key={t.name}>
              <div className="glass-card h-full p-5 sm:p-6">
                <p className="mb-4 text-sm text-white/40 sm:text-base">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-medium sm:text-base">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
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
    <section className="py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-white/40 mb-8">Trusted by leading companies</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {sponsors.map((s) => (
            <span key={s} className="text-lg font-mono text-white/20 hover:text-white/50 transition-colors cursor-default">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
