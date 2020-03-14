class CartItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :item, :cart
  belongs_to :item
end
