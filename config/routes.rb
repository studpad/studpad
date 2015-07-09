Rails.application.routes.draw do


  get 'line/show'
  root 'users#profile'
  resources :materials
  resources :attachments, only: [:create, :destroy]
  get 'trouble' => "materials#edit"
  get 'feed' => "feed#show"

  resources :classrooms do
    resources :albums do
      member do
        get 'newphoto'
        post 'newphoto' => 'albums#create_newphoto'
      end
    end
    resources :subjects, only: :show
    resources :materials
    resources :classmates
    resources :homeworks
    resources :news, only: :create do
      member do
        post 'comment'
      end
    end
    member do
      get 'new_student'
      post 'new_student' => 'classrooms#create_student'
    end
  end
  resources :news, only: [:destroy, :update] do
    collection do
      post 'multicreate'
    end
  end
  resources :comments, only: [:destroy, :update]
  resources :users do
    member do
      post 'crop'
      get 'new_ava'
      post 'new_ava' => 'users#create_ava'
    end
  end

  resources :sessions
  resources :photos

  get 'development' => 'sessions#development' #на время разработки

  get 'login'  => 'sessions#new'
  get 'logout' => 'sessions#destroy'

  get 'signup'  => 'users#new'
  get 'profile' => 'users#profile'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"


  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
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

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
