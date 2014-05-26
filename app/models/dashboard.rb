class Dashboard < ActiveRecord::Base
  attr_accessible :data, :is_public, :name, :scale, :user_id, :width, :height, :token
  validates :name, :presence => true
  validates :user_id, :presence => true

  belongs_to :user
  has_many :widgets, :through => :dashboards_widgets

  before_create :before_create
  def before_create
    if (self.token.nil?)
      self.token = Digest::SHA1.hexdigest("#{self.name}-#{Time.now}")
    end
  end

  def update_widgets(widgets)
    self.transaction do
      widgets.each do | widget |
        dw = self.dashboard_widgets.where('id = ?', widget['id']).first

        if !dw.nil?
          dw.col = widget['col']
          dw.row = widget['row']
          dw.size_x = widget['size_x']
          dw.size_y = widget['size_y']
          dw.save
        end
      end
    end
  end

  def add_widget_from_data(widget)
    widget['dashboard_id'] = self.id
    widget[:size_x] = widget[:row]
    widget[:size_y] = widget[:column]
    widget[:col] = 1
    widget[:row] = 1

    self.dashboard_widgets.each do |w|
      widget[:row] = [w.col, widget[:row]].max
    end

    @last_dashboard_widget = DashboardsWidgets.create_from_data(widget)
    @last_dashboard_widget.save
  end

  def last_dashboard_widget
    @last_dashboard_widget
  end

  def remove_widget(id)
    dw = DashboardsWidgets.find(id)

    if dw.dashboard_id == self.id
      dw.destroy
    else
      false
    end
  end

  def dashboard_widgets
    DashboardsWidgets.includes(:widget).where("dashboard_id = ?", self.id)
  end
end
