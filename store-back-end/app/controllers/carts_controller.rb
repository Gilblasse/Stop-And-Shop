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
        item = Item.find(params[:item_id])
        CartItem.addItemToCart(cart,item)

        render json: CartSerializer.new(cart)
    end



    def checkout
        old_cart = Cart.find(params[:id])
        old_cart.checkout = true
        old_cart.save
        new_cart = old_cart.user.carts.create
        render json: CartSerializer.new(new_cart)
    end



    private 

    def cart_options_hash
        options = {}
        options[:include] = [:items, :'items.cart_items']
        options
    end
end
