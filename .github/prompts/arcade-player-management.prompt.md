---
agent: "agent"
tools: ["edit/editFiles", "search/codebase", "execute/runInTerminal"]
description: "アーケードゲームのプレイヤー管理アプリを Rails 初版として起動する"
---

## 指示

以下の仕様を前提に、Rails バックエンドの初版を設計・生成してください。
この prompt は毎回使い回す前提なので、実行計画や作業メモの詳細はここに固定せず、仕様から都度判断してください。

### 参照仕様
${input:spec_file:arcade-player-management-spec.md}

## 手順

1. 参照仕様を読み、対象範囲を確認する
2. codebase search で既存の Rails パターンを確認する
3. 既存パターンに合わせて、モデル、マイグレーション、API、Serializer、RSpec の構成案を出す
4. 必要な場合だけ、ファイル作成や編集を行う

## 生成方針

- Rails の RESTful 設計に従う
- Strong Parameters を使う
- N+1 を includes / preload で防ぐ
- 初版では認証、ランキング、対戦、課金は作らない
- AWS 前提にはしない。ローカル開発と Rails 単体で完結させる
- 仕様にない追加項目は作らない

## 出力する内容

- ドメインモデル案
- API 一覧
- 必要なマイグレーション案
- 実装順序
- 追加で確認すべき不明点
