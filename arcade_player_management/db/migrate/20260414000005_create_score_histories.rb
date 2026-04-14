class CreateScoreHistories < ActiveRecord::Migration[8.0]
  def change
    create_table :score_histories do |t|
      t.references :play_history, null: false, foreign_key: true, index: { unique: true }
      t.integer :score, null: false

      t.timestamps
    end
  end
end
