class AddUsernameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username, :string, :after => :id
  end
end
