class PlayerSerializer
  def initialize(player)
    @player = player
  end

  def as_json(*_args)
    {
      id: player.id,
      name: player.name,
      last_login_at: player.last_login_at,
      play_count: player.play_count,
      character_count: player.player_characters.size,
      character_names: character_names,
      latest_score: latest_score
    }
  end

  private

  attr_reader :player

  def character_names
    player.player_characters.map { |player_character| player_character.character_master&.name }.compact
  end

  def latest_score
    score_histories = player.play_histories.filter_map(&:score_history)
    return nil if score_histories.empty?

    score_histories.max_by(&:created_at)&.score
  end
end
