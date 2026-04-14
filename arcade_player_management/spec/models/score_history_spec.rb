require "rails_helper"

RSpec.describe ScoreHistory, type: :model do
  it "requires a non-negative score" do
    score_history = build(:score_history, score: -1)

    expect(score_history).not_to be_valid
  end
end
