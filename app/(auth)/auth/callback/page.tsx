'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/Appwrite';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      try {
        await account.get();
        router.replace('/dashboard');
      } catch {
        router.replace('/get-started');
      }
    }
    handleCallback();
  }, [router]);

  return (
    <div className="text-center space-y-4">
      <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground font-mono text-sm">Signing you in...</p>
    </div>
  );
}
