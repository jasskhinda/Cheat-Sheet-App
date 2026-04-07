'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import DashboardHeader from '@/components/AdminHeader';
import { Plus, X } from 'lucide-react';

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
}

export default function PicksPage() {
  const [picks, setPicks] = useState<Pick[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [handicapperId, setHandicapperId] = useState<string | null>(null);

  // Form state
  const [game, setGame] = useState('');
  const [pickType, setPickType] = useState('spread');
  const [pickDetail, setPickDetail] = useState('');
  const [odds, setOdds] = useState('');
  const [confidence, setConfidence] = useState('medium');
  const [sport, setSport] = useState('NFL');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPicks();
  }, []);

  const loadPicks = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: handicapper } = await supabase
      .from('handicappers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (handicapper) {
      setHandicapperId(handicapper.id);
      const { data } = await supabase
        .from('picks')
        .select('*')
        .eq('handicapper_id', handicapper.id)
        .order('created_at', { ascending: false });

      setPicks(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handicapperId) return;
    setSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.from('picks').insert({
      handicapper_id: handicapperId,
      game,
      pick_type: pickType,
      pick_detail: pickDetail,
      odds,
      confidence,
      sport,
      league: sport,
      notes,
    });

    if (!error) {
      setShowForm(false);
      setGame(''); setPickDetail(''); setOdds(''); setNotes('');
      loadPicks();
    }
    setSubmitting(false);
  };

  const updateResult = async (pickId: string, result: string) => {
    const supabase = createClient();
    await supabase.from('picks').update({ result }).eq('id', pickId);
    loadPicks();
  };

  return (
    <>
      <DashboardHeader title="My Picks" subtitle="Post and manage your picks" />
      <div className="p-6">
        {/* Post New Pick Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Post New Pick'}
        </button>

        {/* New Pick Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">New Pick</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Game</label>
                  <input
                    type="text"
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    placeholder="e.g. Chiefs vs Bills"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                  <select value={sport} onChange={(e) => setSport(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="NFL">NFL</option>
                    <option value="NBA">NBA</option>
                    <option value="MLB">MLB</option>
                    <option value="NHL">NHL</option>
                    <option value="NCAAF">NCAAF</option>
                    <option value="NCAAB">NCAAB</option>
                    <option value="Soccer">Soccer</option>
                    <option value="MMA">MMA</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pick Type</label>
                  <select value={pickType} onChange={(e) => setPickType(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="spread">Spread</option>
                    <option value="moneyline">Moneyline</option>
                    <option value="over_under">Over/Under</option>
                    <option value="prop">Prop</option>
                    <option value="parlay">Parlay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pick Detail</label>
                  <input
                    type="text"
                    value={pickDetail}
                    onChange={(e) => setPickDetail(e.target.value)}
                    placeholder="e.g. Chiefs -3.5"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Odds</label>
                  <input
                    type="text"
                    value={odds}
                    onChange={(e) => setOdds(e.target.value)}
                    placeholder="e.g. -110"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confidence</label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high', 'lock'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setConfidence(level)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                        confidence === level
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level === 'lock' ? 'Lock 🔒' : level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share your analysis..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Pick'}
              </button>
            </form>
          </div>
        )}

        {/* Picks List */}
        <div className="bg-white rounded-xl border border-gray-200">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : picks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No picks yet. Post your first pick to get started!
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {picks.map((pick) => (
                <div key={pick.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{pick.game}</span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 capitalize">
                          {pick.pick_type.replace('_', '/')}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                          {pick.sport}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">{pick.pick_detail} ({pick.odds})</div>
                      {pick.notes && <div className="text-sm text-gray-500 mt-1">{pick.notes}</div>}
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(pick.created_at).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {pick.result === 'pending' ? (
                        <div className="flex gap-1">
                          <button onClick={() => updateResult(pick.id, 'win')} className="px-3 py-1 text-xs rounded-lg bg-green-100 text-green-700 hover:bg-green-200 font-medium">W</button>
                          <button onClick={() => updateResult(pick.id, 'loss')} className="px-3 py-1 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-medium">L</button>
                          <button onClick={() => updateResult(pick.id, 'push')} className="px-3 py-1 text-xs rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 font-medium">P</button>
                        </div>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          pick.result === 'win' ? 'bg-green-100 text-green-700' :
                          pick.result === 'loss' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {pick.result}
                        </span>
                      )}
                    </div>
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
