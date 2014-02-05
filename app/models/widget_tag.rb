class WidgetTag < ActiveRecord::Base
  attr_accessible :desc, :name, :version_id
  has_one :version
  belongs_to :widget
end
