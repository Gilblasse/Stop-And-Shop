class User < ApplicationRecord
    has_secure_password
    has_many :carts
    has_many :cart_items
    has_many :items, through: :cart_items
end
