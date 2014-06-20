# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140222121852) do

  create_table "connections", :force => true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "host",               :null => false
    t.integer  "port"
    t.string   "database"
    t.string   "username",           :null => false
    t.string   "encrypted_password"
    t.string   "salt"
    t.string   "database_type",      :null => false
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  create_table "dashboards", :force => true do |t|
    t.integer  "user_id"
    t.string   "name",                                       :null => false
    t.text     "data"
    t.boolean  "scale",                   :default => false, :null => false
    t.boolean  "is_public",               :default => false, :null => false
    t.datetime "created_at",                                 :null => false
    t.datetime "updated_at",                                 :null => false
    t.integer  "width",      :limit => 2
    t.integer  "height",     :limit => 2
    t.string   "token"
  end

  add_index "dashboards", ["token"], :name => "index_dashboards_on_token"

  create_table "dashboards_widgets", :force => true do |t|
    t.integer  "dashboard_id",  :null => false
    t.integer  "widget_id",     :null => false
    t.integer  "row",           :null => false
    t.integer  "col",           :null => false
    t.integer  "size_x",        :null => false
    t.integer  "size_y",        :null => false
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "widget_tag_id"
    t.text     "data"
  end

  create_table "queries", :force => true do |t|
    t.integer  "user_id",       :null => false
    t.string   "name",          :null => false
    t.text     "value",         :null => false
    t.string   "token",         :null => false
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "connection_id"
  end

  add_index "queries", ["token"], :name => "index_queries_on_token"

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "encrypted_password",     :default => "",    :null => false
    t.boolean  "is_admin",               :default => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
    t.string   "username"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

  create_table "versions", :force => true do |t|
    t.string   "item_type",  :null => false
    t.integer  "item_id",    :null => false
    t.string   "event",      :null => false
    t.string   "whodunnit"
    t.text     "object"
    t.datetime "created_at"
  end

  add_index "versions", ["item_type", "item_id"], :name => "index_versions_on_item_type_and_item_id"

  create_table "widget_tags", :force => true do |t|
    t.integer  "widget_id"
    t.integer  "version_id"
    t.string   "name"
    t.text     "desc"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "widget_tags", ["widget_id", "name"], :name => "index_widget_tags_on_widget_id_and_name", :unique => true

  create_table "widgets", :force => true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.text     "js"
    t.text     "css"
    t.text     "html"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "column"
    t.integer  "row"
    t.text     "meta"
    t.text     "data"
  end

end
