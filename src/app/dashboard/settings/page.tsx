'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import DashboardHeader from '@/components/AdminHeader';

export default function SettingsPage() {
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [sport, setSport] = useState('NFL');
  const [affiliatePlatform, setAffiliatePlatform] = useState('');
  const [role, setRole] = useState('subscriber');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profile) {
      setFullName(profile.full_name || '');
      setRole(profile.role || 'subscriber');
    }

    if (profile?.role === 'handicapper') {
      const { data: handicapper } = await supabase
        .from('handicappers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (handicapper) {
        setDisplayName(handicapper.display_name || '');
        setBio(handicapper.bio || '');
        setSport(handicapper.sport || 'NFL');
        setAffiliatePlatform(handicapper.affiliate_platform || '');
      }
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Update profile
    await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id);

    // Update handicapper profile if applicable
    if (role === 'handicapper') {
      await supabase
        .from('handicappers')
        .update({
          display_name: displayName,
          bio,
          sport,
          affiliate_platform: affiliatePlatform || null,
        })
        .eq('user_id', user.id);
    }

    setMessage('Settings saved successfully!');
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <>
        <DashboardHeader title="Settings" />
        <div className="p-6 text-gray-500">Loading...</div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader title="Settings" subtitle="Manage your profile and preferences" />
      <div className="p-6 max-w-2xl">
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
            {message}
          </div>
        )}

        {/* Profile Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
              <div className="px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 capitalize">
                {role}
              </div>
            </div>
          </div>
        </div>

        {/* Handicapper Settings */}
        {role === 'handicapper' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Handicapper Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your public name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell followers about your handicapping style..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Sport</label>
                <select value={sport} onChange={(e) => setSport(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="NFL">NFL</option>
                  <option value="NBA">NBA</option>
                  <option value="MLB">MLB</option>
                  <option value="NHL">NHL</option>
                  <option value="NCAAF">NCAAF</option>
                  <option value="NCAAB">NCAAB</option>
                  <option value="Multi">Multi-Sport</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Affiliate Platform (optional)</label>
                <select value={affiliatePlatform} onChange={(e) => setAffiliatePlatform(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">None</option>
                  <option value="DraftKings">DraftKings</option>
                  <option value="FanDuel">FanDuel</option>
                  <option value="BetMGM">BetMGM</option>
                  <option value="Caesars">Caesars Sportsbook</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">Link your preferred sportsbook for affiliate earnings.</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </>
  );
}
