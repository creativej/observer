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
    AESCrypt.decrypt_password self.encrypted_password
  end

  def encrypt_password
    if self.password.present?
      self.encrypted_password = AESCrypt.encrypt_password self.password
    end
  end

  def clear_password
    self.password = nil
  end
end
