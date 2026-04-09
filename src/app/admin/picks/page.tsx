'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import DashboardHeader from '@/components/AdminHeader';
import { Trash2, Search } from 'lucide-react';

interface Pick {
  id: string;
  game: string;
  pick_type: string;
  pick_detail: string;
  odds: string;
  confidence: string;
  result: string;
  sport: string;
  notes: string;
  created_at: string;
  handicapper_id: string;
  handicappers?: { display_name: string };
}

export default function AdminPicksPage() {
  const [picks, setPicks] = useState<Pick[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [resultFilter, setResultFilter] = useState<'all' | 'win' | 'loss' | 'pending'>('all');

  useEffect(() => {
    loadPicks();
  }, []);

  const loadPicks = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('picks')
      .select('*, handicappers(display_name)')
      .order('created_at', { ascending: false })
      .limit(200);

    setPicks((data as Pick[]) || []);
    setLoading(false);
  };

  const deletePick = async (id: string) => {
    if (!confirm('Delete this pick? This cannot be undone.')) return;
    const supabase = createClient();
    await supabase.from('picks').delete().eq('id', id);
    loadPicks();
  };

  const filtered = picks.filter((p) => {
    const matchesSearch = p.game.toLowerCase().includes(search.toLowerCase()) ||
                          p.handicappers?.display_name?.toLowerCase().includes(search.toLowerCase());
    const matchesResult = resultFilter === 'all' || p.result === resultFilter;
    return matchesSearch && matchesResult;
  });

  return (
    <>
      <DashboardHeader title="All Picks" subtitle="Monitor and moderate platform content" />
      <div className="p-6">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by game or handicapper..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'pending', 'win', 'loss'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setResultFilter(f)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium capitalize ${
                  resultFilter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Picks List */}
        <div className="bg-white rounded-xl border border-gray-200">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No picks found</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((pick) => (
                <div key={pick.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{pick.game}</span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 capitalize">
                          {pick.pick_type.replace('_', '/')}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                          {pick.sport}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full uppercase font-bold ${
                          pick.result === 'win' ? 'bg-green-100 text-green-700' :
                          pick.result === 'loss' ? 'bg-red-100 text-red-700' :
                          pick.result === 'push' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {pick.result}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">{pick.pick_detail} ({pick.odds})</div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span className="font-medium">by {pick.handicappers?.display_name || 'Unknown'}</span>
                        <span>&middot;</span>
                        <span>{new Date(pick.created_at).toLocaleString()}</span>
                      </div>
                      {pick.notes ? (
                        <p className="text-sm text-gray-500 mt-2 italic">&ldquo;{pick.notes}&rdquo;</p>
                      ) : null}
                    </div>
                    <button
                      onClick={() => deletePick(pick.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg ml-3"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
