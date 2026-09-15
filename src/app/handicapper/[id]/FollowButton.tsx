'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FollowButtonProps {
  handicapperId: string;
  initialFollowing: boolean;
  isLoggedIn: boolean;
  price: number;
}

export default function FollowButton({ handicapperId, initialFollowing, isLoggedIn, price }: FollowButtonProps) {
  const [following] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFollow = async () => {
    if (!isLoggedIn) {
      router.push('/signin');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handicapperId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setLoading(false);
    }
  };

  const handleManage = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  if (following) {
    return (
      <button
        onClick={handleManage}
        disabled={loading}
        className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200"
      >
        {loading ? '...' : 'Manage Subscription'}
      </button>
    );
  }

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800"
    >
      {loading ? '...' : `Follow ($${price}/mo)`}
    </button>
  );
}
