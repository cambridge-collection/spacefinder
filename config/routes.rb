Rails.application.routes.draw do
  
  get '/spaces/filters.json', to: 'spaces#filters', format: 'json' 
  resources :spaces
end
