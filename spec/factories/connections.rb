# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :connection do
    host "localhost"
    port 1
    database "database"
    database_type "mysql"
    username "username"
    user_id 1
    password "password"
  end
end
