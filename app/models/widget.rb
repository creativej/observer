class Widget < ActiveRecord::Base
  attr_accessible :css, :html, :js, :name, :column, :row, :user_id
  validates :name, :presence => true
  has_paper_trail :only => [:css, :html, :js]
  belongs_to :user
  has_many :dashboards, :through => :dashboards_widgets
  has_many :wiget_tags

  def js_parsed(params = {})
    LiquidTemplate.for_widget.parse(self.js).render params
  end

  def tags
    WidgetTag.find_by_widget_id self.id
  end

  def last_tagged_version
    self.tags.last.version
  end
end
