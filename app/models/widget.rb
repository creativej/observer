class Widget < ActiveRecord::Base
  attr_accessible :css, :html, :js, :name, :column, :row, :user_id
  validates :name, :presence => true
  has_paper_trail :only => [:css, :html, :js]
  belongs_to :user
  has_many :dashboards, :through => :dashboards_widgets

  def js_parsed(params = {})
    LiquidTemplate.for_widget.parse(self.js).render params
  end
end
