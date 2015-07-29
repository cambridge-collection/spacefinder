Rails.application.routes.draw do
  
  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  
  get '/spaces/filters.json', to: 'spaces#filters', format: 'json' 
  
  resources :spaces do
    resources :tips
    post '/tags', action: :add_tag, format: 'json', on: :member
  end
  
  root 'spaces#index'
end
