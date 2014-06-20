require 'spec_helper'

describe DashboardsWidgets do
  it 'create DW from a widget' do
    widget = FactoryGirl.create :widget

    dw = DashboardsWidgets.create_from_data({
      'id' => widget.id,
      'dashboard_id' => 1,
      'col' => 1,
      'row' => 2,
      'size_x' => 3,
      'size_y' => 4
    })

    expect(dw.widget_id).to eq(widget.id)
    expect(dw.dashboard_id).to eq(1)
    expect(dw.col).to eq(1)
    expect(dw.row).to eq(2)
    expect(dw.size_x).to eq(3)
    expect(dw.size_y).to eq(4)
    expect(dw.widget_tag_id).to eq(nil)
    dw.save
  end

  it 'create DW with tag' do
    widget = FactoryGirl.create :widget
    tag = FactoryGirl.create :widget_tag, :widget => widget

    dw = DashboardsWidgets.create_from_data({
      'id' => widget.id,
      'dashboard_id' => 1,
      'col' => 1,
      'row' => 2,
      'size_x' => 3,
      'size_y' => 4
    })
    expect(dw.widget_tag_id).to eq(tag.id)
    dw.save
  end
end
