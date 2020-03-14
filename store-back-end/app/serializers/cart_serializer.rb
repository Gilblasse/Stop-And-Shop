class CartSerializer
  include FastJsonapi::ObjectSerializer
  attributes :total, :checkout, :items, :cart_items 
  has_many :items 
end
