type KpiCardProps = {
  label: string;
  value: number;
  unit: string;
  diff: number;
  diffText: string;
};

function TrendArrow({ positive }: { positive: boolean }) {
  if (positive) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 3v10M8 3l4 4M8 3L4 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 13V3M8 13l4-4M8 13L4 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function KpiCard({
  label,
  value,
  unit,
  diff,
  diffText,
}: KpiCardProps) {
  const isPositive = diff >= 0;

  return (
    <article
      className="flex flex-col justify-between rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md"
      style={{
        backgroundColor: "var(--color-surface-raised, var(--color-surface-base))",
        borderWidth: "1px",
        borderColor: "var(--color-border-default, transparent)",
      }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </span>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span
          className="text-5xl font-extrabold leading-none tabular-nums"
          style={{ color: "var(--color-text-primary)" }}
        >
          {unit === "%" ? value.toFixed(1) : value.toLocaleString()}
        </span>
        <span
          className="text-lg font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {unit}
        </span>
      </div>

      <div
        className="mt-5 flex items-center gap-1 text-sm font-medium"
        style={{
          color: isPositive
            ? "var(--color-semantic-success)"
            : "var(--color-semantic-error)",
        }}
      >
        <TrendArrow positive={isPositive} />
        <span
          className="text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {diffText}
        </span>
      </div>
    </article>
  );
}