module ApplicationHelper
  def html_safe(block)
    block.nil? ? '' : block.html_safe
  end
end
