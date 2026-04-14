FactoryBot.define do
  factory :player do
    sequence(:name) { |n| "player-#{n}" }
    last_login_at { Time.current }
    play_count { 0 }
  end
end
