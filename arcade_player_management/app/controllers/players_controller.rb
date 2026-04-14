class PlayersController < ApplicationController
  before_action :set_player, only: [:show, :update, :login]

  def index
    players = Player.includes(player_characters: :character_master, play_histories: :score_history).recently_updated
    render json: players.map { |player| PlayerSerializer.new(player).as_json }
  end

  def show
    render json: PlayerDetailSerializer.new(@player).as_json
  end

  def create
    player = Players::Create.call(player_params)
    render json: PlayerDetailSerializer.new(player).as_json, status: :created
  end

  def update
    player = Players::Update.call(player: @player, player_params: player_params)
    render json: PlayerDetailSerializer.new(player).as_json
  end

  def login
    player = Players::Login.call(player: @player)
    render json: PlayerDetailSerializer.new(player).as_json
  end

  private

  def set_player
    @player = Player.find(params[:id])
  end

  def player_params
    params.require(:player).permit(:name)
  end
end
