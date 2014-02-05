class DashboardsWidgets < ActiveRecord::Base
  attr_accessor :tag_id, :col, :dashboard_id, :row, :size_x, :size_y, :widget_id, :widget_tag
  belongs_to :dashboard
  belongs_to :widget
  has_one :widget_tag

  def self.create_from_data(data)
    widget = Widget.find data['id']

    dw = self.new
    dw.widget_id = widget.id
    dw.widget_tag = widget.last_tag
    dw.dashboard_id = data['dashboard_id']
    dw.col = data['col']
    dw.row = data['row']
    dw.size_x = data['size_x']
    dw.size_y = data['size_y']
    dw
  end
end
