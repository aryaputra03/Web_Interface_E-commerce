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
        <main className="page-enter min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </AdminGuard>
  );
}
