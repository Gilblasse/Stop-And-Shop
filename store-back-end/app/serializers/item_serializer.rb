class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :price, :image, :qty
end
