import { GenerateMealPlanForm } from "@/components/forms/GenerateMealPlanForm";
import { AppShell } from "@/components/layout/AppShell";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function GeneratePlanPage() {
  return (
    <AppShell>
      <SectionHeader title="Generate Meal Plan" />
      <div className="mx-auto max-w-4xl">
        <GenerateMealPlanForm />
      </div>
    </AppShell>
  );
}
