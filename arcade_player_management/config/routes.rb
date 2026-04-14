Rails.application.routes.draw do
  resources :players do
    member do
      post :login
    end

    resources :player_characters, only: [:create, :destroy]
    resources :play_histories, only: [:create]
  end

  resources :play_histories, only: [] do
    resources :score_histories, only: [:create]
  end
end
