class AddFieldsToWidgets < ActiveRecord::Migration
  def change
    add_column :widgets, :column, :int
    add_column :widgets, :row, :int
  end
end
