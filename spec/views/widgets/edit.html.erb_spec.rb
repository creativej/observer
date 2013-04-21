require 'spec_helper'

describe "widgets/edit" do
  before(:each) do
    @widget = assign(:widget, stub_model(Widget,
      :user_id => 1,
      :name => "MyString",
      :js => "MyText",
      :css => "MyText",
      :html => "MyText",
      :options => "MyText"
    ))
  end

  it "renders the edit widget form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", widget_path(@widget), "post" do
      assert_select "input#widget_user_id[name=?]", "widget[user_id]"
      assert_select "input#widget_name[name=?]", "widget[name]"
      assert_select "textarea#widget_js[name=?]", "widget[js]"
      assert_select "textarea#widget_css[name=?]", "widget[css]"
      assert_select "textarea#widget_html[name=?]", "widget[html]"
      assert_select "textarea#widget_options[name=?]", "widget[options]"
    end
  end
end
