class CreatePlayerCharacters < ActiveRecord::Migration[8.0]
  def change
    create_table :player_characters do |t|
      t.references :player, null: false, foreign_key: true
      t.references :character_master, null: false, foreign_key: true

      t.timestamps
    end

    add_index :player_characters, [:player_id, :character_master_id], unique: true
  end
end
