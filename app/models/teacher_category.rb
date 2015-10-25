class TeacherCategory < ActiveRecord::Base
  has_many :users, -> {where(type: 'Teacher')}
end
