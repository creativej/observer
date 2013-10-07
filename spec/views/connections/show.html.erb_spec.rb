require 'spec_helper'

describe "connections/show" do
  before(:each) do
    @connection = assign(:connection, stub_model(Connection,
      :host => "Host",
      :port => 1,
      :db => "Db",
      :user => "User",
      :password => "Password",
      :type => "Type"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Host/)
    rendered.should match(/1/)
    rendered.should match(/Db/)
    rendered.should match(/User/)
    rendered.should match(/Password/)
    rendered.should match(/Type/)
  end
end
