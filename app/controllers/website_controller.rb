require "base64"

class WebsiteController < ApplicationController
  before_filter :authenticate_user!
  def before
  end

  def index
    if (!request.params[:q].nil?)
      query = Base64.decode64(request.params[:q])
      client = Mysql2::Client.new(
        :host => "localhost",
        :username => "root"
      )
      begin
        @result = client.query(query)
      rescue Mysql2::Error => error
        @queryError = error
      end
    end
  end
end
