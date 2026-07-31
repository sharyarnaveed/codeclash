'use client';

import Link from 'next/link';
import { Eye, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PublicBrowseBanner() {
  return (
    <div className="browse-surface mb-8 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-primary/10 p-2">
          <Eye className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Public browsing enabled</p>
          <p className="text-xs landing-muted">Explore contests, hackathons, and rankings without signing in.</p>
        </div>
      </div>
      <Link href="/get-started">
        <Button size="sm" variant="outline" className="btn-brand-outline rounded-full gap-2">
          <LogIn className="h-3.5 w-3.5" />
          Sign in to compete
        </Button>
      </Link>
    </div>
  );
}
