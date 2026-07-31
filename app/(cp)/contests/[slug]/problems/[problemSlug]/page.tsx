'use client';

import dynamic from 'next/dynamic';
import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_CONTESTS, MOCK_PROBLEMS } from '@/lib/mock/contests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Send, ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const DEFAULT_CODE = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
`;

export default function ProblemPage({ params }: { params: Promise<{ slug: string; problemSlug: string }> }) {
  const { slug, problemSlug } = use(params);
  const contest = MOCK_CONTESTS.find((c) => c.slug === slug);
  const problem = MOCK_PROBLEMS.find((p) => p.slug === problemSlug) ?? contest?.problems.find((p) => p.slug === problemSlug);
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(DEFAULT_CODE);
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!contest || !problem) notFound();

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 shrink-0 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href={`/contests/${slug}`} className="text-muted-foreground hover:text-white"><ChevronLeft className="h-4 w-4" /></Link>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href={`/contests/${slug}`}>{contest.title}</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><span className="font-medium">{problem.title}</span></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Badge variant="outline" className="border-lime/30 text-lime">{problem.difficulty}</Badge>
        </div>
        <div className="font-mono text-lg text-primary font-bold">{formatTime(timeLeft)}</div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-full lg:w-2/5 border-r border-white/10 overflow-auto p-6">
          <Tabs defaultValue="description">
            <TabsList className="bg-white/5 mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="prose prose-invert prose-sm max-w-none">
              <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
              <h4>Example</h4>
              <pre className="bg-white/5 border border-white/10 p-3 rounded-xl text-sm"><code>Input: nums = [2,7,11,15], target = 9{'\n'}Output: [0,1]</code></pre>
            </TabsContent>
            <TabsContent value="submissions">
              <p className="text-sm text-muted-foreground">No submissions yet.</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-white/[0.02]">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-36 h-8 bg-transparent border-white/10"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-white/10"><Play className="h-3 w-3 mr-1" /> Run</Button>
              <Link href={`/contests/${slug}/submissions/s1`}>
                <Button size="sm"><Send className="h-3 w-3 mr-1" /> Submit</Button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(v) => setCode(v ?? '')}
              theme="vs-dark"
              options={{ fontSize: 14, minimap: { enabled: false }, padding: { top: 16 } }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
