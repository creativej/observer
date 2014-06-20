class ConnectionsController < ApplicationController
  before_filter :authenticate_user!

  # GET /connections
  # GET /connections.json
  def index
    @connections = Connection.all(:include => :user)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @connections }
    end
  end

  # GET /connections/new
  def new
    @connection = Connection.new
    @redirect = param(:redirect, connections_path)

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  # GET /connections/1/edit
  def edit
    @connection = Connection.find(params[:id])
    @redirect = param(:redirect, connections_path)
  end

  def show
    redirect_to(edit_connection_path(params[:id], :redirect => params[:redirect]))
  end

  # POST /connections
  # POST /connections.json
  def create
    @connection = Connection.new(params[:connection])
    @connection.user = current_user
    @connection.database_type = 'mysql'

    if @connection.port.nil?
      @connection.port = '3306'
    end

    respond_to do |format|
      if @connection.save
        redirect_path = param(:redirect, connections_path)

        format.html { redirect_to redirect_path, notice: 'Connection was successfully created.' }
        format.json { render json: @connection, status: :created, location: @connection }
      else
        format.html { render action: "new" }
        format.json { render json: @connection.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /connections/1
  # PUT /connections/1.json
  def update
    @connection = Connection.find(params[:id])

    respond_to do |format|
      if @connection.update_attributes(params[:connection])
        redirect_path = param(:redirect, edit_connection_path(@connection))

        format.html { redirect_to redirect_path, notice: 'Connection was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @connection.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /connections/1
  # DELETE /connections/1.json
  def destroy
    @connection = Connection.find(params[:id])
    @connection.destroy

    respond_to do |format|
      format.html { redirect_to connections_url }
      format.json { head :no_content }
    end
  end
end
