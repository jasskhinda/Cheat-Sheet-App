export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'handicapper' | 'subscriber';
  avatar_url?: string;
  created_at: string;
}

export interface HandicapperProfile {
  id: string;
  user_id: string;
  display_name: string;
  bio: string;
  sport: string;
  total_picks: number;
  wins: number;
  losses: number;
  pushes: number;
  win_rate: number;
  followers_count: number;
  is_featured: boolean;
  subscription_price: number;
  affiliate_platform?: string;
  created_at: string;
}

export interface Pick {
  id: string;
  handicapper_id: string;
  sport: string;
  league: string;
  game: string;
  pick_type: 'spread' | 'moneyline' | 'over_under' | 'prop' | 'parlay';
  pick_detail: string;
  odds: string;
  confidence: 'low' | 'medium' | 'high' | 'lock';
  result?: 'win' | 'loss' | 'push' | 'pending';
  notes?: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  subscriber_id: string;
  handicapper_id: string;
  status: 'active' | 'cancelled' | 'expired';
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}
