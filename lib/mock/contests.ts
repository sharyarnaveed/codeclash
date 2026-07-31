import type { Problem, Contest, Submission, LeaderboardEntry, DiscussionThread } from '@/lib/types/contest';
import { MOCK_USERS } from '@/lib/mock/users';

const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States', KR: 'South Korea', CN: 'China', IN: 'India', GB: 'United Kingdom',
  MX: 'Mexico', SG: 'Singapore', IT: 'Italy', DE: 'Germany', JP: 'Japan', FR: 'France',
};

export const MOCK_PROBLEMS: Problem[] = [
  { id: 'p1', slug: 'two-sum', title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], acceptance: 85, points: 100, solvedBy: 12400 },
  { id: 'p2', slug: 'lru-cache', title: 'LRU Cache', difficulty: 'Medium', tags: ['Design', 'Hash Table'], acceptance: 45, points: 250, solvedBy: 8200 },
  { id: 'p3', slug: 'median-sorted-arrays', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', tags: ['Array', 'Binary Search'], acceptance: 20, points: 500, solvedBy: 3100 },
  { id: 'p4', slug: 'graph-shortest-path', title: 'Shortest Path in Graph', difficulty: 'Medium', tags: ['Graph', 'BFS'], acceptance: 52, points: 300, solvedBy: 5600 },
  { id: 'p5', slug: 'dp-knapsack', title: 'Knapsack Problem', difficulty: 'Hard', tags: ['DP', 'Array'], acceptance: 28, points: 450, solvedBy: 4200 },
];

export const MOCK_CONTESTS: Contest[] = [
  {
    id: 'c1', slug: 'weekly-challenge-142', title: 'Weekly Challenge #142', status: 'live',
    startTime: '2026-08-01T10:00:00Z', endTime: '2026-08-01T14:00:00Z', duration: 240,
    participants: 3842, problems: MOCK_PROBLEMS.slice(0, 4), frozen: false,
    description: 'Weekly competitive programming contest featuring algorithmic challenges.',
    registered: true,
  },
  {
    id: 'c2', slug: 'global-round-28', title: 'Global Round #28', status: 'upcoming',
    startTime: '2026-08-08T18:00:00Z', endTime: '2026-08-08T22:00:00Z', duration: 240,
    participants: 1250, problems: MOCK_PROBLEMS, frozen: false,
    description: 'International round open to all rated participants.',
  },
  {
    id: 'c3', slug: 'beginner-sprint-15', title: 'Beginner Sprint #15', status: 'upcoming',
    startTime: '2026-08-03T12:00:00Z', endTime: '2026-08-03T14:00:00Z', duration: 120,
    participants: 890, problems: MOCK_PROBLEMS.slice(0, 3), frozen: false,
    description: 'Perfect for newcomers to competitive programming.',
  },
  {
    id: 'c4', slug: 'grand-prix-finals', title: 'Grand Prix Finals', status: 'past',
    startTime: '2026-07-20T14:00:00Z', endTime: '2026-07-20T18:00:00Z', duration: 240,
    participants: 2100, problems: MOCK_PROBLEMS, frozen: true,
    description: 'Season finale featuring the top 500 rated participants.',
  },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  { id: 's1', problemId: 'p1', problemTitle: 'Two Sum', user: 'alicec', language: 'Python', verdict: 'AC', runtime: '42ms', memory: '14.2MB', submittedAt: '2026-08-01T10:32:00Z' },
  { id: 's2', problemId: 'p2', problemTitle: 'LRU Cache', user: 'bob_codes', language: 'C++', verdict: 'WA', runtime: '—', memory: '—', submittedAt: '2026-08-01T10:45:00Z', testCases: [{ id: 1, status: 'AC', time: '12ms' }, { id: 2, status: 'WA', time: '8ms' }] },
  { id: 's3', problemId: 'p1', problemTitle: 'Two Sum', user: 'charliek', language: 'Rust', verdict: 'AC', runtime: '18ms', memory: '8.1MB', submittedAt: '2026-08-01T10:28:00Z' },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, previousRank: 2, username: 'charliek', name: 'Charlie Kim', score: 4, penalty: 120, solved: 4, rating: 3100, ratingChange: 45, country: 'KR' },
  { rank: 2, previousRank: 1, username: 'alicec', name: 'Alice Chen', score: 4, penalty: 145, solved: 4, rating: 2840, ratingChange: 32, country: 'US' },
  { rank: 3, username: 'dianal', name: 'Diana Li', score: 3, penalty: 98, solved: 3, rating: 2450, ratingChange: 18, country: 'CN' },
  { rank: 4, username: 'bob_codes', name: 'Bob Smith', score: 3, penalty: 156, solved: 3, rating: 2100, ratingChange: -5, country: 'GB' },
  { rank: 5, username: 'evanw', name: 'Evan Wright', score: 2, penalty: 67, solved: 2, rating: 1800, ratingChange: 12, country: 'US' },
];

export const MOCK_GLOBAL_LEADERBOARD: LeaderboardEntry[] = (() => {
  const participants = MOCK_USERS
    .filter((u) => u.role === 'participant' && u.rating > 0)
    .sort((a, b) => b.rating - a.rating);

  const synthetic: LeaderboardEntry[] = Array.from({ length: 15 }, (_, i) => {
    const countries = ['US', 'KR', 'CN', 'IN', 'GB', 'DE', 'JP', 'FR'];
    const country = countries[i % countries.length];
    return {
      rank: 0,
      username: `dev_${i + 1}`,
      name: `Developer ${i + 1}`,
      score: 0,
      penalty: 0,
      solved: 120 - i * 5,
      rating: 1900 - i * 35,
      country,
    };
  });

  const real: LeaderboardEntry[] = participants.map((u) => ({
    rank: 0,
    username: u.username,
    name: u.name,
    score: 0,
    penalty: 0,
    solved: u.stats.problemsSolved,
    rating: u.rating,
    country: u.country,
  }));

  return [...real, ...synthetic]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 20)
    .map((entry, i) => ({ ...entry, rank: i + 1 }));
})();

export { COUNTRY_NAMES };

export const MOCK_DISCUSSIONS: DiscussionThread[] = [
  { id: 'd1', problemId: 'p1', author: 'alicec', title: 'O(n) solution using hash map', content: 'You can use a hash map to store complements...', replies: 12, votes: 34, createdAt: '2026-07-15T08:00:00Z' },
  { id: 'd2', problemId: 'p1', author: 'bob_codes', title: 'Edge case with duplicate numbers', content: 'Make sure to handle when nums[i] == target/2...', replies: 5, votes: 18, createdAt: '2026-07-16T10:00:00Z' },
];

export const MOCK_RATING_DATA = Array.from({ length: 60 }, (_, i) => ({
  day: i,
  rating: 1500 + Math.floor(Math.random() * 500) + i * 5,
}));
