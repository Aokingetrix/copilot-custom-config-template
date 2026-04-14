---
applyTo: "frontend/src/**,frontend/*.tsx,frontend/*.ts,src/components/**,src/hooks/**,src/app/**,*.tsx,*.jsx"  
---
# フロントエンド共通指示

このファイルの対象パスに該当するファイルを編集する際、以下のルールを自動適用する。

## React コンポーネント

- 関数コンポーネントで書く（`export function ComponentName`）
- アロー関数のデフォルトエクスポートは使わない
- Props は interface で定義する（type ではなく interface）
- children を受け取る場合は `React.PropsWithChildren<Props>` を使う

```tsx
// OK
interface UserCardProps {
  name: string;
  email: string;
}

export function UserCard({ name, email }: UserCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-medium">{name}</h3>
      <p className="text-sm text-zinc-500">{email}</p>
    </div>
  );
}
```

## Tailwind CSS

- `h-screen` 禁止 → `min-h-[100dvh]` を使う
- 純黒 `#000` / `black` 禁止 → `zinc-950` を使う
- className の結合には `cn()` ユーティリティを使う
- レスポンシブは `sm:` `md:` `lg:` のブレークポイントで対応
- ダークモード対応は `dark:` プレフィックスを使う

## 状態管理

- ローカル状態は `useState` / `useReducer`
- サーバー状態は TanStack Query（React Query）
- グローバル状態が必要な場合は Zustand
- Context API は テーマ・認証などの低頻度更新のみに使う

## パフォーマンス

- リストレンダリングには必ず一意な `key` を指定する（index は避ける）
- 重い計算は `useMemo` で囲む
- コールバック関数の不要な再生成は `useCallback` で防ぐ
- 画像は `next/image`（Next.js の場合）で最適化する
