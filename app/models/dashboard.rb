class Dashboard < ActiveRecord::Base
  attr_accessible :data, :is_public, :name, :scale, :user_id, :width, :height, :token
  validates :name, :presence => true
  validates :user_id, :presence => true

  belongs_to :user
  has_many :widgets, :through => :dashboards_widgets

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

  def add_widget(widget)
    widget['dashboard_id'] = self.id
    @last_added_widget = DashboardsWidgets.create_from_data(widget)
    @last_added_widget.save
  end

  def last_added_widget
    @last_added_widget
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
