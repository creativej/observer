require 'spec_helper'

describe Dashboard do
  it "adds new widget to dashbaord" do
    dashboard = FactoryGirl.create :dashboard
    widget = FactoryGirl.create :widget

    dw = dashboard.add_widget_from_data({
      'id' => widget.id,
      'col' => 1,
      'row' => 2,
      'size_x' => 1,
      'size_y' => 1
    })
    dashboard.reload
    expect(dashboard.last_dashboard_widget.widget.id).to eq(widget.id)
  end
end
