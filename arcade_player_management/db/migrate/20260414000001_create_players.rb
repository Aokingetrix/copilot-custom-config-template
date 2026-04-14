class CreatePlayers < ActiveRecord::Migration[8.0]
  def change
    create_table :players do |t|
      t.string :name, null: false
      t.datetime :last_login_at
      t.integer :play_count, null: false, default: 0

      t.timestamps
    end

    add_index :players, :name, unique: true
  end
end
