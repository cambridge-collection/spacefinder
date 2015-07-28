Rails.application.routes.draw do
  
  get '/spaces/filters.json', to: 'spaces#filters', format: 'json' 
  
  resources :spaces do
    resources :tips
    post '/tags', to: :add_tag, format: 'json', on: :member
  end
end
