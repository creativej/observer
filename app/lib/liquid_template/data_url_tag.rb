class DataUrlTag < Liquid::Tag
  include WidgetsHelper

  def initialize(tag_name, content, tokens)
    super
    @token = content.strip
  end

  def render(context)
    Rails.application.routes.url_helpers.data_queries_path :token => @token
  end
end
