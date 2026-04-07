import { Star, TrendingUp, Users, Trophy } from 'lucide-react';
import Link from 'next/link';

const featuredHandicappers = [
  {
    id: 1,
    name: "SharpShooter",
    sport: "NFL",
    record: "127-89",
    winRate: "58.8%",
    followers: 1240,
    bio: "10+ years in the NFL game. Specializing in spreads and totals with a data-driven approach.",
    streak: "8-2 last 10",
  },
  {
    id: 2,
    name: "BetWizard",
    sport: "NBA",
    record: "98-62",
    winRate: "61.3%",
    followers: 890,
    bio: "Former college basketball analyst turned full-time handicapper. Player props are my bread and butter.",
    streak: "7-3 last 10",
  },
  {
    id: 3,
    name: "GridironGuru",
    sport: "NFL",
    record: "142-110",
    winRate: "56.3%",
    followers: 2100,
    bio: "Breaking down every matchup, every week. Consistent results that speak for themselves.",
    streak: "6-4 last 10",
  },
];

const topPerformers = [
  { rank: 1, name: "BetWizard", winRate: "61.3%", sport: "NBA" },
  { rank: 2, name: "CourtKing", winRate: "60.7%", sport: "NBA" },
  { rank: 3, name: "SharpShooter", winRate: "58.8%", sport: "NFL" },
  { rank: 4, name: "GridironGuru", winRate: "56.3%", sport: "NFL" },
  { rank: 5, name: "ParlayPro", winRate: "56.2%", sport: "Multi" },
];

export default function FeaturedPage() {
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
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid gap-6">
            {featuredHandicappers.map((h) => (
              <div
                key={h.id}
                className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-700 shrink-0">
                    {h.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">{h.name}</h3>
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        Featured
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{h.bio}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{h.sport}</span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {h.record} ({h.winRate})
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {h.followers.toLocaleString()} followers
                      </span>
                      <span className="text-green-600 font-medium">{h.streak}</span>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="text-sm text-gray-500 mb-2">$5/mo</div>
                    <button className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
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
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((p) => (
                  <tr key={p.rank} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">#{p.rank}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{p.sport}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-green-600">{p.winRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

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
