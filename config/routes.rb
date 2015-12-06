Rails.application.routes.draw do

  ActiveAdmin.routes(self)
  root 'static_pages#main'
  get 'profile' => 'users#profile'
  resources :password_resets, only: [:new, :create, :edit, :update] do
    post :change, on: :collection
  end

  get 'profile/edit' => 'users#edit_profile'
  # resources :classrooms do
  #   resources :classmates, controller: 'classrooms/classmates'
  #   get 'posts', on: :member
  #   member do
  #     get  'join'
  #     get  'new_student'
  #     post 'new_student' => 'classrooms#create_student'
  #   end
  # end

  # resources :communities do
  #   resources :members, only: :index, controller: 'communities/members'
  #   resources :notices, controller: 'communities/notices'
  #   get 'posts', on: :member
  #   member do
  #     get  'unjoin'
  #     get  'join'
  #     get  'notices'
  #     post 'crop'
  #     post 'create_ava'
  #   end
  # end

  resources :posts do
    member do
      put :like
      put :basket
    end
    resources :comments
  end
  resources :feedbacks, only: :create
  resources :attachments, only: [:create, :destroy] do
    get :clean, on: :collection
  end

  resources :comments
  resources :photos
  resources :users, except: :edit do
    get :followers, on: :member
    get :following, on: :member
    get :notices, on: :member

    get :basket, on: :member
    get :basket_posts, on: :member
    member do
      post :follow
      post :unfollow
      get :posts
      post 'crop'
      post 'new_ava' => 'users#create_ava'
    end
  end

  resources :sessions
  namespace :ajax do
    get 'page_description'
  end
  get 'development' => 'static_pages#example' #на время разработки

  get 'logout' => 'sessions#destroy'
  get 'trouble' => 'materials#edit'
  get 'feed' => 'feed#show'
  get 'explore' => 'feed#explore'
  get 'signup'  => 'users#new'
  get 'welcome'  => 'sessions#new'
  get 'profile' => 'users#profile'

  get 'main' => 'static_pages#main'
  get 'terms' => 'static_pages#terms'
  get 'licence' => 'static_pages#licence'
  get 'privacy' => 'static_pages#privacy'
  get 'fix' => 'static_pages#fix'
end
