class AddMetaToWidgets < ActiveRecord::Migration
  def change
    add_column :widgets, :meta, :text, :after => :name
  end
end
