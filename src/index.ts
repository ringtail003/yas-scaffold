/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { greet, type Greeting } from "./greet.ts";

// ==============================
// ✅ エントリポイントはmain関数です。
// ==============================
export function main() {
  // ==============================
  // インポート
  // ==============================

  // ✅ 別ファイルの関数などインポートできます。
  const greeting: Greeting = greet("world");

  // ==============================
  // ログ
  // ==============================

  // ✅ YAS実行結果にログ出力するには以下のように書きます。
  Logger.log("Hi!");

  // ✅ オブジェクトはstringに変換すると見やすくなります。
  Logger.log(JSON.stringify(greeting));

  // ==============================
  // 型
  // ==============================
  // ✅ `builtin.d.ts` で定義された型は、インポートなしで参照できます。
  DriveApp.getFileById("123");
  SpreadsheetApp.openById("file-1");

  // ==============================
  // ECMAScript
  // ==============================

  // ✅ const,letが使えます。
  const v1 = 1;
  let v2 = 2;

  // ✅ あまり新しい機能は使えません。
  // ERROR（groupBy / ES2024）
  // Object.groupBy([], function () {});

  // ==============================
  // Lint
  // ==============================

  // ✅ arrow functionは関数に変換されます。
  // const v3 = () => {};
  const v3 = function () {};

  // ✅ YASで使えない構文は禁止されています。
  // ERROR（Spread operator）
  // [1, 2, ...[3, 4]];
}
