type Datum = Record<string, string | number | null>;

type Props = {
  title?: string;
  data: Datum[];
  xKey: string;
  yKey: string;
  /** SVG の論理サイズ。実表示は CSS で width: 100% にする */
  width?: number;
  height?: number;
  /** カラートークン名。CSS 変数 --color-info / --color-success / --color-warning など */
  colorVar?: string;
};

/**
 * SVG ベースの軽量棒グラフ。Recharts 等の重いライブラリを使わない。
 * Phase 2 でツールチップやアニメーションを足す想定。
 */
export function BarChart({
  title,
  data,
  xKey,
  yKey,
  width = 720,
  height = 280,
  colorVar = "--color-info",
}: Props) {
  const padding = { top: 32, right: 16, bottom: 36, left: 36 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const values = data.map((d) => Number(d[yKey] ?? 0));
  const max = Math.max(1, ...values);
  const niceMax = niceCeil(max);
  const barGap = 8;
  const barW = data.length === 0 ? 0 : (innerW - barGap * (data.length - 1)) / data.length;

  return (
    <article className="glass-card" style={{ padding: 22, overflow: "hidden" }}>
      {title && <p className="eyebrow mb-2">{title}</p>}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ display: "block" }}
        role="img"
        aria-label={title ?? "棒グラフ"}
      >
        {/* Y 軸 grid（4 段） */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
          const y = padding.top + innerH * (1 - p);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                x2={padding.left + innerW}
                y1={y}
                y2={y}
                stroke="rgba(53,54,45,.08)"
                strokeWidth={1}
              />
              <text
                x={padding.left - 8}
                y={y + 3}
                textAnchor="end"
                fontSize={9}
                fill="var(--color-text-muted)"
                fontFamily="var(--font-mono)"
              >
                {Math.round(niceMax * p)}
              </text>
            </g>
          );
        })}

        {/* バー */}
        {data.map((d, i) => {
          const v = Number(d[yKey] ?? 0);
          const h = (v / niceMax) * innerH;
          const x = padding.left + i * (barW + barGap);
          const y = padding.top + innerH - h;
          return (
            <g key={String(d[xKey] ?? i)}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={Math.max(h, 0)}
                rx={4}
                fill={`var(${colorVar})`}
                opacity={0.92}
              />
              <text
                x={x + barW / 2}
                y={padding.top + innerH + 16}
                textAnchor="middle"
                fontSize={10}
                fill="var(--color-text-muted)"
              >
                {String(d[xKey] ?? "")}
              </text>
            </g>
          );
        })}
      </svg>
    </article>
  );
}

function niceCeil(n: number): number {
  if (n <= 0) return 1;
  const exp = Math.floor(Math.log10(n));
  const base = Math.pow(10, exp);
  const m = n / base;
  if (m <= 1) return 1 * base;
  if (m <= 2) return 2 * base;
  if (m <= 5) return 5 * base;
  return 10 * base;
}
