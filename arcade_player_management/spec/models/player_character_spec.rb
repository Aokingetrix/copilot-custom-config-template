require "rails_helper"

RSpec.describe PlayerCharacter, type: :model do
  it "does not allow duplicate character ownership for the same player" do
    player = create(:player)
    character_master = create(:character_master)
    create(:player_character, player:, character_master:)

    duplicate = build(:player_character, player:, character_master:)

    expect(duplicate).not_to be_valid
  end
end
