class ApplicationController < ActionController::Base
  protect_from_forgery
  rescue_from ActiveRecord::RecordNotFound, :with => :render_404
  # unless Rails.application.config.consider_all_requests_local
  #   rescue_from Exception, :with => :render_404
  # end

  before_filter :set_controller_properties

  def not_found
    render_404
  end

  def render_404
    respond_to do |format|
      format.html { render :file => "#{Rails.root}/public/404.html", :layout => false, :status => :not_found }
      format.xml  { head :not_found }
      format.any  { head :not_found }
    end
  end

  def set_controller_properties
    @current_controller = params[:controller]
    @current_action = params[:action]
  end

  def dump(object)
    puts YAML::dump(object)
  end
end
