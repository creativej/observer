class AddDataToDashboardsWidgets < ActiveRecord::Migration
  def change
    add_column :dashboards_widgets, :data, :text, :after => :size_y
  end
end
