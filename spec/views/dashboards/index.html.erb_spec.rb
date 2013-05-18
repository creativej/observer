require 'spec_helper'

describe "dashboards/index" do
  before(:each) do
    assign(:dashboards, [
      stub_model(Dashboard,
        :name => "Name",
        :userid => 1,
        :data => "MyText",
        :scale => false,
        :is_public => false
      ),
      stub_model(Dashboard,
        :name => "Name",
        :userid => 1,
        :data => "MyText",
        :scale => false,
        :is_public => false
      )
    ])
  end

  it "renders a list of dashboards" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
  end
end
