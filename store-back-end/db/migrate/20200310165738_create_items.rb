class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.float :price
      t.integer :stock
      t.string :image

      t.timestamps
    end
  end
end
