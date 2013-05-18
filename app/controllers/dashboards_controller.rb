class DashboardsController < ApplicationController
  # GET /dashboards
  # GET /dashboards.json
  def index
    @dashboards = current_user.dashboards.all

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
    @dashboard = current_user.dashboards.find(params[:id])
    @widgets = current_user.widgets
  end

  # PUT /dashboards/1
  # PUT /dashboards/1.json
  def update
    @dashboard = current_user.dashboards.find(params[:id])

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

  # DELETE /dashboards/1
  # DELETE /dashboards/1.json
  def destroy
    @dashboard = current_user.dashboards.find(params[:id])
    @dashboard.destroy

    respond_to do |format|
      format.html { redirect_to dashboards_url }
      format.json { head :no_content }
    end
  end
end
