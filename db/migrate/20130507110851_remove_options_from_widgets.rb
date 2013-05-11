class RemoveOptionsFromWidgets < ActiveRecord::Migration
  def up
    remove_column :widgets, :options
  end

  def down
    add_column :widgets, :options, :text
  end
end
