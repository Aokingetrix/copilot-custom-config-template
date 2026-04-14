module Players
  class Update
    def self.call(player:, player_params:)
      player.update!(player_params)
      player
    end
  end
end
