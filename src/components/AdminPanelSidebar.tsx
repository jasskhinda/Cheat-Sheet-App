'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Target,
  Settings,
  LogOut,
  ChevronLeft,
  Shield,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const adminNav = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/handicappers', label: 'Handicappers', icon: UserCheck },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
  { href: '/admin/picks', label: 'All Picks', icon: Target },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminPanelSidebarProps {
  userName: string;
}

export default function AdminPanelSidebar({ userName }: AdminPanelSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 flex flex-col z-50">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Cheat Sheet App"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <div>
            <span className="font-bold text-white text-sm">Cheat Sheet</span>
            <span className="text-xs block text-red-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-medium text-white truncate">{userName}</div>
            <div className="text-xs text-red-400">Administrator</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {adminNav.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Site
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
