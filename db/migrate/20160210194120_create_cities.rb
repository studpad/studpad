class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :name
      t.string :region
    end
    add_column :posts, :city_id, :integer, index: true
  end
end
