# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :dashboards_widget, :class => 'DashboardsWidgets' do
    dashboard_id 1
    widget_id 1
    row 1
    col 1
    size_x 1
    size_y 1
  end
end
