'use client';
import Link from "next/link";
import { Terminal, ArrowLeft, Shield, Eye, Database, Share2, Lock, Mail } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Account Information",
        text: "When you sign in with Google, we collect your name, email address, and profile picture. Guest users are assigned an anonymous session identifier.",
      },
      {
        subtitle: "Usage Data",
        text: "We collect information about how you interact with CodeClash — battles entered, challenges completed, scores achieved, and time spent on the platform.",
      },
      {
        subtitle: "Technical Data",
        text: "We automatically collect your IP address, browser type, device information, and cookies necessary for the platform to function correctly.",
      },
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Data",
    content: [
      {
        subtitle: "Platform Functionality",
        text: "Your data powers core features: matchmaking, leaderboards, challenge tracking, and your personal profile and stats.",
      },
      {
        subtitle: "Performance & Analytics",
        text: "Aggregated, anonymised analytics help us understand feature usage and improve platform performance.",
      },
      {
        subtitle: "Communications",
        text: "We may send you important service updates or notifications related to your account. You can opt out of non-essential emails at any time.",
      },
    ],
  },
  {
    icon: Share2,
    title: "Data Sharing",
    content: [
      {
        subtitle: "We Do Not Sell Your Data",
        text: "Your personal information is never sold to third parties, advertisers, or data brokers — period.",
      },
      {
        subtitle: "Service Providers",
        text: "We work with trusted providers (e.g. cloud hosting, authentication) who process data solely on our behalf under strict data-processing agreements.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your data if required by applicable law, court order, or to protect the rights and safety of our users.",
      },
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      {
        subtitle: "Encryption",
        text: "All data in transit is encrypted using TLS 1.3. Sensitive data at rest is encrypted using AES-256.",
      },
      {
        subtitle: "Access Controls",
        text: "Access to production data is restricted to authorised personnel only, enforced with multi-factor authentication.",
      },
      {
        subtitle: "Incident Response",
        text: "In the event of a data breach we will notify affected users within 72 hours in accordance with applicable regulations.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Portability",
        text: "You can request a copy of all personal data we hold about you at any time by contacting us.",
      },
      {
        subtitle: "Deletion",
        text: "You may request full deletion of your account and associated data. Deletion is processed within 30 days.",
      },
      {
        subtitle: "Correction",
        text: "If any information we hold is inaccurate, you have the right to request correction.",
      },
    ],
  },
];

export default function PrivacyPolicy() {
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
          <Shield className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-mono text-primary font-semibold tracking-wider uppercase">Privacy Policy</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black font-mono tracking-tight mb-4">
          Your Privacy,{" "}
          <span className="text-primary">Protected</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm max-w-xl mx-auto leading-relaxed">
          We believe privacy is a right, not a feature. Here's exactly how we collect, use, and protect your data.
        </p>
        <p className="mt-4 text-xs text-muted-foreground font-mono">
          Last updated: <span className="text-foreground/70">June 29, 2026</span>
        </p>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 pb-20 space-y-8">
        {/* Quick Summary Card */}
        <div
          className="rounded-xl border border-primary/20 p-6"
          style={{ background: "hsl(160 84% 39% / 0.06)" }}
        >
          <p className="text-sm font-mono text-foreground/80 leading-relaxed">
            <span className="text-primary font-semibold">TL;DR —</span>{" "}
            We collect only what's necessary to run CodeClash. We don't sell your data. You can delete your account any time. We use industry-standard security to keep your information safe.
          </p>
        </div>

        {sections.map(({ icon: Icon, title, content }) => (
          <div
            key={title}
            className="rounded-xl border border-border/50 overflow-hidden"
            style={{ background: "hsl(222 47% 13%)" }}
          >
            {/* Section header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border/40"
              style={{ background: "hsl(222 47% 10%)" }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h2 className="font-black font-mono tracking-tight text-lg">{title}</h2>
            </div>

            {/* Section content */}
            <div className="divide-y divide-border/30">
              {content.map(({ subtitle, text }) => (
                <div key={subtitle} className="px-6 py-5">
                  <h3 className="text-sm font-semibold font-mono text-primary mb-1.5">{subtitle}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact */}
        <div
          className="rounded-xl border border-border/50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ background: "hsl(222 47% 13%)" }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold font-mono tracking-tight mb-1">Questions about your privacy?</h2>
            <p className="text-sm text-muted-foreground">
              Reach us at{" "}
              <a
                href="mailto:privacy@codeclash.dev"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors font-mono"
              >
                privacy@codeclash.dev
              </a>
              {" "}— we respond within 48 hours.
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground font-mono">
            Also read our{" "}
            <Link href="/terms" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Terms of Service
            </Link>
            {" "}· Back to{" "}
            <Link href="/get-started" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
