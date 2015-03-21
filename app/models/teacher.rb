class Teacher < User
  has_many :his_main_classrooms, foreign_key: "main_teacher_id", class_name: "Classroom"
  has_many_and_belongs_to_many :classrooms
  authenticates_with_sorcery!
end
