'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Send, RefreshCcw, LogOut, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const DEFAULT_CODE = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass
`;

export default function Battle() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(DEFAULT_CODE);
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-background">
      {/* Top Bar */}
      <header className="h-14 border-b border-border/50 bg-card/30 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg">1. Two Sum</h1>
          <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">Easy</Badge>
          <Badge variant="outline">Array</Badge>
          <Badge variant="outline">Hash Table</Badge>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-primary font-mono text-xl font-bold">
            {formatTime(timeLeft)}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Connected
          </div>
          <Link href="/result">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
              <LogOut className="h-4 w-4 mr-2" /> Surrender
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Problem */}
        <div className="w-1/3 border-r border-border/50 flex flex-col bg-card/10 overflow-hidden shrink-0">
          <Tabs defaultValue="description" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-border/50 bg-transparent h-12 p-0">
              <TabsTrigger value="description" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">Description</TabsTrigger>
              <TabsTrigger value="submissions" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">Submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="flex-1 overflow-auto p-6 m-0 prose prose-invert max-w-none">
              <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
              <p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>
              <p>You can return the answer in any order.</p>
              
              <h3>Example 1:</h3>
              <pre className="bg-background border border-border/50 p-4 rounded-lg"><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre>
            </TabsContent>
          </Tabs>
        </div>

        {/* Center: Editor */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-[400px]">
          <div className="h-12 border-b border-border/50 bg-card/30 flex items-center justify-between px-4 shrink-0">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px] h-8 bg-background">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python 3</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCode(DEFAULT_CODE)}>
                <RefreshCcw className="h-4 w-4 mr-2" /> Reset
              </Button>
              <Button variant="secondary" size="sm">
                <Play className="h-4 w-4 mr-2" /> Run
              </Button>
              <Link href="/result">
                <Button size="sm" className="font-bold">
                  <Send className="h-4 w-4 mr-2" /> Submit
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v || "")}
              options={{
                fontSize: 14,
                fontFamily: "Geist Mono, monospace",
                minimap: { enabled: false },
                lineNumbers: "on",
                padding: { top: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
          {/* Bottom Console */}
          <div className="h-48 border-t border-border/50 bg-card/10 shrink-0 flex flex-col">
            <div className="h-10 border-b border-border/50 flex items-center px-4 bg-card/30">
              <span className="text-sm font-medium text-muted-foreground">Test Cases</span>
            </div>
            <div className="p-4 overflow-auto font-mono text-sm text-muted-foreground">
              Run your code to see output here.
            </div>
          </div>
        </div>

        {/* Right: Opponent */}
        <div className="w-[300px] border-l border-border/50 bg-card/10 flex flex-col shrink-0">
          <div className="p-6 border-b border-border/50 flex flex-col items-center">
            <Avatar className="h-20 w-20 mb-4 border-2 border-primary/50">
              <AvatarFallback className="bg-primary/20 text-primary text-xl">BK</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-lg font-mono">bob_codes</h3>
            <p className="text-sm text-muted-foreground mb-4">Rating: 2100 • GB</p>
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>Progress</span>
                <span>2/3 Test Cases</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border/50 font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Chat
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4 text-sm">
              <div className="bg-background rounded-lg p-3 w-[85%] border border-border/50">
                <p className="text-xs text-muted-foreground mb-1 font-mono">bob_codes</p>
                <p>gl hf!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}