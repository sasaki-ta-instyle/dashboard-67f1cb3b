import "server-only";
import { loadCsv } from "./csv";
import { loadSheet } from "./sheets";

export type Row = Record<string, string | number | null>;

export type DataSourceSpec =
  | { kind: "csv"; path: string }
  | { kind: "sheet"; sheetId: string; range: string };

/**
 * データソース仕様を受け取り、行配列を返す統一インターフェース。
 * チャート / KPI コンポーネントから直接 fetch せず、必ずこの関数経由にすること。
 */
export async function loadDataSource(spec: DataSourceSpec): Promise<Row[]> {
  switch (spec.kind) {
    case "csv":
      return loadCsv(spec.path);
    case "sheet":
      return loadSheet(spec.sheetId, spec.range);
  }
}
