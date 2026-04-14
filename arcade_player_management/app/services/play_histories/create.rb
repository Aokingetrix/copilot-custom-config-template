module PlayHistories
  class Create
    def self.call(player:, played_at:)
      player.transaction do
        play_history = player.play_histories.create!(played_at: played_at)
        player.increment!(:play_count)
        play_history
      end
    end
  end
end
