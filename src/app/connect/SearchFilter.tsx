'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, QrCode, TrendingUp, Users } from 'lucide-react';

interface Handicapper {
  id: string;
  display_name: string;
  sport: string;
  wins: number;
  losses: number;
  win_rate: number;
  followers_count: number;
  is_featured: boolean;
  subscription_price: number;
}

export default function SearchFilter({ handicappers }: { handicappers: Handicapper[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');

  const sports = ['All', ...Array.from(new Set(handicappers.map(h => h.sport)))];

  const filtered = handicappers.filter((h) => {
    const matchesSearch = h.display_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'All' || h.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  return (
    <section className="pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Search & Filter */}
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
        <div className="flex gap-2 flex-wrap mb-8">
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

        {/* Results */}
        <div className="grid gap-4">
          {filtered.map((h) => {
            const decided = h.wins + h.losses;
            const winRate = decided > 0 ? ((h.wins / decided) * 100).toFixed(1) : '0.0';
            return (
              <Link
                key={h.id}
                href={`/handicapper/${h.id}`}
                className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700">
                    {h.display_name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{h.display_name}</h3>
                      {h.is_featured && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span>{h.sport}</span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {h.wins}-{h.losses} ({winRate}%)
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {h.followers_count.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm text-gray-500">${h.subscription_price}/mo</span>
                  <span className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">
                    View
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {handicappers.length === 0
              ? 'No handicappers have signed up yet. Be the first!'
              : 'No handicappers found matching your search.'}
          </div>
        )}
      </div>
    </section>
  );
}
