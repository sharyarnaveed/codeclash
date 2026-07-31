'use client';

import { use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { notFound } from 'next/navigation';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  experience: z.string().min(1, 'Select experience level'),
  track: z.string().min(1, 'Select a track'),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hackathon = MOCK_HACKATHONS.find((h) => h.slug === slug);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  if (!hackathon) notFound();

  const onSubmit = () => {
    toast.success('Registration submitted!', { description: 'You will receive a confirmation email.' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-2">Register for {hackathon.title}</h1>
      <p className="text-muted-foreground mb-8">Fill in your details to join the hackathon.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-3xl p-6 space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register('name')} className="bg-white/5 border-white/10 mt-1" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} className="bg-white/5 border-white/10 mt-1" />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label>Experience Level</Label>
          <Select onValueChange={(v) => setValue('experience', v)}>
            <SelectTrigger className="bg-white/5 border-white/10 mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Preferred Track</Label>
          <Select onValueChange={(v) => setValue('track', v)}>
            <SelectTrigger className="bg-white/5 border-white/10 mt-1"><SelectValue placeholder="Select track..." /></SelectTrigger>
            <SelectContent>
              {hackathon.tracks.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full bg-lime text-black hover:bg-lime/90">Submit Registration</Button>
      </form>
    </div>
  );
}
