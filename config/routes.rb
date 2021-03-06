Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  namespace :api, defaults: { format: "json" } do
    get :me, to: 'me#me'
    get :people, to: 'people#people'
    get '/personDuplicates/:personId', to: 'people#duplicates'
  end

  root to: "main#index"
end
