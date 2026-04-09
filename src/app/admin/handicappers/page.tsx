'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import DashboardHeader from '@/components/AdminHeader';
import { Star, Search, Trash2 } from 'lucide-react';

interface Handicapper {
  id: string;
  user_id: string;
  display_name: string;
  bio: string;
  sport: string;
  total_picks: number;
  wins: number;
  losses: number;
  win_rate: number;
  followers_count: number;
  is_featured: boolean;
  subscription_price: number;
  created_at: string;
  profiles?: { email: string; full_name: string };
}

export default function AdminHandicappersPage() {
  const [handicappers, setHandicappers] = useState<Handicapper[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    loadHandicappers();
  }, []);

  const loadHandicappers = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('handicappers')
      .select('*, profiles:user_id(email, full_name)')
      .order('created_at', { ascending: false });

    setHandicappers((data as Handicapper[]) || []);
    setLoading(false);
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    const supabase = createClient();
    await supabase.from('handicappers').update({ is_featured: !current }).eq('id', id);
    loadHandicappers();
  };

  const deleteHandicapper = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    const supabase = createClient();
    await supabase.from('handicappers').delete().eq('id', id);
    loadHandicappers();
  };

  const filtered = handicappers.filter((h) => {
    const matchesSearch = h.display_name.toLowerCase().includes(search.toLowerCase()) ||
                          h.profiles?.email?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'featured' && h.is_featured);
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <DashboardHeader title="Handicappers" subtitle={`${handicappers.length} total handicappers`} />
      <div className="p-6">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                filter === 'featured' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Featured
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No handicappers found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sport</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Record</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Win %</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Followers</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Featured</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm">
                          {h.display_name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{h.display_name}</div>
                          <div className="text-xs text-gray-500">{h.profiles?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{h.sport}</td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">{h.wins}-{h.losses}</td>
                    <td className="px-4 py-3 text-sm text-center font-medium text-green-600">{h.win_rate}%</td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">{h.followers_count}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleFeatured(h.id, h.is_featured)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          h.is_featured ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${h.is_featured ? 'fill-yellow-500' : ''}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/handicapper/${h.id}`}
                          target="_blank"
                          className="px-2.5 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          View
                        </a>
                        <button
                          onClick={() => deleteHandicapper(h.id, h.display_name)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
