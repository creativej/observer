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

  # GET /widgets/1
  # GET /widgets/1.json
  def show
    @widget = current_user.widgets.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @widget }
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

  # POST /widgets
  # POST /widgets.json
  def create
    @widget = Widget.new(params[:widget])
    @widget.user = current_user

    respond_to do |format|
      if @widget.save
        format.html { redirect_to @widget, notice: 'Widget was successfully created.' }
        format.json { render json: @widget, status: :created, location: @widget }
      else
        flash[:errors] = @widget.errors
        format.html { redirect_to(new_widget_path()) }
        format.json { render json: @widget.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /widgets/1
  # PUT /widgets/1.json
  def update
    @widget = current_user.widgets.find(params[:id])

    respond_to do |format|
      if @widget.update_attributes(params[:widget])
        # flash[:notice] = 'Widget was successfully updated.'
        format.html { redirect_to(edit_widget_path) }
        format.json { head :no_content }
      else
        flash[:errors] = @widget.errors
        format.html { redirect_to(edit_widget_path()) }
        format.json { render json: @widget.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /widgets/1/update
  def update_attribute
    # if !request.xhr?
    #   not_found
    # end

    @widget = current_user.widgets.find(params[:widget_id])

    attributes = {}

    params[:widget].each do |name|
      attributes[name] = params[:widget][name]
    end

    @widget.update_attributes(attributes)

    respond_to do |format|
      format.html { render json: {} }
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

  def preview
    @widget = !params[:widget].nil? ? params[:widget] : {}
    render :layout => 'basic'
  end
end
