import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <Terminal className="h-12 w-12 text-primary mx-auto" />
        <h1 className="text-6xl font-bold font-mono">404</h1>
        <p className="text-muted-foreground max-w-sm">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
