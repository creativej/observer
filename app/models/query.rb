class Query < ActiveRecord::Base
  attr_accessible :name, :token, :value, :connection_id, :user_id
  before_create :before_create
  belongs_to :user
  belongs_to :db_connection, :class_name => 'Connection', :foreign_key =>
"connection_id"
  validates :name, :presence => true

  def before_create
    if (self.token.nil?)
      self.token = Digest::SHA1.hexdigest("#{self.name}-#{Time.now}")
    end
  end

  def value_as_query
    Liquid::Template.parse(self.value).render
  end
end
