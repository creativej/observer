require 'liquid_template/group_tag'
require 'liquid_template/date_range_block'
require 'liquid_template/data_url_tag'
require 'liquid_template/default_filter'

class LiquidTemplate
  def self.for_query
    @template = Liquid::Template
    @template.register_tag('group', GroupTag)
    @template.register_tag('datefrom', DateRangeBlock)
    @template.register_tag('datetill', DateRangeBlock)
    @template.register_filter(DefaultFilter)
    @template
  end

  def self.for_widget
    @template = Liquid::Template
    @template.register_tag('data_url', DataUrlTag)
    @template
  end
end
