class CartSerializer
  include FastJsonapi::ObjectSerializer
  attributes :total, :checkout, :items
end
