class Player < ApplicationRecord
  has_many :player_characters, dependent: :destroy
  has_many :character_masters, through: :player_characters
  has_many :play_histories, dependent: :destroy
  has_many :score_histories, through: :play_histories

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :play_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  scope :recently_updated, -> { order(updated_at: :desc, id: :desc) }

  def refresh_play_count!
    update!(play_count: play_histories.count)
  end
end
