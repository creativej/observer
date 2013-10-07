# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :connection do
    host "MyString"
    port 1
    db "MyString"
    user "MyString"
    password "MyString"
    type ""
  end
end
