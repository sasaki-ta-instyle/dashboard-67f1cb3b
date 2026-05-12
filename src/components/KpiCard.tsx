type KpiProps = {
  label: string;
  value: string | number;
  /** 前期との差分。null/undefined なら表示しない */
  delta?: number;
  unit?: string;
};

export function KpiCard({ label, value, delta, unit }: KpiProps) {
  const display = typeof value === "number" ? value.toLocaleString("ja-JP") : value;
  const deltaSign = delta == null ? null : delta > 0 ? "+" : delta < 0 ? "" : "±";
  const deltaColor =
    delta == null
      ? null
      : delta > 0
        ? "var(--color-success)"
        : delta < 0
          ? "var(--color-warning)"
          : "var(--color-text-muted)";

  return (
    <article className="glass-card flex flex-col gap-2" style={{ padding: 22 }}>
      <p className="eyebrow">{label}</p>
      <div className="flex items-baseline gap-2">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 33,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            color: "var(--color-text)",
          }}
        >
          {display}
        </span>
        {unit && (
          <span
            style={{
              fontSize: 13,
              color: "var(--color-text-muted)",
            }}
          >
            {unit}
          </span>
        )}
      </div>
      {delta != null && deltaSign != null && (
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: deltaColor ?? "var(--color-text-muted)",
          }}
        >
          {deltaSign}
          {delta} 前期比
        </p>
      )}
    </article>
  );
}
