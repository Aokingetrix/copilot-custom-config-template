class CharacterMaster < ApplicationRecord
  has_many :player_characters, dependent: :destroy
  has_many :players, through: :player_characters

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
