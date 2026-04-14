FactoryBot.define do
  factory :character_master do
    sequence(:name) { |n| "character-#{n}" }
  end
end
