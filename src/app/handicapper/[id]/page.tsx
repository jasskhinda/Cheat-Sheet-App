import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Users, Target, ArrowLeft } from 'lucide-react';
import FollowButton from './FollowButton';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function HandicapperProfilePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: handicapper } = await supabase
    .from('handicappers')
    .select('*')
    .eq('id', id)
    .single();

  if (!handicapper) notFound();

  const { data: picks } = await supabase
    .from('picks')
    .select('*')
    .eq('handicapper_id', id)
    .order('created_at', { ascending: false })
    .limit(20);

  const { data: { user } } = await supabase.auth.getUser();

  let isFollowing = false;
  if (user) {
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('subscriber_id', user.id)
      .eq('handicapper_id', id)
      .eq('status', 'active')
      .single();
    isFollowing = !!sub;
  }

  const decided = handicapper.wins + handicapper.losses;
  const winRate = decided > 0 ? ((handicapper.wins / decided) * 100).toFixed(1) : '0.0';
  const recentPicks = picks || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link href="/connect" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" />
          Back to Handicappers
        </Link>
      </div>

      {/* Profile Header */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-700 shrink-0">
              {handicapper.display_name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{handicapper.display_name}</h1>
                {handicapper.is_featured && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Featured</span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{handicapper.bio || 'No bio yet.'}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="font-medium text-gray-900">{handicapper.sport}</span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {handicapper.wins}-{handicapper.losses} ({winRate}%)
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {handicapper.followers_count} followers
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {handicapper.total_picks} picks
                </span>
              </div>
            </div>
            <div className="shrink-0">
              <FollowButton
                handicapperId={id}
                initialFollowing={isFollowing}
                isLoggedIn={!!user}
                price={handicapper.subscription_price}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-gray-900">{handicapper.total_picks}</div>
              <div className="text-xs text-gray-500">Total Picks</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">{handicapper.wins}</div>
              <div className="text-xs text-gray-500">Wins</div>
            </div>
            <div>
              <div className="text-xl font-bold text-red-600">{handicapper.losses}</div>
              <div className="text-xs text-gray-500">Losses</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600">{winRate}%</div>
              <div className="text-xs text-gray-500">Win Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Picks */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Picks</h2>
          {recentPicks.length > 0 ? (
            <div className="space-y-3">
              {recentPicks.map((pick) => (
                <div key={pick.id} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{pick.game}</span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 capitalize">
                          {pick.pick_type.replace('_', '/')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">{pick.pick_detail} ({pick.odds})</div>
                      {pick.notes && <p className="text-sm text-gray-500 mt-1">{pick.notes}</p>}
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(pick.created_at).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      pick.result === 'win' ? 'bg-green-100 text-green-700' :
                      pick.result === 'loss' ? 'bg-red-100 text-red-700' :
                      pick.result === 'push' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {pick.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No picks posted yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
