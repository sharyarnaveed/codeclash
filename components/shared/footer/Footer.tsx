import Link from 'next/link';
import { Terminal, ExternalLink } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Contests', href: '/contests' },
    { label: 'Hackathons', href: '/hackathons' },
    { label: 'Practice', href: '/practice' },
    { label: 'Leaderboard', href: '/leaderboard' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t landing-border bg-background">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mb-10 grid grid-cols-2 gap-6 sm:mb-12 sm:gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-mono font-bold text-xl text-foreground mb-4">
              <Terminal className="h-5 w-5 text-primary" />
              CodeClash
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The premium platform for competitive programming and hackathons.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t landing-border gap-4">
          <p className="text-xs text-muted-foreground">© 2026 CodeClash. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <ExternalLink className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
