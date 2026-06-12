import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ProfileCard() {
  return (
    <Card className="flex flex-col items-center p-7 text-center">
      <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary-light bg-gradient-to-br from-primary-dark to-primary text-4xl font-bold text-white">
        BS
      </div>
      <h2 className="mt-5 text-lg font-semibold">Budi Santoso</h2>
      <p className="text-text-secondary">Anak Kos Jakarta Sejak 2021</p>
      <Button className="mt-5" variant="outline" size="sm">Ubah Foto</Button>
    </Card>
  );
}
