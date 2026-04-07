---
agent: "agent"
tools: ["edit/editFiles", "search/codebase"]
description: "指定ファイルに対する Vitest / RSpec テストを生成する"
---

## 指示

以下のファイルに対するユニットテストを生成してください。

### 対象ファイル
${input:target_file:テスト対象のファイルパス（例: src/hooks/useAuth.ts）}

## 手順

1. 対象ファイルを読み、エクスポートされている関数・コンポーネントを列挙する
2. codebase search で既存テストの書き方パターンを確認する
3. 既存パターンに合わせてテストを書く

## テストケースの設計

各関数 / コンポーネントに対して以下を書く：

- **正常系**: 期待通りの入力で期待通りの出力が返る
- **境界値**: 空配列、null、undefined、空文字
- **異常系**: 無効な入力でエラーが適切に発生する（該当する場合のみ）

## TypeScript（Vitest）の場合

- テストランナー: Vitest
- React コンポーネント: @testing-library/react
- 命名: `describe("関数名")` > `it("should 〜 when 〜")`
- モック: `vi.fn()` / `vi.mock()`

## Ruby（RSpec）の場合

- テストランナー: RSpec
- テストデータ: FactoryBot
- 命名: `describe "メソッド名"` > `context "条件"` > `it "期待する振る舞い"`
- 外部 API: WebMock でスタブ

## 出力先

- 既存テストファイルがあればそのパターンに合わせる
- なければ: TypeScript → `__tests__/` or `.test.ts(x)` / Ruby → `spec/` 配下
