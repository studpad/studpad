class AddCommunitiesCountToMaterials < ActiveRecord::Migration
  def change
    add_column :materials, :communities_count, :integer, default: 0
  end
end
