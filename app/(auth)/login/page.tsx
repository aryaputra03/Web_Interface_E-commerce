import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { GoogleLoginButton } from "@/features/auth/components/GoogleLoginButton";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">
          Masuk ke Kasir Pintar
        </h1>
        <p className="mt-1 text-sm text-ink-muted">Khusus admin toko</p>
      </div>

      <LoginForm />

      <div className="relative text-center text-xs text-ink-muted">
        <span className="relative z-10 bg-paper-raised px-2">atau</span>
        <div className="absolute inset-x-0 top-1/2 -z-0 border-t border-line" />
      </div>

      <GoogleLoginButton />

      <p className="text-center text-sm text-ink-muted">
        Belum punya akun?{" "}
        <Link href="/register" className="text-till hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}
