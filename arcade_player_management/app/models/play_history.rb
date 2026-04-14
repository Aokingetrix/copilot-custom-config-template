class PlayHistory < ApplicationRecord
  belongs_to :player
  has_one :score_history, dependent: :destroy

  validates :played_at, presence: true

  scope :recently_played, -> { order(played_at: :desc, id: :desc) }
end
