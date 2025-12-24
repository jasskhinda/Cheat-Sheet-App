export interface Player {
  id: number;
  name: string;
  team: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF';
  salary: number;
  projectedPoints: number;
  opponent: string;
  gameTime: string;
  byeWeek: number;
  value: number;
  tier: number;
  status: 'healthy' | 'questionable' | 'doubtful' | 'out';
  recentAvg: number;
  ceiling: number;
  floor: number;
}

export const nflPlayers: Player[] = [
  // QBs
  { id: 1, name: "Josh Allen", team: "BUF", position: "QB", salary: 8200, projectedPoints: 24.5, opponent: "vs NE", gameTime: "Sun 1:00 PM", byeWeek: 12, value: 2.99, tier: 1, status: "healthy", recentAvg: 26.2, ceiling: 35, floor: 18 },
  { id: 2, name: "Jalen Hurts", team: "PHI", position: "QB", salary: 8000, projectedPoints: 23.8, opponent: "@ DAL", gameTime: "Sun 4:25 PM", byeWeek: 5, value: 2.98, tier: 1, status: "healthy", recentAvg: 24.1, ceiling: 32, floor: 16 },
  { id: 3, name: "Lamar Jackson", team: "BAL", position: "QB", salary: 7900, projectedPoints: 24.1, opponent: "vs CLE", gameTime: "Sun 1:00 PM", byeWeek: 13, value: 3.05, tier: 1, status: "healthy", recentAvg: 25.8, ceiling: 38, floor: 15 },
  { id: 4, name: "Patrick Mahomes", team: "KC", position: "QB", salary: 7700, projectedPoints: 21.2, opponent: "@ LV", gameTime: "Sun 4:25 PM", byeWeek: 6, value: 2.75, tier: 2, status: "healthy", recentAvg: 20.5, ceiling: 30, floor: 14 },
  { id: 5, name: "Jayden Daniels", team: "WAS", position: "QB", salary: 7500, projectedPoints: 22.5, opponent: "vs NYG", gameTime: "Sun 1:00 PM", byeWeek: 14, value: 3.00, tier: 1, status: "healthy", recentAvg: 23.4, ceiling: 34, floor: 14 },

  // RBs
  { id: 6, name: "Derrick Henry", team: "BAL", position: "RB", salary: 8500, projectedPoints: 21.2, opponent: "vs CLE", gameTime: "Sun 1:00 PM", byeWeek: 13, value: 2.49, tier: 1, status: "healthy", recentAvg: 22.8, ceiling: 32, floor: 12 },
  { id: 7, name: "Saquon Barkley", team: "PHI", position: "RB", salary: 8300, projectedPoints: 20.8, opponent: "@ DAL", gameTime: "Sun 4:25 PM", byeWeek: 5, value: 2.51, tier: 1, status: "healthy", recentAvg: 21.5, ceiling: 30, floor: 14 },
  { id: 8, name: "Jahmyr Gibbs", team: "DET", position: "RB", salary: 7800, projectedPoints: 18.5, opponent: "@ CHI", gameTime: "Sun 1:00 PM", byeWeek: 5, value: 2.37, tier: 2, status: "healthy", recentAvg: 19.2, ceiling: 28, floor: 10 },
  { id: 9, name: "Bijan Robinson", team: "ATL", position: "RB", salary: 7600, projectedPoints: 17.8, opponent: "vs TB", gameTime: "Sun 1:00 PM", byeWeek: 12, value: 2.34, tier: 2, status: "healthy", recentAvg: 18.1, ceiling: 26, floor: 11 },
  { id: 10, name: "Josh Jacobs", team: "GB", position: "RB", salary: 7200, projectedPoints: 16.5, opponent: "@ MIN", gameTime: "Sun 1:00 PM", byeWeek: 10, value: 2.29, tier: 2, status: "questionable", recentAvg: 17.2, ceiling: 25, floor: 9 },
  { id: 11, name: "Breece Hall", team: "NYJ", position: "RB", salary: 6800, projectedPoints: 14.2, opponent: "vs MIA", gameTime: "Sun 1:00 PM", byeWeek: 12, value: 2.09, tier: 3, status: "healthy", recentAvg: 13.8, ceiling: 22, floor: 8 },
  { id: 12, name: "Joe Mixon", team: "HOU", position: "RB", salary: 7000, projectedPoints: 15.8, opponent: "@ IND", gameTime: "Sun 1:00 PM", byeWeek: 14, value: 2.26, tier: 2, status: "healthy", recentAvg: 16.5, ceiling: 24, floor: 10 },

  // WRs
  { id: 13, name: "Ja'Marr Chase", team: "CIN", position: "WR", salary: 9000, projectedPoints: 21.5, opponent: "@ PIT", gameTime: "Sun 1:00 PM", byeWeek: 12, value: 2.39, tier: 1, status: "healthy", recentAvg: 23.2, ceiling: 35, floor: 12 },
  { id: 14, name: "CeeDee Lamb", team: "DAL", position: "WR", salary: 8400, projectedPoints: 18.2, opponent: "vs PHI", gameTime: "Sun 4:25 PM", byeWeek: 7, value: 2.17, tier: 2, status: "healthy", recentAvg: 17.5, ceiling: 28, floor: 10 },
  { id: 15, name: "Amon-Ra St. Brown", team: "DET", position: "WR", salary: 8200, projectedPoints: 19.5, opponent: "@ CHI", gameTime: "Sun 1:00 PM", byeWeek: 5, value: 2.38, tier: 1, status: "healthy", recentAvg: 20.1, ceiling: 30, floor: 12 },
  { id: 16, name: "Tyreek Hill", team: "MIA", position: "WR", salary: 7800, projectedPoints: 16.8, opponent: "@ NYJ", gameTime: "Sun 1:00 PM", byeWeek: 6, value: 2.15, tier: 2, status: "questionable", recentAvg: 15.2, ceiling: 32, floor: 6 },
  { id: 17, name: "A.J. Brown", team: "PHI", position: "WR", salary: 7600, projectedPoints: 17.2, opponent: "@ DAL", gameTime: "Sun 4:25 PM", byeWeek: 5, value: 2.26, tier: 2, status: "healthy", recentAvg: 18.5, ceiling: 28, floor: 9 },
  { id: 18, name: "Malik Nabers", team: "NYG", position: "WR", salary: 7200, projectedPoints: 15.5, opponent: "@ WAS", gameTime: "Sun 1:00 PM", byeWeek: 11, value: 2.15, tier: 2, status: "healthy", recentAvg: 16.2, ceiling: 26, floor: 8 },
  { id: 19, name: "Puka Nacua", team: "LAR", position: "WR", salary: 7400, projectedPoints: 16.2, opponent: "vs SF", gameTime: "Thu 8:15 PM", byeWeek: 6, value: 2.19, tier: 2, status: "healthy", recentAvg: 17.8, ceiling: 27, floor: 9 },
  { id: 20, name: "Nico Collins", team: "HOU", position: "WR", salary: 7000, projectedPoints: 14.8, opponent: "@ IND", gameTime: "Sun 1:00 PM", byeWeek: 14, value: 2.11, tier: 3, status: "healthy", recentAvg: 15.5, ceiling: 25, floor: 8 },

  // TEs
  { id: 21, name: "Travis Kelce", team: "KC", position: "TE", salary: 6500, projectedPoints: 12.5, opponent: "@ LV", gameTime: "Sun 4:25 PM", byeWeek: 6, value: 1.92, tier: 1, status: "healthy", recentAvg: 11.8, ceiling: 20, floor: 6 },
  { id: 22, name: "George Kittle", team: "SF", position: "TE", salary: 6200, projectedPoints: 13.2, opponent: "@ LAR", gameTime: "Thu 8:15 PM", byeWeek: 9, value: 2.13, tier: 1, status: "healthy", recentAvg: 14.1, ceiling: 22, floor: 7 },
  { id: 23, name: "Brock Bowers", team: "LV", position: "TE", salary: 5800, projectedPoints: 12.8, opponent: "vs KC", gameTime: "Sun 4:25 PM", byeWeek: 10, value: 2.21, tier: 1, status: "healthy", recentAvg: 13.5, ceiling: 20, floor: 8 },
  { id: 24, name: "Trey McBride", team: "ARI", position: "TE", salary: 5500, projectedPoints: 11.5, opponent: "vs CAR", gameTime: "Sun 4:05 PM", byeWeek: 11, value: 2.09, tier: 2, status: "healthy", recentAvg: 12.2, ceiling: 18, floor: 6 },
  { id: 25, name: "Sam LaPorta", team: "DET", position: "TE", salary: 5200, projectedPoints: 10.2, opponent: "@ CHI", gameTime: "Sun 1:00 PM", byeWeek: 5, value: 1.96, tier: 2, status: "healthy", recentAvg: 9.8, ceiling: 16, floor: 5 },

  // Kickers
  { id: 26, name: "Justin Tucker", team: "BAL", position: "K", salary: 5000, projectedPoints: 8.5, opponent: "vs CLE", gameTime: "Sun 1:00 PM", byeWeek: 13, value: 1.70, tier: 1, status: "healthy", recentAvg: 8.2, ceiling: 14, floor: 3 },
  { id: 27, name: "Harrison Butker", team: "KC", position: "K", salary: 4900, projectedPoints: 8.2, opponent: "@ LV", gameTime: "Sun 4:25 PM", byeWeek: 6, value: 1.67, tier: 1, status: "healthy", recentAvg: 9.1, ceiling: 15, floor: 2 },
  { id: 28, name: "Ka'imi Fairbairn", team: "HOU", position: "K", salary: 4700, projectedPoints: 7.8, opponent: "@ IND", gameTime: "Sun 1:00 PM", byeWeek: 14, value: 1.66, tier: 2, status: "healthy", recentAvg: 7.5, ceiling: 12, floor: 3 },

  // Defenses
  { id: 29, name: "Ravens", team: "BAL", position: "DEF", salary: 4500, projectedPoints: 9.5, opponent: "vs CLE", gameTime: "Sun 1:00 PM", byeWeek: 13, value: 2.11, tier: 1, status: "healthy", recentAvg: 10.2, ceiling: 18, floor: 2 },
  { id: 30, name: "49ers", team: "SF", position: "DEF", salary: 4300, projectedPoints: 8.2, opponent: "@ LAR", gameTime: "Thu 8:15 PM", byeWeek: 9, value: 1.91, tier: 1, status: "healthy", recentAvg: 8.8, ceiling: 16, floor: 1 },
  { id: 31, name: "Cowboys", team: "DAL", position: "DEF", salary: 4000, projectedPoints: 7.5, opponent: "vs PHI", gameTime: "Sun 4:25 PM", byeWeek: 7, value: 1.88, tier: 2, status: "healthy", recentAvg: 7.2, ceiling: 14, floor: 0 },
  { id: 32, name: "Eagles", team: "PHI", position: "DEF", salary: 4200, projectedPoints: 8.8, opponent: "@ DAL", gameTime: "Sun 4:25 PM", byeWeek: 5, value: 2.10, tier: 1, status: "healthy", recentAvg: 9.5, ceiling: 17, floor: 2 },
];

export const positionColors: Record<string, string> = {
  QB: 'bg-red-500/20 text-red-400 border-red-500/30',
  RB: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  WR: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  TE: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  K: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  DEF: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export const tierLabels: Record<number, { label: string; color: string }> = {
  1: { label: 'Elite', color: 'bg-green-500/20 text-green-400' },
  2: { label: 'Solid', color: 'bg-blue-500/20 text-blue-400' },
  3: { label: 'Flex', color: 'bg-yellow-500/20 text-yellow-400' },
  4: { label: 'Risky', color: 'bg-red-500/20 text-red-400' },
};
