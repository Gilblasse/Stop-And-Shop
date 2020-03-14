class CartItem < ApplicationRecord
    belongs_to :cart
    belongs_to :item


    def self.addItemToCart(cart,item)
        cartItem = self.find_by_cart_and_item(cart,item)

        if cartItem.empty?
            self.create(cart: cart, item: item)
            item.qty += 1
            item.save
        else  
            item.qty += 1
            item.save
        end
        
        cart
    end


    def self.deleteItemFromCart(cart,item)
        cartItem = self.find_by_cart_and_item(cart,item).first
        
        if cartItem
            if item.qty > 1
                item.qty -= 1
                item.save
            else  
                item.qty -= 1
                item.save
                self.destroy(cartItem.id)
            end
        end
    
    end

    def self.find_by_cart_and_item(cart,item)
        self.where('cart_id = ? AND item_id = ?', cart.id, item.id).limit(1)
    end

end
