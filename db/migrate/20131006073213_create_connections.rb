class CreateConnections < ActiveRecord::Migration
  def change
    create_table :connections do |t|
      t.integer :user_id, :index => true
      t.string :name
      t.string :host, :null => false
      t.integer :port
      t.string :database
      t.string :username, :null => false
      t.string :encrypted_password
      t.string :salt
      t.string :database_type, :null => false
      t.timestamps
    end
  end
end
