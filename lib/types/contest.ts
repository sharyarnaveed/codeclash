export type ContestStatus = 'live' | 'upcoming' | 'past';
export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type Verdict = 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE' | 'Pending';

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: ProblemDifficulty;
  tags: string[];
  acceptance: number;
  points: number;
  solvedBy: number;
  statement?: string;
}

export interface Contest {
  id: string;
  title: string;
  slug: string;
  status: ContestStatus;
  startTime: string;
  endTime: string;
  duration: number;
  participants: number;
  problems: Problem[];
  frozen: boolean;
  description: string;
  registered?: boolean;
}

export interface Submission {
  id: string;
  problemId: string;
  problemTitle: string;
  user: string;
  language: string;
  verdict: Verdict;
  runtime: string;
  memory: string;
  submittedAt: string;
  testCases?: { id: number; status: Verdict; time: string }[];
}

export interface LeaderboardEntry {
  rank: number;
  previousRank?: number;
  username: string;
  name: string;
  score: number;
  penalty: number;
  solved: number;
  rating?: number;
  ratingChange?: number;
  country: string;
}

export interface DiscussionThread {
  id: string;
  problemId: string;
  author: string;
  title: string;
  content: string;
  replies: number;
  votes: number;
  createdAt: string;
}
