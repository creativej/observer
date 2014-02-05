# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :widget_tag do
    version_id 1
    name "MyString"
    desc "MyText"
  end
end
