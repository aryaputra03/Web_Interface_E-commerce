import { Navbar } from "@/components/layout/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50"><Navbar />{children}</div>;
}
