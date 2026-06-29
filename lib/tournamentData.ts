// ─── Tournament Dummy Data ────────────────────────────────────────────────────

export type TournamentStatus = 'upcoming' | 'live' | 'completed';
export type MatchStatus = 'pending' | 'live' | 'completed';

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  country: string;
}

export interface Match {
  id: string;
  round: number;
  roundName: string;
  player1: Participant | null;
  player2: Participant | null;
  status: MatchStatus;
  winner?: string; // participant id
  score?: { p1: number; p2: number };
  problem?: string;
  scheduledAt?: string;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  status: TournamentStatus;
  startDate: string;
  endDate: string;
  prizePool: string;
  participants: number;
  maxParticipants: number;
  format: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  tags: string[];
  matches: Match[];
  isJoined?: boolean;
}

// ─── Participants pool ────────────────────────────────────────────────────────
const PARTICIPANTS: Record<string, Participant> = {
  alice:  { id: 'alice',  name: 'Alice Chen',   avatar: 'AC', rating: 2840, country: '🇨🇳' },
  bob:    { id: 'bob',    name: 'Bob Karev',    avatar: 'BK', rating: 2710, country: '🇺🇸' },
  carlos: { id: 'carlos', name: 'Carlos Vega',  avatar: 'CV', rating: 2690, country: '🇲🇽' },
  diana:  { id: 'diana',  name: 'Diana Volkov', avatar: 'DV', rating: 2780, country: '🇷🇺' },
  ethan:  { id: 'ethan',  name: 'Ethan Park',   avatar: 'EP', rating: 2630, country: '🇰🇷' },
  fiona:  { id: 'fiona',  name: 'Fiona Blake',  avatar: 'FB', rating: 2590, country: '🇬🇧' },
  george: { id: 'george', name: 'George Tan',   avatar: 'GT', rating: 2720, country: '🇸🇬' },
  hana:   { id: 'hana',   name: 'Hana Müller',  avatar: 'HM', rating: 2660, country: '🇩🇪' },
};

// ─── Tournaments ─────────────────────────────────────────────────────────────
export const TOURNAMENTS: Tournament[] = [
  {
    id: 'grand-clash-2026',
    name: 'Grand Clash 2026',
    description: 'The premier annual coding tournament. Compete in Algorithm battles across 4 rounds to claim the Championship title and the $10,000 prize pool.',
    status: 'live',
    startDate: '2026-06-28',
    endDate: '2026-07-05',
    prizePool: '$10,000',
    participants: 8,
    maxParticipants: 8,
    format: 'Single Elimination',
    difficulty: 'Expert',
    tags: ['Algorithms', 'Data Structures', 'Dynamic Programming'],
    isJoined: true,
    matches: [
      // Quarterfinals
      {
        id: 'qf1', round: 1, roundName: 'Quarterfinals',
        player1: PARTICIPANTS.alice,  player2: PARTICIPANTS.bob,
        status: 'completed', winner: 'alice',
        score: { p1: 2, p2: 1 }, problem: 'Min-Cost Flow',
        scheduledAt: '2026-06-28T10:00:00Z',
      },
      {
        id: 'qf2', round: 1, roundName: 'Quarterfinals',
        player1: PARTICIPANTS.carlos, player2: PARTICIPANTS.diana,
        status: 'completed', winner: 'diana',
        score: { p1: 0, p2: 2 }, problem: 'Segment Tree Beats',
        scheduledAt: '2026-06-28T12:00:00Z',
      },
      {
        id: 'qf3', round: 1, roundName: 'Quarterfinals',
        player1: PARTICIPANTS.ethan,  player2: PARTICIPANTS.fiona,
        status: 'completed', winner: 'ethan',
        score: { p1: 2, p2: 0 }, problem: 'Convex Hull Trick',
        scheduledAt: '2026-06-28T14:00:00Z',
      },
      {
        id: 'qf4', round: 1, roundName: 'Quarterfinals',
        player1: PARTICIPANTS.george, player2: PARTICIPANTS.hana,
        status: 'completed', winner: 'george',
        score: { p1: 2, p2: 1 }, problem: 'Heavy-Light Decomp',
        scheduledAt: '2026-06-28T16:00:00Z',
      },
      // Semifinals
      {
        id: 'sf1', round: 2, roundName: 'Semifinals',
        player1: PARTICIPANTS.alice,  player2: PARTICIPANTS.diana,
        status: 'live', problem: 'Centroid Decomposition',
        scheduledAt: '2026-06-30T10:00:00Z',
      },
      {
        id: 'sf2', round: 2, roundName: 'Semifinals',
        player1: PARTICIPANTS.ethan,  player2: PARTICIPANTS.george,
        status: 'pending', problem: 'Suffix Automaton',
        scheduledAt: '2026-06-30T14:00:00Z',
      },
      // Finals
      {
        id: 'f1', round: 3, roundName: 'Grand Final',
        player1: null, player2: null,
        status: 'pending',
        scheduledAt: '2026-07-05T16:00:00Z',
      },
    ],
  },
  {
    id: 'weekly-sprint-47',
    name: 'Weekly Sprint #47',
    description: 'A 2-hour lightning tournament with 16 participants. All problems are Greedy and Graph-focused. Great for rating gains.',
    status: 'upcoming',
    startDate: '2026-07-02',
    endDate: '2026-07-02',
    prizePool: '$500',
    participants: 12,
    maxParticipants: 16,
    format: 'Swiss + Top-8 Bracket',
    difficulty: 'Hard',
    tags: ['Greedy', 'Graphs', 'BFS/DFS'],
    isJoined: false,
    matches: [],
  },
  {
    id: 'dp-masters',
    name: 'DP Masters Cup',
    description: 'A specialized tournament focused exclusively on Dynamic Programming problems ranging from classic DP to advanced bitmask and digit DP.',
    status: 'upcoming',
    startDate: '2026-07-10',
    endDate: '2026-07-12',
    prizePool: '$2,500',
    participants: 32,
    maxParticipants: 64,
    format: 'Double Elimination',
    difficulty: 'Expert',
    tags: ['Dynamic Programming', 'Bitmask DP', 'Digit DP'],
    isJoined: false,
    matches: [],
  },
  {
    id: 'rookie-rumble',
    name: 'Rookie Rumble',
    description: 'A beginner-friendly tournament open to players with rating below 1800. Perfect entry point into competitive programming tournaments.',
    status: 'upcoming',
    startDate: '2026-07-06',
    endDate: '2026-07-06',
    prizePool: '$200',
    participants: 24,
    maxParticipants: 32,
    format: 'Round Robin',
    difficulty: 'Easy',
    tags: ['Arrays', 'Strings', 'Sorting'],
    isJoined: false,
    matches: [],
  },
  {
    id: 'clash-championship-2025',
    name: 'Clash Championship 2025',
    description: 'Last year\'s grand championship. Browse the completed bracket to see highlights and past match results.',
    status: 'completed',
    startDate: '2025-12-01',
    endDate: '2025-12-07',
    prizePool: '$15,000',
    participants: 16,
    maxParticipants: 16,
    format: 'Single Elimination',
    difficulty: 'Expert',
    tags: ['All Topics', 'Championship'],
    isJoined: false,
    matches: [],
  },
];

export function getTournamentById(id: string): Tournament | undefined {
  return TOURNAMENTS.find(t => t.id === id);
}

export const MY_UPCOMING_MATCH: Match = {
  id: 'sf1',
  round: 2,
  roundName: 'Semifinals',
  player1: PARTICIPANTS.alice,
  player2: PARTICIPANTS.diana,
  status: 'live',
  problem: 'Centroid Decomposition',
  scheduledAt: '2026-06-30T10:00:00Z',
};

export const MY_PARTICIPANT = PARTICIPANTS.alice;
