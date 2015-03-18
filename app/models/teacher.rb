class Teacher < User
  has_many :his_main_grades, foreign_key: "main_teacher_id", class_name: "Grade"
  has_many_and_belongs_to_many :grades
  authenticates_with_sorcery!
end
