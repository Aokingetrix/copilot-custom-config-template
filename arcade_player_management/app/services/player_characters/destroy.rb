module PlayerCharacters
  class Destroy
    def self.call(player_character:)
      player_character.destroy!
    end
  end
end
