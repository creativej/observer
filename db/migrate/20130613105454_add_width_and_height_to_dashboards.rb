class AddWidthAndHeightToDashboards < ActiveRecord::Migration
  def change
    add_column :dashboards, :width, :integer, :limit => 2, :after => :name
    add_column :dashboards, :height, :integer, :limit => 2, :after => :width
  end
end
