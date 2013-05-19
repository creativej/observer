class CreateDashboardsWidgets < ActiveRecord::Migration
  def change
    create_table :dashboards_widgets do |t|
      t.integer :dashboard_id, :null => false
      t.integer :widget_id, :null => false
      t.integer :row, :null => false
      t.integer :col, :null => false
      t.integer :size_x, :null => false
      t.integer :size_y, :null => false

      t.timestamps
    end
  end
end
