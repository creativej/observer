module WidgetsHelper
  def js_filter(js)
    js.gsub(/\{\{.+\}\}/) { |match|
      data_queries_path :token => match[2, match.length - 4]
    }
  end

  def widget_css(widget)
    sandbox_css("widget-#{widget.id}", widget.css)
  end

  def sandbox_css(cls, css)
    engine = Sass::Engine.new(".#{cls} { #{css} }", :syntax => :scss)
    "<style>#{engine.render}</style>"
  end

  def options_value(widget, name, default)
    if widget.options.nil? || widget.options[name].nil?
      return default
    end
    widget.options[name]
  end

  def widget_modifier(data)
    remove_btn = ''

    if !data[:remove].nil?
      remove_btn = '<div class="dashboard-widget-remove" data-remove><i class="icon-cross"></i></div>'
    end
<<eos
  <div class="widget-modifier-group" data-widget-modifier>
  #{remove_btn}
  </div>
eos
  end

  def widget_sandbox(src = '', id = '', widget_id = '')
<<eos
<iframe
  id="#{id}"
  class="widget-sandbox"
  seemless="seemless"
  src="#{src}"
  data-widget-id="#{widget_id}"
  data-dimensions="#{Settings.gridster.dimensions}"></iframe>
eos
  end
end
