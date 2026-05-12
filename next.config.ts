import type { NextConfig } from "next";

// プレースホルダ: 新規プロジェクト初期化時に Claude Code が置換する
// dashboard-67f1cb3b = ローカルフォルダ名（例: my-cool-app）
const APP_NAME = "dashboard-67f1cb3b";

// Vercel プレビュー時は basePath を外したい場合は環境変数で切替
const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: isVercel ? "" : `/${APP_NAME}`,
  // basePath 配下のアセット解決を確実にする
  assetPrefix: isVercel ? undefined : `/${APP_NAME}`,
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;
