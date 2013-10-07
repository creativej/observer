require 'spec_helper'

describe "connections/edit" do
  before(:each) do
    @connection = assign(:connection, stub_model(Connection,
      :host => "MyString",
      :port => 1,
      :db => "MyString",
      :user => "MyString",
      :password => "MyString",
      :type => ""
    ))
  end

  it "renders the edit connection form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", connection_path(@connection), "post" do
      assert_select "input#connection_host[name=?]", "connection[host]"
      assert_select "input#connection_port[name=?]", "connection[port]"
      assert_select "input#connection_db[name=?]", "connection[db]"
      assert_select "input#connection_user[name=?]", "connection[user]"
      assert_select "input#connection_password[name=?]", "connection[password]"
      assert_select "input#connection_type[name=?]", "connection[type]"
    end
  end
end
