require 'spec_helper'

describe "widgets/index" do
  before(:each) do
    assign(:widgets, [
      stub_model(Widget,
        :user_id => 1,
        :name => "Name",
        :js => "MyText",
        :css => "MyText",
        :html => "MyText",
        :options => "MyText"
      ),
      stub_model(Widget,
        :user_id => 1,
        :name => "Name",
        :js => "MyText",
        :css => "MyText",
        :html => "MyText",
        :options => "MyText"
      )
    ])
  end

  it "renders a list of widgets" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
