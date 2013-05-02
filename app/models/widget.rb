class Widget < ActiveRecord::Base
  attr_accessible :css, :html, :js, :name, :options, :user_id
  serialize :options, JSON
  validates :name, :presence => true

  belongs_to :user

  def set_options(name, value)
    if (self.options.nil?)
      self.options = {}
    end
    self.options[name] = value
  end
end
