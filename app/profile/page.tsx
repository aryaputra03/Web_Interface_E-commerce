"use client";

import Link from "next/link";
import { ProfileForm } from "@/features/users/components/ProfileForm";
import { useProfile } from "@/features/users/hooks/useProfile";

export default function ProfilePage() {
  const { data: profile, isLoading, isError } = useProfile();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold text-ink">Profil Saya</h1>

      <div className="mb-6 flex gap-4 text-sm">
        <Link href="/profile/addresses" className="text-till hover:underline">
          Kelola alamat
        </Link>
        <Link href="/profile/orders" className="text-till hover:underline">
          Riwayat pesanan
        </Link>
      </div>

      {isLoading ? (
        <p className="text-sm text-ink-muted">Memuat profil...</p>
      ) : isError || !profile ? (
        <p className="text-sm text-ink-muted">Tidak dapat memuat profil.</p>
      ) : (
        <ProfileForm profile={profile} />
      )}
    </div>
  );
}
