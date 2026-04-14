class PlayHistoriesController < ApplicationController
  before_action :set_player

  def create
    play_history = PlayHistories::Create.call(
      player: @player,
      played_at: play_history_params[:played_at].presence || Time.current
    )

    render json: { id: play_history.id }, status: :created
  end

  private

  def set_player
    @player = Player.find(params[:player_id])
  end

  def play_history_params
    params.require(:play_history).permit(:played_at)
  end
end
