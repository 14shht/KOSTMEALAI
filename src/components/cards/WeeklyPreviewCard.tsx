import { Card } from "@/components/ui/Card";

export function WeeklyPreviewCard() {
  const days = [
    ["SEN", "100%"],
    ["SEL", "95%"],
    ["RAB", "80%"],
    ["KAM", "Today"],
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-text-primary">Pratinjau Minggu Ini</h2>
      <div className="mt-7 grid grid-cols-4 gap-3">
        {days.map(([day, value], index) => (
          <div key={day} className="text-center">
            <p className="mb-2 text-xs font-bold text-text-secondary">{day}</p>
            <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${index === 3 ? "bg-primary-light text-primary-dark" : "bg-primary text-white"}`}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
