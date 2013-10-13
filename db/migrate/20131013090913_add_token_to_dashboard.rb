class AddTokenToDashboard < ActiveRecord::Migration
  def change
    add_column :dashboards, :token, :string
    add_index :dashboards, :token
  end
end
