require 'db_client'

class QueriesController < ApplicationController
  include QueriesHelper

  before_filter :authenticate_user!
  # GET /queries
  # GET /queries.json
  def index
    @queries = current_user.queries

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @queries }
    end
  end

  # GET /queries/1
  # GET /queries/1.json
  def show
    @query = current_user.queries.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @query }
    end
  end

  # GET /queries/new
  # GET /queries/new.json
  def new
    @query = Query.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @query }
    end
  end

  # GET /queries/1/edit
  def edit
    @query = current_user.queries.find(params[:id])
  end

  # POST /queries/run
  def run
    if (!request.xhr?)
      raise ActionController::RoutingError.new('Not Found')
    end

    client = DBClient.create
    @result = client.query(request[:value])
    @queryError = client.last_query_error
    respond_to do |format|
      format.html {
        render :partial => 'result'
      }
    end
  end

  # GET /queries/data/:token
  def data
    @query = current_user.queries.find_by_token(params[:token])
    client = DBClient.create
    @result = client.query(@query.value)

    if (@result)
      data = {
        :result => @result,
        :fields => @result.fields
      }
    else
      data = {
        :error => client.last_query_error.to_s
      }
    end

    respond_to do |format|
      format.html { render json: data, status: :created }
    end
  end

  # POST /queries
  # POST /queries.json
  def create
    @query = Query.new(params[:query])
    @query.user = current_user

    respond_to do |format|
      if @query.save
        format.html { redirect_to @query, notice: 'Query was successfully created.' }
        format.json { render json: @query, status: :created, location: @query }
      else
        flash[:errors] = @query.errors
        format.html { redirect_to(new_query_path()) }
        format.json { render json: @query.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /queries/1
  # PUT /queries/1.json
  def update
    @query = current_user.queries.find(params[:id])

    respond_to do |format|
      if @query.update_attributes(params[:query])
        flash[:notice] = 'Query was successfully updated.'

        format.html {
          redirect_to queries_path
        }
        format.json { head :no_content }
      else
        flash[:errors] = @query.errors
        format.html { redirect_to(edit_query_path()) }
        format.json { render json: @query.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /queries/1
  # DELETE /queries/1.json
  def destroy
    @query = current_user.queries.find(params[:id])
    @query.destroy

    respond_to do |format|
      format.html { redirect_to queries_url }
      format.json { head :no_content }
    end
  end
end
