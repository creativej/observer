class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :is_admin, :remember_me

  has_many :queries, :dependent => :destroy
  has_many :widgets, :dependent => :destroy
  has_many :dashboards, :dependent => :destroy
end
