"use client";

import Image from "next/image";
import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import { useToast } from "@/components/feedback/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuthUser } from "@/lib/hooks/use-auth-user";

const maxPhotoSizeInBytes = 1.5 * 1024 * 1024;

type ProfileCardProps = {
  avatarUrl: string | null;
  onAvatarChange: (avatarUrl: string) => void;
};

export function ProfileCard({ avatarUrl, onAvatarChange }: ProfileCardProps) {
  const { authUser } = useAuthUser();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayName = authUser?.displayName ?? "User";
  const initials = authUser?.initials ?? "U";
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !authUser) return;
    if (!file.type.startsWith("image/")) {
      showToast("Pilih file gambar berformat JPG, PNG, atau WebP.", "error");
      return;
    }
    if (file.size > maxPhotoSizeInBytes) {
      showToast("Ukuran foto maksimal 1,5 MB.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const nextAvatarUrl = typeof reader.result === "string" ? reader.result : null;
      if (!nextAvatarUrl) return;

      onAvatarChange(nextAvatarUrl);
      showToast("Foto baru siap disimpan.", "info");
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="flex flex-col items-center p-7 text-center">
      <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-primary-light bg-primary text-4xl font-bold text-white">
        {avatarUrl ? (
          <Image src={avatarUrl} alt={`Foto profil ${displayName}`} fill sizes="128px" unoptimized className="object-cover" />
        ) : initials}
      </div>
      <h2 className="mt-5 text-lg font-semibold">{displayName}</h2>
      <p className="text-text-secondary">Anak Kos Jakarta Sejak 2021</p>
      <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={handlePhotoChange} />
      <Button className="mt-5" variant="outline" size="sm" leftIcon={<ImagePlus className="h-4 w-4" />} onClick={() => fileInputRef.current?.click()}>
        Ubah Foto
      </Button>
    </Card>
  );
}
