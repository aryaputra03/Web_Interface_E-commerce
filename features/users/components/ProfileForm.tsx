"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { profileSchema, type ProfileSchema } from "../schemas/user.schema";
import type { UserProfile } from "../types/user.types";

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const updateMutation = useUpdateProfile();
  const logoutMutation = useLogout();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: profile.name, phone: profile.phone ?? "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => updateMutation.mutate(values))}
      className="space-y-4"
      noValidate
    >
      <Input label="Nama" error={errors.name?.message} {...register("name")} />
      <Input label="Email" value={profile.email} disabled readOnly />
      <Input
        label="Nomor Telepon"
        error={errors.phone?.message}
        {...register("phone")}
      />

      {updateMutation.isError && (
        <ErrorMessage message="Tidak dapat menyimpan profil. Coba lagi." />
      )}
      {updateMutation.isSuccess && (
        <p className="text-sm text-green-600">Profil berhasil diperbarui.</p>
      )}

      <Button
        type="submit"
        isLoading={updateMutation.isPending}
        disabled={!isDirty}
        className="w-full"
      >
        Simpan Perubahan
      </Button>

      <Button
        type="button"
        variant="ghost"
        onClick={() => logoutMutation.mutate()}
        isLoading={logoutMutation.isPending}
        className="w-full"
      >
        Keluar
      </Button>
    </form>
  );
}
