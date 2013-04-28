module WidgetsHelper
  def widget_css(widget)
    sandbox_css("widget-#{widget.id}", widget.css)
  end
  def sandbox_css(cls, css)
    engine = Sass::Engine.new(".#{cls} { #{css} }", :syntax => :scss)
    "<style>#{engine.render}</style>"
  end
end
