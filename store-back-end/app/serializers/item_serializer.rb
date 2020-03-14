class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :price, :image, :stock, :cart_items
  has_many :cart_items
end
