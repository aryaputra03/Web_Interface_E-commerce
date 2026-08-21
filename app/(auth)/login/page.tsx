import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { GoogleLoginButton } from "@/features/auth/components/GoogleLoginButton";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Masuk ke Kasir Pintar</h1>
        <p className="text-sm text-gray-500 mt-1">Khusus admin toko</p>
      </div>

      <LoginForm />

      <div className="relative text-center text-xs text-gray-400">
        <span className="bg-gray-50 px-2 relative z-10">atau</span>
        <div className="absolute inset-x-0 top-1/2 border-t border-gray-200 -z-0" />
      </div>

      <GoogleLoginButton />

      <p className="text-center text-sm text-gray-500">
        Belum punya akun?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}
