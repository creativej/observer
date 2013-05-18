class Dashboard < ActiveRecord::Base
  attr_accessible :data, :is_public, :name, :scale, :user_id
  validates :name, :presence => true
  validates :user_id, :presence => true

  belongs_to :user
end
