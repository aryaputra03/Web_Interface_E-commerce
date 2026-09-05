export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="page-enter w-full max-w-sm rounded-lg border border-line-strong bg-paper-raised p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
}
