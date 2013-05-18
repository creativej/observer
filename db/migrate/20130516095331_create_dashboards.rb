class CreateDashboards < ActiveRecord::Migration
  def change
    create_table :dashboards do |t|
      t.integer :user_id, :index => true
      t.string :name, :null => false
      t.text :data
      t.boolean :scale, :null => false, :default => false
      t.boolean :is_public, :null => false, :default => false

      t.timestamps
    end
  end
end
