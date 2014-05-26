class DashboardsWidgets < ActiveRecord::Base
  attr_accessible :tag_id, :col, :dashboard_id, :row, :size_x, :size_y, :widget_id, :widget_tag, :data
  belongs_to :dashboard
  belongs_to :widget
  has_one :widget_tag

  def self.create_from_data(data)
    widget = Widget.find data['id']

    dw = self.new
    dw.widget_id = widget.id

    if (!widget.last_tag.nil?)
      dw.widget_tag_id = widget.last_tag.id
    end
    dw.dashboard_id = data['dashboard_id']
    dw.col = data['col']
    dw.row = data['row']
    dw.size_x = data['size_x']
    dw.size_y = data['size_y']
    dw.data = data['data']
    dw
  end

  def data_obj
    begin
      ActiveSupport::JSON.decode(self.data)
    rescue
      {}
    end
  end

  def parsed_js()
    print self.data_obj
    self.widget.parsed_js(self.data_obj())
  end

  def parsed_css(params = {})
    self.widget.parsed_css(self.data_obj())
  end

  def parsed_html(params = {})
    self.widget.parsed_html(self.data_obj())
  end
end
