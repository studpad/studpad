class TeacherSpecialization < ActiveRecord::Base
  has_many :users, -> {where(type: 'Teacher').where.not(teacher_category_id: 3)}
end
