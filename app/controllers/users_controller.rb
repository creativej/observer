class UsersController < ApplicationController
  before_filter :authenticate_user!

  # GET /users/1/edit
  def edit
    @user = current_user
  end

  def update
    @user = current_user
    respond_to do |format|
      if @user.update_attributes(params[:query])
        if (params[:redirect].nil?)
          redirect_path = website_path
        else
          redirect_path = params[:redirect]
        end

        format.html { redirect_to redirect_path }
        format.json { head :no_content }
      else
        flash[:errors] = @user.errors
        format.html { redirect_to(edit_user_path()) }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end
end
