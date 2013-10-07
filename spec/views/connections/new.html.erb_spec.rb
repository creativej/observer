require 'spec_helper'

describe "connections/new" do
  before(:each) do
    assign(:connection, stub_model(Connection,
      :host => "MyString",
      :port => 1,
      :db => "MyString",
      :user => "MyString",
      :password => "MyString",
      :type => ""
    ).as_new_record)
  end

  it "renders new connection form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", connections_path, "post" do
      assert_select "input#connection_host[name=?]", "connection[host]"
      assert_select "input#connection_port[name=?]", "connection[port]"
      assert_select "input#connection_db[name=?]", "connection[db]"
      assert_select "input#connection_user[name=?]", "connection[user]"
      assert_select "input#connection_password[name=?]", "connection[password]"
      assert_select "input#connection_type[name=?]", "connection[type]"
    end
  end
end
