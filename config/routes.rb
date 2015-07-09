NewsReader::Application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :feeds, only: [:index, :create, :show, :destroy] do
      resources :entries, only: [:index]
    end
  end

  root to: "static_pages#index"
end
