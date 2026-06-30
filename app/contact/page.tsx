'use client';
import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  ArrowLeft,
  Mail,
  MessageSquare,
  Bug,
  Lightbulb,
  Shield,
  GitBranch,
  AtSign,
  Send,
  CheckCircle2,
} from "lucide-react";

const topics = [
  { value: "general", label: "General Inquiry", icon: MessageSquare },
  { value: "bug", label: "Bug Report", icon: Bug },
  { value: "feature", label: "Feature Request", icon: Lightbulb },
  { value: "privacy", label: "Privacy / Data", icon: Shield },
  { value: "other", label: "Other", icon: Mail },
];

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@codeclash.dev",
    href: "mailto:hello@codeclash.dev",
    note: "We respond within 48 hours.",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/codeclash-dev",
    href: "https://github.com",
    note: "Open issues & feature requests.",
  },
  {
    icon: AtSign,
    label: "Twitter / X",
    value: "@codeclashdev",
    href: "https://twitter.com",
    note: "Latest news and updates.",
  },
];

export default function ContactPage() {
  const [topic, setTopic] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate async submit
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

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
          <Mail className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-mono text-primary font-semibold tracking-wider uppercase">
            Contact Us
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black font-mono tracking-tight mb-4">
          Let&apos;s{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
            Talk
          </span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm max-w-xl mx-auto leading-relaxed">
          Got a bug, an idea, or just want to say hi? Drop us a message and we&apos;ll get back to you fast.
        </p>
      </section>

      <main className="mx-auto max-w-4xl px-6 pb-20 space-y-8">

        {/* Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {channels.map(({ icon: Icon, label, value, href, note }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border/50 p-5 flex flex-col gap-3 hover:border-primary/40 transition-colors group"
              style={{ background: "hsl(222 47% 13%)" }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{label}</p>
                <p className="text-sm font-mono font-semibold text-primary mt-0.5">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{note}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="rounded-xl border border-border/50 overflow-hidden" style={{ background: "hsl(222 47% 13%)" }}>
          <div
            className="flex items-center gap-3 px-6 py-4 border-b border-border/40"
            style={{ background: "hsl(222 47% 10%)" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Send className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-black font-mono tracking-tight text-lg">Send a Message</h2>
          </div>

          {submitted ? (
            <div className="px-6 py-16 flex flex-col items-center text-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-black font-mono">Message Sent!</h3>
              <p className="text-sm text-muted-foreground font-mono max-w-xs">
                Thanks for reaching out. We&apos;ll get back to you at{" "}
                <span className="text-primary">{email}</span> within 48 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                  setTopic("general");
                }}
                className="mt-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
              {/* Topic selector */}
              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setTopic(value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                        topic === value
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-border/50 bg-background/60 px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-border/50 bg-background/60 px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question, bug, or idea..."
                  className="w-full rounded-lg border border-border/50 bg-background/60 px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_hsl(160_84%_39%/0.30)] hover:shadow-[0_0_28px_hsl(160_84%_39%/0.50)]"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer links */}
        <div className="text-center pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground font-mono">
            Also see our{" "}
            <Link href="/about" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              About page
            </Link>
            {" "}·{" "}
            <Link href="/privacy" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
