class CreateWidgets < ActiveRecord::Migration
  def change
    create_table :widgets do |t|
      t.integer :user_id, :index => true
      t.string :name
      t.text :js
      t.text :css
      t.text :html
      t.text :options

      t.timestamps
    end
  end
end
