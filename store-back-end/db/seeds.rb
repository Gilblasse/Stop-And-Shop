# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

items = [
	["Red Seedless Grapes", 1.99, "https://i5.peapod.com/c/BX/BX5LD.jpg"],
    ["Tomato Soup", 4.19, "https://i5.peapod.com/c/2V/2VA8A.jpg"],
    ["Betty Crocker Cake Mix", 1.69, "https://i5.peapod.com/c/O3/O3QAP.jpg"],
    ["Hidden Vally Ranch Dressing", 5.19, "https://i5.peapod.com/c/WD/WD8W8.jpg"],
    ["Smart Water - 6pk", 4.99, "https://i5.peapod.com/c/2E/2EN6P.jpg"],
    ["Talenti Carmel Cookie Crunch", 4.99, "https://i5.peapod.com/c/KV/KVA2L.jpg"],
    ["Almond Milk", 3.99, "https://i5.peapod.com/c/2J/2J6ON.jpg"],
    ["All Stainlifters Liquid Detergent", 3.83, "https://i5.peapod.com/c/YD/YDPAU.jpg"],
    ["Nabisco Fig Newtons", 3.50, "https://i5.peapod.com/c/5M/5MFHM.jpg"],
]

items.each do |item| 
	name,price,imageUrl = item
    Item.create(name: name, price: price, stock: Faker::Number.within(range: 1..10), image: imageUrl)
end