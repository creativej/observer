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

  def set_column(value)
    if value.nil?
      return
    end
    self.set_options [value, Settings.gridster.dimensions[0]].max
  end

  def set_row(value)
    if value.nil?
      return
    end
    self.set_options [value, Settings.gridster.dimensions[1]].max
  end
end
