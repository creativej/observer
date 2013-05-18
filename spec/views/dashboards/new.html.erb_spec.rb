require 'spec_helper'

describe "dashboards/new" do
  before(:each) do
    assign(:dashboard, stub_model(Dashboard,
      :name => "MyString",
      :userid => 1,
      :data => "MyText",
      :scale => false,
      :is_public => false
    ).as_new_record)
  end

  it "renders new dashboard form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", dashboards_path, "post" do
      assert_select "input#dashboard_name[name=?]", "dashboard[name]"
      assert_select "input#dashboard_userid[name=?]", "dashboard[userid]"
      assert_select "textarea#dashboard_data[name=?]", "dashboard[data]"
      assert_select "input#dashboard_scale[name=?]", "dashboard[scale]"
      assert_select "input#dashboard_is_public[name=?]", "dashboard[is_public]"
    end
  end
end
