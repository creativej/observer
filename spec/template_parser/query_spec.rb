require 'spec_helper'

def parse(content)
  LiquidTemplate.for_query.parse(content)
end

describe Query do
  describe "query template parser" do
    it "should parse group_by" do
      q = parse(
        'SELECT title, {% group timecreated by day as timestamp %} as datetime FROM t'
      )

      expect(q.render).to eq(
        "SELECT title, CONCAT(YEAR(FROM_UNIXTIME(timecreated)), '-', MONTH(FROM_UNIXTIME(timecreated)), '-', DAY(FROM_UNIXTIME(timecreated))) as datetime FROM t"
      )
    end

    it "should parse group_by using context variable" do
      q = parse(
        'SELECT title, {% group timecreated by day as timestamp %} as datetime FROM t'
      )

      expect(q.render('group_by' => 'year')).to eq(
        "SELECT title, YEAR(FROM_UNIXTIME(timecreated)) as datetime FROM t"
      )
    end

    it "should parse group_by as datetime" do
      q = parse(
        'SELECT title, {% group timecreated by day %} as datetime FROM t'
      )

      expect(q.render).to eq(
        "SELECT title, CONCAT(YEAR(timecreated), '-', MONTH(timecreated), '-', DAY(timecreated)) as datetime FROM t"
      )
    end

    it "should parse datefrom block" do
      q = parse(
        'this is {% datefrom timestamp %}timestamp > 1{% enddatefrom %}'
      )
      expect(q.render).to eq(
        'this is timestamp > 1'
      )
    end

    it "should parse datefrom block using context variable" do
      q = parse(
        'this is {% datefrom timestamp %}wee{% enddatefrom %}'
      )
      expect(q.render('datefrom' => 123)).to eq(
        'this is timestamp > 123'
      )
    end

    it "should parse datetill block" do
      q = parse(
        'this is {% datetill timestamp %}timestamp <= 1{% enddatetill %}'
      )
      expect(q.render).to eq(
        'this is timestamp <= 1'
      )
    end

    it "should parse datetill block using context variable" do
      q = parse(
        'this is {% datetill timestamp %}wee{% enddatetill %}'
      )
      expect(q.render('datetill' => 123)).to eq(
        'this is timestamp <= 123'
      )
    end

  end
end
