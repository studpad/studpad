class CreateClassroomsTeachers < ActiveRecord::Migration
  def change
    create_table :classrooms_teachers do |t|
      t.belongs_to :teacher, index: true
      t.belongs_to :classroom, index: true
    end
  end
end
