import type { User, Certificate, Registration } from '@/lib/types/user';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alice Chen',
  username: 'alicec',
  email: 'alice@example.com',
  role: 'participant',
  rating: 2840,
  maxRating: 2920,
  country: 'US',
  university: 'MIT',
  bio: 'Competitive programmer & open source contributor',
  achievements: [
    { id: 'a1', title: 'First Blood', description: 'First to solve in a contest', icon: 'zap', unlockedAt: '2026-05-01' },
    { id: 'a2', title: 'Grandmaster', description: 'Reached 2800+ rating', icon: 'crown', unlockedAt: '2026-06-15' },
    { id: 'a3', title: 'Hackathon Hero', description: 'Won a hackathon', icon: 'trophy' },
  ],
  stats: {
    contestsParticipated: 48,
    contestsWon: 3,
    problemsSolved: 342,
    hackathonsJoined: 5,
    teamsCreated: 2,
    globalRank: 42,
    winRate: 72,
  },
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  { id: 'u2', name: 'Bob Smith', username: 'bob_codes', email: 'bob@example.com', role: 'participant', rating: 2100, maxRating: 2200, country: 'GB', university: 'Oxford', bio: 'Algorithms enthusiast', achievements: [], stats: { contestsParticipated: 32, contestsWon: 1, problemsSolved: 180, hackathonsJoined: 2, teamsCreated: 1, globalRank: 156, winRate: 55 } },
  { id: 'u3', name: 'Charlie Kim', username: 'charliek', email: 'charlie@example.com', role: 'participant', rating: 3100, maxRating: 3150, country: 'KR', university: 'SNU', bio: 'Low level is the best level', achievements: [], stats: { contestsParticipated: 120, contestsWon: 12, problemsSolved: 890, hackathonsJoined: 8, teamsCreated: 4, globalRank: 1, winRate: 85 } },
  { id: 'u4', name: 'Diana Lopez', username: 'dianal', email: 'diana@example.com', role: 'participant', rating: 1950, maxRating: 2000, country: 'MX', university: 'UNAM', bio: 'Full-stack dev', achievements: [], stats: { contestsParticipated: 18, contestsWon: 0, problemsSolved: 95, hackathonsJoined: 4, teamsCreated: 2, globalRank: 320, winRate: 48 } },
  { id: 'u5', name: 'Prof. James Wright', username: 'jwright', email: 'j.wright@university.edu', role: 'judge', rating: 0, maxRating: 0, country: 'US', university: 'Stanford', bio: 'CS Professor & contest judge', achievements: [], stats: { contestsParticipated: 0, contestsWon: 0, problemsSolved: 0, hackathonsJoined: 0, teamsCreated: 0, globalRank: 0, winRate: 0 } },
  { id: 'u6', name: 'Sarah Patel', username: 'sarahp', email: 'sarah@techcorp.com', role: 'judge', rating: 0, maxRating: 0, country: 'IN', bio: 'Senior engineer at TechCorp', achievements: [], stats: { contestsParticipated: 0, contestsWon: 0, problemsSolved: 0, hackathonsJoined: 0, teamsCreated: 0, globalRank: 0, winRate: 0 } },
  { id: 'u7', name: 'Marcus Chen', username: 'marcusc', email: 'marcus@startup.io', role: 'mentor', rating: 0, maxRating: 0, country: 'SG', bio: 'Startup founder & hackathon mentor', achievements: [], stats: { contestsParticipated: 0, contestsWon: 0, problemsSolved: 0, hackathonsJoined: 0, teamsCreated: 0, globalRank: 0, winRate: 0 } },
  { id: 'u8', name: 'Elena Rossi', username: 'elenar', email: 'elena@devhub.org', role: 'mentor', rating: 0, maxRating: 0, country: 'IT', bio: 'Open source maintainer', achievements: [], stats: { contestsParticipated: 0, contestsWon: 0, problemsSolved: 0, hackathonsJoined: 0, teamsCreated: 0, globalRank: 0, winRate: 0 } },
  { id: 'u9', name: 'Admin User', username: 'admin', email: 'admin@codeclash.io', role: 'organizer', rating: 0, maxRating: 0, country: 'US', bio: 'Platform organizer', achievements: [], stats: { contestsParticipated: 0, contestsWon: 0, problemsSolved: 0, hackathonsJoined: 0, teamsCreated: 0, globalRank: 0, winRate: 0 } },
];

export const MOCK_CERTIFICATES: Certificate[] = [
  { id: 'cert1', title: 'Weekly Challenge #140 — 2nd Place', event: 'Weekly Challenge #140', eventType: 'contest', issuedAt: '2026-07-25', rank: 2 },
  { id: 'cert2', title: 'Innovate 2025 — Best AI Project', event: 'Innovate 2025', eventType: 'hackathon', issuedAt: '2025-08-17' },
];

export const MOCK_REGISTRATIONS: Registration[] = [
  { id: 'r1', eventId: 'c1', eventTitle: 'Weekly Challenge #142', eventType: 'contest', status: 'registered', registeredAt: '2026-07-28', startDate: '2026-08-01T10:00:00Z' },
  { id: 'r2', eventId: 'h1', eventTitle: 'Innovate 2026', eventType: 'hackathon', status: 'registered', registeredAt: '2026-07-15', startDate: '2026-08-15T00:00:00Z' },
  { id: 'r3', eventId: 'c2', eventTitle: 'Global Round #28', eventType: 'contest', status: 'registered', registeredAt: '2026-07-30', startDate: '2026-08-08T18:00:00Z' },
];

export const MOCK_WEEKLY_ACTIVITY = [
  { day: 'Mon', count: 4 }, { day: 'Tue', count: 7 }, { day: 'Wed', count: 2 },
  { day: 'Thu', count: 9 }, { day: 'Fri', count: 5 }, { day: 'Sat', count: 12 }, { day: 'Sun', count: 15 },
];

export const MOCK_LANGUAGE_USAGE = [
  { name: 'Python', value: 35 }, { name: 'C++', value: 25 }, { name: 'JavaScript', value: 20 },
  { name: 'Go', value: 10 }, { name: 'Rust', value: 10 },
];
