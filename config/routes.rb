Rails.application.routes.draw do

  ActiveAdmin.routes(self)
  root 'static_pages#main'
  get 'profile' => 'users#profile'
  resources :password_resets, only: [:new, :create, :edit, :update] do
    post :change, on: :collection
  end
  get '/auth/:provider/callback', to: 'sessions#create_external'
  #get '/auth/twitter', to: 'sessions#vkontakte'

  get 'profile/edit' => 'users#edit_profile'

  get 'photos' => 'feed#photos'
  get 'videos' => 'feed#videos'
  get 'recommend' => 'feed#recommend'
  get 'popular' => 'feed#popular'
  get 'fresh' => 'feed#fresh'

  resources :posts do
    member do
      put :like
      put :basket
      put :change_categories
    end
    resources :comments
  end
  resources :feedbacks, only: :create
  resources :attachments, only: [:create, :destroy] do
    get :clean, on: :collection
  end

  resources :comments
  resources :categories
  resources :tags
  resources :photos
  resources :users, except: :edit do
    get :followers, on: :member
    get :following, on: :member
    get :notices, on: :member

    get :basket, on: :member
    get :basket_posts, on: :member
    member do
      get :favourite
      post :follow
      post :follow_several
      post :unfollow
      get :posts
      post 'crop'
      post 'new_ava' => 'users#create_ava'
    end
  end

  resources :sessions
  namespace :ajax do
    get 'page_description'
    get 'get_cities'
  end

  get 'logout' => 'sessions#destroy'
  get 'trouble' => 'materials#edit'
  get 'feed' => 'feed#show'
  get 'explore' => 'feed#explore'
  get 'signup'  => 'users#new'
  get 'welcome'  => 'sessions#new'
  get 'profile' => 'users#profile'

  get 'main' => 'static_pages#main'
  get 'dev' => 'static_pages#dev'
  get 'terms' => 'static_pages#terms'
  get 'licence' => 'static_pages#licence'
  get 'privacy' => 'static_pages#privacy'
end
