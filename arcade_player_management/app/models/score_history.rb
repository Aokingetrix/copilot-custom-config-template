class ScoreHistory < ApplicationRecord
  belongs_to :play_history

  validates :score, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
