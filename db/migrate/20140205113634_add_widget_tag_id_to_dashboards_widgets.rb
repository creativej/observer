class AddWidgetTagIdToDashboardsWidgets < ActiveRecord::Migration
  def change
    add_column :dashboards_widgets, :widget_tag_id, :integer, :after => :widget_id
  end
end
