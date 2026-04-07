---
applyTo: "app/**,lib/**,*.rb,Gemfile,*.rake,config/**"
---
# バックエンド共通指示（Ruby on Rails）

このファイルの対象パスに該当するファイルを編集する際、以下のルールを自動適用する。

## 命名規則

| 対象 | ルール | 例 |
|-----|-------|---|
| Controller | 複数形 | `UsersController` |
| Model | 単数形 | `User` |
| Service | 動詞 + 名詞 | `CreateUser`, `UpdateProfile` |
| Serializer | 単数形 | `UserSerializer` |
| テーブル | 複数形スネークケース | `user_profiles` |

## メソッド名のプレフィックス

| プレフィックス | 用途 | 例 |
|------------|------|---|
| `find_` | 1件取得（見つからない場合 nil） | `find_by_email(email)` |
| `find_!` | 1件取得（見つからない場合例外） | `find_by_email!(email)` |
| `fetch_` | 外部 API / 非同期取得 | `fetch_weather_data` |
| `create_` | 新規リソース生成 | `create_order(params)` |
| `update_` | 既存リソースの更新 | `update_profile(user, params)` |
| `delete_` / `destroy_` | リソースの削除 | `destroy_session(user)` |

## Controller

- Strong Parameters を必ず使う
- ビジネスロジックは Controller に書かず Service に切り出す
- before_action で認証・認可チェックを行う
- rescue_from でエラーハンドリングを統一する

```ruby
class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    users = User.includes(:profile).page(params[:page])
    render json: UserSerializer.new(users)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
```

## Model

- バリデーションは Model に書く
- スコープは `scope :名前, -> { クエリ }` 形式で定義する
- コールバックは最小限にする（副作用が追いにくくなるため）
- N+1 クエリ対策に `includes` / `preload` を使う

## テスト（RSpec）

- テスト命名: `describe "メソッド名"` > `context "条件"` > `it "期待する振る舞い"`
- FactoryBot でテストデータを作成する
- `let` / `let!` で変数を遅延評価にする
- 外部 API 呼び出しは WebMock / VCR でスタブする
