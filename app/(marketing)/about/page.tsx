'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const HERO_IMAGES = {
  main: '/about/hero-main.jpg',
  topLeft: '/about/hero-left.jpg',
  topRight: '/about/hero-right.jpg',
  bottom: '/about/hero-bottom.jpg',
};

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Analysis',
    side: 'left' as const,
    desc: 'We study competitive programming ecosystems, hackathon workflows, and what developers actually need to grow — from rating systems to team collaboration.',
  },
  {
    num: '02',
    title: 'Architecture',
    side: 'right' as const,
    desc: 'We design a unified platform where contests and hackathons live together — real-time judging, Elo ratings, team management, and organizer tools.',
  },
  {
    num: '03',
    title: 'Build & Ship',
    side: 'right' as const,
    desc: 'We ship live contests with instant verdicts, hackathon registration flows, mentor matching, and a global leaderboard that developers trust.',
  },
  {
    num: '04',
    title: 'Scale',
    side: 'left' as const,
    desc: 'We grow a worldwide community of competitors and builders — 60+ countries, thousands of submissions, and events running around the clock.',
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 pt-28 md:pt-32">
        <p className="about-serif italic text-sm landing-muted tracking-wide">
          main / about us
        </p>
      </div>

      <section className="relative container mx-auto px-4 md:px-8 pb-20 md:pb-32">
        <div className="relative flex items-center justify-center min-h-[65vh] md:min-h-[80vh] lg:min-h-[85vh]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute z-10 top-[2%] md:top-0 left-1/2 -translate-x-1/2 w-[min(72vw,320px)] md:w-[420px] lg:w-[480px] h-[min(85vw,400px)] md:h-[560px] lg:h-[620px] overflow-hidden border landing-border shadow-[0_0_80px_rgba(var(--hero-accent-rgb),0.12)]"
          >
            <img
              src={HERO_IMAGES.main}
              alt="Developer coding on laptop"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20 pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="absolute z-20 top-[10%] md:top-[8%] left-[0%] md:left-[4%] lg:left-[8%] w-[clamp(120px,22vw,240px)] aspect-square overflow-hidden border landing-border shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <img
              src={HERO_IMAGES.topLeft}
              alt="Developer writing code"
              className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="absolute z-20 top-[14%] md:top-[12%] right-[0%] md:right-[4%] lg:right-[8%] w-[clamp(110px,20vw,220px)] aspect-square overflow-hidden border border-primary/20 shadow-[0_20px_60px_rgba(var(--hero-accent-rgb),0.15)]"
          >
            <img
              src={HERO_IMAGES.topRight}
              alt="Code on mobile device"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="absolute z-20 bottom-[18%] md:bottom-[14%] left-[8%] md:left-[14%] w-[clamp(100px,18vw,200px)] aspect-[4/3] overflow-hidden border border-primary/20 shadow-[0_20px_50px_rgba(var(--hero-accent-rgb),0.1)] hidden sm:block"
          >
            <img
              src={HERO_IMAGES.bottom}
              alt="Digital code matrix"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-30 text-[clamp(3.5rem,14vw,11rem)] font-bold lowercase leading-[0.85] tracking-tight text-center select-none w-full text-foreground drop-shadow-[0_4px_30px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
          >
            about us
          </motion.h1>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 flex flex-col items-center mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-sm landing-subtext mb-6"
        >
          <Plus className="h-4 w-4 text-primary" />
          <span>Based globally, competing worldwide</span>
        </motion.div>
        <div className="w-px h-24 md:h-32 bg-gradient-to-b from-[var(--hero-border)] to-transparent" />
      </section>

      <section className="container mx-auto px-4 md:px-8 mb-20 md:mb-32 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl lg:text-[2.75rem] font-bold leading-snug tracking-tight text-center lowercase text-foreground"
        >
          we are a platform collective of competitive programmers, hackathon builders, judges, mentors, and strategic engineers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 md:mt-16 max-w-sm ml-auto text-right"
        >
          <p className="text-sm md:text-base landing-muted leading-relaxed">
            CodeClash merges the precision of algorithmic competition with the creativity of hackathon innovation — one ecosystem, one community, infinite possibilities.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 md:px-8 pb-24 md:pb-40 max-w-3xl relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="about-serif italic text-primary text-lg md:text-xl mb-16 md:mb-20"
        >
          process.
        </motion.p>

        <svg
          className="absolute left-1/2 -translate-x-1/2 top-24 md:top-28 w-[120px] md:w-[180px] h-[85%] pointer-events-none hidden md:block"
          viewBox="0 0 180 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            className="about-process-path"
            d="M90 0 C 90 80, 30 120, 30 200 C 30 280, 150 320, 150 400 C 150 480, 40 520, 40 600 C 40 680, 140 720, 140 800 C 140 860, 90 880, 90 900"
          />
        </svg>

        <div className="space-y-24 md:space-y-32 relative">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`flex ${step.side === 'left' ? 'justify-start md:pr-[45%]' : 'justify-end md:pl-[45%]'} relative`}
            >
              <div className={`hidden md:block absolute top-2 ${step.side === 'left' ? 'right-[42%]' : 'left-[42%]'} w-2.5 h-2.5 rounded-full bg-primary about-step-dot`} />

              <div className="max-w-xs">
                <p className="text-primary font-mono text-sm mb-2">{step.num}.</p>
                <h3 className="text-xl md:text-2xl font-bold lowercase mb-3 text-foreground">{step.title}</h3>
                <p className="text-sm landing-muted leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t landing-border py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
          {[
            { value: '2,400+', label: 'Active competitors' },
            { value: '150+', label: 'Contests hosted' },
            { value: '40+', label: 'Hackathons run' },
            { value: '60+', label: 'Countries reached' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold font-mono text-primary">{s.value}</p>
              <p className="text-xs landing-muted mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-20 md:py-28 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="about-serif italic landing-muted text-lg">ready to join us?</p>
          <h2 className="text-3xl md:text-5xl font-bold lowercase tracking-tight text-foreground">
            let&apos;s build together
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/get-started">
              <Button
                variant="outline"
                className="btn-brand-outline rounded-full px-10 h-12 text-sm tracking-wide"
              >
                get in touch
              </Button>
            </Link>
            <Link href="/contests">
              <Button className="btn-brand rounded-full px-10 h-12 border-0 text-sm">
                browse contests
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
