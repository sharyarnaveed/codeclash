'use client';

import { use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MOCK_HACKATHONS } from '@/lib/mock/hackathons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { notFound } from 'next/navigation';
import { toast } from 'sonner';

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  githubUrl: z.string().url(),
  demoUrl: z.string().url().optional().or(z.literal('')),
  trackId: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function SubmitProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hackathon = MOCK_HACKATHONS.find((h) => h.slug === slug);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  if (!hackathon) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Submit Project</h1>
      <p className="text-muted-foreground mb-8">{hackathon.title}</p>

      <form onSubmit={handleSubmit(() => toast.success('Project submitted!'))} className="glass-card rounded-3xl p-6 space-y-4">
        <div>
          <Label>Project Title</Label>
          <Input {...register('title')} className="bg-white/5 border-white/10 mt-1" />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <Label>Description</Label>
          <Textarea {...register('description')} className="bg-white/5 border-white/10 mt-1" rows={4} />
        </div>
        <div>
          <Label>GitHub URL</Label>
          <Input {...register('githubUrl')} className="bg-white/5 border-white/10 mt-1" placeholder="https://github.com/..." />
        </div>
        <div>
          <Label>Demo URL (optional)</Label>
          <Input {...register('demoUrl')} className="bg-white/5 border-white/10 mt-1" />
        </div>
        <div>
          <Label>Track</Label>
          <Select onValueChange={(v) => setValue('trackId', v)}>
            <SelectTrigger className="bg-white/5 border-white/10 mt-1"><SelectValue placeholder="Select track" /></SelectTrigger>
            <SelectContent>
              {hackathon.tracks.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">Submit Project</Button>
      </form>
    </div>
  );
}
