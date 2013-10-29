require 'spec_helper'

describe Query do
  describe "with query template" do
    it "has group_by" do
      query = FactoryGirl.create :query, :with_group_by

      q = Liquid::Template.parse(query.value)

      expect(q.render).to eq(
        "SELECT title, CONCAT(YEAR(FROM_UNIXTIME(timecreated)), '-', MONTH(FROM_UNIXTIME(timecreated)), '-', DAY(FROM_UNIXTIME(timecreated))) as datetime FROM t"
      )
    end
  end
end
