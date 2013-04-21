require 'spec_helper'

describe "widgets/show" do
  before(:each) do
    @widget = assign(:widget, stub_model(Widget,
      :user_id => 1,
      :name => "Name",
      :js => "MyText",
      :css => "MyText",
      :html => "MyText",
      :options => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(/Name/)
    rendered.should match(/MyText/)
    rendered.should match(/MyText/)
    rendered.should match(/MyText/)
    rendered.should match(/MyText/)
  end
end
