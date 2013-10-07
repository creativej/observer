class AddConnectionIdToQueries < ActiveRecord::Migration
  def change
    add_column :queries, :connection_id, :integer
  end
end
