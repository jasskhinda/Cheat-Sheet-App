'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface FollowButtonProps {
  handicapperId: string;
  initialFollowing: boolean;
  isLoggedIn: boolean;
  price: number;
}

export default function FollowButton({ handicapperId, initialFollowing, isLoggedIn, price }: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!isLoggedIn) {
      router.push('/signin');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (following) {
      await supabase
        .from('subscriptions')
        .delete()
        .eq('subscriber_id', user.id)
        .eq('handicapper_id', handicapperId);
      setFollowing(false);
    } else {
      await supabase
        .from('subscriptions')
        .insert({
          subscriber_id: user.id,
          handicapper_id: handicapperId,
          status: 'active',
        });
      setFollowing(true);
    }

    setLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
        following
          ? 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200'
          : 'bg-gray-900 text-white hover:bg-gray-800'
      }`}
    >
      {loading ? '...' : following ? 'Following' : `Follow ($${price}/mo)`}
    </button>
  );
}
