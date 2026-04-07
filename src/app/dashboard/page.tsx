import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardHeader from '@/components/AdminHeader';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/signin');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const role = profile?.role || 'subscriber';

  if (role === 'handicapper') {
    return <HandicapperDashboard userId={user.id} />;
  }

  return <SubscriberDashboard userId={user.id} />;
}

async function HandicapperDashboard({ userId }: { userId: string }) {
  const supabase = await createClient();

  const { data: handicapper } = await supabase
    .from('handicappers')
    .select('*')
    .eq('user_id', userId)
    .single();

  const stats = {
    totalPicks: handicapper?.total_picks || 0,
    wins: handicapper?.wins || 0,
    losses: handicapper?.losses || 0,
    winRate: handicapper?.win_rate || 0,
    followers: handicapper?.followers_count || 0,
  };

  const { data: recentPicks } = await supabase
    .from('picks')
    .select('*')
    .eq('handicapper_id', handicapper?.id)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <>
      <DashboardHeader title="Dashboard" subtitle="Welcome back! Here's your overview." />
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Target} label="Total Picks" value={stats.totalPicks.toString()} />
          <StatCard icon={TrendingUp} label="Win Rate" value={`${stats.winRate}%`} color="text-green-600" />
          <StatCard icon={Users} label="Followers" value={stats.followers.toString()} />
          <StatCard icon={DollarSign} label="Record" value={`${stats.wins}-${stats.losses}`} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Picks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Picks</h2>
              <Link href="/dashboard/picks" className="text-sm text-blue-600 hover:underline">
                View all
              </Link>
            </div>
            {recentPicks && recentPicks.length > 0 ? (
              <div className="space-y-3">
                {recentPicks.map((pick) => (
                  <div key={pick.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{pick.game}</div>
                      <div className="text-xs text-gray-500">{pick.pick_detail} ({pick.odds})</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pick.result === 'win' ? 'bg-green-100 text-green-700' :
                      pick.result === 'loss' ? 'bg-red-100 text-red-700' :
                      pick.result === 'push' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {pick.result || 'pending'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No picks yet. Post your first pick to get started!</p>
            )}
            <Link
              href="/dashboard/picks"
              className="mt-4 inline-block w-full text-center py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              + Post New Pick
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Performance</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-medium text-gray-900">{stats.winRate}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full transition-all"
                    style={{ width: `${Math.min(stats.winRate, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Wins</span>
                  <span className="font-medium text-green-600">{stats.wins}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Losses</span>
                  <span className="font-medium text-red-600">{stats.losses}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Total Picks</span>
                  <span className="font-medium text-gray-900">{stats.totalPicks}</span>
                </div>
              </div>
            </div>
            <Link
              href="/dashboard/stats"
              className="mt-4 inline-block w-full text-center py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View Full Analytics
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

async function SubscriberDashboard({ userId }: { userId: string }) {
  const supabase = await createClient();

  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*, handicappers(*)')
    .eq('subscriber_id', userId)
    .eq('status', 'active');

  const followCount = subscriptions?.length || 0;

  return (
    <>
      <DashboardHeader title="Dashboard" subtitle="Welcome back! Here's your activity." />
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Users} label="Following" value={followCount.toString()} />
          <StatCard icon={Target} label="Picks Today" value="--" />
          <StatCard icon={TrendingUp} label="Hot Streak" value="--" />
        </div>

        {/* Following List */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Handicappers You Follow</h2>
            <Link href="/connect" className="text-sm text-blue-600 hover:underline">
              Find more
            </Link>
          </div>
          {subscriptions && subscriptions.length > 0 ? (
            <div className="space-y-3">
              {subscriptions.map((sub) => {
                const h = sub.handicappers as Record<string, unknown> | null;
                return (
                  <div key={sub.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                        {(h?.display_name as string)?.charAt(0) || '?'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{(h?.display_name as string) || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">
                          {(h?.sport as string) || 'N/A'} &middot; {(h?.win_rate as number) || 0}% win rate
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/handicapper/${h?.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You&apos;re not following any handicappers yet.</p>
              <Link
                href="/connect"
                className="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Find Handicappers
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className={`text-xl font-bold ${color || 'text-gray-900'}`}>{value}</div>
        </div>
      </div>
    </div>
  );
}
