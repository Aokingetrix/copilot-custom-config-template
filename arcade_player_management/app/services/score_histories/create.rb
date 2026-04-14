module ScoreHistories
  class Create
    def self.call(play_history:, score:)
      play_history.create_score_history!(score: score)
    end
  end
end
