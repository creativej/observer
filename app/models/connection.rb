require('AESCrypt')

class Connection < ActiveRecord::Base
  attr_accessor :password
  attr_accessible :database,
    :name,
    :host,
    :password,
    :encrypted_password,
    :port,
    :salt,
    :database_type,
    :username,
    :user_id

  validates :host, :presence => true
  validates :username, :presence => true
  validates :database_type, :presence => true
  validates :user_id, :presence => true

  belongs_to :user
  has_many :queries, :dependent => :destroy

  before_save :encrypt_password
  after_save :clear_password

  def decrypt_password
      secret = Digest::SHA1.hexdigest(
        TheObserver::Application.config.connection_secret
      )
      encryptor = ActiveSupport::MessageEncryptor.new(secret)
      encryptor.decrypt_and_verify(self.encrypted_password)
  end

  def encrypt_password
    if self.password.present?
      secret = Digest::SHA1.hexdigest(
        TheObserver::Application.config.connection_secret
      )
      encryptor = ActiveSupport::MessageEncryptor.new(secret)
      self.encrypted_password = encryptor.encrypt_and_sign(self.password)
    end
  end

  def clear_password
    self.password = nil
  end
end
