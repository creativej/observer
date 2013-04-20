require 'spec_helper'

describe "queries/new" do
  before(:each) do
    assign(:query, stub_model(Query,
      :name => "MyString",
      :value => "MyText"
    ).as_new_record)
  end

  it "renders new query form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", queries_path, "post" do
      assert_select "input#query_name[name=?]", "query[name]"
      assert_select "input#query_value[name=?]", "query[value]"
    end
  end
end
