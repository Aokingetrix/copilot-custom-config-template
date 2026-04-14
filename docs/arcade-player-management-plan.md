> ステータス: Draft
> 最終更新: 2026-04-14
> 担当者: @copilot

# Arcade Player Management Plan

<!-- AI-CONTEXT: この計画は .github/prompts/arcade-player-management.prompt.md の再利用時に参照する -->

## 目的

アーケードゲームのプレイヤー登録・履歴管理アプリの Rails 初版を、バックエンド中心で組み立てる。
この文書は実行計画として使い、繰り返し利用する prompt からは切り離しておく。

## 前提

- 最終ログイン日は、プレイ有無ではなくログイン時に更新する
- 所持キャラはキャラマスタを別に持ち、プレイヤーとの中間テーブルで管理する
- スコア履歴はプレイ履歴に紐づけ、1 回のプレイに 1 件のスコアを基本にする
- AWS 前提にはしない。ローカル開発と Rails 単体で完結させる
- 初版では認証、ランキング、対戦、課金は作らない

## 実装順序

1. Player と CharacterMaster のモデル、マイグレーション、FactoryBot を作る
2. PlayerCharacter でプレイヤーとキャラマスタの関連を作る
3. PlayHistory を作り、プレイ回数の集計方法を決める
4. ScoreHistory を PlayHistory に紐づけて作る
5. プレイヤー一覧と詳細の API を作る
6. 更新系 API を追加する
7. RSpec を整備して、モデル・API の主要な振る舞いを固める

## モデル設計の要点

- Player
  - ユーザー名
  - 最終ログイン日
  - プレイ回数
- CharacterMaster
  - キャラ名
- PlayerCharacter
  - player_id
  - character_master_id
- PlayHistory
  - player_id
  - played_at
- ScoreHistory
  - play_history_id
  - score

## API の初版案

- `GET /players`
- `GET /players/:id`
- `POST /players`
- `PATCH /players/:id`
- `POST /players/:id/login`
- `POST /players/:id/player_characters`
- `DELETE /players/:id/player_characters/:player_character_id`
- `POST /players/:id/play_histories`
- `POST /play_histories/:play_history_id/score_histories`

## 作成すべきファイル

- `app/models/player.rb`
- `app/models/character_master.rb`
- `app/models/player_character.rb`
- `app/models/play_history.rb`
- `app/models/score_history.rb`
- `app/controllers/players_controller.rb`
- `app/controllers/player_characters_controller.rb`
- `app/controllers/play_histories_controller.rb`
- `app/controllers/score_histories_controller.rb`
- `app/serializers/*` または既存の Serializer 方針に合わせた JSON 出力クラス
- `db/migrate/*`
- `spec/models/*`
- `spec/requests/*`
- `spec/factories/*`

## 確認したい点

- キャラマスタの初期データは手動投入か、seed で用意するか
- スコア履歴は 1 プレイ 1 件に固定するか、後から複数件を許すか
- プレイヤー詳細に表示する「代表的なスコア」を最新スコアにするか最大スコアにするか
- 一覧画面での所持キャラ数は集計値として返すか、都度数えるか

## 備考

この計画は初版の起点として使う。要件が増えたときは、この文書を更新してから prompt 側はそのまま再利用する。