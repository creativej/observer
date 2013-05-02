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
end
