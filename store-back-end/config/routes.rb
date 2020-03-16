Rails.application.routes.draw do
  resources :cart_items
  resources :carts
  resources :items
  resources :users

  patch "/carts/:id/checkout", to: 'carts#checkout'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end


