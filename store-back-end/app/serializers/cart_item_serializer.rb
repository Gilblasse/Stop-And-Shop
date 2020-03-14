class CartItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :item, :cart, :qty
  belongs_to :item
end
