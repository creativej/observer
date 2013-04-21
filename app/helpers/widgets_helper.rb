module WidgetsHelper
  def sandbox_css(widget)
    engine = Sass::Engine.new(".widget-#{widget.id} { #{widget.css} }", :syntax => :scss)
    engine.render
  end
end
