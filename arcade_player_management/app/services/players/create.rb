module Players
  class Create
    def self.call(player_params)
      Player.create!(player_params)
    end
  end
end
