import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-text-primary md:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-2 text-text-secondary md:text-lg">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
