'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/shared/motion';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useHeroReady } from '@/components/marketing/hero-ready-context';

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
    <section className="relative flex flex-col items-center justify-center overflow-hidden min-h-screen">
      <HeroBubblesMount onProgress={reportProgress} onReady={reportReady} />

      {/* Corner stats — pinned to viewport edges, outside headline area */}
      <FloatingStat
        label="+2.4k active competitors"
        className={`absolute top-24 left-4 md:left-8 hidden sm:block z-10 pointer-events-none transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      />
      <FloatingStat
        label="+150 contests hosted"
        className={`absolute top-24 right-4 md:right-8 hidden sm:block z-10 pointer-events-none transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      />
      <FloatingStat
        label="+50k submissions judged"
        className={`absolute bottom-28 left-4 md:left-8 hidden md:block z-10 pointer-events-none transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
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

      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 pt-24 pb-24 flex flex-col items-center justify-center min-h-screen">
        {/* Headline — isolated layer, nothing overlaps it */}
        <div className="relative w-full py-12 md:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 text-[clamp(3rem,10vw,7rem)] font-light leading-[0.95] tracking-tight text-white select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            <span className="block text-left">Where</span>
            <span className="block text-right pr-4 md:pr-16">Code</span>
            <span className="block text-left pl-8 md:pl-24 mt-2">Meets</span>
            <span className="block text-center mt-2">Competition</span>
          </motion.h1>
        </div>

        {/* Dual pill CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-2 relative z-30"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl p-1.5 shadow-[0_0_40px_rgba(255,140,66,0.08)]">
            <Link href="/contests">
              <button className="rounded-full px-6 py-3 text-sm text-white/70 hover:text-white transition-colors">
                Explore Contests
              </button>
            </Link>
            <Link href="/get-started">
              <button className="rounded-full px-8 py-3 text-sm font-medium text-black bg-gradient-to-r from-[#FF8C42] to-[#FFB088] hover:from-[#FF7043] hover:to-[#FF9A6C] transition-all shadow-[0_0_30px_rgba(255,140,66,0.35)]">
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
  const logos = ['Vercel', 'Stripe', 'GitHub', 'Linear', 'Amazon', 'Google'];
  return (
    <section className="relative z-10 px-4 -mt-8 mb-8">
      <ScrollReveal>
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-sm md:text-base font-medium text-white/30 hover:text-white/60 transition-colors cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

export function SecondaryCTASection() {
  return (
    <section className="relative z-10 py-12 px-4 border-t border-white/[0.06]">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm md:text-base text-white/50 text-center sm:text-left max-w-md">
            Competing at the highest level with cutting-edge judging and real-time leaderboards.
          </p>
          <Link href="/contests">
            <Button
              variant="outline"
              className="rounded-full px-8 border-[#FF8C42]/40 text-white hover:border-[#FF8C42] hover:bg-[#FF8C42]/10 shadow-[0_0_20px_rgba(255,140,66,0.1)]"
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
    <section className="py-24 px-4 border-t border-white/[0.06]">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-3">Our Benefits</h2>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Everything you need to compete, build, and win — in one premium platform.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.1}>
              {b.featured ? (
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-full aspect-square max-w-[220px] mx-auto mb-6 rounded-3xl overflow-hidden relative bg-black">
                    <div className="benefit-blob absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">{b.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{b.desc}</p>
                </div>
              ) : (
                <div className="glass-card p-8 h-full flex flex-col justify-center">
                  <h3 className="text-lg font-medium text-white mb-4">{b.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{b.desc}</p>
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
    <section className="py-24 grid-bg border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <span className="text-xs font-mono text-[#FF8C42] uppercase tracking-wider">Competitive Programming</span>
            <h2 className="text-3xl md:text-4xl font-light mt-2 mb-4">Structured. Analytical. Performance-driven.</h2>
            <p className="text-white/40 mb-6">Live contests, problem archives, real-time leaderboards, and rating systems inspired by the best competitive programming platforms.</p>
            <Link href="/contests">
              <Button variant="outline" className="rounded-full border-white/20 hover:border-[#FF8C42]/50">
                View Contests <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="glass-card p-6 font-mono text-sm">
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
    <section className="py-24 mesh-bg border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={0.2} className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {['AI Code Reviewer', 'EcoTrack', 'DeFi Dashboard', 'HealthBot'].map((p) => (
                <div key={p} className="glass-card p-4 rounded-3xl">
                  <div className="h-24 bg-gradient-to-br from-[#FF8C42]/20 to-[#4A90D9]/10 rounded-2xl mb-3" />
                  <p className="text-sm font-medium">{p}</p>
                  <p className="text-xs text-white/40 mt-1">Innovate 2026</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-1 lg:order-2">
            <span className="text-xs font-mono text-lime uppercase tracking-wider">Hackathons</span>
            <h2 className="text-3xl md:text-4xl font-light mt-2 mb-4">Creative. Collaborative. Innovation-focused.</h2>
            <p className="text-white/40 mb-6">Build projects, form teams, get mentored, and compete for prizes in a completely different experience.</p>
            <Link href="/hackathons">
              <Button className="rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FFB088] text-black hover:opacity-90 border-0">
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
    <section className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-2xl">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl font-light mb-4">Frequently asked questions</h2>
        </ScrollReveal>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <ScrollReveal key={faq.q}>
              <div className="glass-card p-5">
                <h3 className="font-medium mb-2">{faq.q}</h3>
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
    <section className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4">Trusted by developers worldwide</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <ScrollReveal key={t.name}>
              <div className="glass-card p-6">
                <p className="text-white/40 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-medium">{t.name}</p>
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
