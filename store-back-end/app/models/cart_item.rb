class CartItem < ApplicationRecord
    belongs_to :cart
    belongs_to :item


    def self.addItemToCart(cart,item)
        cartItem = self.find_by_cart_and_item(cart,item)
    
        if cartItem.empty?
            cartItem = self.create(cart: cart, item: item)
            cartItem.qty += 1
            cartItem.save
        else  
            cartItem.first.qty += 1
            cartItem.first.save
        end

        cart
    end


    def self.deleteItemFromCart(cart,item)
        cartItem = self.find_by_cart_and_item(cart,item).first
        
        if !!cartItem
            if cartItem.qty > 1
                cartItem.qty -= 1
                cartItem.save
            else  
                cartItem.qty -= 1
                cartItem.save
                self.destroy(cartItem.id)
            end
        end
    
    end

    def self.find_by_cart_and_item(cart,item)
        self.where('cart_id = ? AND item_id = ?', cart.id, item.id).limit(1)
    end

end
