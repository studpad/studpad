Rails.application.routes.draw do

  root 'static_pages#main'

  resources :password_resets, only: [:new, :create, :edit, :update] do
    post 'change', on: :collection
  end

  resources :classrooms do
    resources :classmates, controller: 'classrooms/classmates'
    get 'posts', on: :member
    member do
      get  'join'
      get  'new_student'
      post 'new_student' => 'classrooms#create_student'
    end
  end

  resources :communities do
    resources :members, only: :index, controller: 'communities/members'
    resources :notices, controller: 'communities/notices'
    get 'posts', on: :member
    member do
      get  'unjoin'
      get  'join'
      get  'notices'
      post 'crop'
      post 'create_ava'
    end
  end

  resources :posts do
    resources :comments
  end

  resources :attachments, only: [:create, :destroy]
  resources :comments#, only: [:destroy, :update]
  resources :users do
    member do
      post 'crop'
      post 'new_ava' => 'users#create_ava'
    end
  end

  resources :sessions

  get 'development' => 'static_pages#example' #на время разработки

  get 'logout' => 'sessions#destroy'
  get 'trouble' => 'materials#edit'
  get 'feed' => 'feed#show'
  get 'signup'  => 'users#new'
  get 'welcome'  => 'sessions#new'
  get 'profile' => 'users#profile'
  get 'main' => 'static_pages#main'

end
