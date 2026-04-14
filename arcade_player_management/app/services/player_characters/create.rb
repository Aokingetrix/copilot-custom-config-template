module PlayerCharacters
  class Create
    def self.call(player:, character_master_id:)
      player.player_characters.create!(character_master_id: character_master_id)
    end
  end
end
