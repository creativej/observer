class DashboardsWidgets < ActiveRecord::Base
  attr_accessible :col, :dashboard_id, :row, :size_x, :size_y, :widget_id
  belongs_to :dashboard
  belongs_to :widget

  def self.create_from_data(widget)
    dw = self.new
    dw.widget_id = widget['id']
    dw.dashboard_id = widget['dashboard_id']
    dw.col = widget['col']
    dw.row = widget['row']
    dw.size_x = widget['size_x']
    dw.size_y = widget['size_y']
    dw
  end
end
