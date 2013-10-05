class ChangeEmailDefaultInUsers < ActiveRecord::Migration
  def up
    change_column_default(:users, :email, nil)
  end

  def down
    change_column :users, :email, :string, :null => true
  end
end
