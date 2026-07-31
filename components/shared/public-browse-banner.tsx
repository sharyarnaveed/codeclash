'use client';

import Link from 'next/link';
import { Eye, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PublicBrowseBanner() {
  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-[#FF8C42]/10 p-2">
          <Eye className="h-4 w-4 text-[#FF8C42]" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Public browsing enabled</p>
          <p className="text-xs text-white/50">Explore contests, hackathons, and rankings without signing in.</p>
        </div>
      </div>
      <Link href="/get-started">
        <Button size="sm" variant="outline" className="rounded-full border-white/20 hover:border-[#FF8C42]/50 gap-2">
          <LogIn className="h-3.5 w-3.5" />
          Sign in to compete
        </Button>
      </Link>
    </div>
  );
}
