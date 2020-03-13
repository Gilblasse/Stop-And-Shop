class CartsController < ApplicationController
    def index
        carts = Cart.all
        render json: CartSerializer.new(carts)
    end

    def show
        cart = Cart.find(params[:id])
        render json: CartSerializer.new(cart)
    end


    def create
        user = User.find(params[:user_id])
        user.carts.create
    end

    def update
        cart = Cart.find(params[:id])
        item = Item.find(params[:item_id])
        CartItem.create(cart: cart, item: item)
        render json: CartSerializer.new(cart)
    end
end
