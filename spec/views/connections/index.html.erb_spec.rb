require 'spec_helper'

describe "connections/index" do
  before(:each) do
    assign(:connections, [
      stub_model(Connection,
        :host => "Host",
        :port => 1,
        :db => "Db",
        :user => "User",
        :password => "Password",
        :type => "Type"
      ),
      stub_model(Connection,
        :host => "Host",
        :port => 1,
        :db => "Db",
        :user => "User",
        :password => "Password",
        :type => "Type"
      )
    ])
  end

  it "renders a list of connections" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Host".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Db".to_s, :count => 2
    assert_select "tr>td", :text => "User".to_s, :count => 2
    assert_select "tr>td", :text => "Password".to_s, :count => 2
    assert_select "tr>td", :text => "Type".to_s, :count => 2
  end
end
