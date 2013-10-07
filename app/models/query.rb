class Query < ActiveRecord::Base
  attr_accessible :name, :token, :value
  before_create :before_create
  belongs_to :user
  belongs_to :connection
  validates :name, :presence => true

  def before_create
    if (self.token.nil?)
      self.token = Digest::SHA1.hexdigest("#{self.name}-#{Time.now}")
    end
  end
end
