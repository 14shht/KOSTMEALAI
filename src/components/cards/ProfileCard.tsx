"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuthUser } from "@/lib/hooks/use-auth-user";

export function ProfileCard() {
  const { authUser } = useAuthUser();
  const displayName = authUser?.displayName ?? "User";
  const initials = authUser?.initials ?? "U";

  return (
    <Card className="flex flex-col items-center p-7 text-center">
      <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary-light bg-gradient-to-br from-primary-dark to-primary text-4xl font-bold text-white">
        {initials}
      </div>
      <h2 className="mt-5 text-lg font-semibold">{displayName}</h2>
      <p className="text-text-secondary">Anak Kos Jakarta Sejak 2021</p>
      <Button className="mt-5" variant="outline" size="sm">Ubah Foto</Button>
    </Card>
  );
}
