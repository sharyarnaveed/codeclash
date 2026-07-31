import type { Hackathon, Team, Mentor, Judge, TimelineEvent, ProjectSubmission } from '@/lib/types/hackathon';

export const MOCK_HACKATHONS: Hackathon[] = [
  {
    id: 'h1', slug: 'innovate-2026', title: 'Innovate 2026', tagline: 'Build the future of AI',
    status: 'registration_open', banner: '/api/placeholder/1200/400',
    startDate: '2026-08-15T00:00:00Z', endDate: '2026-08-17T23:59:00Z',
    location: 'Virtual + San Francisco', participants: 2400, maxTeamSize: 4,
    tracks: [
      { id: 't1', name: 'AI & ML', description: 'Machine learning and AI applications', prize: '$10,000' },
      { id: 't2', name: 'Web3', description: 'Blockchain and decentralized apps', prize: '$8,000' },
      { id: 't3', name: 'Climate Tech', description: 'Solutions for sustainability', prize: '$7,000' },
    ],
    sponsors: [
      { id: 's1', name: 'Vercel', tier: 'platinum' },
      { id: 's2', name: 'Stripe', tier: 'gold' },
      { id: 's3', name: 'Linear', tier: 'gold' },
    ],
    prizes: [
      { place: '1st', amount: '$15,000' },
      { place: '2nd', amount: '$8,000' },
      { place: '3rd', amount: '$5,000' },
    ],
    registered: true,
  },
  {
    id: 'h2', slug: 'campus-buildathon', title: 'Campus Buildathon', tagline: '48 hours of pure innovation',
    status: 'upcoming', banner: '/api/placeholder/1200/400',
    startDate: '2026-09-01T00:00:00Z', endDate: '2026-09-03T23:59:00Z',
    location: 'Virtual', participants: 890, maxTeamSize: 5,
    tracks: [
      { id: 't4', name: 'Education', description: 'EdTech solutions', prize: '$5,000' },
      { id: 't5', name: 'Health', description: 'Healthcare innovation', prize: '$5,000' },
    ],
    sponsors: [{ id: 's4', name: 'GitHub', tier: 'platinum' }],
    prizes: [{ place: '1st', amount: '$10,000' }, { place: '2nd', amount: '$5,000' }],
  },
  {
    id: 'h3', slug: 'hack-the-north', title: 'Hack the North', tagline: 'Canada\'s biggest hackathon',
    status: 'past', banner: '/api/placeholder/1200/400',
    startDate: '2026-06-14T00:00:00Z', endDate: '2026-06-16T23:59:00Z',
    location: 'Waterloo, Canada', participants: 3200, maxTeamSize: 4,
    tracks: [{ id: 't6', name: 'Open Track', description: 'Build anything', prize: '$12,000' }],
    sponsors: [{ id: 's5', name: 'Amazon', tier: 'platinum' }],
    prizes: [{ place: '1st', amount: '$20,000' }],
  },
];

export const MOCK_TEAMS: Team[] = [
  {
    id: 'team1', hackathonId: 'h1', name: 'Code Crushers', inviteCode: 'CC2026-X7K9',
    status: 'approved',
    members: [
      { id: 'm1', name: 'Alice Chen', username: 'alicec', role: 'leader' },
      { id: 'm2', name: 'Bob Smith', username: 'bob_codes', role: 'member' },
      { id: 'm3', name: 'Diana Li', username: 'dianal', role: 'member' },
    ],
    project: {
      id: 'proj1', teamId: 'team1', title: 'AI Code Reviewer',
      description: 'Automated code review using LLMs',
      githubUrl: 'https://github.com/codecrushers/ai-reviewer',
      demoUrl: 'https://demo.codecrushers.dev',
      trackId: 't1', status: 'submitted', score: 92,
    },
  },
];

export const MOCK_MENTORS: Mentor[] = [
  { id: 'mentor1', name: 'Sarah Johnson', title: 'Staff Engineer', company: 'Google', expertise: ['AI/ML', 'System Design'], availableSlots: [{ time: '2026-08-15T14:00:00Z', booked: false }, { time: '2026-08-15T16:00:00Z', booked: true }] },
  { id: 'mentor2', name: 'James Park', title: 'Founder', company: 'StartupXYZ', expertise: ['Product', 'Fundraising'], availableSlots: [{ time: '2026-08-16T10:00:00Z', booked: false }] },
];

export const MOCK_JUDGES: Judge[] = [
  { id: 'j1', name: 'Dr. Emily Chen', title: 'Professor', company: 'MIT', criteria: ['Innovation', 'Technical Depth', 'Impact'] },
  { id: 'j2', name: 'Marcus Webb', title: 'VP Engineering', company: 'Stripe', criteria: ['Code Quality', 'UX', 'Scalability'] },
];

export const MOCK_TIMELINE: TimelineEvent[] = [
  { id: 'tl1', title: 'Registration Opens', date: '2026-07-01', description: 'Sign up and form your team', completed: true },
  { id: 'tl2', title: 'Opening Ceremony', date: '2026-08-15', description: 'Keynotes and team formation', completed: false },
  { id: 'tl3', title: 'Hacking Begins', date: '2026-08-15', description: 'Start building your project', completed: false },
  { id: 'tl4', title: 'Submission Deadline', date: '2026-08-17', description: 'Submit your project', completed: false },
  { id: 'tl5', title: 'Awards Ceremony', date: '2026-08-17', description: 'Winners announced', completed: false },
];

export const MOCK_PROJECTS: ProjectSubmission[] = [
  { id: 'proj1', teamId: 'team1', title: 'AI Code Reviewer', description: 'Automated code review using LLMs', githubUrl: 'https://github.com/example/ai-reviewer', trackId: 't1', status: 'winner', score: 95, thumbnail: '/api/placeholder/400/300' },
  { id: 'proj2', teamId: 'team2', title: 'EcoTrack', description: 'Carbon footprint tracker for developers', githubUrl: 'https://github.com/example/ecotrack', trackId: 't3', status: 'reviewed', score: 88, thumbnail: '/api/placeholder/400/300' },
  { id: 'proj3', teamId: 'team3', title: 'DeFi Dashboard', description: 'Real-time DeFi analytics', githubUrl: 'https://github.com/example/defi', trackId: 't2', status: 'reviewed', score: 82, thumbnail: '/api/placeholder/400/300' },
];
