class Classroom < ActiveRecord::Base
  belongs_to :main_teacher, class_name: "Teacher", foreign_key: "teacher_id"
  has_many_and_belongs_to_many :teachers, class_name: "Teacher"
  has_many :students
  has_many :news_item
end
