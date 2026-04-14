require "rails_helper"

RSpec.describe Player, type: :model do
  describe "validations" do
    it "requires a name" do
      player = build(:player, name: nil)

      expect(player).not_to be_valid
      expect(player.errors[:name]).to be_present
    end
  end
end
