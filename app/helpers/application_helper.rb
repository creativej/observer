module ApplicationHelper
  def html_safe(block)
    block.nil? ? '' : block.html_safe
  end

  def get(value, default)
    value.nil? ? value : default
  end

  def spinner
    '<div class="spinner-container"><div class="spinner"></div></div>'
  end
end
