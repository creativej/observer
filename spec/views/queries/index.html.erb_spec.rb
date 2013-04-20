require 'spec_helper'

describe "queries/index" do
  before(:each) do
    assign(:queries, [
      stub_model(Query,
        :name => "Name",
        :value => "MyText",
        :token => "Token"
      ),
      stub_model(Query,
        :name => "Name",
        :value => "MyText",
        :token => "Token"
      )
    ])
  end

  it "renders a list of queries" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Token".to_s, :count => 2
  end
end
