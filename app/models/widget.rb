class Widget < ActiveRecord::Base
  attr_accessible :css, :html, :js, :name, :column, :row, :user_id
  validates :name, :presence => true

  belongs_to :user
  has_and_belongs_to_many :dashboards
end
