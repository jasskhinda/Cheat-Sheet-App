import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminPanelSidebar from '@/components/AdminPanelSidebar';

export default async function AdminLayout({
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

  if (!profile?.is_admin) {
    redirect('/dashboard');
  }

  const userName = profile?.full_name || user.email || 'Admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPanelSidebar userName={userName} />
      <div className="ml-64">
        {children}
      </div>
    </div>
  );
}
