class CartsController < ApplicationController
    def index
        carts = Cart.all
        render json: CartSerializer.new(carts)
    end

    def show
        cart = Cart.find(params[:id])
        render json: CartSerializer.new(cart,cart_options_hash)
    end


    def create
        user = User.find(params[:user_id][:id])
        cart = user.carts.create
        render json: CartSerializer.new(cart)
    end

    def update
        cart = Cart.find(params[:id])
        item = Item.find(params[:item_id][:id])
        updatedCart = CartItem.addItemToCart(cart,item)

        render json: CartSerializer.new(cart)
    end


    private 

    def cart_options_hash
        options = {}
        options[:include] = [:items, :'items.cart_items']
        options
    end
end
