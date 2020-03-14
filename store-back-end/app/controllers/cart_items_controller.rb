class CartItemsController < ApplicationController

    def index
        cart_items = CartItem.all
        # render json: CartItemSerializer.new(cart_items)
    end

    def show
        cart_item = CartItem.find(params[:id])
        # render json: CartItemSerializer.new(cart_item)
    end

    def destroy
        cart = Cart.find(params[:cartId])
        item = Item.find(params[:id])
        
        CartItem.deleteItemFromCart(cart,item)
        render json: CartSerializer.new(cart)
    end
end
