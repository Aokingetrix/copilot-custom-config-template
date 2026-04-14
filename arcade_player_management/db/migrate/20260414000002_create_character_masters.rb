class CreateCharacterMasters < ActiveRecord::Migration[8.0]
  def change
    create_table :character_masters do |t|
      t.string :name, null: false

      t.timestamps
    end

    add_index :character_masters, :name, unique: true
  end
end
