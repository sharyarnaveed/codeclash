export const MOCK_ORGANIZER_STATS = {
  totalEvents: 24,
  activeParticipants: 4820,
  totalTeams: 312,
  totalProblems: 156,
  registrations: 8940,
  revenue: '$12,450',
  liveContests: 2,
  liveHackathons: 1,
};

export const MOCK_ACTIVITY_TIMELINE = [
  { date: 'Aug 1', registrations: 45, submissions: 120, participants: 3800 },
  { date: 'Aug 2', registrations: 62, submissions: 98, participants: 3950 },
  { date: 'Aug 3', registrations: 38, submissions: 145, participants: 4100 },
  { date: 'Aug 4', registrations: 71, submissions: 167, participants: 4280 },
  { date: 'Aug 5', registrations: 55, submissions: 134, participants: 4420 },
  { date: 'Aug 6', registrations: 89, submissions: 189, participants: 4650 },
  { date: 'Aug 7', registrations: 67, submissions: 156, participants: 4820 },
];

export const MOCK_RECENT_REGISTRATIONS = [
  { id: '1', user: 'alicec', event: 'Weekly Challenge #142', type: 'contest', time: '2 min ago' },
  { id: '2', user: 'bob_codes', event: 'Innovate 2026', type: 'hackathon', time: '5 min ago' },
  { id: '3', user: 'charliek', event: 'Global Round #28', type: 'contest', time: '12 min ago' },
  { id: '4', user: 'dianal', event: 'Innovate 2026', type: 'hackathon', time: '18 min ago' },
];

export const MOCK_NOTIFICATIONS = [
  { id: 'n1', title: 'New submission in Weekly Challenge #142', time: '1 min ago', read: false },
  { id: 'n2', title: 'Team "Code Crushers" registered for Innovate 2026', time: '8 min ago', read: false },
  { id: 'n3', title: 'Contest "Global Round #28" starts in 7 days', time: '1 hour ago', read: true },
];

export const MOCK_ORGANIZER_CONTESTS = [
  { id: 'oc1', title: 'Weekly Challenge #142', status: 'live', participants: 3842, problems: 4, startTime: '2026-08-01T10:00:00Z' },
  { id: 'oc2', title: 'Global Round #28', status: 'scheduled', participants: 1250, problems: 5, startTime: '2026-08-08T18:00:00Z' },
  { id: 'oc3', title: 'Beginner Sprint #15', status: 'draft', participants: 0, problems: 3, startTime: '2026-08-03T12:00:00Z' },
];

export const MOCK_ORGANIZER_HACKATHONS = [
  { id: 'oh1', title: 'Innovate 2026', status: 'registration_open', participants: 2400, teams: 612, startDate: '2026-08-15' },
  { id: 'oh2', title: 'Campus Buildathon', status: 'draft', participants: 0, teams: 0, startDate: '2026-09-01' },
];

export const MOCK_SUBMISSION_QUEUE = [
  { id: 'sq1', user: 'alicec', problem: 'Two Sum', language: 'Python', time: '10:32 AM', status: 'pending', code: 'def twoSum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i', verdict: null },
  { id: 'sq2', user: 'bob_codes', problem: 'LRU Cache', language: 'C++', time: '10:45 AM', status: 'judging', code: 'class LRUCache { /* ... */ };', verdict: null },
  { id: 'sq3', user: 'charliek', problem: 'Two Sum', language: 'Rust', time: '10:28 AM', status: 'completed', code: 'fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> { /* ... */ }', verdict: 'Accepted' },
];

export const MOCK_HACKATHON_TEAMS = [
  { id: 't1', name: 'Code Crushers', hackathonId: 'oh1', members: ['alicec', 'bob_codes'], project: 'AI Study Buddy', status: 'submitted' },
  { id: 't2', name: 'Byte Builders', hackathonId: 'oh1', members: ['charliek', 'dianal', 'evans'], project: 'EcoTrack', status: 'in_progress' },
  { id: 't3', name: 'Null Pointers', hackathonId: 'oh1', members: ['frankm'], project: null, status: 'forming' },
];

export const MOCK_HACKATHON_SUBMISSIONS = [
  { id: 'hs1', team: 'Code Crushers', hackathonId: 'oh1', project: 'AI Study Buddy', repo: 'github.com/codecrushers/ai-buddy', demo: 'https://demo.example.com/ai-buddy', score: null, status: 'pending_review' },
  { id: 'hs2', team: 'Byte Builders', hackathonId: 'oh1', project: 'EcoTrack', repo: 'github.com/bytebuilders/ecotrack', demo: 'https://demo.example.com/ecotrack', score: 87, status: 'reviewed' },
];

export type OrganizerContest = (typeof MOCK_ORGANIZER_CONTESTS)[number];
export type OrganizerHackathon = (typeof MOCK_ORGANIZER_HACKATHONS)[number];
export type SubmissionQueueItem = (typeof MOCK_SUBMISSION_QUEUE)[number];
export type HackathonTeam = (typeof MOCK_HACKATHON_TEAMS)[number];
export type HackathonSubmission = (typeof MOCK_HACKATHON_SUBMISSIONS)[number];
