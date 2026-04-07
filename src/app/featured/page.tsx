import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Star, TrendingUp, Users, Trophy, Target } from 'lucide-react';

export default async function FeaturedPage() {
  const supabase = await createClient();

  // Get featured handicappers
  const { data: featured } = await supabase
    .from('handicappers')
    .select('*')
    .eq('is_featured', true)
    .order('win_rate', { ascending: false });

  // Get top performers by win rate (min 10 picks)
  const { data: topPerformers } = await supabase
    .from('handicappers')
    .select('*')
    .gte('total_picks', 1)
    .order('win_rate', { ascending: false })
    .limit(10);

  const featuredList = featured || [];
  const leaderboard = topPerformers || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Handicappers
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the top-performing handicappers on Cheat Sheet. These are the experts
            who are consistently delivering results for their followers.
          </p>
        </div>
      </section>

      {/* Featured Cards */}
      {featuredList.length > 0 && (
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid gap-6">
              {featuredList.map((h) => {
                const decided = h.wins + h.losses;
                const winRate = decided > 0 ? ((h.wins / decided) * 100).toFixed(1) : '0.0';
                return (
                  <Link
                    key={h.id}
                    href={`/handicapper/${h.id}`}
                    className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow block"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-700 shrink-0">
                        {h.display_name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{h.display_name}</h3>
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                            Featured
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{h.bio || 'No bio yet.'}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{h.sport}</span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {h.wins}-{h.losses} ({winRate}%)
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {h.followers_count.toLocaleString()} followers
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {h.total_picks} picks
                          </span>
                        </div>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <div className="text-sm text-gray-500">${h.subscription_price}/mo</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {featuredList.length === 0 && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center text-gray-500">
            No featured handicappers yet. Build your track record and you could be here!
          </div>
        </section>
      )}

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <section className="pb-16">
          <div className="max-w-3xl mx-auto px-4">
            <div className="section-divider mb-12" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              <Trophy className="w-6 h-6 inline-block mr-2 text-yellow-500" />
              Top Performers
            </h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rank</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Handicapper</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Sport</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Record</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((h, i) => {
                    const decided = h.wins + h.losses;
                    const winRate = decided > 0 ? ((h.wins / decided) * 100).toFixed(1) : '0.0';
                    return (
                      <tr key={h.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">#{i + 1}</td>
                        <td className="px-4 py-3 text-sm">
                          <Link href={`/handicapper/${h.id}`} className="text-gray-900 hover:underline font-medium">
                            {h.display_name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{h.sport}</td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600">{h.wins}-{h.losses}</td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-green-600">{winRate}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="section-divider mb-12" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Want to be featured?
          </h2>
          <p className="text-gray-600 mb-6">
            Build your track record, grow your following, and rise to the top.
          </p>
          <Link href="/become" className="btn-outline">
            Become a Handicapper
          </Link>
        </div>
      </section>
    </div>
  );
}
