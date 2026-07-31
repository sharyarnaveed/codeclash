'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Terminal } from 'lucide-react';
import { account } from '@/lib/Appwrite';
import { OAuthProvider } from 'appwrite';

export default function GetStarted() {
  const handleGoogleSignIn = () => {
    account.createOAuth2Session(OAuthProvider.Google, `${window.location.origin}/auth/callback`);
  };

  const handleGitHubSignIn = () => {
    account.createOAuth2Session(OAuthProvider.Github, `${window.location.origin}/auth/callback`);
  };

  return (
    <div className="w-full max-w-sm space-y-8 p-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Terminal className="h-7 w-7 text-primary" />
          <span className="text-2xl font-black font-mono tracking-tighter">CodeClash</span>
        </div>
        <h1 className="text-2xl font-bold font-mono tracking-tight">Welcome to CodeClash</h1>
        <p className="text-muted-foreground text-sm">Sign in to start competing</p>
      </div>

      <Card className="glass-card">
        <CardContent className="pt-6 pb-6 space-y-4">
          <Button className="w-full h-11 font-mono bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 gap-3" variant="outline" onClick={handleGoogleSignIn}>
            Continue with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-2 text-muted-foreground font-mono">or</span></div>
          </div>
          <Button className="w-full h-11 font-mono bg-[#24292e] hover:bg-[#1a1f24] text-white gap-3" onClick={handleGitHubSignIn}>
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground font-mono">
        By continuing you agree to our <Link href="/terms" className="underline hover:text-white">Terms</Link> and <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>
      </p>
      <div className="text-center">
        <Link href="/" className="text-xs text-muted-foreground font-mono hover:text-white">Back to home</Link>
      </div>
    </div>
  );
}
