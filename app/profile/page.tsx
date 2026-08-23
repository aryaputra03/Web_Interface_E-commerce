"use client";

import Link from "next/link";
import { ProfileForm } from "@/features/users/components/ProfileForm";
import { useProfile } from "@/features/users/hooks/useProfile";

export default function ProfilePage() {
  const { data: profile, isLoading, isError } = useProfile();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-1 text-2xl font-semibold">Profil Saya</h1>
      <p className="mb-6 text-sm text-slate-500">
        <Link href="/profile/addresses" className="text-blue-600 hover:underline">
          Kelola alamat
        </Link>{" "}
        ·{" "}
        <Link href="/profile/orders" className="text-blue-600 hover:underline">
          Riwayat pesanan
        </Link>
      </p>

      {isLoading ? (
        <p className="text-sm text-slate-400">Memuat profil...</p>
      ) : isError || !profile ? (
        <p className="text-sm text-slate-400">Tidak dapat memuat profil.</p>
      ) : (
        <ProfileForm profile={profile} />
      )}
    </div>
  );
}
