export const MOCK_USERS = [
  { id: 1, name: "Alice Chen", username: "alicec", rating: 2840, country: "US", university: "MIT", winRate: 72, favoriteLanguage: "Python", bio: "Competitive programmer & open source contributor" },
  { id: 2, name: "Bob Smith", username: "bob_codes", rating: 2100, country: "GB", university: "Oxford", winRate: 55, favoriteLanguage: "C++", bio: "Algorithms enthusiast" },
  { id: 3, name: "Charlie Kim", username: "charliek", rating: 3100, country: "KR", university: "SNU", winRate: 85, favoriteLanguage: "Rust", bio: "Low level is the best level" },
  { id: 4, name: "Diana Li", username: "dianal", rating: 2450, country: "CN", university: "Tsinghua", winRate: 68, favoriteLanguage: "Go", bio: "Backend engineer" },
  { id: 5, name: "Evan Wright", username: "evanw", rating: 1800, country: "US", university: "Stanford", winRate: 50, favoriteLanguage: "JavaScript", bio: "Full stack developer" },
  // ... more users
];

export const MOCK_PROBLEMS = [
  { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array", "Math"], acceptance: 85, points: 100, estimatedTime: 10 },
  { id: 2, title: "LRU Cache", difficulty: "Medium", tags: ["Design", "Hash Table"], acceptance: 45, points: 250, estimatedTime: 30 },
  { id: 3, title: "Median of Two Sorted Arrays", difficulty: "Hard", tags: ["Array", "Binary Search"], acceptance: 20, points: 500, estimatedTime: 45 },
];

export const MOCK_HISTORY = [
  { id: 1, opponent: "bob_codes", result: "win", duration: "12:34", ratingChange: "+15", problem: "Two Sum", language: "Python" },
  { id: 2, opponent: "charliek", result: "loss", duration: "45:00", ratingChange: "-10", problem: "LRU Cache", language: "Python" },
];

export const MOCK_RATING_DATA = Array.from({ length: 60 }, (_, i) => ({
  day: i,
  rating: 1500 + Math.floor(Math.random() * 500) + (i * 5)
}));

export const MOCK_WEEKLY_ACTIVITY = [
  { day: "Mon", count: 4 },
  { day: "Tue", count: 7 },
  { day: "Wed", count: 2 },
  { day: "Thu", count: 9 },
  { day: "Fri", count: 5 },
  { day: "Sat", count: 12 },
  { day: "Sun", count: 15 },
];

export const MOCK_LANGUAGE_USAGE = [
  { name: "Python", value: 35 },
  { name: "JavaScript", value: 25 },
  { name: "C++", value: 20 },
  { name: "Go", value: 10 },
  { name: "Rust", value: 10 },
];
