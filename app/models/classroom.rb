class Classroom < ActiveRecord::Base
  belongs_to :school
  belongs_to :main_teacher, class_name: "Teacher", foreign_key: "main_teacher_id"
  has_and_belongs_to_many :teachers, class_name: "Teacher", join_table: 'classrooms_teachers'

  has_many :shares
  has_many :materials, through: :shares

  has_many :students
  has_many :news_items
  has_many :albums
  has_many :homeworks
  has_many :photos, :through => :albums

  def last_6_photos
    self.photos.limit(6).order(created_at: 'desc')
  end

end
