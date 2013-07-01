module ApplicationHelper
  def html_safe(block)
    block.nil? ? '' : block.html_safe
  end

  def get(value, default)
    value.nil? ? value : default
  end

  def spinner(classes = '')
    '<div class="spinner-container ' << classes << '"><div class="spinner-icon"></div><div class="spinner-action"></div></div>'
  end

  def overlay_spinner
    self.spinner('spinner-container--overlay')
  end
end
