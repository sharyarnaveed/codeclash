export const MOCK_ANALYTICS = {
  growth: [
    { month: 'Jan', users: 1200, contests: 8, hackathons: 2 },
    { month: 'Feb', users: 1800, contests: 10, hackathons: 3 },
    { month: 'Mar', users: 2400, contests: 12, hackathons: 3 },
    { month: 'Apr', users: 3100, contests: 14, hackathons: 4 },
    { month: 'May', users: 3800, contests: 16, hackathons: 4 },
    { month: 'Jun', users: 4500, contests: 18, hackathons: 5 },
    { month: 'Jul', users: 5200, contests: 20, hackathons: 5 },
    { month: 'Aug', users: 5800, contests: 22, hackathons: 6 },
  ],
  traffic: [
    { day: 'Mon', visits: 4200, pageViews: 12400 },
    { day: 'Tue', visits: 3800, pageViews: 11200 },
    { day: 'Wed', visits: 4500, pageViews: 13800 },
    { day: 'Thu', visits: 5100, pageViews: 15200 },
    { day: 'Fri', visits: 4800, pageViews: 14100 },
    { day: 'Sat', visits: 6200, pageViews: 18900 },
    { day: 'Sun', visits: 5900, pageViews: 17600 },
  ],
  completionRates: {
    contests: 78,
    hackathons: 65,
    problems: 42,
  },
  difficultyDistribution: [
    { difficulty: 'Easy', count: 45, percentage: 29 },
    { difficulty: 'Medium', count: 68, percentage: 44 },
    { difficulty: 'Hard', count: 43, percentage: 27 },
  ],
  registrationFunnel: [
    { stage: 'Visited', count: 10000 },
    { stage: 'Signed Up', count: 5200 },
    { stage: 'Registered', count: 3800 },
    { stage: 'Participated', count: 2900 },
    { stage: 'Completed', count: 2100 },
  ],
};
