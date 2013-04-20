# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :query do
    name 'test query'
    value 'SELECT title FROM contests.contests'
    token '#123'
  end
end
