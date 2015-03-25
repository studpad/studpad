class Classroom < ActiveRecord::Base
  belongs_to :school
  belongs_to :main_teacher, class_name: "Teacher", foreign_key: "main_teacher_id"
  has_and_belongs_to_many :teachers, class_name: "Teacher", join_table: 'classrooms_teachers'
  has_many :students
  has_many :news_items
end
