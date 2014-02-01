require 'factory_girl'

FactoryGirl.define do
  factory :user do
    sequence :email do |n|
      "test-#{n}@theobserver.com"
    end
    password 'password'
    sequence :username do |n|
      "user#{n}"
    end
  end
end
