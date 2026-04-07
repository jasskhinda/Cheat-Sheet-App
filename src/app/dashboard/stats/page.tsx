import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardHeader from '@/components/AdminHeader';

export default async function StatsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/signin');

  const { data: handicapper } = await supabase
    .from('handicappers')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const { data: picks } = await supabase
    .from('picks')
    .select('*')
    .eq('handicapper_id', handicapper?.id)
    .order('created_at', { ascending: false });

  const allPicks = picks || [];
  const wins = allPicks.filter(p => p.result === 'win').length;
  const losses = allPicks.filter(p => p.result === 'loss').length;
  const pushes = allPicks.filter(p => p.result === 'push').length;
  const pending = allPicks.filter(p => p.result === 'pending').length;
  const decided = wins + losses;
  const winRate = decided > 0 ? ((wins / decided) * 100).toFixed(1) : '0.0';

  // By sport
  const sportStats = allPicks.reduce<Record<string, { wins: number; losses: number; total: number }>>((acc, pick) => {
    if (!acc[pick.sport]) acc[pick.sport] = { wins: 0, losses: 0, total: 0 };
    acc[pick.sport].total++;
    if (pick.result === 'win') acc[pick.sport].wins++;
    if (pick.result === 'loss') acc[pick.sport].losses++;
    return acc;
  }, {});

  // By pick type
  const typeStats = allPicks.reduce<Record<string, { wins: number; losses: number; total: number }>>((acc, pick) => {
    if (!acc[pick.pick_type]) acc[pick.pick_type] = { wins: 0, losses: 0, total: 0 };
    acc[pick.pick_type].total++;
    if (pick.result === 'win') acc[pick.pick_type].wins++;
    if (pick.result === 'loss') acc[pick.pick_type].losses++;
    return acc;
  }, {});

  // Recent 10 streak
  const recent = allPicks.filter(p => p.result !== 'pending').slice(0, 10);
  const streakDisplay = recent.map(p => p.result === 'win' ? 'W' : p.result === 'loss' ? 'L' : 'P');

  return (
    <>
      <DashboardHeader title="Stats & Analytics" subtitle="Your complete performance breakdown" />
      <div className="p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{allPicks.length}</div>
            <div className="text-sm text-gray-500">Total Picks</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{wins}</div>
            <div className="text-sm text-gray-500">Wins</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{losses}</div>
            <div className="text-sm text-gray-500">Losses</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{pushes}</div>
            <div className="text-sm text-gray-500">Pushes</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{winRate}%</div>
            <div className="text-sm text-gray-500">Win Rate</div>
          </div>
        </div>

        {/* Recent Streak */}
        {streakDisplay.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Last 10 Results</h3>
            <div className="flex gap-2">
              {streakDisplay.map((result, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                    result === 'W' ? 'bg-green-100 text-green-700' :
                    result === 'L' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* By Sport */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Performance by Sport</h3>
            {Object.keys(sportStats).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(sportStats).map(([sport, stats]) => {
                  const decided = stats.wins + stats.losses;
                  const rate = decided > 0 ? ((stats.wins / decided) * 100).toFixed(1) : '0.0';
                  return (
                    <div key={sport} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <span className="font-medium text-gray-900">{sport}</span>
                        <span className="text-sm text-gray-500 ml-2">({stats.total} picks)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">{stats.wins}W - {stats.losses}L</span>
                        <span className="font-bold text-green-600">{rate}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No data yet</p>
            )}
          </div>

          {/* By Pick Type */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Performance by Pick Type</h3>
            {Object.keys(typeStats).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(typeStats).map(([type, stats]) => {
                  const decided = stats.wins + stats.losses;
                  const rate = decided > 0 ? ((stats.wins / decided) * 100).toFixed(1) : '0.0';
                  return (
                    <div key={type} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <span className="font-medium text-gray-900 capitalize">{type.replace('_', '/')}</span>
                        <span className="text-sm text-gray-500 ml-2">({stats.total} picks)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">{stats.wins}W - {stats.losses}L</span>
                        <span className="font-bold text-green-600">{rate}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No data yet</p>
            )}
          </div>
        </div>

        {/* Pending */}
        {pending > 0 && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            You have <strong>{pending}</strong> pending pick{pending !== 1 ? 's' : ''} awaiting results. Go to{' '}
            <a href="/dashboard/picks" className="underline font-medium">My Picks</a> to update them.
          </div>
        )}
      </div>
    </>
  );
}
