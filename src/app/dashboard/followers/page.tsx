import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardHeader from '@/components/AdminHeader';
import { Users } from 'lucide-react';

export default async function FollowersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/signin');

  const { data: handicapper } = await supabase
    .from('handicappers')
    .select('id, followers_count')
    .eq('user_id', user.id)
    .single();

  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*, profiles:subscriber_id(full_name, email, created_at)')
    .eq('handicapper_id', handicapper?.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  const followers = subscriptions || [];

  return (
    <>
      <DashboardHeader title="Followers" subtitle={`${followers.length} active subscribers`} />
      <div className="p-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Followers</div>
                <div className="text-xl font-bold text-gray-900">{followers.length}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Monthly Revenue</div>
            <div className="text-xl font-bold text-green-600">${(followers.length * 3).toFixed(2)}</div>
            <div className="text-xs text-gray-400">$3.00 per subscriber</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Your Share</div>
            <div className="text-xl font-bold text-gray-900">60%</div>
            <div className="text-xs text-gray-400">$3 of every $5 subscription</div>
          </div>
        </div>

        {/* Followers List */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Active Subscribers</h2>
          </div>
          {followers.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {followers.map((sub) => {
                const profile = sub.profiles as Record<string, unknown> | null;
                return (
                  <div key={sub.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                        {((profile?.full_name as string) || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{(profile?.full_name as string) || 'Subscriber'}</div>
                        <div className="text-xs text-gray-500">
                          Joined {new Date(sub.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      Active
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No followers yet. Share your profile to start building your audience!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
