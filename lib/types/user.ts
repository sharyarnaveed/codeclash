export type UserRole = 'participant' | 'organizer' | 'judge' | 'mentor';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  rating: number;
  maxRating: number;
  country: string;
  university?: string;
  bio?: string;
  avatar?: string;
  achievements: Achievement[];
  stats: UserStats;
}

export interface UserStats {
  contestsParticipated: number;
  contestsWon: number;
  problemsSolved: number;
  hackathonsJoined: number;
  teamsCreated: number;
  globalRank: number;
  winRate: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Certificate {
  id: string;
  title: string;
  event: string;
  eventType: 'contest' | 'hackathon';
  issuedAt: string;
  rank?: number;
}

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventType: 'contest' | 'hackathon';
  status: 'registered' | 'completed' | 'cancelled';
  registeredAt: string;
  startDate: string;
}
