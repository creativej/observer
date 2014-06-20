# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :widget do
    user_id 1
    name "MyString"
    js "MyText"
    css "MyText"
    html "MyText"
  end
end
