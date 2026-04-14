class PlayerDetailSerializer
  def initialize(player)
    @player = player
  end

  def as_json(*_args)
    {
      id: player.id,
      name: player.name,
      last_login_at: player.last_login_at,
      play_count: player.play_count,
      characters: player.player_characters.map { |player_character| character_payload(player_character) },
      play_histories: player.play_histories.recently_played.map { |play_history| play_history_payload(play_history) }
    }
  end

  private

  attr_reader :player

  def character_payload(player_character)
    {
      id: player_character.id,
      character_master_id: player_character.character_master_id,
      character_name: player_character.character_master&.name
    }
  end

  def play_history_payload(play_history)
    {
      id: play_history.id,
      played_at: play_history.played_at,
      score: play_history.score_history&.score
    }
  end
end
