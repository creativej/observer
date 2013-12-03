require 'spec_helper'

describe Query do
  it "has value as query" do
      query = FactoryGirl.create :query, :with_date_range
      expect(query.value_as_query).to eq "SELECT title FROM t WHERE TEST"
  end
end
