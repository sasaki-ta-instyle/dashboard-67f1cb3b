import "server-only";
import path from "node:path";
import fs from "node:fs/promises";
import type { Row } from "./index";

/**
 * 軽量 CSV パーサ。1 行目をヘッダ、以降をデータ行として扱う。
 * クォートで囲まれた値とカンマエスケープ、CRLF/LF を扱う。
 * 大きなデータには使わない（数千行までを想定）。
 */
export async function loadCsv(relPath: string): Promise<Row[]> {
  const abs = path.resolve(process.cwd(), relPath);
  const text = await fs.readFile(abs, "utf8");
  const lines = parseLines(text);
  if (lines.length === 0) return [];
  const [header, ...rest] = lines;
  return rest
    .filter((row) => row.length > 0 && row.some((cell) => cell !== ""))
    .map((row) => {
      const obj: Row = {};
      header.forEach((key, i) => {
        const raw = row[i] ?? "";
        const num = Number(raw);
        obj[key] = raw !== "" && !Number.isNaN(num) ? num : raw === "" ? null : raw;
      });
      return obj;
    });
}

function parseLines(text: string): string[][] {
  const out: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      continue;
    }
    if (c === ",") {
      row.push(cur);
      cur = "";
      continue;
    }
    if (c === "\n") {
      row.push(cur);
      out.push(row);
      row = [];
      cur = "";
      continue;
    }
    if (c === "\r") continue;
    cur += c;
  }
  if (cur !== "" || row.length > 0) {
    row.push(cur);
    out.push(row);
  }
  return out;
}
