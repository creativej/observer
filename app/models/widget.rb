class Widget < ActiveRecord::Base
  attr_accessible :css, :html, :js, :name, :column, :row, :user_id
  validates :name, :presence => true
  has_paper_trail :only => [:css, :html, :js]
  belongs_to :user
  has_many :dashboards, :through => :dashboards_widgets
  has_many :widget_tags

  def parsed_js(params = {})
    self.parse(self.js, params)
  end

  def parsed_css(params = {})
    self.parse(self.css, params)
  end

  def parsed_html(params = {})
    self.parse(self.html, params)
  end

  def parse(content, params)
    LiquidTemplate.for_widget.parse(content).render params
  end

  def last_tag
    self.widget_tags.last
  end

  def find_tag(name)
    self.widget_tags.find_by_name(name)
  end

  def add_tag(name, desc)
    tag = WidgetTag.new
    tag.name = name
    tag.desc = desc
    tag.widget = self
    tag.version_id = self.versions.last.id
    tag.save
  end
end
