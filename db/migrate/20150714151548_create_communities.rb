class CreateCommunities < ActiveRecord::Migration
  def change
    create_table :communities do |t|
      t.string :name, null: false
      t.integer :type, default: 0
      t.belongs_to :creator, index: true

      t.timestamps null: false
    end
  end
end
