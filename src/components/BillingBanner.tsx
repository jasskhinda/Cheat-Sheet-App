'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function BillingBanner({ status }: { status: string }) {
  const [loading, setLoading] = useState(false);

  if (status === 'active') return null;

  const handleActivate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/handicapper-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  const message = status === 'past_due'
    ? 'Your payment is past due. Please update your payment method to keep your account active.'
    : 'Activate your $20/mo subscription to start posting picks and earning from followers.';

  const bgColor = status === 'past_due' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200';
  const textColor = status === 'past_due' ? 'text-red-800' : 'text-yellow-800';
  const iconColor = status === 'past_due' ? 'text-red-600' : 'text-yellow-600';

  return (
    <div className={`mx-6 mt-6 p-4 rounded-xl border ${bgColor}`}>
      <div className="flex items-center gap-3">
        <AlertTriangle className={`w-5 h-5 shrink-0 ${iconColor}`} />
        <p className={`text-sm font-medium flex-1 ${textColor}`}>{message}</p>
        <button
          onClick={handleActivate}
          disabled={loading}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 shrink-0"
        >
          {loading ? '...' : status === 'past_due' ? 'Update Payment' : 'Activate — $20/mo'}
        </button>
      </div>
    </div>
  );
}
