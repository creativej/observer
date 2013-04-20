require 'spec_helper'

describe "queries/show" do
  before(:each) do
    @query = assign(:query, stub_model(Query,
      :name => "Name",
      :value => "MyText",
      :token => "Token"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/MyText/)
    rendered.should match(/Token/)
  end
end
