import Link from "next/link";

/**
 * ダッシュボード共通シェル。左 240px サイドバー + 上部ヘッダ + メインエリア。
 * Phase 2 で「メニュー」「期間切替」などを追加する。
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="mx-auto flex gap-6 px-6 py-6 page-content"
      style={{
        maxWidth: 1366,
        minHeight: "100vh",
      }}
    >
      <aside
        className="flex flex-col gap-4 shrink-0"
        style={{ width: 240 }}
        aria-label="メニュー"
      >
        <Link href="/" className="flex items-center gap-2 px-1">
          <span
            className="block h-[14px] w-7 rounded-[3px]"
            style={{ background: "var(--color-text)" }}
            aria-hidden
          />
          <span className="text-[13px] font-semibold tracking-tight">
            ダッシュボード
          </span>
        </Link>
        <nav className="flex flex-col gap-1 px-1">
          <p className="eyebrow mt-2 mb-1">Sections</p>
          <Link
            href="/"
            className="text-[13px] py-1.5 px-2 rounded-[10px]"
            style={{ background: "rgba(255,255,255,.55)" }}
          >
            概要
          </Link>
        </nav>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col gap-6">{children}</main>
    </div>
  );
}
