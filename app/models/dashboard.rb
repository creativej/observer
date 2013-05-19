class Dashboard < ActiveRecord::Base
  attr_accessible :data, :is_public, :name, :scale, :user_id
  validates :name, :presence => true
  validates :user_id, :presence => true

  belongs_to :user
  has_and_belongs_to_many :widgets

  def update_widgets(widgets)
    print 'update widgets'
    self.transaction do
      self.widgets.clear

      widgets.each do | widget |
        widget['dashboard_id'] = self.id
        DashboardsWidgets.create_from_data(widget).save
      end
    end
  end
  def dashboard_widgets
    DashboardsWidgets.includes(:widget).where("dashboard_id = ?", self.id)
  end
end
