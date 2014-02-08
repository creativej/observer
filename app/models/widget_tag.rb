class WidgetTag < ActiveRecord::Base
  attr_accessible :desc, :name, :version_id, :widget, :version
  belongs_to :widget
  belongs_to :dashboards_widgets

  def version
    PaperTrail::Version.find self.version_id
  end
end
