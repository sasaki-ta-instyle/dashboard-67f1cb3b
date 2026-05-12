import type { Metadata } from "next";
import "./globals.css";

const APP_NAME = "dashboard-67f1cb3b";
const CATEGORY = "app";
const SITE_URL = `https://${CATEGORY}.instyle.group/${APP_NAME}`;
const ASSETS = `https://${CATEGORY}.instyle.group/_shared/static`;
const TITLE = "dashboard-67f1cb3b";
const DESCRIPTION = "instyle group ダッシュボード";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: `${ASSETS}/favicon.png`,
    apple: `${ASSETS}/favicon.png`,
  },
  openGraph: {
    type: "website",
    siteName: "INSTYLE GROUP",
    locale: "ja_JP",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${ASSETS}/ogp.jpg`, width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/gen-interface-jp@0.1.2/all.css"
        />
      </head>
      <body>
        <div className="scene-bg" aria-hidden />
        {children}
      </body>
    </html>
  );
}
