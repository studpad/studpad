class CreateClassroomsMaterials < ActiveRecord::Migration
  def change
    create_table :classrooms_materials do |t|
      t.belongs_to :classroom, index: true
      t.belongs_to :material, index: true
    end
  end
end
