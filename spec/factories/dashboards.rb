# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :dashboard do
    name "MyString"
    userid 1
    data "MyText"
    scale false
    is_public false
  end
end
