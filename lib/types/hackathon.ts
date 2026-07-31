export type HackathonStatus = 'live' | 'upcoming' | 'past' | 'registration_open';

export interface Track {
  id: string;
  name: string;
  description: string;
  prize: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  logo?: string;
}

export interface Hackathon {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  status: HackathonStatus;
  banner: string;
  startDate: string;
  endDate: string;
  location: string;
  participants: number;
  maxTeamSize: number;
  tracks: Track[];
  sponsors: Sponsor[];
  prizes: { place: string; amount: string }[];
  registered?: boolean;
}

export interface Team {
  id: string;
  hackathonId: string;
  name: string;
  inviteCode: string;
  members: TeamMember[];
  project?: ProjectSubmission;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TeamMember {
  id: string;
  name: string;
  username: string;
  role: 'leader' | 'member';
  avatar?: string;
}

export interface ProjectSubmission {
  id: string;
  teamId: string;
  title: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  trackId: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'winner';
  score?: number;
  thumbnail?: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  avatar?: string;
  availableSlots: { time: string; booked: boolean }[];
}

export interface Judge {
  id: string;
  name: string;
  title: string;
  company: string;
  criteria: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  completed: boolean;
}
