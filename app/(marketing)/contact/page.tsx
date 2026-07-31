'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollReveal } from '@/components/shared/motion';
import { toast } from 'sonner';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-lg">
      <ScrollReveal>
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">Have questions? We&apos;d love to hear from you.</p>
      </ScrollReveal>
      <form onSubmit={(e) => { e.preventDefault(); toast.success('Message sent!'); }} className="glass-card p-6 space-y-4">
        <div><Label>Name</Label><Input className="bg-white/5 border-white/10 mt-1" required /></div>
        <div><Label>Email</Label><Input type="email" className="bg-white/5 border-white/10 mt-1" required /></div>
        <div><Label>Message</Label><Textarea className="bg-white/5 border-white/10 mt-1" rows={4} required /></div>
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </div>
  );
}
