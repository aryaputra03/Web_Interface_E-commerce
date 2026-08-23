import { AdminGuard } from "@/components/layout/AdminGuard";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen min-w-0">
        <AdminSidebar />
        <main className="min-w-0 flex-1 bg-gray-50 p-4 sm:p-6">{children}</main>
      </div>
    </AdminGuard>
  );
}
