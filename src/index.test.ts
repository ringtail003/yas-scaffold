import {
  afterEach,
  beforeEach,
  describe,
  mock,
  test,
  type TestContext,
} from "node:test";

// ✅ ファイルには拡張子を付けます
// ✅ 型のインポートはtypeキーワードを使います
import { greet, type Greeting } from "./greet.ts";

describe("アサーション", () => {
  test("プリミティブ", (t: TestContext) => {
    t.assert.equal("Hello World", "Hello " + "World");
    t.assert.equal(100, 99 + 1);
    t.assert.equal(true, true);
  });

  test("配列", (t: TestContext) => {
    const a = [123];
    const b = [123];
    const c = a;

    t.assert.deepEqual(a, b); // 値が同じ
    t.assert.strictEqual(a, c); // 参照が同じ
  });

  test("オブジェクト", (t: TestContext) => {
    const a = { x: 123 };
    const b = { x: 123 };
    const c = a;

    t.assert.deepEqual(a, b); // 値が同じ
    t.assert.strictEqual(a, c); // 参照が同じ
  });
});

describe("インポート", () => {
  test("インポートした関数と型をテストする", (t: TestContext) => {
    const greeting: Greeting = greet("world");
    t.assert.equal(greeting.message, "Hello world!");
  });
});

describe("Loggerのモック", () => {
  beforeEach(() => {
    globalThis.Logger = {
      log: () => {},
    };
  });

  const SUT = () => {
    Logger.log("");
    return 123;
  };

  test("Loggerを呼んでもエラーにならない", (t: TestContext) => {
    t.assert.equal(SUT(), 123);
  });
});

describe("モッククラス", () => {
  class MockSpreadSheetApp {
    id = "";
    static create() {
      return new MockSpreadSheetApp();
    }
    openById(id: string) {
      this.id = id;
    }
  }
  const SUT = () => {
    SpreadsheetApp.openById("file-1");
  };

  test("モックに記録した値でテストする", (t: TestContext) => {
    const mock = MockSpreadSheetApp.create();
    globalThis.SpreadsheetApp = mock as any as SpreadsheetApp;

    SUT();
    t.assert.equal("file-1", mock.id);
  });

  test("メソッドモックでテストする", (t: TestContext) => {
    const mock = MockSpreadSheetApp.create();
    globalThis.SpreadsheetApp = mock as any as SpreadsheetApp;

    let count = 0;
    t.mock.method(mock, "openById").mock.mockImplementation(() => count++);

    SUT();
    SUT();

    t.assert.equal(2, count);
  });
});

describe("例外", () => {
  const SUT = () => {
    throw new Error("");
  };

  test("例外の発生をテストする", (t: TestContext) => {
    t.assert.throws(() => SUT());
  });
});

describe("非同期", () => {
  const SUT = () => Promise.resolve(123);

  test("awaitでテストする", async (t: TestContext) => {
    t.assert.equal(123, await SUT());
  });

  test("doneでテストする", (t: TestContext, done) => {
    SUT().then((value) => {
      t.assert.equal(123, value);
      done();
    });
  });
});

describe("タイマー", () => {
  beforeEach(() => {
    mock.timers.enable({
      apis: ["Date"],
      now: new Date("2024-01-02T01:02:03.000Z"),
    });
  });

  afterEach(() => {
    mock.timers.reset();
  });

  const SUT = () => new Date().toISOString();

  test("現在時刻が変わる", (t: TestContext) => {
    t.assert.equal(SUT(), "2024-01-02T01:02:03.000Z");
  });
});
