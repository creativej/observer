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
    mixins = <<eos
  @mixin defaultHeadings($color) {
    h1, h2 {
      color: $color;
      margin: 0 0 5px;
      padding: 0;
    }

    h1 {
      font-size: 18px;
    }

    h2 {
      font-size: 14px;
    }
  }

  @mixin white($mode:border) {
    padding: 10px;
    font-size: 14px;
    color: grey;
    @include defaultHeadings(grey);

    @if $mode == transparent {
      background: none;
    } @else {
      background-color: #fff;

      @if $mode != no-border {
        border: 10px solid #eee;
      }
    }
  }

  @mixin solarized {
    font-size: 14px;
    background-color: #042029;
    color: #839496;
    padding: 10px;
    @include defaultHeadings(#B58900);

    a {
      color: #268BD2;
    }
  }

  @mixin dark_grey($mode:border) {
    font-size: 14px;
    color: #ddd;
    padding: 10px;
    @include defaultHeadings(#fff);

    @if $mode == transparent {
      background: none;
    } @else {
      background-color: grey;

      @if $mode != no-border {
        border: 10px solid #ccc;
      }
    }
  }
eos
    begin
      engine = Sass::Engine.new("#{mixins} .#{cls} { #{css} }", :syntax => :scss)
      "<style>#{engine.render}</style>"
    rescue
      ""
    end
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

  def widget_sandbox(src = '', id = '', widget_id = '', widget_class = '')
<<eos
<iframe
  id="#{id}"
  name="#{id}"
  class="widget-sandbox #{widget_class}"
  seemless="seemless"
  src="#{src}"
  scrolling="no"
  data-widget-id="#{widget_id}"
  data-sandbox
  data-dimensions="#{Settings.gridster.dimensions}"></iframe>
eos
  end
end
