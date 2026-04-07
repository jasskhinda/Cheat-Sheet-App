import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/AdminSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const role = profile?.role || 'subscriber';
  const userName = profile?.full_name || user.email || 'User';

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar role={role} userName={userName} />
      <div className="ml-64">
        {children}
      </div>
    </div>
  );
}
