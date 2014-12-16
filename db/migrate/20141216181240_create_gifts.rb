class CreateGifts < ActiveRecord::Migration
  def change
    create_table :gifts do |t|
    	t.string :name
    	t.text :description
    	t.text :url
    	t.references :wishlist

    	t.timestamps
    end
  end
end
