require "rails_helper"

RSpec.describe "Players", type: :request do
  describe "GET /players" do
    it "returns a list of players" do
      create(:player, name: "AAA")
      create(:player, name: "BBB")

      get "/players"

      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /players" do
    it "creates a player" do
      post "/players", params: { player: { name: "New Player" } }

      expect(response).to have_http_status(:created)
    end
  end

  describe "POST /players/:id/login" do
    it "updates the last login time" do
      player = create(:player, last_login_at: 1.day.ago)

      post "/players/#{player.id}/login"

      expect(response).to have_http_status(:ok)
      expect(player.reload.last_login_at).to be_within(2.seconds).of(Time.current)
    end
  end

  describe "POST /players/:id/play_histories" do
    it "creates a play history and increments the play count" do
      player = create(:player, play_count: 0)

      post "/players/#{player.id}/play_histories", params: { play_history: { played_at: Time.current } }

      expect(response).to have_http_status(:created)
      expect(player.reload.play_count).to eq(1)
    end
  end
end
