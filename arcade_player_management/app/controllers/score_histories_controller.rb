class ScoreHistoriesController < ApplicationController
  before_action :set_play_history

  def create
    score_history = ScoreHistories::Create.call(
      play_history: @play_history,
      score: score_history_params.fetch(:score)
    )

    render json: { id: score_history.id }, status: :created
  end

  private

  def set_play_history
    @play_history = PlayHistory.find(params[:play_history_id])
  end

  def score_history_params
    params.require(:score_history).permit(:score)
  end
end
