class PlayerCharacter < ApplicationRecord
  belongs_to :player
  belongs_to :character_master

  validates :character_master_id, uniqueness: { scope: :player_id }
end
