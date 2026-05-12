import KpiCard from "@/components/KpiCard";

const kpiData: {
  label: string;
  value: number;
  unit: string;
  diff: number;
  diffText: string;
}[] = [
  {
    label: "応募",
    value: 128,
    unit: "件",
    diff: 23,
    diffText: "先月より＋23件",
  },
  {
    label: "面談",
    value: 47,
    unit: "件",
    diff: -5,
    diffText: "先月より−5件",
  },
  {
    label: "内定",
    value: 12,
    unit: "件",
    diff: 3,
    diffText: "先月より＋3件",
  },
  {
    label: "承諾率",
    value: 75.0,
    unit: "%",
    diff: 8.2,
    diffText: "先月より＋8.2pt",
  },
];

export default function Page() {
  return (
    <main
      className="min-h-screen p-6 sm:p-10"
      style={{ backgroundColor: "var(--color-surface-base)" }}
    >
      <header className="mb-8">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          今月の採用ダッシュボード
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          2025年6月 時点のサマリー
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiData.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            unit={kpi.unit}
            diff={kpi.diff}
            diffText={kpi.diffText}
          />
        ))}
      </div>
    </main>
  );
}