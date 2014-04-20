class Query < ActiveRecord::Base
  attr_accessible :name, :token, :value, :connection_id, :user_id
  before_create :generate_token
  belongs_to :user
  belongs_to :db_connection, :class_name => 'Connection', :foreign_key =>
"connection_id"
  validates :name, :presence => true

  def value_as_query(vars = {})
    LiquidTemplate.for_query.parse(self.value).render vars
  end

  protected

  def generate_token
    self.token = loop do
      random_secret = SecureRandom.urlsafe_base64(nil, false)
      break random_secret unless self.class.exists?(token: random_secret)
    end
  end
end
