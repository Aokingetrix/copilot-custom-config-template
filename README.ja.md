# copilot-custom-config-template

[English](README.md) | **[日本語](README.ja.md)**

> VS Code の GitHub Copilot をカスタマイズする `.github/` 設定ファイルのテンプレート集

Copilot の出力を毎回手で直していませんか？

`.github/` に Markdown ファイルを置くだけで、コーディング規約の徹底・命名の改善・定型作業の自動化ができます。`copilot-instructions.md` を 1 ファイル置くだけでも効果があり、全階層入れると出力品質が体感 7〜8 割改善します。

> **⚠️ セキュリティ注意**: `.github/` 配下のファイルは Git にコミットされます。API キー・トークン・内部 URL などの秘密情報は絶対に書かないでください。

## 設定ファイルは 5 種類ある

| # | ファイル | 適用タイミング | できること |
|---|---------|-------------|----------|
| ❶ | `copilot-instructions.md` | **常に自動適用** ⭐️ | コーディング規約・前提条件を徹底させる |
| ❷ | `*.instructions.md` | 編集中ファイルのパスで自動適用 | ファイル種別ごとの詳細ルール |
| ❸ | `*.prompt.md` | チャットで `/` を打って手動選択 | 繰り返しタスクをテンプレート化 |
| ❹ | `*.agent.md` | エージェントピッカーで選択 | 専門分野を持つカスタムエージェント |
| ❺ | `SKILL.md` | キーワードで自動 or `/` で手動 | 特定分野のノウハウ・ベストプラクティスの注入 |

## クイックスタート

### 最小構成（1 分で効果を実感）

`.github/copilot-instructions.md` を 1 ファイル置くだけで始められます。

```bash
mkdir -p .github
cat << 'EOF' > .github/copilot-instructions.md
# AI 行動指針

## 役割定義
あなたはシニアエンジニアとして振る舞ってください。

## コーディング規約
- 変数名は具体的にする（data → userList, result → queryResult）
- コメントは Why を書く。What は書かない
- エラーハンドリングは具体的な例外クラスを使う

## 行動原則
- 要件に書かれていない機能は実装しない
- 不明点があれば実装前に質問する（推測で進めない）
- 既存コードのリファクタリングは指示されない限り行わない
EOF
```

Copilot Chat を開いて何か指示を出してみてください。`any` が消え、命名が具体的になるのがすぐわかるはずです。

### フル構成

このリポジトリの `.github/` を自分のプロジェクトにコピーして、スタックに合わせて中身を編集してください。

```bash
git clone https://github.com/akikisai/copilot-custom-config-template.git

cp -r copilot-custom-config-template/.github your-project/

# 不要なファイルを削除し、内容を自分のスタック・規約に合わせて編集
```

## ファイル構成

以下はあくまでも構成例なので、各自プロジェクトにあった形に修正・拡張をおすすめします。

```
.github/
├── copilot-instructions.md              # ❶ 全チャットに常時適用される基本ルール
├── instructions/
│   ├── frontend.instructions.md         # ❷ React/TypeScript 向け（*.tsx 編集時に自動適用）
│   ├── backend.instructions.md          # ❷ Ruby on Rails 向け（*.rb 編集時に自動適用）
│   └── docs.instructions.md             # ❷ Markdown 向け（*.md 編集時に自動適用）
├── prompts/
│   ├── create-component.prompt.md       # ❸ React コンポーネント生成
│   ├── generate-test.prompt.md          # ❸ テストコード生成
│   ├── pr-description.prompt.md         # ❸ PR 説明文を自動生成
│   ├── create-rails-model.prompt.md     # ❸ Rails モデル一括生成
│   ├── arcade-player-management.prompt.md # ❸ 今回の題材用 Rails 初版起動プロンプト
│   └── code-review.prompt.md            # ❸ コードレビュー
├── agents/
│   ├── front-reviewer.agent.md          # ❹ フロントエンドレビュー専門
│   ├── rails-api.agent.md               # ❹ Rails API 設計・実装
│   └── aws-advisor.agent.md             # ❹ AWS インフラ構成相談
└── skills/
    ├── anti-slop/SKILL.md               # ❺ AI の低品質出力を検出・排除
    └── design-taste-frontend/SKILL.md   # ❺ LLM の UI 偏りパターンを回避
```

## 各ファイルの解説

### ❶ `copilot-instructions.md`（常に自動適用）

Copilot Chat を開くたびに自動で読み込まれる、プロジェクト全体の行動指針。**最も効果が大きいので、まずここから始めるのがおすすめ。**

書くべき内容の例：

- 役割定義（シニアエンジニアとして振る舞う、等）
- コーディング規約（`any` 禁止、命名ルール、等）
- 行動原則（要件にない機能は実装しない、等）
- Git コミットルール（Conventional Commits 等）

> **💡 Tip**: 書きすぎると逆効果になります。毎回コンテキストに読み込まれるため、肥大化すると肝心のコードへの注意が薄まります。最初は 10〜20 行に収めて、ファイル種別ごとの詳細は ❷ に分離するのがおすすめです。

### ❷ `*.instructions.md`（ファイルパスで自動適用）

YAML frontmatter の `applyTo` で指定したパスにマッチするファイルを編集するとき、自動で重ね掛けされる。

```yaml
---
applyTo: "src/components/**,*.tsx,*.jsx"
---
```

`copilot-instructions.md`（全体ルール）＋ `frontend.instructions.md`（React 固有ルール）のように、汎用→具体の順で重なる仕組み。

| ファイル | 対象パス | 内容 |
|---------|---------|------|
| `frontend.instructions.md` | `src/components/**`, `*.tsx` 等 | React / Tailwind のルール |
| `backend.instructions.md` | `app/**`, `*.rb` 等 | Rails の命名・設計ルール |
| `docs.instructions.md` | `docs/**`, `*.md` 等 | Markdown の書き方・用語ルール |

### ❸ `*.prompt.md`（`/` で手動選択）

Copilot Chat で `/` を打つと候補に表示される、再利用可能なタスクテンプレート。入力変数（`${input:name}`）を使えば、実行時に値を聞いてくれる。

| ファイル | 呼び出し方 | できること |
|---------|-----------|----------|
| `create-component.prompt.md` | `/create-component` | React コンポーネント + Props 型を生成 |
| `generate-test.prompt.md` | `/generate-test` | 対象ファイルのテストを生成 |
| `pr-description.prompt.md` | `/pr-description` | git diff から PR 説明文を生成 |
| `create-rails-model.prompt.md` | `/create-rails-model` | Model + Migration + RSpec を一括生成 |
| `arcade-player-management.prompt.md` | `/arcade-player-management` | 今回の題材を Rails 初版として起動する |
| `arcade-player-management-implementation.prompt.md` | `/arcade-player-management-implementation` | 実装作業を開始する |
| `code-review.prompt.md` | `/code-review` | 指定ファイルのコードレビュー |

### ❹ `*.agent.md`（エージェントピッカーで選択）

チャット入力欄のモード選択ドロップダウンから切り替える、専門分野を持つカスタムエージェント。YAML frontmatter で `name`・`description`・`tools` を定義し、本文にシステムプロンプトを書く。

| ファイル | 専門分野 |
|---------|---------|
| `front-reviewer.agent.md` | React/TypeScript コードレビュー（5 観点で自動チェック） |
| `rails-api.agent.md` | Rails API 設計・実装（RESTful + 既存パターン準拠） |
| `aws-advisor.agent.md` | AWS インフラ構成相談・CDK コード生成 |

### ❺ `SKILL.md`（キーワードで自動 or `/` で手動）

チャットの内容が `description` にマッチすれば自動で読み込まれる。`/` から手動呼び出しも可能。

- プロジェクト固有 → `.github/skills/` に配置
- マシン全体で共通 → `~/.agents/skills/` に配置
- コミュニティ公開スキル → `npx skill add <スキル名>` でインストール

スキルの一覧は [github/awesome-copilot](https://github.com/github/awesome-copilot) で探せます。

## カスタマイズのコツ

1. **小さく始める** — `copilot-instructions.md` を 3 行書くだけで効果が出る
2. **育てる** — 「また手で直した」と感じたルールをその都度追記する
3. **重ね掛けを活用する** — 全体ルール（❶）→ ファイル別ルール（❷）で自然に積み重なる
4. **暴走を防ぐ** — 「要件にない機能は実装しない」「リファクタリングは指示されない限り行わない」等のガードレールは必須
5. **チームで共有する** — `.github/` をリポジトリにコミットすれば `git clone` した全員に適用される

## 使い分けの例

アーケードゲームのユーザー登録・履歴管理アプリを作るなら、段階ごとに次のように使うと分かりやすいです。

| 段階 | 使うもの | 役割 |
|------|---------|------|
| 要件整理 | `copilot-instructions.md`、`docs.instructions.md` | 目的、スコープ、用語をそろえる。README や設計メモもここで整える |
| ドメイン設計 | `backend.instructions.md`、`rails-api.agent.md`、`create-rails-model.prompt.md` | プレイヤー、所持キャラ、履歴、スコアのモデルや関連を設計する |
| バックエンド実装 | `backend.instructions.md`、`rails-api.agent.md` | Controller、Service、Serializer、RSpec を RESTful に実装する |
| フロント画面 | `frontend.instructions.md`、`create-component.prompt.md`、`front-reviewer.agent.md` | 一覧、詳細、編集画面などの React コンポーネントを作る |
| テスト追加 | `generate-test.prompt.md` | モデル、サービス、コンポーネントのテストを増やす |
| 仕上げレビュー | `code-review.prompt.md`、`front-reviewer.agent.md`、`anti-slop/SKILL.md`、`design-taste-frontend/SKILL.md` | 型、安全性、命名、UI の雑さ、ありがちな AI っぽさを点検する |
| 追加のインフラ検討 | `aws-advisor.agent.md` | 本番化するときの AWS 構成を相談する。初回の試用では必須ではない |

### 実際の進め方

1. まず `copilot-instructions.md` に「このアプリで何を大事にするか」を短く書く
2. Rails 側でモデルと API を作るときは `backend.instructions.md` と `rails-api.agent.md` を使う
3. UI を作るときは `frontend.instructions.md` と `create-component.prompt.md` を使う
4. テストが必要になったら `generate-test.prompt.md` を使う
5. 最後に `code-review.prompt.md` と各 agent / skill で手直しする

### 今回の題材で特に効くもの

- `backend.instructions.md`: 最終ログイン日、プレイ回数、履歴の持ち方をどう設計するかに効く
- `create-rails-model.prompt.md`: プレイヤー、キャラ、履歴のモデルを一気に作るときに便利
- `generate-test.prompt.md`: 履歴追加や集計が壊れていないかを確認しやすい
- `anti-slop/SKILL.md`: 命名や説明が曖昧になったときに効く
- `design-taste-frontend/SKILL.md`: 管理画面の見た目を雑にしないために使う

## 対象スタック（テンプレートの例）

このテンプレートは以下のスタックを例にしていますが、内容を書き換えればどの技術にも対応できます。

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Ruby on Rails
- **Infrastructure**: AWS CDK（TypeScript）

## 参考リンク

- [Customize AI in VS Code（公式：カスタマイズ全体の概要）](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Custom Instructions（copilot-instructions.md / .instructions.md）](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Prompt Files（.prompt.md）](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Custom Agents（.agent.md）](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- [Agent Skills（SKILL.md）](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Agent Skills 仕様（agentskills.io）](https://agentskills.io/)
- [コミュニティのスキル・エージェント集（github/awesome-copilot）](https://github.com/github/awesome-copilot)
