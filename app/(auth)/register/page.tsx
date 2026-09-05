import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink">Buat Akun</h1>

      <RegisterForm />

      <p className="text-center text-sm text-ink-muted">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-till hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}
