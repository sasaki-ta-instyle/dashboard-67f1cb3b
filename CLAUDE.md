# dashboard-67f1cb3b

## デプロイ設定（Claude Code 用）

このプロジェクトは ConoHa VPS にデプロイされる。本番反映は「本番にあげて」の指示で起動する（ワークスペース CLAUDE.md の「ConoHa 本番デプロイ」節を参照）。

| キー | 値 |
|---|---|
| CATEGORY | `app` |
| APP_NAME | `dashboard-67f1cb3b` |
| PORT | `3004` |
| 公開URL | `https://app.instyle.group/dashboard-67f1cb3b/` |
| HEALTHCHECK_PATH | `/` |
| USE_DB | `false` |
| PM2名 | `app-dashboard-67f1cb3b` |
| サーバ側パス | `/var/www/app/dashboard-67f1cb3b/` |
| アプリ固有 env | `/var/www/_shared/apps/app-dashboard-67f1cb3b.env` |

## 共通アセット (favicon / logo / OGP)

`https://app.instyle.group/_shared/static/{favicon.png, logo.svg, ogp.jpg}` で配信。`app/layout.tsx` の metadata に絶対 URL で指定する（詳細: `~/Workspace/docs/conoha-shared-assets.md`）。

```ts
const SITE_URL = "https://app.instyle.group/dashboard-67f1cb3b";
const ASSETS   = "https://app.instyle.group/_shared/static";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: `${ASSETS}/favicon.png`, apple: `${ASSETS}/favicon.png` },
  openGraph: {
    type: "website", siteName: "INSTYLE GROUP", locale: "ja_JP",
    url: SITE_URL, title: TITLE, description: DESCRIPTION,
    images: [{ url: `${ASSETS}/ogp.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image", title: TITLE, description: DESCRIPTION,
    images: [`${ASSETS}/ogp.jpg`],
  },
};
```

## ローカル開発

```bash
pnpm install
pnpm dev
# http://localhost:3000/dashboard-67f1cb3b/ でアクセス（basePath 込み）
```

> **初回コミット前に必ず `pnpm install` を実行**してください。生成された `pnpm-lock.yaml` をコミットに含めないと、GitHub Actions の `actions/setup-node@v4` (`cache: pnpm`) が `Dependencies lock file is not found` で失敗します。

## 本番デプロイ

「本番にあげて」と Claude Code に指示すると、`gh workflow run deploy-prod.yml --ref main` で GitHub Actions が走り、ConoHa VPS にデプロイされる。

手動で起動する場合:
```bash
gh workflow run deploy-prod.yml --ref main
gh run watch
```

## 初回 ConoHa セットアップ手順（このアプリ用）

```bash
# 1. アプリディレクトリ
ssh conoha-deploy 'mkdir -p /var/www/app/dashboard-67f1cb3b/{releases,shared} \
  && touch /var/www/_shared/apps/app-dashboard-67f1cb3b.env \
  && chmod 600 /var/www/_shared/apps/app-dashboard-67f1cb3b.env'

# 2. Nginx location（exact + ^~ prefix の 2 段で trailing-slash 308 ループ回避）
ssh conoha-root 'cat > /etc/nginx/conf.d/proxy-apps/app/dashboard-67f1cb3b.conf <<"EOF"
location = /dashboard-67f1cb3b {
  include snippets/proxy-next.conf;
  proxy_pass http://127.0.0.1:3004;
}
location ^~ /dashboard-67f1cb3b/ {
  include snippets/proxy-next.conf;
  proxy_pass http://127.0.0.1:3004;
}
EOF
nginx -t && systemctl reload nginx'
```

## ロールバック

GitHub Actions 側のヘルスチェック失敗時は自動で前 release に戻る。手動で戻す場合:

```bash
ssh deploy@160.251.201.115
cd /var/www/app/dashboard-67f1cb3b/releases
ls -lt   # 直前の release ディレクトリを確認
ln -sfn <previous-sha> ../current.new && mv -T ../current.new ../current
pm2 reload app-dashboard-67f1cb3b --update-env
```

## デザインシステム

ワークスペース CLAUDE.md のルールに従い、`design-system` または `design-system_liquid` を選択して適用済み。詳細は実装ファイルを参照。

---

## ダッシュボード（dashboard）用 追加ガイド

このプロジェクトは「ダッシュボード」型の制作物です。core の `CLAUDE.md` に加えて以下を守ってください。

### 設計ビューポート

- **1366×900**（iPad Pro 12.9 横）が **設計の真の値**
- レイアウトは「左サイドバー（240px、折りたたみ可） + メインエリア」が基本
- KPI カードは横 4 つ、グラフは横 2 つ並びを基本構成とする

### データソース

- 第一選択肢は **CSV ファイル**（`data/*.csv`）。仕組みが単純で誰でもデバッグできる
- Google Sheets 連携は `lib/datasource/sheets.ts` のスタブ。Phase 2 で実装
- データ取得はすべて `loadDataSource("source-id")` 経由に統一する（直接 fetch しない）

### Liquid Glass 準拠

- KPI カードは `glass-card`、見出しエリアは `glass-panel`
- グラフは透明背景で SVG 描画、線色は `--color-info` `--color-success` `--color-warning` を使う
- ハードコードカラーは禁止（CSS 変数のみ）

### 制作物の例

```tsx
// src/app/page.tsx の構成例
<DashboardLayout>
  <KpiSection>
    <KpiCard label="今月応募者" value={142} delta={+18} />
    <KpiCard label="面談実施" value={87} delta={-3} />
    <KpiCard label="内定" value={12} />
    <KpiCard label="承諾率" value="68%" />
  </KpiSection>
  <ChartSection>
    <BarChart title="月別応募者" data={data} xKey="month" yKey="applicants" />
  </ChartSection>
</DashboardLayout>
```
