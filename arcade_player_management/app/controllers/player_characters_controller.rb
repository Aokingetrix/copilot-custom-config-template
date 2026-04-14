class PlayerCharactersController < ApplicationController
  before_action :set_player
  before_action :set_player_character, only: [:destroy]

  def create
    player_character = PlayerCharacters::Create.call(
      player: @player,
      character_master_id: player_character_params.fetch(:character_master_id)
    )

    render json: { id: player_character.id }, status: :created
  end

  def destroy
    PlayerCharacters::Destroy.call(player_character: @player_character)
    head :no_content
  end

  private

  def set_player
    @player = Player.find(params[:player_id])
  end

  def set_player_character
    @player_character = @player.player_characters.find(params[:id])
  end

  def player_character_params
    params.require(:player_character).permit(:character_master_id)
  end
end
