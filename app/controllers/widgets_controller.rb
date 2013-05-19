class WidgetsController < ApplicationController
  # GET /widgets
  # GET /widgets.json
  def index
    @widgets = current_user.widgets.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @widgets }
    end
  end

  # GET /widgets/new
  # GET /widgets/new.json
  def new
    @widget = Widget.new
    @widget.user = current_user
    @widget.column ||= 4
    @widget.row ||= 2
    @widget.name = 'untitled'
    @widget.save
    redirect_to(edit_widget_path(@widget))
  end

  # GET /widgets/1/edit
  def edit
    @widget = current_user.widgets.find(params[:id])
    @queries = current_user.queries
  end

  # PUT /widgets/1
  # PUT /widgets/1.json
  def update
    @widget = current_user.widgets.find(params[:id])

    respond_to do |format|
      if @widget.update_attributes(params[:widget])
        if (params[:redirect].nil?)
          redirect_path = widgets_path
        else
          redirect_path = params[:redirect]
        end

        format.html { redirect_to(redirect_path) }
        format.json { head :no_content }
      else
        flash[:errors] = @widget.errors
        format.html { redirect_to(edit_widget_path()) }
        format.json { render json: @widget.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /widgets/1
  # DELETE /widgets/1.json
  def destroy
    @widget = current_user.widgets.find(params[:id])
    @widget.destroy

    respond_to do |format|
      format.html { redirect_to widgets_url }
      format.json { head :no_content }
    end
  end

  # POST /widgets/preview
  def preview
    @widget = !params[:widget].nil? ? params[:widget] : {}
    render :layout => 'basic'
  end

  # POST /widgets/1
  def show
    @widget = current_user.widgets.find(params[:id])
    render :layout => 'basic'
  end
end
