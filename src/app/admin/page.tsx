import { createClient } from '@/lib/supabase/server';
import DashboardHeader from '@/components/AdminHeader';
import { Users, UserCheck, Target, TrendingUp, DollarSign, Star } from 'lucide-react';
import Link from 'next/link';

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  // Platform stats
  const { count: totalProfiles } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  const { count: totalHandicappers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'handicapper');

  const { count: totalSubscribers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'subscriber');

  const { count: totalPicks } = await supabase
    .from('picks')
    .select('*', { count: 'exact', head: true });

  const { count: activeSubscriptions } = await supabase
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: featuredCount } = await supabase
    .from('handicappers')
    .select('*', { count: 'exact', head: true })
    .eq('is_featured', true);

  // Recent signups
  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  // Top handicappers by followers
  const { data: topHandicappers } = await supabase
    .from('handicappers')
    .select('*')
    .order('followers_count', { ascending: false })
    .limit(5);

  // Revenue calculations
  const monthlyRevenue = {
    handicapperFees: (totalHandicappers || 0) * 20,
    subscriberCut: (activeSubscriptions || 0) * 2,
    total: ((totalHandicappers || 0) * 20) + ((activeSubscriptions || 0) * 2),
  };

  return (
    <>
      <DashboardHeader title="Admin Overview" subtitle="Platform-wide stats and activity" />
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Users} label="Total Users" value={String(totalProfiles || 0)} color="text-blue-600" />
          <StatCard icon={UserCheck} label="Handicappers" value={String(totalHandicappers || 0)} color="text-purple-600" />
          <StatCard icon={Users} label="Subscribers" value={String(totalSubscribers || 0)} color="text-green-600" />
          <StatCard icon={Target} label="Total Picks" value={String(totalPicks || 0)} color="text-orange-600" />
        </div>

        {/* Revenue Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Estimated Monthly Revenue
            </h2>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Projected</span>
          </div>
          <div className="text-4xl font-bold mb-4">${monthlyRevenue.total.toFixed(2)}</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="opacity-80">Handicapper Subscriptions</div>
              <div className="text-xl font-bold">${monthlyRevenue.handicapperFees}</div>
              <div className="text-xs opacity-70">{totalHandicappers || 0} × $20/mo</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="opacity-80">Subscriber Cut</div>
              <div className="text-xl font-bold">${monthlyRevenue.subscriberCut}</div>
              <div className="text-xs opacity-70">{activeSubscriptions || 0} × $2/mo</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Signups */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Signups</h2>
              <Link href="/admin/handicappers" className="text-sm text-blue-600 hover:underline">View all</Link>
            </div>
            {recentUsers && recentUsers.length > 0 ? (
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm">
                        {(user.full_name || user.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{user.full_name || 'Unnamed'}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      user.role === 'handicapper' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No users yet</p>
            )}
          </div>

          {/* Top Handicappers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Top Handicappers</h2>
              <Link href="/admin/handicappers" className="text-sm text-blue-600 hover:underline">View all</Link>
            </div>
            {topHandicappers && topHandicappers.length > 0 ? (
              <div className="space-y-3">
                {topHandicappers.map((h, i) => (
                  <div key={h.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-bold text-gray-400 w-6">#{i + 1}</div>
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm">
                        {h.display_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm flex items-center gap-1">
                          {h.display_name}
                          {h.is_featured && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <div className="text-xs text-gray-500">{h.sport} &middot; {h.followers_count} followers</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-600">{h.win_rate}%</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No handicappers yet</p>
            )}
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Featured Handicappers</div>
              <div className="text-xl font-bold text-gray-900">{featuredCount || 0}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Active Subscriptions</div>
              <div className="text-xl font-bold text-gray-900">{activeSubscriptions || 0}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Picks Posted</div>
              <div className="text-xl font-bold text-gray-900">{totalPicks || 0}</div>
            </div>
          </div>
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
