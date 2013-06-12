class Widget < ActiveRecord::Base
  attr_accessible :css, :html, :js, :name, :column, :row, :user_id
  validates :name, :presence => true

  belongs_to :user
  has_many :dashboards, :through => :dashboards_widgets
end
