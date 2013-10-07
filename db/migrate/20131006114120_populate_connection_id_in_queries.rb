class PopulateConnectionIdInQueries < ActiveRecord::Migration
  def up
    queries = Query.all

    queries.each do |q|
      q.connection_id = 1
      q.save
    end
  end

  def down
  end
end
