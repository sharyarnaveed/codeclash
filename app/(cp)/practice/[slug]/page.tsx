'use client';

import dynamic from 'next/dynamic';
import { use, useState } from 'react';
import { MOCK_PROBLEMS } from '@/lib/mock/contests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Send } from 'lucide-react';
import { notFound } from 'next/navigation';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });
const DEFAULT_CODE = `class Solution:\n    def solve(self):\n        pass\n`;

export default function PracticeProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const problem = MOCK_PROBLEMS.find((p) => p.slug === slug);
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(DEFAULT_CODE);
  if (!problem) notFound();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="font-bold">{problem.title}</h1>
          <Badge variant="outline" className="border-lime/30 text-lime">{problem.difficulty}</Badge>
        </div>
        <div className="flex gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32 h-8 bg-transparent border-white/10"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline"><Play className="h-3 w-3 mr-1" /> Run</Button>
          <Button size="sm"><Send className="h-3 w-3 mr-1" /> Submit</Button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-2/5 border-r border-white/10 p-6 overflow-auto prose prose-invert prose-sm">
          <p>Practice problem: {problem.title}. Solve it at your own pace.</p>
        </div>
        <div className="flex-1">
          <Editor height="100%" language={language} value={code} onChange={(v) => setCode(v ?? '')} theme="vs-dark" options={{ fontSize: 14, minimap: { enabled: false } }} />
        </div>
      </div>
    </div>
  );
}
