import { Navbar } from "@/components/layout/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen"><Navbar /><main className="page-enter">{children}</main></div>;
}
