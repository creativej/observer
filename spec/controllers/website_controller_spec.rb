require 'spec_helper'
require 'factory_girl'

describe WebsiteController do
  include Devise::TestHelpers

  describe '#index unauthenticated' do
    it 'get redirects to login screen' do
      get :index
      response.should redirect_to '/users/sign_in'
    end
  end

  describe 'GET #index authenticated' do
    before(:each) do
      @user = FactoryGirl.create(:user)
      sign_in @user
    end

    it 'responds successfully with an HTTP 200 status code' do
      get :index
      expect(response).to be_success
      expect(response.status).to eq(200)
    end

    it 'renders the index template' do
      get :index
      expect(response).to render_template('index')
    end
  end

  describe 'POST #index authenticated' do
    before (:each) do
      @user = FactoryGirl.create(:user)
      sign_in @user
    end

    it 'responds successfully with an HTTP 200 status code' do
      post :index, :q => 'SELECT * FROM contest'
      expect(response).to be_success
      expect(response.status).to eq(200)
    end
  end
end
