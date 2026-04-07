import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import DashboardSidebar from '@/components/AdminSidebar';
import DashboardHeader from '@/components/AdminHeader';
import { Target, TrendingUp } from 'lucide-react';

export default async function FeedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/signin');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get handicappers the user follows
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('handicapper_id')
    .eq('subscriber_id', user.id)
    .eq('status', 'active');

  const handicapperIds = subscriptions?.map(s => s.handicapper_id) || [];

  // Get recent picks from followed handicappers
  let picks: Array<Record<string, unknown>> = [];
  if (handicapperIds.length > 0) {
    const { data } = await supabase
      .from('picks')
      .select('*, handicappers(display_name, sport, id)')
      .in('handicapper_id', handicapperIds)
      .order('created_at', { ascending: false })
      .limit(50);

    picks = data || [];
  }

  const role = profile?.role || 'subscriber';
  const userName = profile?.full_name || user.email || 'User';

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar role={role} userName={userName} />
      <div className="ml-64">
        <DashboardHeader title="My Feed" subtitle="Latest picks from handicappers you follow" />
        <div className="p-6 max-w-3xl">
          {picks.length > 0 ? (
            <div className="space-y-4">
              {picks.map((pick) => {
                const h = pick.handicappers as Record<string, unknown> | null;
                return (
                  <div key={pick.id as string} className="bg-white rounded-xl border border-gray-200 p-5">
                    {/* Handicapper info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm">
                        {((h?.display_name as string) || '?').charAt(0)}
                      </div>
                      <div>
                        <Link href={`/handicapper/${h?.id}`} className="font-semibold text-gray-900 hover:underline">
                          {(h?.display_name as string) || 'Unknown'}
                        </Link>
                        <div className="text-xs text-gray-500">
                          {new Date(pick.created_at as string).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                          })}
                          {' '}&middot;{' '}{(h?.sport as string) || ''}
                        </div>
                      </div>
                    </div>

                    {/* Pick content */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mt-0.5">
                        <Target className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{pick.game as string}</div>
                        <div className="text-sm text-gray-700 mt-0.5">
                          {pick.pick_detail as string} ({pick.odds as string})
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 capitalize">
                            {(pick.pick_type as string).replace('_', '/')}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded-full capitalize font-medium ${
                            pick.confidence === 'lock' ? 'bg-purple-100 text-purple-700' :
                            pick.confidence === 'high' ? 'bg-green-100 text-green-700' :
                            pick.confidence === 'medium' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {pick.confidence === 'lock' ? 'Lock 🔒' : pick.confidence as string}
                          </span>
                          {pick.result !== 'pending' && (
                            <span className={`px-2 py-0.5 text-xs rounded-full uppercase font-bold ${
                              pick.result === 'win' ? 'bg-green-100 text-green-700' :
                              pick.result === 'loss' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {pick.result as string}
                            </span>
                          )}
                        </div>
                        {pick.notes ? (
                          <p className="text-sm text-gray-500 mt-2">{pick.notes as string}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Your feed is empty</h3>
              <p className="text-gray-500 mb-6">
                Follow some handicappers to see their picks here in real time.
              </p>
              <Link
                href="/connect"
                className="inline-block px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Find Handicappers
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
