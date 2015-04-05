class CreateSubjectsTeachers < ActiveRecord::Migration
  def change
    create_table :subjects_teachers do |t|
      t.belongs_to :subject, index: true
      t.belongs_to :teacher, index: true
    end
  end
end
