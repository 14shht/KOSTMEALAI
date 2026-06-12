import { Bell } from "lucide-react";
import { GenerateMealPlanForm } from "@/components/forms/GenerateMealPlanForm";
import { AppShell } from "@/components/layout/AppShell";
import { IconButton } from "@/components/ui/IconButton";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function GeneratePlanPage() {
  return (
    <AppShell>
      <SectionHeader
        title="Generate Meal Plan"
        action={
          <div className="hidden items-center gap-4 lg:flex">
            <IconButton label="Notifikasi" icon={<Bell className="h-5 w-5" />} />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light font-bold text-primary-dark">F</span>
          </div>
        }
      />
      <div className="mx-auto max-w-4xl">
        <GenerateMealPlanForm />
      </div>
    </AppShell>
  );
}
