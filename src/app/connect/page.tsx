'use client';

import { Search, QrCode, Star, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

const sampleHandicappers = [
  { id: 1, name: "SharpShooter", sport: "NFL", record: "127-89", winRate: "58.8%", followers: 1240, hot: true },
  { id: 2, name: "BetWizard", sport: "NBA", record: "98-62", winRate: "61.3%", followers: 890, hot: true },
  { id: 3, name: "GridironGuru", sport: "NFL", record: "142-110", winRate: "56.3%", followers: 2100, hot: false },
  { id: 4, name: "CourtKing", sport: "NBA", record: "85-55", winRate: "60.7%", followers: 675, hot: true },
  { id: 5, name: "ParlayPro", sport: "Multi", record: "203-158", winRate: "56.2%", followers: 1580, hot: false },
  { id: 6, name: "DiamondPicks", sport: "MLB", record: "112-88", winRate: "56.0%", followers: 430, hot: false },
];

export default function ConnectPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');

  const sports = ['All', 'NFL', 'NBA', 'MLB', 'NHL', 'Multi'];

  const filtered = sampleHandicappers.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'All' || h.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Connect to a Handicapper
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Join a community that shares valuable tips and data all in one place to increase your odds.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow experienced sports betting handicappers to increase your success with confidence.
            Get notifications in real time to make sure you&apos;re getting the best odds.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search handicappers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="btn-outline !py-3 !px-6 !text-base">
              <QrCode className="w-5 h-5 mr-2" />
              Scan QR Code
            </button>
          </div>

          {/* Sport Filter */}
          <div className="flex gap-2 flex-wrap">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSport === sport
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Handicapper List */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-4">
            {filtered.map((handicapper) => (
              <div
                key={handicapper.id}
                className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700">
                    {handicapper.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{handicapper.name}</h3>
                      {handicapper.hot && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                          Hot
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span>{handicapper.sport}</span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {handicapper.record} ({handicapper.winRate})
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {handicapper.followers.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">$5/mo</span>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No handicappers found. Try a different search or filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
