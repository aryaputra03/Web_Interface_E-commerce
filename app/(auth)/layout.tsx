export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="page-enter w-full max-w-sm rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_20px_50px_rgba(64,83,128,0.16)] backdrop-blur sm:p-8">{children}</div>
    </div>
  );
}
