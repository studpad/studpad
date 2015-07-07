class CreateMaterials < ActiveRecord::Migration
  def change
    create_table :materials do |t|
      t.belongs_to :classroom, index: true
      t.belongs_to :user, index: true

      t.string :description
      t.string :name
      t.string :file
      t.timestamps null: false
    end
  end
end
