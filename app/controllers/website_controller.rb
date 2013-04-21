require "base64"

class WebsiteController < ApplicationController
  before_filter :authenticate_user!
  def before
  end

  def index
  end

  def dashboard
    @widgets = current_user.widgets
  end
end
