class CreateQueries < ActiveRecord::Migration
  def change
    create_table :queries do |t|
      t.integer :user_id, :null => false, :index => true
      t.string :name, :null => false
      t.text :value, :null => false
      t.string :token, :null => false, :index => true

      t.timestamps
    end
  end
end
