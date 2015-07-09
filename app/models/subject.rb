class Subject < ActiveRecord::Base
  has_and_belongs_to_many :news_items
  has_many :homeworks
  has_many :materials
  has_and_belongs_to_many :teachers, class_name: "Teacher", join_table: 'subjects_teachers'
end
