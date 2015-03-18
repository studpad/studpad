class CreateGradesTeachers < ActiveRecord::Migration
  def change
    create_table :grades_teachers do |t|
      t.belongs_to :teacher, index: true
      t.belongs_to :grade, index: true
    end
  end
end
