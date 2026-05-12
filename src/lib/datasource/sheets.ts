import "server-only";
import type { Row } from "./index";

/**
 * Google Sheets 連携。Phase 2 で実装。
 * ここではインターフェースのみ定義しておき、Phase 1 では未対応エラーを投げる。
 */
export async function loadSheet(
  _sheetId: string,
  _range: string,
): Promise<Row[]> {
  throw new Error(
    "Google Sheets datasource は Phase 2 で実装予定です。今は CSV を使ってください。",
  );
}
