class ChangeEmailInUsers < ActiveRecord::Migration
  def change
    change_column :users, :email, :string, :default => '', :null => true
  end
end
