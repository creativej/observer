require 'base64'

class WebsiteController < ApplicationController
  before_filter :authenticate_user!, :except => [:ajax]
  def before
  end

  def index
  end

  def dashboard
    @widgets = current_user.widgets
  end

  def ajax
    if params[:url].present?
      resp = AjaxProxy.new.get(params[:url])

      respond_to do |format|
        format.html { render json: resp.parsed_response }
      end
    else
      not_found
    end
  end
end
