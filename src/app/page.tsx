import DashboardLayout from "./(dashboard)/layout";
import { KpiCard } from "@/components/KpiCard";
import { BarChart } from "@/components/BarChart";
import { loadDataSource } from "@/lib/datasource";

/**
 * サンプルダッシュボード。実プロジェクトでは ChatPane 経由でエージェントが
 * このファイル + データソース + チャート構成を書き換える。
 */
export default async function Page() {
  // CSV を読み込む（無ければ空配列でフォールバック）
  let monthly: Array<{ month: string; applicants: number }> = [];
  try {
    const rows = await loadDataSource({ kind: "csv", path: "data/sample.csv" });
    monthly = rows.map((r) => ({
      month: String(r.month ?? ""),
      applicants: Number(r.applicants ?? 0),
    }));
  } catch {
    // 初回は data/sample.csv が無い場合がある
    monthly = [
      { month: "1月", applicants: 84 },
      { month: "2月", applicants: 96 },
      { month: "3月", applicants: 112 },
      { month: "4月", applicants: 128 },
      { month: "5月", applicants: 142 },
    ];
  }

  return (
    <DashboardLayout>
      <header>
        <p className="eyebrow mb-2">Overview</p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            fontSize: 33,
            lineHeight: 1.2,
          }}
        >
          採用 KPI ダッシュボード
        </h1>
      </header>

      <section
        aria-label="KPI"
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
      >
        <KpiCard label="今月応募者" value={142} delta={18} unit="人" />
        <KpiCard label="面談実施" value={87} delta={-3} unit="人" />
        <KpiCard label="内定" value={12} unit="人" />
        <KpiCard label="承諾率" value="68" unit="%" />
      </section>

      <section aria-label="月別推移">
        <BarChart
          title="月別応募者推移"
          data={monthly}
          xKey="month"
          yKey="applicants"
          colorVar="--color-info"
        />
      </section>
    </DashboardLayout>
  );
}
