Rails.application.routes.draw do

  root 'static_pages#main'

  resources :password_resets, only: [:new, :create, :edit, :update] do
    post 'change', on: :collection
  end

  resources :classrooms do
    resources :materials
    resources :classmates, controller: "classrooms/classmates"
    resources :homeworks, controller: "classrooms/homeworks"
    resources :news, only: :create do
      post 'comment', on: :member
    end
    member do
      get 'join'
      get 'new_student'
      post 'new_student' => 'classrooms#create_student'
    end
  end

  resources :communities do
    resources :materials, only: [:index, :create], controller: "communities/materials"
    resources :members, only: :index, controller: "communities/members"
    resources :news, only: :create, controller: "communities/news" do
      post 'comment', on: :member
    end
    member do
      get 'join'
      get 'notices'
    end
  end

  resources :materials do
    post 'share', on: :collection
  end

  resources :news

  resources :attachments, only: [:create, :destroy]
  resources :comments, only: [:destroy, :update]
  resources :users do
    member do
      post 'crop'
      get 'new_ava'
      post 'new_ava' => 'users#create_ava'
    end
  end

  resources :sessions

  get 'development' => 'sessions#development' #на время разработки

  get 'logout' => 'sessions#destroy'
  get 'trouble' => "materials#edit"
  get 'feed' => "feed#show"
  get 'signup'  => 'users#new'
  get 'welcome'  => 'sessions#new'
  get 'profile' => 'users#profile'
  get 'main' => 'static_pages#main'

end
