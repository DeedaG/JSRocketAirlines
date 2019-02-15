Rails.application.routes.draw do

  #root 'flights#welcome'
  root 'static#about'

  get '/auth/facebook/callback' => 'sessions#create'

  get '/signup', to: 'users#new'
    get '/signin', to: 'sessions#new'
    get '/sessions/destroy' => 'sessions#destroy'
    post '/signin' => 'sessions#create'


  resources :users
  resources :bookings
  resources :flights

  resources :users do
    resources :bookings, only: [:show, :index, :new]
  end

  resources :flights do
    resources :bookings, only: [:show, :index, :new]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
