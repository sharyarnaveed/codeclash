'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (keyName: string) => string;
}

export function ApiKeyDialog({ open, onOpenChange, onGenerate }: ApiKeyDialogProps) {
  const [keyName, setKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const key = onGenerate(keyName || 'Default Key');
    setGeneratedKey(key);
  };

  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      toast.success('API key copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setKeyName('');
    setGeneratedKey(null);
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate API Key</DialogTitle>
          <DialogDescription>
            Create a new API key for programmatic access. Store it securely — it won&apos;t be shown again.
          </DialogDescription>
        </DialogHeader>

        {!generatedKey ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="key-name">Key Name (optional)</Label>
              <Input
                id="key-name"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="Production, CI/CD, etc."
                className="bg-white/5 border-white/10 mt-1"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleGenerate}>Generate Key</Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-lime/10 border border-lime/20">
              <p className="text-xs text-muted-foreground mb-2">Your new API key</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-mono text-lime break-all">{generatedKey}</code>
                <Button size="icon" variant="outline" className="h-8 w-8 shrink-0" onClick={handleCopy}>
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Make sure to copy this key now. You won&apos;t be able to see it again.
            </p>
            <DialogFooter>
              <Button onClick={handleClose}>Done</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
