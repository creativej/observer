TheObserver::Application.routes.draw do
  resources :connections

  resources :dashboards do
    match 'update-widgets' => 'dashboards#update_widgets', :as => :update_widgets, :constraints => {:format => /json/}
    match 'add-widget' => 'dashboards#add_widget', :as => :add_widget, :constraints => {:format => /json/}
    match 'remove-widget' => 'dashboards#remove_widget', :as => :remove_widget, :constraints => {:format => /json/}

    collection do
      match 'view/:token' => 'dashboards#view', :as => :view
      match 'view/:token/widgets/:widget_id' => 'dashboards#widget', :as => :widget
    end
  end

  resources :widgets do
    collection do
      match 'tag/:tag' => 'widgets#show_tag', :as => :show_tag
      match 'preview', :as => :preview
      match 'copy/:id' => 'widgets#copy', :as => :copy
    end
  end

  resources :queries do
    collection do
      post 'run'
      match 'data/:token' => 'queries#data', :constraints => {:format => /(html)/}, :as => :data
      match 'copy/:id' => 'queries#copy', :as => :copy
    end
  end

  devise_for :users, :controllers => { :registrations => "registrations" }

  match 'ajax-proxy' => 'website#ajax'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'website#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
