class WidgetsController < ApplicationController
  before_filter :authenticate_user!, :except => [:show]

  # GET /widgets
  # GET /widgets.json
  def index
    @widgets = Widget.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @widgets }
    end
  end

  # GET /widgets/new
  def new
    @widget = Widget.new
    @widget.user = current_user
    @widget.column ||= 4
    @widget.row ||= 2
    @widget.name = 'untitled'
    @widget.save
    redirect_to(
      edit_widget_path(@widget.id, :redirect => params[:redirect])
    )
  end

  # GET /widgets/copy/1
  def copy
    @widget = Widget.find(params[:id])
    attributes = @widget.attributes
    attributes.delete('id')
    attributes.delete('created_at')
    attributes.delete('updated_at')

    widget = Widget.new
    widget.attributes = attributes
    widget.name = "#{widget.name} (1)"
    widget.save

    redirect_to(
      edit_widget_path(widget.id, :redirect => params[:redirect])
    )
  end

  # GET /widgets/1/edit
  def edit
    @widget = Widget.find(params[:id])
    @queries = Query.all
    @redirect = param(:redirect, widgets_path)
  end

  # PUT /widgets/1
  def update
    @widget = Widget.find(params[:id])

    respond_to do |format|
      if @widget.update_attributes(params[:widget])
        format.json { head :no_content }
      else
        flash[:errors] = @widget.errors
        format.json { render json: @widget.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /widgets/1
  # DELETE /widgets/1.json
  def destroy
    @widget = Widget.find(params[:id])
    @widget.destroy

    respond_to do |format|
      format.html { redirect_to widgets_url }
      format.json { head :no_content }
    end
  end

  # POST /widgets/preview
  def preview
    @widget = !params[:widget].nil? ? params[:widget] : {}

    @widget[:js] = LiquidTemplate.for_widget.parse(@widget[:js]).render

    render :layout => 'basic'
  end

  # GET /widgets/1
  def show
    @widget = Widget.find(params[:id])
    render :layout => 'basic'
  end

  # GET /widgets/1/tag/0.0.1
  def show_tag
    widget = Widget.find(params[:id])
    @widget = widget.find_tag(params[:tag]).version.reify

    render :layout => 'basic'
  end
end
