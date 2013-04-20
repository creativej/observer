require 'factory_girl'

FactoryGirl.define do
  factory :user do
    email 'test@theobserver.com'
    password 'password'
  end
end
