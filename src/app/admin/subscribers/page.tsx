import { createClient } from '@/lib/supabase/server';
import DashboardHeader from '@/components/AdminHeader';
import { Users } from 'lucide-react';

export default async function AdminSubscribersPage() {
  const supabase = await createClient();

  const { data: subscribers } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'subscriber')
    .order('created_at', { ascending: false });

  // Get subscription counts
  const { data: subs } = await supabase
    .from('subscriptions')
    .select('subscriber_id')
    .eq('status', 'active');

  const subCountMap = (subs || []).reduce<Record<string, number>>((acc, s) => {
    acc[s.subscriber_id] = (acc[s.subscriber_id] || 0) + 1;
    return acc;
  }, {});

  const list = subscribers || [];

  return (
    <>
      <DashboardHeader title="Subscribers" subtitle={`${list.length} total subscribers`} />
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Subscribers</div>
                <div className="text-xl font-bold text-gray-900">{list.length}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Active Subscriptions</div>
            <div className="text-xl font-bold text-gray-900">{subs?.length || 0}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Avg per Subscriber</div>
            <div className="text-xl font-bold text-gray-900">
              {list.length > 0 ? ((subs?.length || 0) / list.length).toFixed(1) : '0.0'}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {list.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No subscribers yet</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Following</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {list.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm">
                          {(sub.full_name || sub.email).charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium text-gray-900 text-sm">{sub.full_name || 'Unnamed'}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sub.email}</td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">{subCountMap[sub.id] || 0}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-500">
                      {new Date(sub.created_at).toLocaleDateString()}
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
