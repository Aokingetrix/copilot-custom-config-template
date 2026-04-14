FactoryBot.define do
  factory :play_history do
    association :player
    played_at { Time.current }
  end
end
