import DashboardHeader from '@/components/AdminHeader';
import { Settings, DollarSign, Mail, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <>
      <DashboardHeader title="Admin Settings" subtitle="Platform configuration" />
      <div className="p-6 max-w-3xl">
        <div className="space-y-6">
          {/* Pricing Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Pricing</h3>
                <p className="text-sm text-gray-500">Default subscription pricing</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Handicapper Fee</label>
                <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  $20.00 / month
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subscriber Fee</label>
                <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  $5.00 / month per follow
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Handicapper Cut</label>
                <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  $3.00 (60%)
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform Cut</label>
                <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  $2.00 (40%)
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">Stripe integration required to update these dynamically.</p>
          </div>

          {/* Email Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email Settings</h3>
                <p className="text-sm text-gray-500">Configure email notifications</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Email notifications are managed through Supabase Auth. Configure templates in your Supabase dashboard.
            </p>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Security</h3>
                <p className="text-sm text-gray-500">Row-level security & permissions</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-green-600">&#10003;</span>
                Row Level Security enabled on all tables
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">&#10003;</span>
                Admin role required to access this panel
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">&#10003;</span>
                Handicappers can only manage their own picks
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">&#10003;</span>
                Subscribers can only view their own subscriptions
              </div>
            </div>
          </div>

          {/* Platform Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Platform Info</h3>
                <p className="text-sm text-gray-500">App configuration</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">App Name</span>
                <span className="font-medium text-gray-900">Cheat Sheet App</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Version</span>
                <span className="font-medium text-gray-900">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Database</span>
                <span className="font-medium text-gray-900">Supabase</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hosting</span>
                <span className="font-medium text-gray-900">Vercel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
