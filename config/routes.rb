Rails.application.routes.draw do

  root 'feed#show'

  resources :materials do
    collection do
      post 'share'
    end
  end

  resources :classrooms do
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

  resources :news do
    collection do
      post 'multicreate'
    end
  end

  resources :attachments, only: [:create, :destroy]
  resources :comments, only: [:destroy, :update]
  resources :users do
    member do
      post 'crop'
      get 'new_ava'
      post 'new_ava' => 'users#create_ava'
    end
  end

  resources :communities
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
