---
agent: "agent"
tools: ["edit/editFiles", "search/codebase", "execute/runInTerminal"]
description: "Rails のモデル・マイグレーション・テストを一括生成する"
---

## 指示

以下の仕様で Rails のモデル関連ファイルを生成してください。

### モデル名
${input:model_name:モデル名（単数形、例: Product）}

### カラム
${input:columns:カラム定義（例: name:string price:integer description:text user:references）}

## 手順

1. codebase search で既存モデルのバリデーション・アソシエーションのパターンを確認する
2. 既存パターンに合わせて以下を生成する

## 生成するファイル

### マイグレーション
- NOT NULL 制約はマイグレーションとモデルバリデーション両方に入れる
- インデックスは外部キーと検索頻度の高いカラムに付ける
- タイムスタンプ（`created_at`, `updated_at`）は自動付与

### モデル
- バリデーション（presence, uniqueness, length 等）
- アソシエーション（belongs_to, has_many 等）
- スコープ（よく使う検索条件があれば）

### RSpec テスト
- FactoryBot のファクトリ定義
- バリデーションのテスト
- アソシエーションのテスト
- スコープのテスト（存在する場合）
