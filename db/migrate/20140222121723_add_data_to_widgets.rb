class AddDataToWidgets < ActiveRecord::Migration
  def change
    add_column :widgets, :data, :text, :after => :meta
  end
end
