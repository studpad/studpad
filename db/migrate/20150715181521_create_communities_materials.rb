class CreateCommunitiesMaterials < ActiveRecord::Migration
  def change
    create_table :communities_materials do |t|
      t.belongs_to :community, index: true
      t.belongs_to :material, index: true
    end
  end
end
