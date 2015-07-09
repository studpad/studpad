class RemoveFileFromMaterials < ActiveRecord::Migration
  def change
    remove_column :materials, :file
    add_reference :materials, :subject, {index: true}
  end
end
