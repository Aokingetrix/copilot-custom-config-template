require "rails_helper"

RSpec.describe PlayHistory, type: :model do
  it "requires played_at" do
    play_history = build(:play_history, played_at: nil)

    expect(play_history).not_to be_valid
  end
end
