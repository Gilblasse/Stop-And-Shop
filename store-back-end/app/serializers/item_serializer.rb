class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :price, :image, :qty, :cart_items
  has_many :cart_items
end
