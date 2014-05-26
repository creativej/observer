require 'spec_helper'

def parse(content)
  LiquidTemplate.for_widget.parse(content)
end

describe Widget do
  describe "widget template parser" do
    it "should widget data_url filter" do
      q = parse(
        'var url = "{% data_url aslkdfjalsdf %}"'
      )

      url = Rails.application.routes.url_helpers.data_queries_path :token => 'aslkdfjalsdf'

      expect(q.render).to eq(
        "var url = \"#{url}\""
      )
    end
  end

  describe "widget data parser" do
    it "should parse data filter" do
      q = parse(
        'var name = "{{ name }}"'
      )

      data = { "name" => 'crazy8' }

      expect(q.render(data)).to eq(
        "var name = \"#{url}\""
      )
    end
  end
end
