'use client';
import Link from "next/link";
import { Terminal, ArrowLeft, FileText, Users, Sword, Trophy, AlertTriangle, Scale, RefreshCw, Mail } from "lucide-react";

const sections = [
  {
    icon: Users,
    title: "Account & Eligibility",
    content: [
      {
        subtitle: "Age Requirement",
        text: "You must be at least 13 years old to use CodeClash. Users under 18 require parental or guardian consent where required by local law.",
      },
      {
        subtitle: "Account Responsibility",
        text: "You are responsible for maintaining the security of your account. Any activity carried out under your account is your responsibility.",
      },
      {
        subtitle: "One Account Per Person",
        text: "Creating multiple accounts to gain an unfair competitive advantage is strictly prohibited and will result in permanent bans.",
      },
    ],
  },
  {
    icon: Sword,
    title: "Competitive Conduct",
    content: [
      {
        subtitle: "Fair Play",
        text: "All code submitted in battles and challenges must be written by you during the session. Using AI assistance, pre-written solutions, or plagiarising code from others is strictly forbidden.",
      },
      {
        subtitle: "No Cheating or Exploits",
        text: "Exploiting bugs, vulnerabilities, or unintended behaviour in the platform to gain an advantage is prohibited. Report issues responsibly instead.",
      },
      {
        subtitle: "Respectful Competition",
        text: "Harassment, hate speech, or abusive behaviour toward other competitors will not be tolerated and may result in an immediate permanent ban.",
      },
    ],
  },
  {
    icon: Trophy,
    title: "Prizes & Tournaments",
    content: [
      {
        subtitle: "Tournament Rules",
        text: "Each tournament may have specific rules that supersede these general terms. Participants must read and agree to tournament-specific rules before entering.",
      },
      {
        subtitle: "Prize Eligibility",
        text: "Prizes are awarded at our discretion. We reserve the right to disqualify any participant found to have violated the terms of fair play.",
      },
      {
        subtitle: "Prize Fulfilment",
        text: "Digital prizes are delivered within 14 business days. Physical prizes within 30 days. We are not responsible for delays caused by third-party fulfilment services.",
      },
    ],
  },
  {
    icon: FileText,
    title: "Intellectual Property",
    content: [
      {
        subtitle: "Your Code",
        text: "Code you write during sessions remains yours. By submitting it on CodeClash, you grant us a non-exclusive licence to display it for leaderboard and replay features.",
      },
      {
        subtitle: "Platform Content",
        text: "All challenges, UI, branding, and platform content are the intellectual property of CodeClash. You may not reproduce or distribute them without written permission.",
      },
      {
        subtitle: "Feedback",
        text: "Any feedback or suggestions you submit may be used by us to improve the platform without obligation or compensation to you.",
      },
    ],
  },
  {
    icon: AlertTriangle,
    title: "Prohibited Activities",
    content: [
      {
        subtitle: "System Integrity",
        text: "You may not attempt to reverse-engineer, scrape, overload, or interfere with our servers, APIs, or platform infrastructure.",
      },
      {
        subtitle: "Illegal Use",
        text: "Using CodeClash for any unlawful purpose, including distribution of malware or phishing, is strictly prohibited and will be reported to relevant authorities.",
      },
      {
        subtitle: "Automated Bots",
        text: "Running automated bots or scripts to participate in battles, farm XP, or manipulate rankings is banned.",
      },
    ],
  },
  {
    icon: Scale,
    title: "Disclaimers & Liability",
    content: [
      {
        subtitle: "Service Availability",
        text: "CodeClash is provided 'as is'. We make no guarantees about uptime, accuracy of rankings, or uninterrupted service.",
      },
      {
        subtitle: "Limitation of Liability",
        text: "To the fullest extent permitted by law, CodeClash shall not be liable for indirect, incidental, or consequential damages arising from your use of the platform.",
      },
      {
        subtitle: "Indemnification",
        text: "You agree to indemnify CodeClash against claims arising from your violation of these terms or misuse of the platform.",
      },
    ],
  },
  {
    icon: RefreshCw,
    title: "Changes to Terms",
    content: [
      {
        subtitle: "Updates",
        text: "We may update these terms at any time. Significant changes will be communicated via email or an in-app notice at least 14 days before taking effect.",
      },
      {
        subtitle: "Continued Use",
        text: "Continuing to use CodeClash after changes take effect constitutes acceptance of the updated terms.",
      },
      {
        subtitle: "Termination",
        text: "You may stop using CodeClash and delete your account at any time. We reserve the right to suspend or terminate accounts that violate these terms.",
      },
    ],
  },
];

export default function TermsOfService() {
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

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/signin" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-mono">Back to Sign In</span>
          </Link>
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-black font-mono tracking-tighter text-lg">CodeClash</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 mb-6">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-mono text-primary font-semibold tracking-wider uppercase">Terms of Service</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black font-mono tracking-tight mb-4">
          Play Hard,{" "}
          <span className="text-primary">Play Fair</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm max-w-xl mx-auto leading-relaxed">
          These terms govern your use of CodeClash. By signing in, you agree to these rules — so everyone can compete on a level playing field.
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
            Be a fair competitor. Don't cheat, harass others, or abuse the platform. Your code is yours, but our platform is ours. We can remove accounts that break the rules.
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
            <h2 className="font-bold font-mono tracking-tight mb-1">Legal questions?</h2>
            <p className="text-sm text-muted-foreground">
              Reach us at{" "}
              <a
                href="mailto:legal@codeclash.dev"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors font-mono"
              >
                legal@codeclash.dev
              </a>
              {" "}— we respond within 48 hours.
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground font-mono">
            Also read our{" "}
            <Link href="/privacy" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
            {" "}· Back to{" "}
            <Link href="/signin" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
