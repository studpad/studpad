class AddNumberOfSharingToMaterials < ActiveRecord::Migration
  def change
    add_column :materials, :classrooms_count, :integer, default: 0
  end
end
