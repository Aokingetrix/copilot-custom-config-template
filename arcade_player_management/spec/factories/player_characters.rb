FactoryBot.define do
  factory :player_character do
    association :player
    association :character_master
  end
end
