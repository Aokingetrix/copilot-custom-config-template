class CreatePlayHistories < ActiveRecord::Migration[8.0]
  def change
    create_table :play_histories do |t|
      t.references :player, null: false, foreign_key: true
      t.datetime :played_at, null: false

      t.timestamps
    end

    add_index :play_histories, [:player_id, :played_at]
  end
end
