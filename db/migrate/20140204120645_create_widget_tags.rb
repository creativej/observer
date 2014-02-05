class CreateWidgetTags < ActiveRecord::Migration
  def change
    create_table :widget_tags do |t|
      t.integer :widget_id
      t.integer :version_id
      t.string :name
      t.text :desc

      t.timestamps
    end

    add_index :widget_tags, [:widget_id, :name], :unique => true
  end
end
