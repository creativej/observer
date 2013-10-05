class DashboardsController < ApplicationController
  # GET /dashboards
  # GET /dashboards.json
  def index
    @dashboards = Dashboard.all(:include => :user)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @dashboards }
    end
  end

  # GET /dashboards/new
  # GET /dashboards/new.json
  def new
    @dashboard = Dashboard.new
    @dashboard.user = current_user
    @dashboard.name = 'untitled'
    @dashboard.save
    redirect_to(edit_dashboard_path(@dashboard))
  end

  # GET /dashboards/1/edit
  def edit
    @dashboard = Dashboard.find(params[:id])
    @dashboard_widgets = @dashboard.dashboard_widgets
    @widgets = Widget.all(:include => :user)
  end

  # PUT /dashboards/1
  # PUT /dashboards/1.json
  def update
    @dashboard = Dashboard.find(params[:id])

    respond_to do |format|
      if @dashboard.update_attributes(params[:dashboard])
        format.html { redirect_to(edit_dashboard_path) }
        format.json { head :no_content }
      else
        flash[:errors] = @dashboard.errors
        format.html { redirect_to(edit_dashboard_path) }
        format.json { render json: @dashboard.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /dashboards/1/update-widgets
  # PUT /dashboards/1/update-widgets.json
  def update_widgets
    @dashboard = Dashboard.find(params[:dashboard_id])
    widgets = ActiveSupport::JSON.decode(params[:widgets])
    respond_to do |format|
      if @dashboard.update_widgets(widgets)
        format.json { head :no_content }
      else
        format.json { render json: @dashboard.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /dashboards/1/add-widget.json
  def add_widget
    @dashboard = Dashboard.find(params[:dashboard_id])
    widget = ActiveSupport::JSON.decode(params[:widget]).first
    respond_to do |format|
      if @dashboard.add_widget(widget)
        format.json { render json: { :id => @dashboard.last_added_widget.id } }
      else
        format.json { render json: @dashboard.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dashboards/1/remove-widgets.json
  def remove_widget
    @dashboard = Dashboard.find(params[:dashboard_id])
    respond_to do |format|
      if @dashboard.remove_widget(params[:id])
        format.json { head :no_content }
      else
        format.json { render json: @dashboard.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dashboards/1
  # DELETE /dashboards/1.json
  def destroy
    @dashboard = Dashboard.find(params[:id])
    @dashboard.destroy

    respond_to do |format|
      format.html { redirect_to dashboards_url }
      format.json { head :no_content }
    end
  end
end
