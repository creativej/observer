require 'spec_helper'

describe "queries/edit" do
  before(:each) do
    @query = assign(:query, stub_model(Query,
      :name => "MyString",
      :value => "MyText"
    ))
  end

  it "renders the edit query form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", query_path(@query), "post" do
      assert_select "input#query_name[name=?]", "query[name]"
      assert_select "input#query_value[name=?]", "query[value]"
    end
  end
end
