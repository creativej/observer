require 'spec_helper'

describe "dashboards/show" do
  before(:each) do
    @dashboard = assign(:dashboard, stub_model(Dashboard,
      :name => "Name",
      :userid => 1,
      :data => "MyText",
      :scale => false,
      :is_public => false
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/1/)
    rendered.should match(/MyText/)
    rendered.should match(/false/)
    rendered.should match(/false/)
  end
end
