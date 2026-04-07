import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { QrCode, TrendingUp, Users } from 'lucide-react';
import SearchFilter from './SearchFilter';

export default async function ConnectPage() {
  const supabase = await createClient();

  const { data: handicappers } = await supabase
    .from('handicappers')
    .select('*')
    .order('followers_count', { ascending: false });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Connect to a Handicapper
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Join a community that shares valuable tips and data all in one place to increase your odds.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow experienced sports betting handicappers to increase your success with confidence.
            Get notifications in real time to make sure you&apos;re getting the best odds.
          </p>
        </div>
      </section>

      {/* Search & Results */}
      <SearchFilter handicappers={handicappers || []} />
    </div>
  );
}
