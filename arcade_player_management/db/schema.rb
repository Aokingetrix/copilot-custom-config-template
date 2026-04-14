# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_04_14_000005) do
  create_table "character_masters", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_character_masters_on_name", unique: true
  end

  create_table "play_histories", force: :cascade do |t|
    t.integer "player_id", null: false
    t.datetime "played_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id", "played_at"], name: "index_play_histories_on_player_id_and_played_at"
    t.index ["player_id"], name: "index_play_histories_on_player_id"
  end

  create_table "player_characters", force: :cascade do |t|
    t.integer "player_id", null: false
    t.integer "character_master_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_master_id"], name: "index_player_characters_on_character_master_id"
    t.index ["player_id", "character_master_id"], name: "index_player_characters_on_player_id_and_character_master_id", unique: true
    t.index ["player_id"], name: "index_player_characters_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "last_login_at"
    t.integer "play_count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_players_on_name", unique: true
  end

  create_table "score_histories", force: :cascade do |t|
    t.integer "play_history_id", null: false
    t.integer "score", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["play_history_id"], name: "index_score_histories_on_play_history_id", unique: true
  end

  add_foreign_key "play_histories", "players"
  add_foreign_key "player_characters", "character_masters"
  add_foreign_key "player_characters", "players"
  add_foreign_key "score_histories", "play_histories"
end
