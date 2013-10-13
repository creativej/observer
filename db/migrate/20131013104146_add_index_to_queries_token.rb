class AddIndexToQueriesToken < ActiveRecord::Migration
  def change
    add_index :queries, :token
  end
end
