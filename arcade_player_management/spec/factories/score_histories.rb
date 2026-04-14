FactoryBot.define do
  factory :score_history do
    association :play_history
    score { 1000 }
  end
end
