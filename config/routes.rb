Rails.application.routes.draw do
  
  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  devise_scope :user do
    delete "/users/sign_out" => "devise/sessions#destroy"
  end
  resource :user, :defaults => { :format => 'json' }
  
  get '/spaces/filters.json', to: 'spaces#filters', format: 'json' 
  
  resources :spaces do
    resources :tips, :except => [:create]
    resources :tips, :only => [:create], :defaults => { :format => 'json' }
    resources :categories
    post '/tags', action: :add_tag, format: 'json', on: :member
  end
  
  root 'spaces#index'
end
