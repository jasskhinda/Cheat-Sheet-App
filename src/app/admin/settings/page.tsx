import DashboardHeader from '@/components/AdminHeader';
import { Settings, DollarSign, Mail, Shield, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function AdminSettingsPage() {
  return (
    <>
      <DashboardHeader title="Admin Settings" subtitle="Platform configuration" />
      <div className="p-6 max-w-3xl">
        <div className="space-y-6">
          {/* Stripe Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Stripe Payments</h3>
                <p className="text-sm text-gray-500">Manage subscriptions and billing</p>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Stripe Dashboard</span>
                <Link
                  href="https://dashboard.stripe.com"
                  target="_blank"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Open Dashboard &rarr;
                </Link>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Products & Prices</span>
                <Link
                  href="https://dashboard.stripe.com/products"
                  target="_blank"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Manage Products &rarr;
                </Link>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subscriptions</span>
                <Link
                  href="https://dashboard.stripe.com/subscriptions"
                  target="_blank"
                  className="text-blue-600 hover:underline font-medium"
                >
                  View Subscriptions &rarr;
                </Link>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Webhooks</span>
                <Link
                  href="https://dashboard.stripe.com/webhooks"
                  target="_blank"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Configure Webhooks &rarr;
                </Link>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Customer Portal</span>
                <Link
                  href="https://dashboard.stripe.com/settings/billing/portal"
                  target="_blank"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Configure Portal &rarr;
                </Link>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
              <p className="font-medium text-gray-700 mb-1">Webhook Endpoint</p>
              <code className="text-xs">https://cheatsheet.live/api/stripe/webhook</code>
              <p className="mt-2">Events to listen for: <code>checkout.session.completed</code>, <code>customer.subscription.updated</code>, <code>customer.subscription.deleted</code>, <code>invoice.payment_failed</code></p>
            </div>
          </div>

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
            <p className="text-xs text-gray-400 mt-3">Update pricing via Stripe Products dashboard.</p>
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
                Stripe webhook signature verification
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
                <span className="text-gray-500">Payments</span>
                <span className="font-medium text-gray-900">Stripe</span>
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
