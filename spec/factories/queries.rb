# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :query do
    name 'test query'
    user_id 1
    value 'SELECT title FROM t'
    token '#123'

    trait :with_group_by do
      value 'SELECT title, {% group timecreated by day %} as datetime FROM t'
    end

    trait :with_date_range do
      value 'SELECT title FROM t WHERE {% datefrom timestamp %}TEST{% enddatefrom %}'
    end
  end
end
