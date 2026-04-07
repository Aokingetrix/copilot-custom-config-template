---
agent: "agent"
tools: ["edit/editFiles", "search/codebase"]
description: "React + TypeScript のコンポーネントを規約に沿って生成する"
---

## 指示

以下の手順で React コンポーネントを作成してください。

1. まず codebase search で既存コンポーネントの書き方を 1 つ確認する
2. 既存パターンに合わせて、新しいコンポーネントを作成する

### コンポーネント名
${input:component_name:コンポーネント名（例: UserProfileCard）}

### 用途
${input:purpose:このコンポーネントの用途（例: ユーザーのプロフィール情報を表示するカード）}

## 生成ルール

- 関数コンポーネント（`export function`、default export は使わない）
- Props は interface で定義し、コンポーネントと同じファイルに書く
- `any` 禁止。推論できない型は明示的に定義する
- Tailwind CSS でスタイリングする
- className の結合が必要な場合は `cn()` ユーティリティを使う
- ロジックが多くなりそうなら、カスタムフックに分離する
- Loading 状態はスケルトンローダーで表現する（スピナーは使わない）
- Empty State がある場合は丁寧に設計する

## 出力するファイル

- `src/components/{component_name}.tsx`
