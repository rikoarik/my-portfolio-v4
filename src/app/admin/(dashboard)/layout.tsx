import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin CMS | Ark Portfolio',
  robots: 'noindex, nofollow',
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-[#09090B] overflow-y-auto">
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
